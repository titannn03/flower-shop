import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DUMhjzoo.mjs';
import { $ as $$ImageUploader } from '../../../chunks/ImageUploader_BuyMUZSR.mjs';
import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const occasions = db.getOccasions();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Th\xEAm S\u1EA3n ph\u1EA9m M\u1EDBi", "subtitle": "\u0110i\u1EC1n th\xF4ng tin v\xE0 t\u1EA3i \u1EA3nh m\u1EABu hoa t\u01B0\u01A1i" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<form id="create-product-form" class="space-y-8 max-w-4xl"> <!-- Basic Info Card --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
1. Thông tin cơ bản
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"> <!-- Product Name --> <div class="sm:col-span-2"> <label for="name" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tên mẫu hoa <span class="text-rose-500">*</span> </label> <input type="text" id="name" name="name" required minlength="2" maxlength="150" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Bó Hoa Hồng Ohara Cảm Xúc Ngọt Ngào"> </div> <!-- Slug --> <div> <label for="slug" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Đường dẫn Slug (URL)
</label> <input type="text" id="slug" name="slug" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono text-neutral-600" placeholder="Tự động sinh từ tên sản phẩm"> </div> <!-- SKU --> <div> <label for="sku" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mã nội bộ (SKU)
</label> <input type="text" id="sku" name="sku" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="FLW-..."> </div> <!-- Sale Price --> <div> <label for="price" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Giá bán (VND) <span class="text-rose-500">*</span> </label> <input type="number" id="price" name="price" required min="0" step="1000" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-semibold text-primary" placeholder="650000"> </div> <!-- Compare At Price --> <div> <label for="compare_at_price" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Giá gốc (VND) - Để trống nếu không khuyến mãi
</label> <input type="number" id="compare_at_price" name="compare_at_price" min="0" step="1000" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="780000"> </div> </div> </div> <!-- Details & Components Card --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
2. Chi tiết & Thành phần hoa
</h2> <!-- Short Description --> <div> <label for="short_description" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mô tả ngắn (Hiển thị trên card, tối đa 250 ký tự)
</label> <textarea id="short_description" name="short_description" rows="2" maxlength="250" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Tóm tắt phong cách hoa, tone màu, ý nghĩa..."></textarea> </div> <!-- Flower Components --> <div> <label for="flower_components" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thành phần hoa chính
</label> <input type="text" id="flower_components" name="flower_components" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Hồng Ecuador 15 bông, baby trắng Hà Lan, lá bạc"> </div> <!-- Long Description --> <div> <label for="description" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mô tả chi tiết
</label> <textarea id="description" name="description" rows="4" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Mô tả cụ thể về kiểu dáng, độ tươi, cách chăm sóc..."></textarea> </div> <!-- Occasions Multi-Select --> <div> <label class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
Dịp tặng phù hợp (Multi-select)
</label> <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5"> ${occasions.filter((o) => o.slug !== "all").map((occ) => renderTemplate`<label class="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs font-medium text-neutral-800"> <input type="checkbox" name="occasions"${addAttribute(occ.slug, "value")}${addAttribute(occ.name, "data-name")}${addAttribute(occ.id, "data-id")} class="rounded text-primary focus:ring-primary"> <span>${occ.name}</span> </label>`)} </div> </div> </div> <!-- Images Upload Card (Section D.7 compliant) --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
3. Hình ảnh sản phẩm (Ảnh bìa & Gallery)
</h2> ${renderComponent($$result2, "ImageUploader", $$ImageUploader, { "id": "product-images-uploader", "label": "T\u1EA3i \u1EA3nh m\u1EABu hoa" })} </div> <!-- Publishing & Display Settings Card --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
4. Cấu hình hiển thị
</h2> <div class="grid grid-cols-1 sm:grid-cols-3 gap-5"> <!-- Status --> <div> <label for="status" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Trạng thái
</label> <select id="status" name="status" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm bg-white"> <option value="published" selected>Đang bán (Published)</option> <option value="draft">Bản nháp (Draft)</option> <option value="hidden">Ẩn (Hidden)</option> </select> </div> <!-- Featured Checkbox --> <div class="flex items-center pt-6"> <label class="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-neutral-800"> <input type="checkbox" id="featured" name="featured" class="w-4 h-4 rounded text-primary focus:ring-primary"> <span>Đánh dấu Nổi bật (Featured)</span> </label> </div> <!-- Sort Order --> <div> <label for="sort_order" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thứ tự hiển thị
</label> <input type="number" id="sort_order" name="sort_order" value="1" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm"> </div> </div> </div> <!-- Form Submit Action Bar --> <div class="flex items-center justify-end gap-4 pt-4"> <a href="/admin/products" class="btn-pill-secondary text-sm">
Hủy bỏ
</a> <button type="submit" id="submit-product-btn" class="btn-pill-primary text-sm shadow-md">
Lưu và Xuất bản sản phẩm
</button> </div> </form> `, "header-actions": async ($$result2) => renderTemplate`<div> <a href="/admin/products" class="btn-pill-secondary text-xs sm:text-sm py-2 px-4">
Quay lại danh sách
</a> </div>` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/products/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/products/new.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
