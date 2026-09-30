// src/pages/api/public/products/[slug].ts
import type { APIRoute } from 'astro';
import { db } from '../../../../lib/store/db';

export const GET: APIRoute = async ({ params }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'BAD_REQUEST', message: 'Slug không hợp lệ' }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const product = db.getProductBySlug(slug);
    if (!product || product.status !== 'published') {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Không tìm thấy sản phẩm' }
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: product
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy chi tiết sản phẩm' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
