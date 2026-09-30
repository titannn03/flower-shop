import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DUMhjzoo.mjs';
import { d as db } from '../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const settings = db.getSettings();
  const commitments = db.getAllAdminCommitments();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "C\u1EA5u h\xECnh H\u1EC7 th\u1ED1ng & Zalo", "subtitle": "T\xF9y ch\u1EC9nh th\xF4ng tin li\xEAn h\u1EC7, li\xEAn k\u1EBFt Zalo chuy\u1EC3n \u0111\u1ED5i, banner v\xE0 SEO" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="settings-form" class="space-y-8 max-w-4xl"> <!-- 1. Global Zalo Conversion Settings (BR-02 & Section 10.1) --> <div class="bg-white rounded-2xl border-2 border-primary/20 p-6 sm:p-8 shadow-sm space-y-5"> <div class="flex items-center gap-3 border-b border-primary/10 pb-4"> <div class="w-10 h-10 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-bold">
Z
</div> <div> <h2 class="text-base font-serif font-bold text-neutral-900">
1. Cấu hình Kênh Chuyển Đổi Zalo Toàn Cục
</h2> <p class="text-xs text-neutral-500">
Quy tắc BR-02: Toàn bộ nút CTA trên Hero, Sản phẩm, Floating, Footer đều đọc cấu hình này để chuyển hướng.
</p> </div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"> <!-- Zalo URL --> <div class="sm:col-span-2"> <label for="zalo-url" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Đường dẫn Zalo (zalo_url) <span class="text-rose-500">* Bắt buộc HTTPS</span> </label> <input type="url" id="zalo-url" name="zalo_url" required${addAttribute(settings.zalo_config.url, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono" placeholder="https://zalo.me/0901234567"> <p class="text-[11px] text-neutral-400 mt-1">Phải có tiền tố <code class="font-mono text-primary">https://</code> để đảm bảo an toàn (Section 10.1)</p> </div> <!-- Hotline for Zalo --> <div> <label for="zalo-hotline" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Số điện thoại Hotline / Zalo
</label> <input type="text" id="zalo-hotline" name="zalo_hotline"${addAttribute(settings.zalo_config.hotline, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-bold text-neutral-800" placeholder="0901.234.567"> </div> <!-- Zalo OA ID --> <div> <label for="zalo-oa" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mã định danh Zalo OA (Official Account ID)
</label> <input type="text" id="zalo-oa" name="zalo_oa_id"${addAttribute(settings.zalo_config.zalo_oa_id || "", "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono" placeholder="1234567890123"> </div> </div> </div> <!-- 2. Store Info Settings --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
2. Thông tin Tiệm hoa & Liên hệ
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"> <div> <label for="shop-name" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tên Tiệm hoa
</label> <input type="text" id="shop-name" name="shop_name"${addAttribute(settings.shop_info.name, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm font-bold"> </div> <div> <label for="shop-slogan" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Slogan thương hiệu
</label> <input type="text" id="shop-slogan" name="shop_slogan"${addAttribute(settings.shop_info.slogan, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> <div class="sm:col-span-2"> <label class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
Địa chỉ cửa hàng
</label> <div class="space-y-3"> ${["Chi nh\xE1nh 1", "Chi nh\xE1nh 2", "Chi nh\xE1nh 3"].map((label, index) => {
    const value = settings.shop_info.addresses?.[index]?.address ?? (index === 0 ? settings.shop_info.address : "");
    return renderTemplate`<div class="grid grid-cols-[110px_1fr] gap-2 items-center"> <span class="text-xs font-semibold text-neutral-700">${label}</span> <input type="text" class="shop-branch-address w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"${addAttribute(value, "value")}${addAttribute(index, "data-index")}${addAttribute(label, "data-label")}> </div>`;
  })} </div> </div> <div> <label for="shop-email" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Email liên hệ
</label> <input type="email" id="shop-email" name="shop_email"${addAttribute(settings.shop_info.email, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> <div> <label for="shop-hours" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Giờ mở cửa
</label> <input type="text" id="shop-hours" name="shop_hours"${addAttribute(settings.shop_info.opening_hours, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> </div> </div> <!-- 3. Hero Copy Settings --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
3. Nội dung Banner Hero trang chủ
</h2> <div class="space-y-4"> <div> <label for="hero-eyebrow" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Dòng thẻ nhỏ (Eyebrow Tag)
</label> <input type="text" id="hero-eyebrow" name="hero_eyebrow"${addAttribute(settings.hero_config.eyebrow, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm font-semibold text-primary"> </div> <div> <label for="hero-headline" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tiêu đề chính (Headline H1)
</label> <input type="text" id="hero-headline" name="hero_headline"${addAttribute(settings.hero_config.headline, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm font-serif font-bold text-lg"> </div> <div> <label for="hero-subheadline" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Đoạn mô tả phụ (Subheadline)
</label> <textarea id="hero-subheadline" name="hero_subheadline" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm">${settings.hero_config.subheadline}</textarea> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div> <label for="hero-cta" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Chữ nút CTA chính (Zalo)
</label> <input type="text" id="hero-cta" name="hero_cta"${addAttribute(settings.hero_config.cta_label, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> <div> <label for="hero-cta-secondary" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Chữ nút CTA phụ (Cuộn xem)
</label> <input type="text" id="hero-cta-secondary" name="hero_cta_secondary"${addAttribute(settings.hero_config.cta_secondary_label, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> </div> </div> </div> <!-- 4. SEO & Social Sharing (Section 11) --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-5"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
4. Cấu hình SEO & Chia sẻ Mạng Xã Hội (Section 11)
</h2> <div class="space-y-4"> <div> <label for="seo-title" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Meta Title (Khuyến nghị 50–60 ký tự)
</label> <input type="text" id="seo-title" name="seo_title"${addAttribute(settings.seo_config.meta_title, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> <div> <label for="seo-desc" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Meta Description (Khuyến nghị 140–160 ký tự)
</label> <textarea id="seo-desc" name="seo_desc" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm">${settings.seo_config.meta_description}</textarea> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div> <label for="seo-domain" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Canonical Domain
</label> <input type="url" id="seo-domain" name="seo_domain"${addAttribute(settings.seo_config.canonical_domain, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> <div> <label for="seo-og-image" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Ảnh xem trước Open Graph (OG Image URL)
</label> <input type="url" id="seo-og-image" name="seo_og_image"${addAttribute(settings.seo_config.og_image, "value")} class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> </div> </div> </div> <!-- 5. Commitments Management --> <div class="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6"> <div class="border-b border-neutral-100 pb-3 flex items-center justify-between"> <div> <h2 class="text-base font-serif font-bold text-neutral-900">
5. Quản lý 4 Cam Kết Vàng Về Dịch Vụ
</h2> <p class="text-xs text-neutral-500 mt-0.5">
Tùy chỉnh tiêu đề, mô tả, biểu tượng và trạng thái hiển thị của các cam kết dịch vụ
</p> </div> </div> <div class="space-y-4" id="commitments-container"> ${commitments.map((com, idx) => renderTemplate`<div class="commitment-item p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3.5"${addAttribute(com.id, "data-id")}> <div class="flex items-center justify-between pb-2 border-b border-neutral-200/60"> <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
Cam kết #${idx + 1} </span> <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700"> <input type="checkbox" class="commitment-toggle w-4 h-4 rounded text-primary focus:ring-primary"${addAttribute(com.id, "data-id")}${addAttribute(com.active, "checked")}> <span>Hiển thị trên website</span> </label> </div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-3"> <div class="sm:col-span-2"> <label class="block text-xs font-semibold text-neutral-700 mb-1">
Tiêu đề cam kết <span class="text-rose-500">*</span> </label> <input type="text" class="commitment-title w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white"${addAttribute(com.title, "value")} required> </div> <div> <label class="block text-xs font-semibold text-neutral-700 mb-1">
Biểu tượng (Icon)
</label> <select class="commitment-icon w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white"> <option value="sparkles"${addAttribute(com.icon_key === "sparkles", "selected")}>✨ Tuyển chọn (sparkles)</option> <option value="clock"${addAttribute(com.icon_key === "clock", "selected")}>⏰ Giao nhanh 2h (clock)</option> <option value="gift"${addAttribute(com.icon_key === "gift", "selected")}>🎁 Thiệp & Quà (gift)</option> <option value="shield-check"${addAttribute(com.icon_key === "shield-check", "selected")}>🛡️ Đổi trả & Hoàn tiền (shield-check)</option> <option value="truck"${addAttribute(com.icon_key === "truck", "selected")}>🚚 Vận chuyển an toàn (truck)</option> <option value="heart"${addAttribute(com.icon_key === "heart", "selected")}>💖 Tận tâm thiết kế (heart)</option> <option value="award"${addAttribute(com.icon_key === "award", "selected")}>🏆 Chất lượng uy tín (award)</option> <option value="phone"${addAttribute(com.icon_key === "phone", "selected")}>📞 Hỗ trợ 24/7 (phone)</option> </select> </div> </div> <div class="grid grid-cols-1 sm:grid-cols-4 gap-3"> <div class="sm:col-span-3"> <label class="block text-xs font-semibold text-neutral-700 mb-1">
Mô tả chi tiết cam kết <span class="text-rose-500">*</span> </label> <textarea class="commitment-desc w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white" rows="2" required>${com.description}</textarea> </div> <div> <label class="block text-xs font-semibold text-neutral-700 mb-1">
Thứ tự hiển thị
</label> <input type="number" class="commitment-order w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white"${addAttribute(com.sort_order ?? idx + 1, "value")} min="1" max="99"> </div> </div> </div>`)} </div> </div> <!-- Save Action Bar --> <div class="flex items-center justify-end gap-4 pt-4"> <button type="submit" id="save-settings-btn" class="btn-pill-primary text-sm sm:text-base py-3 px-8 shadow-lg">
Lưu Toàn Bộ Cấu Hình
</button> </div> </form> ` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/settings/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/settings/index.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/settings/index.astro";
const $$url = "/admin/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
