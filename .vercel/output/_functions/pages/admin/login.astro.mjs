import { e as createComponent, l as renderHead, n as renderScript, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const cookieHeader = Astro2.request.headers.get("cookie") || "";
  if (cookieHeader.includes("flower_admin_session=")) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Đăng nhập Quản trị | Flower Shop</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body class="bg-neutral-100 text-neutral-800 antialiased min-h-screen flex items-center justify-center p-4"> <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-neutral-200"> <!-- Brand Logo --> <div class="text-center space-y-2 mb-8"> <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-2xl font-serif font-bold shadow-md">
F
</div> <h1 class="text-2xl font-serif font-bold text-neutral-900">Quản Trị Flower Shop</h1> <p class="text-xs sm:text-sm text-neutral-500">Đăng nhập để quản lý sản phẩm, video và cấu hình</p> </div> <!-- Alert Box --> <div id="login-alert" class="hidden mb-6 p-4 rounded-2xl text-xs sm:text-sm font-medium border" role="alert"> <!-- Message populated by JS --> </div> <!-- Login Form --> <form id="login-form" class="space-y-5"> <div> <label for="username" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
Tài khoản hoặc Email
</label> <input type="text" id="username" name="username" required autocomplete="username" value="admin" class="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all" placeholder="admin@flowervibes.vn"> </div> <div> <label for="password" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
Mật khẩu
</label> <input type="password" id="password" name="password" required autocomplete="current-password" value="FlowerAdmin@2026" class="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all" placeholder="••••••••••••"> </div> <button type="submit" id="submit-btn" class="w-full btn-pill-primary py-3 text-sm font-semibold tracking-wide justify-center shadow-lg"> <span>Đăng nhập hệ thống</span> </button> </form> <!-- Demo Credentials Helper Note --> <div class="mt-8 pt-6 border-t border-neutral-200 bg-neutral-50 -mx-8 -mb-10 px-8 py-5 rounded-b-3xl text-xs text-neutral-500 space-y-1"> <p class="font-bold text-neutral-700">Thông tin đăng nhập mặc định:</p> <p>• Tài khoản: <code class="bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-primary font-mono">admin</code></p> <p>• Mật khẩu: <code class="bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-primary font-mono">FlowerAdmin@2026</code></p> <p class="text-[11px] text-neutral-400 mt-2">Hệ thống kích hoạt rate-limit & khóa tạm thời 60s nếu nhập sai 5 lần.</p> </div> </div> ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/T03/flower-shop/src/pages/admin/login.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
