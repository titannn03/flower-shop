// src/pages/api/admin/settings.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';

export const GET: APIRoute = async () => {
  try {
    const settings = db.getSettings();
    const commitments = db.getAllAdminCommitments();
    const auditLogs = db.getAuditLogs();

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          settings,
          commitments,
          auditLogs: auditLogs.slice(0, 50)
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
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
    const { zalo_config, shop_info, hero_config, seo_config, commitments } = body;

    // Validate Zalo URL (Section 10.1: must start with https:// and valid domain/scheme)
    if (zalo_config && zalo_config.url) {
      const url = zalo_config.url.trim();
      if (!url.startsWith('https://')) {
        return new Response(
          JSON.stringify({
            success: false,
            error: {
              code: 'INVALID_ZALO_URL',
              message: 'Link Zalo phải sử dụng giao thức bảo mật https:// (ví dụ: https://zalo.me/...)'
            }
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Update settings
    const updated = db.updateSettings({
      ...(zalo_config && { zalo_config }),
      ...(shop_info && { shop_info }),
      ...(hero_config && { hero_config }),
      ...(seo_config && { seo_config })
    });

    // Update commitments if provided
    if (Array.isArray(commitments)) {
      for (const com of commitments) {
        if (com.id) {
          db.updateCommitment(com.id, com);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: updated,
        message: 'Cập nhật cấu hình website thành công'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
