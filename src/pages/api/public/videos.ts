// src/pages/api/public/videos.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async () => {
  try {
    const videos = await db.getPublicVideos();

    return new Response(
      JSON.stringify({
        success: true,
        data: videos,
        meta: { total: videos.length }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy danh sách video' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
