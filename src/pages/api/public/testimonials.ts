// src/pages/api/public/testimonials.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async () => {
  try {
    const testimonials = db.getPublicTestimonials();

    return new Response(
      JSON.stringify({
        success: true,
        data: testimonials,
        meta: { total: testimonials.length }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy danh sách đánh giá' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
