import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DUMhjzoo.mjs';
import { d as db } from '../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const testimonials = db.getAllAdminTestimonials();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\u0110\xE1nh gi\xE1 Kh\xE1ch h\xE0ng", "subtitle": "Qu\u1EA3n l\xFD c\u1EA3m nh\u1EADn, \u0111\xE1nh gi\xE1 sao v\xE0 h\xECnh \u1EA3nh ph\u1EA3n h\u1ED3i t\u1EEB kh\xE1ch" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 lg:grid-cols-12 gap-8"> <!-- Add Testimonial Form --> <div class="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5 h-fit"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
Thêm Đánh Giá Mới
</h2> <form id="add-testimonial-form" class="space-y-4"> <div> <label for="customer_name" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tên khách hàng & Khu vực <span class="text-rose-500">*</span> </label> <input type="text" id="customer_name" name="customer_name" required class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Chị Lan Hương (Quận 3, TP.HCM)"> </div> <div> <label for="content" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Nội dung nhận xét <span class="text-rose-500">*</span> </label> <textarea id="content" name="content" rows="3" required class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Khách đánh giá thế nào về chất lượng hoa, tốc độ giao hàng, thái độ tư vấn..."></textarea> </div> <div> <label for="image_url" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Link ảnh đại diện khách hàng (Tùy chọn)
</label> <input type="url" id="image_url" name="image_url" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="https://..."> </div> <div class="grid grid-cols-2 gap-4"> <div> <label for="rating" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Số sao đánh giá
</label> <select id="rating" name="rating" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white"> <option value="5" selected>★★★★★ (5 sao)</option> <option value="4">★★★★☆ (4 sao)</option> <option value="3">★★★☆☆ (3 sao)</option> </select> </div> <div> <label for="sort_order" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thứ tự
</label> <input type="number" id="sort_order" name="sort_order" value="1" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> </div> <button type="submit" id="save-testimonial-btn" class="w-full btn-pill-primary py-2.5 text-sm font-semibold justify-center shadow-md">
Lưu Đánh Giá
</button> </form> </div> <!-- Testimonials List --> <div class="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"> <div class="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3"> <h2 class="text-base font-serif font-bold text-neutral-900">Danh Sách Đánh Giá (${testimonials.length})</h2> </div> <div class="space-y-4"> ${testimonials.map((t) => renderTemplate`<div class="p-4 rounded-xl border border-neutral-200 flex items-start justify-between gap-4"> <div class="flex items-start gap-3"> ${t.image_url ? renderTemplate`<img${addAttribute(t.image_url, "src")}${addAttribute(t.customer_name, "alt")} class="w-10 h-10 rounded-full object-cover border border-neutral-200 flex-shrink-0">` : renderTemplate`<div class="w-10 h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm"> ${t.customer_name.charAt(0)} </div>`} <div> <div class="flex items-center gap-2"> <span class="text-sm font-bold text-neutral-900">${t.customer_name}</span> <span class="text-amber-500 text-xs">${"\u2605".repeat(t.rating)}</span> </div> <p class="text-xs text-neutral-600 mt-1 leading-relaxed italic">“${t.content}”</p> </div> </div> <button type="button" class="delete-testimonial-btn text-xs text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg border border-rose-200 flex-shrink-0"${addAttribute(t.id, "data-id")}>
Xóa
</button> </div>`)} </div> </div> </div> ` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/testimonials/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/testimonials/index.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/testimonials/index.astro";
const $$url = "/admin/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
