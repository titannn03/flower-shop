// src/types/index.ts
// Type definitions for Flower Shop Website & Admin

export type ProductStatus = 'draft' | 'published' | 'hidden';

export interface ProductImage {
  id: string;
  product_id?: string;
  cloudinary_public_id?: string;
  secure_url: string;
  alt_text?: string;
  width?: number;
  height?: number;
  bytes?: number;
  is_cover: boolean;
  sort_order: number;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  compare_at_price?: number | null;
  short_description?: string;
  description?: string;
  flower_components?: string;
  featured: boolean;
  status: ProductStatus;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  images?: ProductImage[];
  occasions?: Occasion[];
}

export type VideoProvider = 'youtube' | 'tiktok';

export interface Video {
  id: string;
  provider: VideoProvider;
  source_url: string;
  external_id?: string;
  embed_url?: string;
  thumbnail_url?: string;
  title?: string;
  caption?: string;
  status: 'active' | 'inactive';
  sort_order: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  content: string;
  image_public_id?: string;
  image_url?: string;
  rating: number;
  status: 'active' | 'inactive';
  sort_order: number;
  created_at?: string;
}

export interface Commitment {
  id: string;
  icon_key: string;
  title: string;
  description: string;
  active: boolean;
  sort_order: number;
}

export interface ZaloConfig {
  url: string;
  hotline: string;
  zalo_oa_id?: string;
}

export interface ShopInfo {
  name: string;
  slogan: string;
  address: string;
  hotline: string;
  email: string;
  opening_hours: string;
  copyright: string;
}

export interface HeroConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta_label: string;
  cta_secondary_label: string;
}

export interface SEOConfig {
  meta_title: string;
  meta_description: string;
  og_image: string;
  canonical_domain: string;
  robots: string;
}

export interface SiteSettings {
  zalo_config: ZaloConfig;
  shop_info: ShopInfo;
  hero_config: HeroConfig;
  seo_config: SEOConfig;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  payload?: any;
  created_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  meta?: any;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}
