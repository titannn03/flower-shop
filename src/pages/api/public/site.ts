// src/pages/api/public/site.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async () => {
  try {
    const settings = db.getSettings();
    const commitments = db.getCommitments();

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          shop_info: settings.shop_info,
          hero_config: settings.hero_config,
          zalo_config: settings.zalo_config,
          seo_config: settings.seo_config,
          commitments
        }
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
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi lấy cấu hình website' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
