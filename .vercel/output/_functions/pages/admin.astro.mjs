import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_DUMhjzoo.mjs';
import { d as db } from '../chunks/db_C-NJjIRF.mjs';
import { f as formatCurrencyVND } from '../chunks/product_C2ylGUAV.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const products = db.getAllAdminProducts();
  const activeProducts = products.filter((p) => p.status === "published");
  const featuredProducts = products.filter((p) => p.featured);
  const videos = db.getAllAdminVideos();
  const testimonials = db.getAllAdminTestimonials();
  const settings = db.getSettings();
  const auditLogs = db.getAuditLogs().slice(0, 8);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n Qu\u1EA3n tr\u1ECB", "subtitle": "T\u1ED5ng quan ho\u1EA1t \u0111\u1ED9ng v\xE0 d\u1EEF li\u1EC7u website b\xE1n hoa" }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> <div class="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"> <div> <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Sản phẩm đang bán</p> <p class="text-2xl font-serif font-bold text-neutral-900 mt-1">${activeProducts.length} <span class="text-xs font-normal text-neutral-400">/ ${products.length}</span></p> </div> <div class="w-10 h-10 rounded-xl bg-pink-50 text-primary flex items-center justify-center">
🌸
</div> </div> <div class="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"> <div> <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Mẫu hoa nổi bật</p> <p class="text-2xl font-serif font-bold text-primary mt-1">${featuredProducts.length}</p> </div> <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
★
</div> </div> <div class="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"> <div> <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Video giới thiệu</p> <p class="text-2xl font-serif font-bold text-neutral-900 mt-1">${videos.length}</p> </div> <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
🎬
</div> </div> <div class="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between"> <div> <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Đánh giá khách hàng</p> <p class="text-2xl font-serif font-bold text-neutral-900 mt-1">${testimonials.length}</p> </div> <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
❤️
</div> </div> </div>  <div class="bg-white rounded-2xl border border-neutral-200 p-6 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"> <div> <div class="flex items-center gap-2"> <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> <h2 class="text-base font-bold text-neutral-900">Kênh Chốt Đơn Zalo Hiện Tại</h2> </div> <p class="text-sm text-neutral-600 mt-1">
Liên kết: <a${addAttribute(settings.zalo_config.url, "href")} target="_blank" class="text-primary font-mono underline font-medium">${settings.zalo_config.url}</a>
• Hotline: <span class="font-bold text-neutral-800">${settings.zalo_config.hotline}</span> </p> </div> <a href="/admin/settings" class="btn-pill-secondary text-xs py-2 px-4 whitespace-nowrap">
Cập nhật liên kết Zalo
</a> </div>  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8"> <!-- Left: Top Products List --> <div class="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"> <div class="flex items-center justify-between mb-4"> <h2 class="text-base font-serif font-bold text-neutral-900">Mẫu Hoa Gần Đây</h2> <a href="/admin/products" class="text-xs text-primary font-semibold hover:underline">Xem tất cả (${products.length})</a> </div> <div class="divide-y divide-neutral-100"> ${products.slice(0, 5).map((prod) => renderTemplate`<div class="py-3 flex items-center justify-between gap-4"> <div class="flex items-center gap-3"> <img${addAttribute(prod.images?.[0]?.secure_url || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=150&q=80", "src")}${addAttribute(prod.name, "alt")} class="w-12 h-12 rounded-xl object-cover border border-neutral-200 flex-shrink-0"> <div> <p class="text-sm font-semibold text-neutral-800 leading-snug">${prod.name}</p> <div class="flex items-center gap-2 mt-0.5"> <span class="text-xs font-bold text-primary font-serif">${formatCurrencyVND(prod.price)}</span> <span${addAttribute(`text-[10px] px-2 py-0.5 rounded-full font-medium ${prod.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`, "class")}> ${prod.status === "published" ? "\u0110ang b\xE1n" : prod.status === "draft" ? "B\u1EA3n nh\xE1p" : "\u0110\xE3 \u1EA9n"} </span> </div> </div> </div> <a${addAttribute(`/admin/products`, "href")} class="text-xs text-neutral-500 hover:text-primary font-medium">Chi tiết</a> </div>`)} </div> </div> <!-- Right: Audit Logs (BR-07) --> <div class="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"> <div class="flex items-center justify-between mb-4"> <h2 class="text-base font-serif font-bold text-neutral-900">Nhật Ký Thao Tác (Audit Log)</h2> <span class="text-xs text-neutral-400">BR-07</span> </div> ${auditLogs.length > 0 ? renderTemplate`<div class="space-y-3"> ${auditLogs.map((log) => renderTemplate`<div class="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs"> <div class="flex items-center justify-between font-semibold"> <span${addAttribute(`uppercase text-[10px] px-1.5 py-0.5 rounded ${log.action === "CREATE" ? "bg-emerald-100 text-emerald-800" : log.action === "DELETE" ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"}`, "class")}> ${log.action} </span> <span class="text-neutral-400 text-[10px]"> ${new Date(log.created_at).toLocaleTimeString("vi-VN")} ${new Date(log.created_at).toLocaleDateString("vi-VN")} </span> </div> <p class="text-neutral-700 mt-1">
Thực thể: <strong class="capitalize">${log.entity_type}</strong> ${log.entity_id && renderTemplate`<span class="text-neutral-500"> (${log.entity_id})</span>`} </p> </div>`)} </div>` : renderTemplate`<div class="text-center py-8 text-neutral-400 text-xs">
Chưa có nhật ký ghi nhận
</div>`} </div> </div> `, "header-actions": ($$result2) => renderTemplate`<div> <a href="/admin/products/new" class="btn-pill-primary text-xs sm:text-sm py-2 px-4 shadow-sm flex items-center gap-1.5"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> <span>Thêm sản phẩm</span> </a> </div>` })}`;
}, "D:/T03/flower-shop/src/pages/admin/index.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
