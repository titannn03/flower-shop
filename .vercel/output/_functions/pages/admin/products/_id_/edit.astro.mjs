import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, h as createAstro, g as addAttribute, m as maybeRenderHead } from '../../../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_DUMhjzoo.mjs';
import { $ as $$ImageUploader } from '../../../../chunks/ImageUploader_BuyMUZSR.mjs';
import { d as db } from '../../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/admin/products");
  }
  const product = db.getProductById(id);
  if (!product) {
    return Astro2.redirect("/admin/products");
  }
  const occasions = db.getOccasions();
  const productOccasionSlugs = (product.occasions || []).map((o) => o.slug);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Ch\u1EC9nh s\u1EEDa S\u1EA3n ph\u1EA9m", "subtitle": `\u0110ang c\u1EADp nh\u1EADt m\u1EABu hoa: "${product.name}"` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<form id="edit-product-form" class="space-y-8 max-w-4xl"${addAttribute(product.id, "data-product-id")}> <!-- Basic Info Card --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
1. Thông tin cơ bản
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"> <!-- Product Name --> <div class="sm:col-span-2"> <label for="name" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tên mẫu hoa <span class="text-rose-500">*</span> </label> <input type="text" id="name" name="name" required minlength="2" maxlength="150"${addAttribute(product.name, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Bó Hoa Hồng Ohara Cảm Xúc Ngọt Ngào"> </div> <!-- Slug --> <div> <label for="slug" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Đường dẫn Slug (URL)
</label> <input type="text" id="slug" name="slug"${addAttribute(product.slug, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono text-neutral-600" placeholder="duong-dan-san-pham"> </div> <!-- SKU --> <div> <label for="sku" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mã nội bộ (SKU)
</label> <input type="text" id="sku" name="sku"${addAttribute(product.sku || "", "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="FLW-..."> </div> <!-- Sale Price --> <div> <label for="price" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Giá bán (VND) <span class="text-rose-500">*</span> </label> <input type="number" id="price" name="price" required min="0" step="1000"${addAttribute(product.price, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-semibold text-primary" placeholder="650000"> </div> <!-- Compare At Price --> <div> <label for="compare_at_price" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Giá gốc (VND) - Để trống nếu không khuyến mãi
</label> <input type="number" id="compare_at_price" name="compare_at_price" min="0" step="1000"${addAttribute(product.compare_at_price || "", "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm text-neutral-500" placeholder="780000"> </div> </div> </div> <!-- Media (Images & Videos) Card --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-4"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
2. Hình ảnh & Video sản phẩm (Ảnh bìa & Gallery)
</h2> <p class="text-xs text-neutral-500">
Bạn có thể thêm nhiều hình ảnh và video (YouTube / TikTok). Chọn nút tròn để chỉ định Ảnh/Video làm ảnh đại diện chính của sản phẩm.
</p> ${renderComponent($$result2, "ImageUploader", $$ImageUploader, { "id": "image-uploader", "label": "T\u1EA3i \u1EA3nh ho\u1EB7c nh\xFAng video", "initialImages": product.images || [] })} </div> <!-- Classification & Occasions --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
3. Phân loại dịp tặng & Trạng thái
</h2> <div class="space-y-4"> <!-- Occasion Checkboxes --> <div> <label class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
Dịp tặng phù hợp (chọn nhiều)
</label> <div class="grid grid-cols-2 sm:grid-cols-3 gap-3"> ${occasions.filter((o) => o.slug !== "all").map((occ) => {
    const isChecked = productOccasionSlugs.includes(occ.slug);
    return renderTemplate`<label class="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-sm"> <input type="checkbox" name="occasions"${addAttribute(occ.slug, "value")}${addAttribute(occ.id, "data-id")}${addAttribute(occ.name, "data-name")}${addAttribute(isChecked, "checked")} class="rounded text-primary focus:ring-primary h-4 w-4"> <span class="text-neutral-700 font-medium">${occ.name}</span> </label>`;
  })} </div> </div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3"> <!-- Status --> <div> <label for="status" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Trạng thái xuất bản
</label> <select id="status" name="status" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm"> <option value="published"${addAttribute(product.status === "published", "selected")}>Đang bán (Hiển thị công khai)</option> <option value="draft"${addAttribute(product.status === "draft", "selected")}>Bản nháp (Chưa bán)</option> <option value="hidden"${addAttribute(product.status === "hidden", "selected")}>Ẩn sản phẩm</option> </select> </div> <!-- Featured Checkbox --> <div class="flex items-center pt-6"> <label class="flex items-center gap-2 cursor-pointer"> <input type="checkbox" id="featured" name="featured"${addAttribute(product.featured, "checked")} class="rounded text-primary focus:ring-primary h-5 w-5"> <span class="text-sm font-semibold text-neutral-800">
Đánh dấu Mẫu hoa nổi bật ★
</span> </label> </div> <!-- Sort Order --> <div> <label for="sort_order" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thứ tự hiển thị (nhỏ đứng trước)
</label> <input type="number" id="sort_order" name="sort_order"${addAttribute(product.sort_order, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm"> </div> </div> </div> </div> <!-- Detailed Descriptions --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
4. Mô tả chi tiết & Thành phần hoa
</h2> <!-- Flower Components --> <div> <label for="flower_components" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thành phần hoa chính
</label> <input type="text" id="flower_components" name="flower_components"${addAttribute(product.flower_components || "", "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Hoa hồng Ohara 12 cành, hoa baby Hà Lan, lá bạc nhập khẩu..."> </div> <!-- Short Description --> <div> <label for="short_description" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mô tả ngắn (Hiển thị tại Thẻ sản phẩm & SEO)
</label> <textarea id="short_description" name="short_description" rows="2" maxlength="250" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Mô tả súc tích về vẻ đẹp và ý nghĩa...">${product.short_description || ""}</textarea> </div> <!-- Detailed Description --> <div> <label for="description" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mô tả chi tiết / Câu chuyện tác phẩm (Hỗ trợ HTML)
</label> <textarea id="description" name="description" rows="5" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono text-xs" placeholder="<p>Mô tả chi tiết từng loại hoa, phong cách gói và ý nghĩa...</p>">${product.description || ""}</textarea> </div> </div> <!-- Submit Section --> <div class="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200"> <a href="/admin/products" class="btn-pill-secondary text-sm py-2.5 px-6">
Hủy bỏ
</a> <button type="submit" id="submit-btn" class="btn-pill-primary text-sm py-3 px-8 shadow-md font-bold">
Lưu thay đổi sản phẩm
</button> </div> </form> `, "header-actions": async ($$result2) => renderTemplate`<div class="flex items-center gap-2"> <a${addAttribute(`/products/${product.slug}`, "href")} target="_blank" class="btn-pill-secondary text-xs sm:text-sm py-2 px-3.5 flex items-center gap-1"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg> <span>Xem trang bán hàng ↗</span> </a> <a href="/admin/products" class="btn-pill-secondary text-xs sm:text-sm py-2 px-3.5">
Quay lại danh sách
</a> </div>` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/products/[id]/edit.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/products/[id]/edit.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/products/[id]/edit.astro";
const $$url = "/admin/products/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
