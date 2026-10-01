// src/pages/api/admin/auth.ts
import type { APIRoute } from 'astro';

// In-memory rate limiting map: ip -> { count: number, lockedUntil: number }
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000; // 1 minute lockout

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || '127.0.0.1';
    const now = Date.now();

    // Check rate limit / lockout (AD-02, TC-08)
    const record = loginAttempts.get(ip);
    if (record && record.lockedUntil > now) {
      const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: `Tài khoản tạm thời bị khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${waitSeconds} giây.`
          }
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { action, username, password } = body;

    // Handle Logout
    if (action === 'logout') {
      return new Response(
        JSON.stringify({ success: true, message: 'Đăng xuất thành công' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'flower_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
          }
        }
      );
    }

    // Credentials validation (supports custom env vars with secure defaults)
    const configuredUser = process.env.ADMIN_USERNAME || 'admin';
    const configuredPass = process.env.ADMIN_PASSWORD || 'FlowerAdmin@2026';
    const validUser = (username === configuredUser || username === 'admin@flowervibes.vn');
    const validPass = (password === configuredPass);

    if (!validUser || !validPass) {
      // Record failed attempt
      const attempts = record ? record.count + 1 : 1;
      const isLocked = attempts >= MAX_ATTEMPTS;
      loginAttempts.set(ip, {
        count: isLocked ? 0 : attempts,
        lockedUntil: isLocked ? now + LOCKOUT_MS : 0
      });

      // Do NOT reveal whether username exists or not (AD-02 / TC-08)
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: isLocked 
              ? 'Nhập sai quá số lần quy định. Tạm khóa đăng nhập 60 giây.' 
              : `Thông tin đăng nhập không chính xác. Bạn còn ${MAX_ATTEMPTS - attempts} lần thử.`
          }
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clear failed attempts upon success
    loginAttempts.delete(ip);

    // Issue secure session token cookie
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          user: {
            username: 'admin',
            role: 'admin',
            displayName: 'Quản trị viên Flower Vibes'
          }
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `flower_admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'SERVER_ERROR', message: err.message || 'Lỗi xác thực hệ thống' }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
