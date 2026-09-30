// src/lib/store/db.ts
import fs from 'node:fs';
import path from 'node:path';
import type { 
  Product, 
  Occasion, 
  Video, 
  Testimonial, 
  Commitment, 
  SiteSettings, 
  AuditLog 
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

const DATA_FILE = path.resolve(process.cwd(), 'data-store.json');

class DataStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read data-store.json, initializing from defaults:', e);
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
    try {
      const d = dataToSave || this.data;
      fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write data-store.json:', e);
    }
  }

  // --- PRODUCTS ---
  public getPublicProducts(occasionSlug?: string): Product[] {
    let list = this.data.products.filter(p => p.status === 'published' && !p.deleted_at);
    
    if (occasionSlug && occasionSlug !== 'all') {
      list = list.filter(p => p.occasions?.some(o => o.slug === occasionSlug));
    }

    return list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }

  public getAllAdminProducts(): Product[] {
    return this.data.products
      .filter(p => !p.deleted_at)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find(p => p.slug === slug && !p.deleted_at);
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id && !p.deleted_at);
  }

  public createProduct(item: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Product {
    const id = `prod-${Date.now()}`;
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...item,
      id,
      created_at: now,
      updated_at: now
    };
    this.data.products.push(newProduct);
    this.persist();
    this.logAudit('CREATE', 'product', id, { name: newProduct.name });
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id && !p.deleted_at);
    if (idx === -1) return null;

    const updated = {
      ...this.data.products[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.data.products[idx] = updated;
    this.persist();
    this.logAudit('UPDATE', 'product', id, updates);
    return updated;
  }

  public softDeleteProduct(id: string): boolean {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.data.products[idx].deleted_at = new Date().toISOString();
    this.data.products[idx].status = 'hidden';
    this.persist();
    this.logAudit('DELETE', 'product', id, { deleted_at: this.data.products[idx].deleted_at });
    return true;
  }

  // --- OCCASIONS ---
  public getOccasions(): Occasion[] {
    return this.data.occasions.filter(o => o.active).sort((a, b) => a.sort_order - b.sort_order);
  }

  public getAllAdminOccasions(): Occasion[] {
    return [...this.data.occasions].sort((a, b) => a.sort_order - b.sort_order);
  }

  public getOccasionById(id: string): Occasion | undefined {
    return this.data.occasions.find(o => o.id === id);
  }

  public getOccasionBySlug(slug: string): Occasion | undefined {
    return this.data.occasions.find(o => o.slug === slug);
  }

  public getOccasionProductCount(slug: string): number {
    if (slug === 'all') {
      return this.data.products.filter(p => !p.deleted_at).length;
    }
    return this.data.products.filter(p => !p.deleted_at && p.occasions?.some(o => o.slug === slug)).length;
  }

  public createOccasion(data: Omit<Occasion, 'id'>): Occasion {
    const newOccasion: Occasion = {
      id: `occ-${Date.now()}`,
      name: data.name.trim(),
      slug: data.slug.trim(),
      sort_order: Number(data.sort_order) || 0,
      active: data.active ?? true
    };
    this.data.occasions.push(newOccasion);
    this.persist();
    this.logAudit('CREATE', 'occasion', newOccasion.id, newOccasion);
    return newOccasion;
  }

  public updateOccasion(id: string, updates: Partial<Occasion>): Occasion | null {
    const idx = this.data.occasions.findIndex(o => o.id === id);
    if (idx === -1) return null;

    const oldSlug = this.data.occasions[idx].slug;
    const newSlug = updates.slug?.trim();

    this.data.occasions[idx] = { 
      ...this.data.occasions[idx], 
      ...updates,
      ...(updates.name && { name: updates.name.trim() }),
      ...(newSlug && { slug: newSlug }),
      ...(typeof updates.sort_order === 'number' && { sort_order: updates.sort_order }),
      ...(typeof updates.active === 'boolean' && { active: updates.active })
    };

    // If slug or name updated, sync products that contain this occasion
    if (newSlug && newSlug !== oldSlug) {
      for (const prod of this.data.products) {
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
      for (const prod of this.data.products) {
        if (prod.occasions) {
          for (const o of prod.occasions) {
            if (o.id === id || o.slug === this.data.occasions[idx].slug) {
              o.name = updates.name.trim();
            }
          }
        }
      }
    }

    this.persist();
    this.logAudit('UPDATE', 'occasion', id, updates);
    return this.data.occasions[idx];
  }

  public deleteOccasion(id: string): { success: boolean; message?: string } {
    const occasion = this.data.occasions.find(o => o.id === id);
    if (!occasion) {
      return { success: false, message: 'Không tìm thấy dịp tặng' };
    }
    if (occasion.slug === 'all') {
      return { success: false, message: 'Không thể xóa phân loại mặc định (Tất cả)' };
    }

    // Remove occasion from products
    for (const prod of this.data.products) {
      if (prod.occasions) {
        prod.occasions = prod.occasions.filter(o => o.id !== id && o.slug !== occasion.slug);
      }
    }

    this.data.occasions = this.data.occasions.filter(o => o.id !== id);
    this.persist();
    this.logAudit('DELETE', 'occasion', id, { slug: occasion.slug, name: occasion.name });
    return { success: true };
  }

  // --- COMMITMENTS ---
  public getCommitments(): Commitment[] {
    return this.data.commitments.filter(c => c.active).sort((a, b) => a.sort_order - b.sort_order);
  }

  public getAllAdminCommitments(): Commitment[] {
    return [...this.data.commitments].sort((a, b) => a.sort_order - b.sort_order);
  }

  public updateCommitment(id: string, updates: Partial<Commitment>): Commitment | null {
    const idx = this.data.commitments.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.commitments[idx] = { ...this.data.commitments[idx], ...updates };
    this.persist();
    this.logAudit('UPDATE', 'commitment', id, updates);
    return this.data.commitments[idx];
  }

  // --- TESTIMONIALS ---
  public getPublicTestimonials(): Testimonial[] {
    return this.data.testimonials.filter(t => t.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  }

  public getAllAdminTestimonials(): Testimonial[] {
    return [...this.data.testimonials].sort((a, b) => a.sort_order - b.sort_order);
  }

  public createTestimonial(t: Omit<Testimonial, 'id' | 'created_at'>): Testimonial {
    const id = `test-${Date.now()}`;
    const newTest: Testimonial = { ...t, id, created_at: new Date().toISOString() };
    this.data.testimonials.push(newTest);
    this.persist();
    this.logAudit('CREATE', 'testimonial', id, t);
    return newTest;
  }

  public updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const idx = this.data.testimonials.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.data.testimonials[idx] = { ...this.data.testimonials[idx], ...updates };
    this.persist();
    this.logAudit('UPDATE', 'testimonial', id, updates);
    return this.data.testimonials[idx];
  }

  public deleteTestimonial(id: string): boolean {
    const idx = this.data.testimonials.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.data.testimonials.splice(idx, 1);
    this.persist();
    this.logAudit('DELETE', 'testimonial', id, {});
    return true;
  }

  // --- VIDEOS ---
  public getPublicVideos(): Video[] {
    return this.data.videos.filter(v => v.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  }

  public getAllAdminVideos(): Video[] {
    return [...this.data.videos].sort((a, b) => a.sort_order - b.sort_order);
  }

  public createVideo(v: Omit<Video, 'id' | 'created_at'>): Video {
    const id = `vid-${Date.now()}`;
    const newVid: Video = { ...v, id, created_at: new Date().toISOString() };
    this.data.videos.push(newVid);
    this.persist();
    this.logAudit('CREATE', 'video', id, v);
    return newVid;
  }

  public updateVideo(id: string, updates: Partial<Video>): Video | null {
    const idx = this.data.videos.findIndex(v => v.id === id);
    if (idx === -1) return null;
    this.data.videos[idx] = { ...this.data.videos[idx], ...updates };
    this.persist();
    this.logAudit('UPDATE', 'video', id, updates);
    return this.data.videos[idx];
  }

  public deleteVideo(id: string): boolean {
    const idx = this.data.videos.findIndex(v => v.id === id);
    if (idx === -1) return false;
    this.data.videos.splice(idx, 1);
    this.persist();
    this.logAudit('DELETE', 'video', id, {});
    return true;
  }

  // --- SETTINGS ---
  public getSettings(): SiteSettings {
    return this.data.settings;
  }

  public updateSettings(partial: Partial<SiteSettings>): SiteSettings {
    this.data.settings = {
      ...this.data.settings,
      ...partial,
      zalo_config: { ...this.data.settings.zalo_config, ...(partial.zalo_config || {}) },
      shop_info: { ...this.data.settings.shop_info, ...(partial.shop_info || {}) },
      hero_config: { ...this.data.settings.hero_config, ...(partial.hero_config || {}) },
      seo_config: { ...this.data.settings.seo_config, ...(partial.seo_config || {}) }
    };
    this.persist();
    this.logAudit('UPDATE', 'site_settings', 'global', partial);
    return this.data.settings;
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLog[] {
    return [...this.data.auditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public logAudit(action: string, entity_type: string, entity_id?: string, payload?: any) {
    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      action,
      entity_type,
      entity_id,
      payload,
      created_at: new Date().toISOString()
    };
    this.data.auditLogs.unshift(log);
    // Keep max 200 logs
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs.pop();
    }
    this.persist();
  }
}

// Singleton instance
export const db = new DataStore();
