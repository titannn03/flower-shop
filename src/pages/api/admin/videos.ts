// src/pages/api/admin/videos.ts
import type { APIRoute } from 'astro';
import { db } from '../../../lib/store/db';
import type { VideoProvider } from '../../../types';

export function parseVideoUrl(url: string): { provider: VideoProvider; externalId: string; embedUrl: string; thumbnailUrl: string } | null {
  try {
    const trimmed = url.trim();

    // 1. YouTube Detection
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      const id = ytMatch[1];
      return {
        provider: 'youtube',
        externalId: id,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      };
    }

    // 2. TikTok Detection
    const ttMatch = trimmed.match(/tiktok\.com\/(?:@[\w.-]+\/video\/|v\/)(\d+)/);
    if (ttMatch && ttMatch[1]) {
      const id = ttMatch[1];
      return {
        provider: 'tiktok',
        externalId: id,
        embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
      };
    }

    // Fallback if provider can't be parsed but is YouTube or TikTok
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      return {
        provider: 'youtube',
        externalId: 'custom',
        embedUrl: trimmed,
        thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
      };
    }

    return null;
  } catch (e) {
    return null;
  }
}

export const GET: APIRoute = async () => {
  try {
    const videos = await db.getAllAdminVideos();
    return new Response(
      JSON.stringify({ success: true, data: videos }),
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
    const { source_url, title, caption, status = 'active', sort_order = 0 } = body;

    if (!source_url) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Vui lòng cung cấp link video YouTube hoặc TikTok' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const parsed = parseVideoUrl(source_url);
    if (!parsed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_VIDEO_URL',
            message: 'Đường dẫn video không đúng định dạng YouTube hoặc TikTok được hỗ trợ'
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const video = await db.createVideo({
      provider: parsed.provider,
      source_url,
      external_id: parsed.externalId,
      embed_url: parsed.embedUrl,
      thumbnail_url: body.thumbnail_url || parsed.thumbnailUrl,
      title: title || 'Video Mẫu Hoa Tươi',
      caption: caption || '',
      status: status === 'inactive' ? 'inactive' : 'active',
      sort_order: Number(sort_order) || 0
    });

    return new Response(
      JSON.stringify({ success: true, data: video }),
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
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID video' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (updates.source_url) {
      const parsed = parseVideoUrl(updates.source_url);
      if (parsed) {
        updates.provider = parsed.provider;
        updates.external_id = parsed.externalId;
        updates.embed_url = parsed.embedUrl;
        if (!updates.thumbnail_url) {
          updates.thumbnail_url = parsed.thumbnailUrl;
        }
      }
    }

    const updated = await db.updateVideo(id, updates);
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
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Thiếu ID video' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await db.deleteVideo(id);
    return new Response(
      JSON.stringify({ success: true, message: 'Đã xóa video thành công' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
