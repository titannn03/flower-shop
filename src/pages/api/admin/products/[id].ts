// src/pages/api/admin/products/[id].ts
import type { APIRoute } from 'astro';
import { db } from '../../../../lib/store/db';
import { validateProduct, slugify } from '../../../../lib/validators/product';

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID sản phẩm' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));

    // If name is updated and slug is provided, normalize slug
    if (body.slug) {
      body.slug = slugify(body.slug);
    }

    // Number conversions
    if (body.price !== undefined) body.price = Number(body.price);
    if (body.compare_at_price !== undefined && body.compare_at_price !== null && body.compare_at_price !== '') {
      body.compare_at_price = Number(body.compare_at_price);
    } else if (body.compare_at_price === '') {
      body.compare_at_price = null;
    }
    if (body.sort_order !== undefined) body.sort_order = Number(body.sort_order);

    // Validate partial
    const existing = await db.getProductById(id);
    if (!existing) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy sản phẩm' } }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const merged = { ...existing, ...body };
    const validation = validateProduct(merged);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'VALIDATION_FAILED',
            message: 'Dữ liệu cập nhật không hợp lệ',
            fields: validation.errors
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updated = await db.updateProduct(id, body);

    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi cập nhật sản phẩm' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID sản phẩm' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Soft delete according to Section 8.2 & BR-01
    const success = await db.softDeleteProduct(id);
    if (!success) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy sản phẩm cần xóa' } }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Đã xóa sản phẩm thành công (soft delete lưu trữ lịch sử)'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi xóa sản phẩm' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID sản phẩm' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const product = await db.getProductById(id);
    if (!product) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy sản phẩm' } }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: product }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy thông tin sản phẩm' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
