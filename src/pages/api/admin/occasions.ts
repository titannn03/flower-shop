// src/pages/api/admin/occasions.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

// Helper to slugify Vietnamese string if slug not explicitly provided
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const GET: APIRoute = async () => {
  try {
    const list = db.getAllAdminOccasions().map(occ => ({
      ...occ,
      product_count: db.getOccasionProductCount(occ.slug)
    }));

    return new Response(
      JSON.stringify({ success: true, data: list }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    let { name, slug, sort_order = 0, active = true } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Tên phân loại loại Sản phẩm là bắt buộc' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    slug = slug ? slug.trim() : slugify(name);
    if (!slug) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Slug không hợp lệ' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existing = db.getOccasionBySlug(slug);
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'CONFLICT', message: `Mã định danh (Slug) "${slug}" đã tồn tại. Vui lòng chọn slug khác.` } }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const created = db.createOccasion({
      name: name.trim(),
      slug,
      sort_order: Number(sort_order) || 0,
      active: Boolean(active)
    });

    return new Response(
      JSON.stringify({ success: true, data: created, message: 'Thêm phân loại loại Sản phẩm thành công' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, name, slug, sort_order, active } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID phân loại loại Sản phẩm' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existing = db.getOccasionById(id);
    if (!existing) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy phân loại loại Sản phẩm' } }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If changing slug, check uniqueness
    if (slug && slug.trim() !== existing.slug) {
      const slugOccupied = db.getOccasionBySlug(slug.trim());
      if (slugOccupied && slugOccupied.id !== id) {
        return new Response(
          JSON.stringify({ success: false, error: { code: 'CONFLICT', message: `Mã định danh (Slug) "${slug}" đã tồn tại.` } }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (slug !== undefined) updates.slug = slug.trim();
    if (sort_order !== undefined) updates.sort_order = Number(sort_order) || 0;
    if (active !== undefined) updates.active = Boolean(active);

    const updated = db.updateOccasion(id, updates);

    return new Response(
      JSON.stringify({ success: true, data: updated, message: 'Cập nhật phân loại loại Sản phẩm thành công' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    let id = url.searchParams.get('id');
    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID phân loại loại Sản phẩm' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = db.deleteOccasion(id);
    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'FORBIDDEN', message: result.message || 'Không thể xóa phân loại này' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Xóa phân loại loại Sản phẩm thành công' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
