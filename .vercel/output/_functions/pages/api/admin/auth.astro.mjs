export { renderers } from '../../../renderers.mjs';

const loginAttempts = /* @__PURE__ */ new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1e3;
const POST = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || "127.0.0.1";
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (record && record.lockedUntil > now) {
      const waitSeconds = Math.ceil((record.lockedUntil - now) / 1e3);
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: `Tài khoản tạm thời bị khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${waitSeconds} giây.`
          }
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    const body = await request.json().catch(() => ({}));
    const { action, username, password } = body;
    if (action === "logout") {
      return new Response(
        JSON.stringify({ success: true, message: "Đăng xuất thành công" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": "flower_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
          }
        }
      );
    }
    const validUser = username === "admin" || username === "admin@flowervibes.vn";
    const validPass = password === "FlowerAdmin@2026";
    if (!validUser || !validPass) {
      const attempts = record ? record.count + 1 : 1;
      const isLocked = attempts >= MAX_ATTEMPTS;
      loginAttempts.set(ip, {
        count: isLocked ? 0 : attempts,
        lockedUntil: isLocked ? now + LOCKOUT_MS : 0
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: isLocked ? "Nhập sai quá số lần quy định. Tạm khóa đăng nhập 60 giây." : `Thông tin đăng nhập không chính xác. Bạn còn ${MAX_ATTEMPTS - attempts} lần thử.`
          }
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    loginAttempts.delete(ip);
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          user: {
            username: "admin",
            role: "admin",
            displayName: "Quản trị viên Flower Vibes"
          }
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `flower_admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi xác thực hệ thống" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
