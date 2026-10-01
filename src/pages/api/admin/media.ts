// src/pages/api/admin/media.ts
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB (Section D.7 & TC-09)
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: { code: 'BAD_REQUEST', message: 'Vui lòng chọn file ảnh để tải lên' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. File size check (5MB limit - Section D.7)
    if (file.size > MAX_BYTES) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'FILE_TOO_LARGE',
            message: `Kích thước file ảnh vượt quá giới hạn 5MB (${(file.size / 1024 / 1024).toFixed(2)} MB)`
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. MIME type check (Section 13 & TC-09)
    if (!ALLOWED_MIME.includes(file.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_MIME_TYPE',
            message: 'Chỉ chấp nhận file ảnh định dạng JPEG, PNG hoặc WebP'
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Generate safe unique file name on server (BR-06)
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const filename = `flower_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Strategy 1: Direct Cloudinary Upload if credentials are configured
    const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const paramsToSign = `folder=flower-shop&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

        const cFormData = new FormData();
        cFormData.append('file', new Blob([buffer], { type: file.type }), filename);
        cFormData.append('api_key', apiKey);
        cFormData.append('timestamp', String(timestamp));
        cFormData.append('signature', signature);
        cFormData.append('folder', 'flower-shop');

        const cRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: cFormData
        });

        const cData = await cRes.json();
        if (cRes.ok && cData.secure_url) {
          return new Response(
            JSON.stringify({
              success: true,
              data: {
                public_id: cData.public_id || filename,
                secure_url: cData.secure_url,
                width: cData.width || 1200,
                height: cData.height || 1200,
                bytes: cData.bytes || file.size,
                format: cData.format || ext
              }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (cloudErr) {
        console.warn('Cloudinary upload warning, falling back to local/dataURL:', cloudErr);
      }
    }

    // Strategy 2: Local filesystem (for local development or writable container)
    try {
      const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            public_id: filename,
            secure_url: `/uploads/${filename}`,
            width: 1200,
            height: 1200,
            bytes: file.size,
            format: ext
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch {
      // Strategy 3: Serverless Lambda read-only filesystem fallback (Base64 Data URL)
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            public_id: filename,
            secure_url: dataUrl,
            width: 1200,
            height: 1200,
            bytes: file.size,
            format: ext
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi tải lên ảnh' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
