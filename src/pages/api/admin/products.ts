// src/pages/api/admin/products.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';
import { validateProduct, slugify } from '../../../lib/validators/product';

// GET: All products for admin (including drafts and hidden)
export const GET: APIRoute = async () => {
  try {
    const products = await db.getAllAdminProducts();
    return new Response(
      JSON.stringify({
        success: true,
        data: products,
        meta: { total: products.length }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy danh sách sản phẩm admin' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST: Create a new product
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Auto-generate slug if empty
    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    } else if (body.slug) {
      body.slug = slugify(body.slug);
    }

    // Parse numbers
    if (body.price !== undefined) body.price = Number(body.price);
    if (body.compare_at_price !== undefined && body.compare_at_price !== null && body.compare_at_price !== '') {
      body.compare_at_price = Number(body.compare_at_price);
    } else {
      body.compare_at_price = null;
    }
    if (body.sort_order !== undefined) body.sort_order = Number(body.sort_order);

    // Validate
    const validation = validateProduct(body);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'VALIDATION_FAILED',
            message: 'Dữ liệu sản phẩm không hợp lệ',
            fields: validation.errors
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check slug uniqueness
    const existing = await db.getProductBySlug(body.slug);
    if (existing) {
      body.slug = `${body.slug}-${Date.now().toString().slice(-4)}`;
    }

    const created = await db.createProduct({
      name: body.name,
      slug: body.slug,
      sku: body.sku || '',
      price: body.price,
      compare_at_price: body.compare_at_price,
      short_description: body.short_description || '',
      description: body.description || '',
      flower_components: body.flower_components || '',
      featured: Boolean(body.featured),
      status: body.status || 'published',
      sort_order: body.sort_order || 0,
      images: body.images || [],
      occasions: body.occasions || []
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: created
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi thêm mới sản phẩm' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
