// src/lib/store/db.ts
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { supabaseServer, isServerSupabaseConfigured } from '../supabase/server';
import type {
  Product,
  Occasion,
  Video,
  Testimonial,
  Commitment,
  SiteSettings,
  AuditLog,
  ProductImage
} from '../../types';
import {
  initialProducts,
  initialOccasions,
  initialCommitments,
  initialTestimonials,
  initialVideos,
  initialSettings
} from './initial-data';

interface DatabaseSchema {
  products: Product[];
  occasions: Occasion[];
  commitments: Commitment[];
  testimonials: Testimonial[];
  videos: Video[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
}

function normalizeZaloUrl(value?: string): string {
  const raw = (value || process.env.PUBLIC_ZALO_PHONE || '').trim();
  if (!raw) return 'https://zalo.me';

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/^http:\/\//i, 'https://');
  }

  if (/^zalo\.me\//i.test(raw)) {
    return `https://${raw}`;
  }

  if (/^\d[\d\s\-+().]*$/.test(raw)) {
    const digits = raw.replace(/\D/g, '');
    return `https://zalo.me/${digits}`;
  }

  return `https://${raw.replace(/^\/+/, '')}`;
}

const PRIMARY_DATA_FILE = path.resolve(process.cwd(), 'data-store.json');
const TMP_DATA_FILE = path.resolve(os.tmpdir(), 'flower-shop-data-store.json');

class DataStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(TMP_DATA_FILE)) {
        const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read temp data file:', e);
    }

    try {
      if (fs.existsSync(PRIMARY_DATA_FILE)) {
        const raw = fs.readFileSync(PRIMARY_DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read primary data-store.json, initializing from defaults:', e);
    }

    const defaultData: DatabaseSchema = {
      products: [...initialProducts],
      occasions: [...initialOccasions],
      commitments: [...initialCommitments],
      testimonials: [...initialTestimonials],
      videos: [...initialVideos],
      settings: { ...initialSettings },
      auditLogs: []
    };
    this.persist(defaultData);
    return defaultData;
  }

  private persist(dataToSave?: DatabaseSchema) {
    const d = dataToSave || this.data;
    const jsonContent = JSON.stringify(d, null, 2);

    let written = false;
    try {
      fs.writeFileSync(PRIMARY_DATA_FILE, jsonContent, 'utf-8');
      written = true;
    } catch {
      // Vercel / read-only container fallback
    }

    try {
      fs.writeFileSync(TMP_DATA_FILE, jsonContent, 'utf-8');
    } catch (e) {
      if (!written) {
        console.error('Failed to write data-store.json to both primary and temp storage:', e);
      }
    }
  }

  private async loadSupabaseData(): Promise<DatabaseSchema | null> {
    if (!isServerSupabaseConfigured || !supabaseServer) {
      return null;
    }

    try {
      const [productsRes, occasionsRes, commitmentsRes, testimonialsRes, videosRes, settingsRes] = await Promise.all([
        supabaseServer.from('products').select('*').order('sort_order', { ascending: true }),
        supabaseServer.from('occasions').select('*').order('sort_order', { ascending: true }),
        supabaseServer.from('commitments').select('*').order('sort_order', { ascending: true }),
        supabaseServer.from('testimonials').select('*').order('sort_order', { ascending: true }),
        supabaseServer.from('videos').select('*').order('sort_order', { ascending: true }),
        supabaseServer.from('site_settings').select('key, value')
      ]);

      if (productsRes.error || occasionsRes.error || commitmentsRes.error || testimonialsRes.error || videosRes.error || settingsRes.error) {
        return null;
      }

      const records = settingsRes.data || [];
      const settingsMap = records.reduce<Record<string, any>>((acc, row) => {
        acc[row.key] = row.value;
        return acc;
      }, {});

      const products = (productsRes.data || []).map((row: any) => ({
        ...row,
        price: Number(row.price || 0),
        compare_at_price: row.compare_at_price == null ? null : Number(row.compare_at_price),
        featured: Boolean(row.featured),
        status: row.status || 'published',
        deleted_at: row.deleted_at || null,
        images: [],
        occasions: []
      })) as Product[];

      if (products.length > 0) {
        const productIds = products.map((product) => product.id);
        const [imagesRes, relationshipRes] = await Promise.all([
          supabaseServer.from('product_images').select('*').in('product_id', productIds),
          supabaseServer.from('product_occasions').select('product_id, occasions(*)')
        ]);

        const imgMap = new Map<string, ProductImage[]>();
        (imagesRes.data || []).forEach((row: any) => {
          const list = imgMap.get(row.product_id) || [];
          list.push({
            id: row.id,
            product_id: row.product_id,
            secure_url: row.secure_url,
            alt_text: row.alt_text,
            width: row.width,
            height: row.height,
            bytes: row.bytes,
            is_cover: Boolean(row.is_cover),
            sort_order: Number(row.sort_order || 0),
            cloudinary_public_id: row.cloudinary_public_id,
            media_type: row.media_type || 'image',
            video_provider: row.video_provider,
            video_url: row.video_url,
            video_embed_url: row.video_embed_url
          });
          imgMap.set(row.product_id, list);
        });

        const occMap = new Map<string, Occasion[]>();
        (relationshipRes.data || []).forEach((row: any) => {
          const item = row.occasions;
          if (!item) return;
          const list = occMap.get(row.product_id) || [];
          list.push({
            id: item.id,
            name: item.name,
            slug: item.slug,
            sort_order: Number(item.sort_order || 0),
            active: Boolean(item.active)
          });
          occMap.set(row.product_id, list);
        });

        products.forEach((product) => {
          product.images = imgMap.get(product.id) || [];
          product.occasions = occMap.get(product.id) || [];
        });
      }

      const occasions = (occasionsRes.data || []).map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        sort_order: Number(row.sort_order || 0),
        active: Boolean(row.active)
      })) as Occasion[];

      const commitments = (commitmentsRes.data || []).map((row: any) => ({
        id: row.id,
        icon_key: row.icon_key,
        title: row.title,
        description: row.description,
        active: Boolean(row.active),
        sort_order: Number(row.sort_order || 0)
      })) as Commitment[];

      const testimonials = (testimonialsRes.data || []).map((row: any) => ({
        id: row.id,
        customer_name: row.customer_name,
        content: row.content,
        image_public_id: row.image_public_id,
        image_url: row.image_url,
        rating: Number(row.rating || 5),
        status: row.status || 'active',
        sort_order: Number(row.sort_order || 0),
        created_at: row.created_at
      })) as Testimonial[];

      const videos = (videosRes.data || []).map((row: any) => ({
        id: row.id,
        provider: row.provider,
        source_url: row.source_url,
        external_id: row.external_id,
        embed_url: row.embed_url,
        thumbnail_url: row.thumbnail_url,
        title: row.title,
        caption: row.caption,
        status: row.status || 'active',
        sort_order: Number(row.sort_order || 0),
        created_at: row.created_at
      })) as Video[];

      const settings: SiteSettings = {
        zalo_config: {
          ...initialSettings.zalo_config,
          ...(settingsMap.zalo_config || {}),
          url: normalizeZaloUrl(settingsMap.zalo_config?.url || process.env.PUBLIC_ZALO_PHONE || initialSettings.zalo_config.url)
        },
        shop_info: {
          ...initialSettings.shop_info,
          ...(settingsMap.shop_info || {})
        },
        hero_config: {
          ...initialSettings.hero_config,
          ...(settingsMap.hero_config || {})
        },
        seo_config: {
          ...initialSettings.seo_config,
          ...(settingsMap.seo_config || {})
        }
      };

      return {
        products,
        occasions,
        commitments,
        testimonials,
        videos,
        settings,
        auditLogs: []
      };
    } catch (error) {
      console.warn('Supabase fallback unavailable:', error);
      return null;
    }
  }

  private async getWorkingData(): Promise<DatabaseSchema> {
    const supabaseData = await this.loadSupabaseData();
    if (supabaseData) return supabaseData;
    return this.data;
  }

  private async writeLocalData(next: DatabaseSchema) {
    this.data = next;
    this.persist();
  }

  public async getPublicProducts(occasionSlug?: string): Promise<Product[]> {
    const data = await this.getWorkingData();
    let list = data.products.filter((p) => p.status === 'published' && !p.deleted_at);
    if (occasionSlug && occasionSlug !== 'all') {
      list = list.filter((p) => p.occasions?.some((o) => o.slug === occasionSlug));
    }
    return list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }

  public async getAllAdminProducts(): Promise<Product[]> {
    const data = await this.getWorkingData();
    return data.products.filter((p) => !p.deleted_at).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }

  public async getProductBySlug(slug: string): Promise<Product | undefined> {
    const data = await this.getWorkingData();
    return data.products.find((p) => p.slug === slug && !p.deleted_at);
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    const data = await this.getWorkingData();
    return data.products.find((p) => p.id === id && !p.deleted_at);
  }

  public async createProduct(item: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const id = `prod-${Date.now()}`;
    const now = new Date().toISOString();
    const newProduct: Product = { ...item, id, created_at: now, updated_at: now };
    const data = await this.getWorkingData();
    data.products.push(newProduct);
    this.writeLocalData(data);
    this.logAudit('CREATE', 'product', id, { name: newProduct.name });
    return newProduct;
  }

  public async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const data = await this.getWorkingData();
    const idx = data.products.findIndex((p) => p.id === id && !p.deleted_at);
    if (idx === -1) return null;

    const updated = { ...data.products[idx], ...updates, updated_at: new Date().toISOString() };
    data.products[idx] = updated;
    await this.writeLocalData(data);
    this.logAudit('UPDATE', 'product', id, updates);
    return updated;
  }

  public async softDeleteProduct(id: string): Promise<boolean> {
    const data = await this.getWorkingData();
    const idx = data.products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    data.products[idx].deleted_at = new Date().toISOString();
    data.products[idx].status = 'hidden';
    await this.writeLocalData(data);
    this.logAudit('DELETE', 'product', id, { deleted_at: data.products[idx].deleted_at });
    return true;
  }

  public async getOccasions(): Promise<Occasion[]> {
    const data = await this.getWorkingData();
    return data.occasions.filter((o) => o.active).sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getAllAdminOccasions(): Promise<Occasion[]> {
    const data = await this.getWorkingData();
    return [...data.occasions].sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getOccasionById(id: string): Promise<Occasion | undefined> {
    const data = await this.getWorkingData();
    return data.occasions.find((o) => o.id === id);
  }

  public async getOccasionBySlug(slug: string): Promise<Occasion | undefined> {
    const data = await this.getWorkingData();
    return data.occasions.find((o) => o.slug === slug);
  }

  public async getOccasionProductCount(slug: string): Promise<number> {
    const data = await this.getWorkingData();
    if (slug === 'all') return data.products.filter((p) => !p.deleted_at).length;
    return data.products.filter((p) => !p.deleted_at && p.occasions?.some((o) => o.slug === slug)).length;
  }

  public async createOccasion(data: Omit<Occasion, 'id'>): Promise<Occasion> {
    const newOccasion: Occasion = {
      id: `occ-${Date.now()}`,
      name: data.name.trim(),
      slug: data.slug.trim(),
      sort_order: Number(data.sort_order) || 0,
      active: data.active ?? true
    };
    const current = await this.getWorkingData();
    current.occasions.push(newOccasion);
    await this.writeLocalData(current);
    this.logAudit('CREATE', 'occasion', newOccasion.id, newOccasion);
    return newOccasion;
  }

  public async updateOccasion(id: string, updates: Partial<Occasion>): Promise<Occasion | null> {
    const current = await this.getWorkingData();
    const idx = current.occasions.findIndex((o) => o.id === id);
    if (idx === -1) return null;

    const oldSlug = current.occasions[idx].slug;
    const newSlug = updates.slug?.trim();

    current.occasions[idx] = {
      ...current.occasions[idx],
      ...updates,
      ...(updates.name && { name: updates.name.trim() }),
      ...(newSlug && { slug: newSlug }),
      ...(typeof updates.sort_order === 'number' && { sort_order: updates.sort_order }),
      ...(typeof updates.active === 'boolean' && { active: updates.active })
    };

    if (newSlug && newSlug !== oldSlug) {
      for (const prod of current.products) {
        if (prod.occasions) {
          for (const o of prod.occasions) {
            if (o.slug === oldSlug || o.id === id) {
              o.slug = newSlug;
              if (updates.name) o.name = updates.name.trim();
            }
          }
        }
      }
    } else if (updates.name) {
      for (const prod of current.products) {
        if (prod.occasions) {
          for (const o of prod.occasions) {
            if (o.id === id || o.slug === current.occasions[idx].slug) {
              o.name = updates.name.trim();
            }
          }
        }
      }
    }

    await this.writeLocalData(current);
    this.logAudit('UPDATE', 'occasion', id, updates);
    return current.occasions[idx];
  }

  public async deleteOccasion(id: string): Promise<{ success: boolean; message?: string }> {
    const current = await this.getWorkingData();
    const occasion = current.occasions.find((o) => o.id === id);
    if (!occasion) {
      return { success: false, message: 'Không tìm thấy dịp tặng' };
    }
    if (occasion.slug === 'all') {
      return { success: false, message: 'Không thể xóa phân loại mặc định (Tất cả)' };
    }

    for (const prod of current.products) {
      if (prod.occasions) {
        prod.occasions = prod.occasions.filter((o) => o.id !== id && o.slug !== occasion.slug);
      }
    }

    current.occasions = current.occasions.filter((o) => o.id !== id);
    await this.writeLocalData(current);
    this.logAudit('DELETE', 'occasion', id, { slug: occasion.slug, name: occasion.name });
    return { success: true };
  }

  public async getCommitments(): Promise<Commitment[]> {
    const data = await this.getWorkingData();
    return data.commitments.filter((c) => c.active).sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getAllAdminCommitments(): Promise<Commitment[]> {
    const data = await this.getWorkingData();
    return [...data.commitments].sort((a, b) => a.sort_order - b.sort_order);
  }

  public async updateCommitment(id: string, updates: Partial<Commitment>): Promise<Commitment | null> {
    const data = await this.getWorkingData();
    const idx = data.commitments.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    data.commitments[idx] = { ...data.commitments[idx], ...updates };
    await this.writeLocalData(data);
    this.logAudit('UPDATE', 'commitment', id, updates);
    return data.commitments[idx];
  }

  public async getPublicTestimonials(): Promise<Testimonial[]> {
    const data = await this.getWorkingData();
    return data.testimonials.filter((t) => t.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getAllAdminTestimonials(): Promise<Testimonial[]> {
    const data = await this.getWorkingData();
    return [...data.testimonials].sort((a, b) => a.sort_order - b.sort_order);
  }

  public async createTestimonial(t: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
    const id = `test-${Date.now()}`;
    const newTest: Testimonial = { ...t, id, created_at: new Date().toISOString() };
    const data = await this.getWorkingData();
    data.testimonials.push(newTest);
    await this.writeLocalData(data);
    this.logAudit('CREATE', 'testimonial', id, t);
    return newTest;
  }

  public async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    const data = await this.getWorkingData();
    const idx = data.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    data.testimonials[idx] = { ...data.testimonials[idx], ...updates };
    await this.writeLocalData(data);
    this.logAudit('UPDATE', 'testimonial', id, updates);
    return data.testimonials[idx];
  }

  public async deleteTestimonial(id: string): Promise<boolean> {
    const data = await this.getWorkingData();
    const idx = data.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    data.testimonials.splice(idx, 1);
    await this.writeLocalData(data);
    this.logAudit('DELETE', 'testimonial', id, {});
    return true;
  }

  public async getPublicVideos(): Promise<Video[]> {
    const data = await this.getWorkingData();
    return data.videos.filter((v) => v.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getAllAdminVideos(): Promise<Video[]> {
    const data = await this.getWorkingData();
    return [...data.videos].sort((a, b) => a.sort_order - b.sort_order);
  }

  public async createVideo(v: Omit<Video, 'id' | 'created_at'>): Promise<Video> {
    const id = `vid-${Date.now()}`;
    const newVid: Video = { ...v, id, created_at: new Date().toISOString() };
    const data = await this.getWorkingData();
    data.videos.push(newVid);
    await this.writeLocalData(data);
    this.logAudit('CREATE', 'video', id, v);
    return newVid;
  }

  public async updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
    const data = await this.getWorkingData();
    const idx = data.videos.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    data.videos[idx] = { ...data.videos[idx], ...updates };
    await this.writeLocalData(data);
    this.logAudit('UPDATE', 'video', id, updates);
    return data.videos[idx];
  }

  public async deleteVideo(id: string): Promise<boolean> {
    const data = await this.getWorkingData();
    const idx = data.videos.findIndex((v) => v.id === id);
    if (idx === -1) return false;
    data.videos.splice(idx, 1);
    await this.writeLocalData(data);
    this.logAudit('DELETE', 'video', id, {});
    return true;
  }

  public async getSettings(): Promise<SiteSettings> {
    const data = await this.getWorkingData();
    const settings = data.settings;
    return {
      ...settings,
      zalo_config: {
        ...settings.zalo_config,
        url: normalizeZaloUrl(settings.zalo_config?.url || process.env.PUBLIC_ZALO_PHONE)
      }
    };
  }

  public async updateSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
    const data = await this.getWorkingData();
    const nextZaloUrl = normalizeZaloUrl(partial.zalo_config?.url || process.env.PUBLIC_ZALO_PHONE || data.settings.zalo_config.url);
    data.settings = {
      ...data.settings,
      ...partial,
      zalo_config: {
        ...data.settings.zalo_config,
        ...(partial.zalo_config || {}),
        url: nextZaloUrl
      },
      shop_info: { ...data.settings.shop_info, ...(partial.shop_info || {}) },
      hero_config: { ...data.settings.hero_config, ...(partial.hero_config || {}) },
      seo_config: { ...data.settings.seo_config, ...(partial.seo_config || {}) }
    };
    await this.writeLocalData(data);
    this.logAudit('UPDATE', 'site_settings', 'global', partial);
    return data.settings;
  }

  public async getAuditLogs(): Promise<AuditLog[]> {
    const data = await this.getWorkingData();
    return [...data.auditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public async logAudit(action: string, entity_type: string, entity_id?: string, payload?: any): Promise<void> {
    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      action,
      entity_type,
      entity_id,
      payload,
      created_at: new Date().toISOString()
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs.pop();
    }
    this.persist();
  }
}

export const db = new DataStore();
