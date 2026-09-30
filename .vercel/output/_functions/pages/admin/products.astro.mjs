import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DUMhjzoo.mjs';
import { d as db } from '../../chunks/db_C-NJjIRF.mjs';
import { f as formatCurrencyVND } from '../../chunks/product_C2ylGUAV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = db.getAllAdminProducts();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Qu\u1EA3n l\xFD S\u1EA3n ph\u1EA9m", "subtitle": `Hi\u1EC7n c\xF3 ${products.length} s\u1EA3n ph\u1EA9m trong h\u1EC7 th\u1ED1ng` }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse"> <thead> <tr class="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-bold uppercase tracking-wider text-neutral-500"> <th class="py-3.5 px-4">Ảnh bìa</th> <th class="py-3.5 px-4">Tên sản phẩm</th> <th class="py-3.5 px-4">Giá bán</th> <th class="py-3.5 px-4">Giá gốc</th> <th class="py-3.5 px-4">Dịp tặng</th> <th class="py-3.5 px-4">Trạng thái</th> <th class="py-3.5 px-4 text-center">Nổi bật</th> <th class="py-3.5 px-4 text-center">Thứ tự</th> <th class="py-3.5 px-4 text-right">Thao tác</th> </tr> </thead> <tbody class="divide-y divide-neutral-100 text-sm"> ${products.map((p) => {
    const cover = p.images?.find((img) => img.is_cover) || p.images?.[0];
    const coverUrl = cover?.secure_url || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=150&q=80";
    const occasionNames = (p.occasions || []).map((o) => o.name).join(", ");
    return renderTemplate`<tr class="hover:bg-neutral-50/60 transition-colors"${addAttribute(p.id, "data-id")}> <!-- Cover Image --> <td class="py-3 px-4"> <img${addAttribute(coverUrl, "src")}${addAttribute(p.name, "alt")} class="w-12 h-14 object-cover rounded-xl border border-neutral-200 shadow-sm"> </td> <!-- Name & SKU --> <td class="py-3 px-4 max-w-xs"> <p class="font-semibold text-neutral-900 leading-snug line-clamp-1">${p.name}</p> <p class="text-xs text-neutral-400 font-mono mt-0.5">${p.sku || p.slug}</p> </td> <!-- Sale Price --> <td class="py-3 px-4 font-bold text-primary font-serif whitespace-nowrap"> ${formatCurrencyVND(p.price)} </td> <!-- Original Price --> <td class="py-3 px-4 text-xs text-neutral-400 whitespace-nowrap"> ${p.compare_at_price ? renderTemplate`<span class="line-through">${formatCurrencyVND(p.compare_at_price)}</span>` : renderTemplate`<span>—</span>`} </td> <!-- Occasions --> <td class="py-3 px-4 text-xs text-neutral-600 max-w-[140px] truncate"> ${occasionNames || "\u2014"} </td> <!-- Status Badge --> <td class="py-3 px-4 whitespace-nowrap"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === "published" ? "bg-emerald-100 text-emerald-800" : p.status === "draft" ? "bg-amber-100 text-amber-800" : "bg-neutral-100 text-neutral-600"}`, "class")}> ${p.status === "published" ? "\u0110ang b\xE1n" : p.status === "draft" ? "B\u1EA3n nh\xE1p" : "\u0110\xE3 \u1EA9n"} </span> </td> <!-- Featured --> <td class="py-3 px-4 text-center"> ${p.featured ? renderTemplate`<span class="text-amber-500 font-bold" title="Nổi bật">★</span>` : renderTemplate`<span class="text-neutral-300">☆</span>`} </td> <!-- Sort Order --> <td class="py-3 px-4 text-center font-mono text-xs text-neutral-500"> ${p.sort_order} </td> <!-- Actions --> <td class="py-3 px-4 text-right whitespace-nowrap"> <div class="flex items-center justify-end gap-2"> <!-- Edit Product Button --> <a${addAttribute(`/admin/products/${p.id}/edit`, "href")} class="text-xs px-2.5 py-1 rounded-lg border border-primary/20 text-primary hover:bg-primary/10 font-medium flex items-center gap-1" title="Chỉnh sửa thông tin, hình ảnh và video sản phẩm"> <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg> <span>Sửa</span> </a> <!-- Toggle Publish / Hide --> <button type="button" class="toggle-status-btn text-xs px-2 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600"${addAttribute(p.id, "data-id")}${addAttribute(p.status, "data-current-status")} title="Chuyển trạng thái ẩn/hiện"> ${p.status === "published" ? "\u1EA8n" : "Hi\u1EC7n"} </button> <!-- Soft Delete Button --> <button type="button" class="delete-product-btn text-xs px-2 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"${addAttribute(p.id, "data-id")}${addAttribute(p.name, "data-name")} title="Xóa mềm sản phẩm">
Xóa
</button> </div> </td> </tr>`;
  })} </tbody> </table> </div> ${products.length === 0 && renderTemplate`<div class="p-12 text-center text-neutral-400">
Chưa có sản phẩm nào. Bấm "Thêm sản phẩm mới" để bắt đầu.
</div>`} </div> `, "header-actions": async ($$result2) => renderTemplate`<div> <a href="/admin/products/new" class="btn-pill-primary text-xs sm:text-sm py-2 px-4 shadow-sm flex items-center gap-1.5"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> <span>Thêm sản phẩm mới</span> </a> </div>` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/products/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/products/index.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/products/index.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
