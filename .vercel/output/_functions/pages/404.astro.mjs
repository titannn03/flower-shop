import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$PublicLayout } from '../chunks/PublicLayout_XSdIYdGI.mjs';
import { d as db } from '../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const settings = db.getSettings();
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "settings": settings, "pageTitle": "404 - Kh\xF4ng t\xECm th\u1EA5y trang | Flower Shop" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center"> <div class="glass-card max-w-lg w-full p-8 sm:p-10 rounded-3xl shadow-xl space-y-6"> <div class="w-20 h-20 mx-auto rounded-full bg-accent/60 text-primary flex items-center justify-center font-serif text-3xl font-bold">
404
</div> <h1 class="text-2xl sm:text-3xl font-serif font-bold text-textColor-primary">
Trang Không Tồn Tại
</h1> <p class="text-sm sm:text-base text-textColor-secondary leading-relaxed">
Rất tiếc, mẫu hoa hoặc liên kết bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi.
</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"> <a href="/" class="btn-pill-primary w-full sm:w-auto text-sm">
Quay lại trang chủ
</a> <a${addAttribute(settings.zalo_config.url, "href")} target="_blank" rel="noopener noreferrer" class="btn-pill-secondary w-full sm:w-auto text-sm">
Nhắn Zalo hỗ trợ
</a> </div> </div> </div> ` })}`;
}, "D:/T03/flower-shop/src/pages/404.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
