import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, n as renderScript, h as createAstro, l as renderHead, k as renderComponent, o as renderSlot } from './astro/server_CowMa-oF.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$Astro$1 = createAstro();
const $$AdminNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdminNav;
  const { currentPath = "/admin" } = Astro2.props;
  const navItems = [
    { href: "/admin", label: "T\u1ED5ng quan", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "/admin/products", label: "Qu\u1EA3n l\xFD S\u1EA3n ph\u1EA9m", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { href: "/admin/videos", label: "Qu\u1EA3n l\xFD Video", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { href: "/admin/testimonials", label: "\u0110\xE1nh gi\xE1 kh\xE1ch h\xE0ng", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
    { href: "/admin/settings", label: "C\u1EA5u h\xECnh C\u1EEDa h\xE0ng & Zalo", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="w-64 bg-neutral-900 text-neutral-300 min-h-screen flex flex-col justify-between p-4 flex-shrink-0 border-r border-neutral-800 hidden md:flex"> <div> <!-- Brand --> <div class="px-3 py-4 flex items-center gap-3 border-b border-neutral-800"> <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg">
F
</div> <div> <span class="block text-base font-serif font-bold text-white leading-tight">Flower Shop</span> <span class="text-xs text-primary font-medium">Admin Dashboard</span> </div> </div> <!-- Navigation links --> <nav class="mt-6 space-y-1"> ${navItems.map((item) => {
    const isActive = currentPath === item.href || item.href !== "/admin" && currentPath.startsWith(item.href);
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary text-white shadow-sm" : "hover:bg-neutral-800 hover:text-white text-neutral-400"}`, "class")}> <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"${addAttribute(item.icon, "d")}></path> </svg> <span>${item.label}</span> </a>`;
  })} </nav> </div> <!-- Bottom actions --> <div class="pt-4 border-t border-neutral-800 space-y-2"> <a href="/" target="_blank" class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg> <span>Xem trang công khai</span> </a> <button id="admin-logout-btn" type="button" class="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path> </svg> <span>Đăng xuất</span> </button> </div> </aside> ${renderScript($$result, "D:/T03/flower-shop/src/components/admin/AdminNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/components/admin/AdminNav.astro", void 0);

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, subtitle } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const cookieHeader = Astro2.request.headers.get("cookie") || "";
  const hasSession = cookieHeader.includes("flower_admin_session=");
  if (!hasSession && currentPath !== "/admin/login") {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title} | Quản trị Flower Shop</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body class="bg-neutral-50 text-neutral-800 antialiased min-h-screen flex flex-col md:flex-row"> <!-- Admin Sidebar --> ${renderComponent($$result, "AdminNav", $$AdminNav, { "currentPath": currentPath })} <!-- Mobile Top Navigation Header --> <header class="md:hidden bg-neutral-900 text-white p-4 flex items-center justify-between sticky top-0 z-30"> <div class="flex items-center gap-2"> <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">F</div> <span class="font-serif font-bold text-sm">Flower Admin</span> </div> <div class="flex items-center gap-3 text-xs"> <a href="/admin/products" class="text-neutral-300 hover:text-white">Sản phẩm</a> <a href="/admin/settings" class="text-neutral-300 hover:text-white">Cấu hình</a> <a href="/admin/login" class="text-rose-400">Thoát</a> </div> </header> <!-- Main Admin Workspace --> <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl"> <!-- Page Title & Header Actions --> <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-200 gap-4"> <div> <h1 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight"> ${title} </h1> ${subtitle && renderTemplate`<p class="text-xs sm:text-sm text-neutral-500 mt-1"> ${subtitle} </p>`} </div> <div class="flex items-center gap-3"> ${renderSlot($$result, $$slots["header-actions"])} </div> </div> <!-- Main Slot Content --> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "D:/T03/flower-shop/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
