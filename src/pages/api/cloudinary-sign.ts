// src/pages/api/cloudinary-sign.ts
import type { APIRoute } from 'astro';
import { generateUploadSignature } from '../../lib/cloudinary/sign';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const folder = body.folder || 'flower-shop';

    const signatureData = generateUploadSignature(folder);

    if (!signatureData) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'CONFIG_MISSING',
            message: 'Cloudinary credentials are not configured in environment variables.'
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: signatureData
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi cấp chữ ký upload' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
