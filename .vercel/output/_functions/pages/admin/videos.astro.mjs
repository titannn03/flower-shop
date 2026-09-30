import { e as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_CowMa-oF.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DUMhjzoo.mjs';
import { d as db } from '../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const videos = db.getAllAdminVideos();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Qu\u1EA3n l\xFD Video & Stories", "subtitle": "Nh\xFAng video TikTok v\xE0 YouTube gi\u1EDBi thi\u1EC7u m\u1EABu hoa ngh\u1EC7 thu\u1EADt" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 lg:grid-cols-12 gap-8"> <!-- Left Column: Add Video Form with Live Preview (AD-VID-01 & AD-VID-02) --> <div class="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5 h-fit"> <h2 class="text-base font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
Thêm Video Mới
</h2> <form id="add-video-form" class="space-y-4"> <div> <label for="video-url" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Đường dẫn Video (YouTube hoặc TikTok) <span class="text-rose-500">*</span> </label> <input type="url" id="video-url" name="source_url" required class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="https://www.youtube.com/watch?v=... hoặc TikTok URL"> <p class="text-[11px] text-neutral-400 mt-1">Hệ thống tự động nhận diện nền tảng và trích xuất ID (AD-VID-01)</p> </div> <div> <label for="video-title" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Tiêu đề Video <span class="text-rose-500">*</span> </label> <input type="text" id="video-title" name="title" required class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Ví dụ: Nghệ thuật cắm hoa hồng Ohara"> </div> <div> <label for="video-caption" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Mô tả / Caption ngắn
</label> <textarea id="video-caption" name="caption" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm" placeholder="Mô tả ngắn về video..."></textarea> </div> <div class="grid grid-cols-2 gap-4"> <div> <label for="video-status" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Trạng thái
</label> <select id="video-status" name="status" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm bg-white"> <option value="active">Hiển thị (Active)</option> <option value="inactive">Ẩn (Inactive)</option> </select> </div> <div> <label for="video-order" class="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
Thứ tự
</label> <input type="number" id="video-order" name="sort_order" value="1" class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary text-sm"> </div> </div> <!-- Live Preview Container (AD-VID-02) --> <div id="video-preview-wrapper" class="hidden pt-3 border-t border-neutral-100"> <p class="text-xs font-bold text-neutral-700 mb-2">Xem trước (Preview):</p> <div id="video-preview-box" class="aspect-video bg-neutral-900 rounded-xl overflow-hidden flex items-center justify-center text-white text-xs"> <!-- Iframe injected by JS --> </div> </div> <button type="submit" id="save-video-btn" class="w-full btn-pill-primary py-2.5 text-sm font-semibold justify-center shadow-md">
Lưu Video
</button> </form> </div> <!-- Right Column: Video List (AD-VID-03) --> <div class="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"> <div class="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3"> <h2 class="text-base font-serif font-bold text-neutral-900">Danh Sách Video (${videos.length})</h2> <span class="text-xs text-neutral-400">YouTube & TikTok</span> </div> <div class="space-y-4"> ${videos.map((v) => renderTemplate`<div class="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/40 transition-colors"> <div class="flex items-center gap-3"> <div class="w-20 aspect-video rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0 relative"> <img${addAttribute(v.thumbnail_url, "src")}${addAttribute(v.title, "alt")} class="w-full h-full object-cover"> <span class="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1 rounded uppercase"> ${v.provider} </span> </div> <div> <p class="text-sm font-bold text-neutral-900">${v.title}</p> <p class="text-xs text-neutral-500 line-clamp-1 mt-0.5">${v.caption || v.source_url}</p> <div class="flex items-center gap-2 mt-1"> <span${addAttribute(`text-[10px] px-2 py-0.5 rounded-full font-semibold ${v.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`, "class")}> ${v.status === "active" ? "\u0110ang hi\u1EC3n th\u1ECB" : "\u0110\xE3 \u1EA9n"} </span> <span class="text-[10px] text-neutral-400">Thứ tự: ${v.sort_order}</span> </div> </div> </div> <!-- Action buttons --> <div class="flex items-center gap-2 self-end sm:self-center"> <a${addAttribute(v.source_url, "href")} target="_blank" class="text-xs text-neutral-500 hover:text-primary p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
Mở link
</a> <button type="button" class="delete-video-btn text-xs text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg border border-rose-200"${addAttribute(v.id, "data-id")}${addAttribute(v.title, "data-title")}>
Xóa
</button> </div> </div>`)} ${videos.length === 0 && renderTemplate`<div class="text-center py-10 text-neutral-400 text-sm">
Chưa có video nào. Hãy thêm video YouTube hoặc TikTok ở bên trái.
</div>`} </div> </div> </div> ` })} ${renderScript($$result, "D:/T03/flower-shop/src/pages/admin/videos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/pages/admin/videos/index.astro", void 0);

const $$file = "D:/T03/flower-shop/src/pages/admin/videos/index.astro";
const $$url = "/admin/videos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
