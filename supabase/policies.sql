-- policies.sql
-- Row Level Security (RLS) Policies conforming to Section D.5

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
CREATE POLICY "Profiles read by admin or self" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "Profiles update by admin or self" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- 2. PRODUCTS POLICIES
-- Public can read published and non-deleted products
CREATE POLICY "Public read published products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND deleted_at IS NULL);

-- Admins can do everything with products
CREATE POLICY "Admins full access products" ON public.products
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 3. PRODUCT IMAGES POLICIES
CREATE POLICY "Public read product images" ON public.product_images
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND p.status = 'published'
        AND p.deleted_at IS NULL
    )
  );

CREATE POLICY "Admins full access product images" ON public.product_images
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 4. OCCASIONS & PRODUCT_OCCASIONS
CREATE POLICY "Public read active occasions" ON public.occasions
  FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins full access occasions" ON public.occasions
  FOR ALL TO authenticated
  USING (public.is_admin());

CREATE POLICY "Public read product occasions" ON public.product_occasions
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins full access product occasions" ON public.product_occasions
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 5. VIDEOS
CREATE POLICY "Public read active videos" ON public.videos
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Admins full access videos" ON public.videos
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 6. TESTIMONIALS
CREATE POLICY "Public read active testimonials" ON public.testimonials
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Admins full access testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 7. COMMITMENTS
CREATE POLICY "Public read active commitments" ON public.commitments
  FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins full access commitments" ON public.commitments
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 8. SITE SETTINGS
-- Allow reading public settings like hero, contact, zalo_url, seo
CREATE POLICY "Public read settings" ON public.site_settings
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins full access settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 9. AUDIT LOGS
CREATE POLICY "Admins full access audit logs" ON public.audit_logs
  FOR ALL TO authenticated
  USING (public.is_admin());
