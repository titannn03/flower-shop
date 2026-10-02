// src/pages/api/admin/testimonials.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async () => {
  try {
    const list = await db.getAllAdminTestimonials();
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
    const { customer_name, content, image_url, rating = 5, status = 'active', sort_order = 0 } = body;

    if (!customer_name || !content) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Tên khách hàng và nội dung đánh giá là bắt buộc' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const created = await db.createTestimonial({
      customer_name,
      content,
      image_url: image_url || '',
      rating: Number(rating) || 5,
      status: status === 'inactive' ? 'inactive' : 'active',
      sort_order: Number(sort_order) || 0
    });

    return new Response(
      JSON.stringify({ success: true, data: created }),
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
    const { id, ...updates } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID đánh giá' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updated = await db.updateTestimonial(id, updates);
    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID đánh giá' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await db.deleteTestimonial(id);
    return new Response(
      JSON.stringify({ success: true, message: 'Đã xóa đánh giá thành công' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
