// src/pages/api/public/products.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const occasion = url.searchParams.get('occasion') || undefined;

    const products = db.getPublicProducts(occasion);

    return new Response(
      JSON.stringify({
        success: true,
        data: products,
        meta: { total: products.length }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy danh sách sản phẩm' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
