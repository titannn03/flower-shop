// src/pages/api/admin/media.ts
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

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
    
    // Save to public/uploads directory
    const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const secureUrl = `/uploads/${filename}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          public_id: filename,
          secure_url: secureUrl,
          width: 1200,
          height: 1200,
          bytes: file.size,
          format: ext
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi tải lên ảnh' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
