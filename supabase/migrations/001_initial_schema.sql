-- 001_initial_schema.sql
-- Schema cho Flower Shop Website (Landing Page + Admin Dashboard)
-- Dùng để dán trực tiếp vào Supabase SQL editor

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1) Profiles mở rộng từ auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2) Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 150),
    slug TEXT NOT NULL UNIQUE,
    sku TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC CHECK (compare_at_price IS NULL OR compare_at_price >= price),
    short_description TEXT CHECK (char_length(short_description) <= 250),
    description TEXT,
    flower_components TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'hidden')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    deleted_at TIMESTAMPTZ
);

-- 3) Product images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT,
    secure_url TEXT NOT NULL,
    alt_text TEXT,
    width INTEGER,
    height INTEGER,
    bytes INTEGER,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (product_id, secure_url)
);

-- 4) Occasions
CREATE TABLE IF NOT EXISTS public.occasions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
);

-- 5) Product occasions (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_occasions (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    occasion_id UUID NOT NULL REFERENCES public.occasions(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, occasion_id)
);

-- 6) Videos (YouTube / TikTok)
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL CHECK (provider IN ('youtube', 'tiktok')),
    source_url TEXT NOT NULL UNIQUE,
    external_id TEXT,
    embed_url TEXT,
    thumbnail_url TEXT,
    title TEXT,
    caption TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7) Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    content TEXT NOT NULL,
    image_public_id TEXT,
    image_url TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (customer_name, content)
);

-- 8) Commitments
CREATE TABLE IF NOT EXISTS public.commitments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon_key TEXT NOT NULL,
    title TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 9) Site settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES public.profiles(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10) Audit logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    payload JSONB,
    ip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes để tăng tốc truy vấn
CREATE INDEX IF NOT EXISTS idx_products_status_sort
    ON public.products(status, sort_order) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_products_featured
    ON public.products(featured) WHERE status = 'published' AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_product_images_product_id
    ON public.product_images(product_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_videos_status_sort
    ON public.videos(status, sort_order);

CREATE INDEX IF NOT EXISTS idx_testimonials_status_sort
    ON public.testimonials(status, sort_order);

COMMIT;
