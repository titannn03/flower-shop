import { e as createComponent, m as maybeRenderHead, g as addAttribute, n as renderScript, r as renderTemplate, h as createAstro, k as renderComponent, o as renderSlot, l as renderHead, u as unescapeHTML } from './astro/server_CowMa-oF.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$Astro$3 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const { zaloConfig, shopInfo } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 w-full glass-header transition-all duration-300"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-20"> <!-- Brand Logo & Name --> <a href="/" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"> <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform"> <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9a9 9 0 01-9 9zm0 0v-6m-4-3a4 4 0 118 0 4 4 0 01-8 0z"></path> </svg> </div> <div> <span class="block text-xl font-serif font-bold text-textColor-primary tracking-wide group-hover:text-primary transition-colors"> ${shopInfo.name || "FLOWER VIBES"} </span> <span class="hidden sm:block text-xs uppercase tracking-widest text-textColor-secondary font-medium">
Artistic Floral Studio
</span> </div> </a> <!-- Desktop Navigation Menu (Anchor Links with Active State) --> <nav class="hidden md:flex items-center gap-1 lg:gap-2"> <a href="/#san-pham" class="nav-link px-3.5 py-2 text-sm font-semibold text-textColor-secondary hover:text-primary transition-colors rounded-full hover:bg-white/60">
Sản phẩm
</a> <a href="/#video" class="nav-link px-3.5 py-2 text-sm font-semibold text-textColor-secondary hover:text-primary transition-colors rounded-full hover:bg-white/60">
Video & Câu chuyện
</a> <a href="/#cam-ket" class="nav-link px-3.5 py-2 text-sm font-semibold text-textColor-secondary hover:text-primary transition-colors rounded-full hover:bg-white/60">
Cam kết
</a> <a href="/#danh-gia" class="nav-link px-3.5 py-2 text-sm font-semibold text-textColor-secondary hover:text-primary transition-colors rounded-full hover:bg-white/60">
Đánh giá
</a> <a href="/#lien-he" class="nav-link px-3.5 py-2 text-sm font-semibold text-textColor-secondary hover:text-primary transition-colors rounded-full hover:bg-white/60">
Liên hệ
</a> </nav> <!-- Header CTA & Mobile Toggle --> <div class="flex items-center gap-3"> <!-- Zalo CTA Header Button --> <a${addAttribute(zaloConfig.url, "href")} target="_blank" rel="noopener noreferrer" class="btn-pill-primary text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-6 shadow-md header-zalo-cta" data-cta-source="nav"> <svg class="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.07-.17 1.05-.62 2.65-1.57 3.86 0 0 2.45-.3 4.25-1.54.48.07.97.11 1.48.11 5.52 0 10-4.03 10-9S17.52 2 12 2z"></path> </svg> <span>Chat Zalo</span> </a> <!-- Mobile Menu Toggle Button --> <button id="mobile-menu-btn" type="button" class="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-textColor-secondary hover:text-primary hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary" aria-expanded="false" aria-label="Mở menu điều hướng"> <svg id="menu-icon-open" class="w-6 h-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> </div> <!-- Mobile Dropdown Menu --> <div id="mobile-menu" class="hidden md:hidden border-t border-primary/10 bg-background-card/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2"> <a href="/#san-pham" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-textColor-secondary hover:text-primary hover:bg-white/80">
🌸 Bộ sưu tập mẫu hoa
</a> <a href="/#video" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-textColor-secondary hover:text-primary hover:bg-white/80">
🎬 Video cắm hoa & Stories
</a> <a href="/#cam-ket" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-textColor-secondary hover:text-primary hover:bg-white/80">
✨ 4 Cam kết dịch vụ
</a> <a href="/#danh-gia" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-textColor-secondary hover:text-primary hover:bg-white/80">
⭐ Khách hàng đánh giá
</a> <a href="/#lien-he" class="mobile-nav-link block px-4 py-3 rounded-xl text-base font-medium text-textColor-secondary hover:text-primary hover:bg-white/80">
📍 Thông tin liên hệ
</a> <div class="pt-2"> <a${addAttribute(zaloConfig.url, "href")} target="_blank" rel="noopener noreferrer" class="w-full btn-pill-primary text-center justify-center py-3">
Nhắn Zalo Tư Vấn Ngay
</a> </div> </div> </header> ${renderScript($$result, "D:/T03/flower-shop/src/components/common/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/components/common/Header.astro", void 0);

function normalizeShopAddresses(shopInfo) {
  if (!shopInfo) {
    return [];
  }
  if (Array.isArray(shopInfo.addresses) && shopInfo.addresses.length > 0) {
    return shopInfo.addresses.filter((entry) => entry && typeof entry.address === "string" && entry.address.trim().length > 0).map((entry, index) => ({
      id: entry.id || `branch-${index + 1}`,
      label: entry.label || `Chi nhánh ${index + 1}`,
      address: entry.address.trim(),
      note: entry.note?.trim()
    }));
  }
  const fallbackAddress = shopInfo.address?.trim();
  if (!fallbackAddress) {
    return [];
  }
  return [{
    id: "branch-1",
    label: "Chi nhánh 1",
    address: fallbackAddress
  }];
}

const $$Astro$2 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const { shopInfo, zaloConfig } = Astro2.props;
  const shopAddresses = normalizeShopAddresses(shopInfo);
  return renderTemplate`${maybeRenderHead()}<footer id="lien-he" class="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800"> <!-- Brand & Mission Column (Col 1-5) --> <div class="lg:col-span-5 space-y-4"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9a9 9 0 01-9 9zm0 0v-6m-4-3a4 4 0 118 0 4 4 0 01-8 0z"></path> </svg> </div> <span class="text-2xl font-serif font-bold text-white tracking-wide"> ${shopInfo.name || "FLOWER VIBES"} </span> </div> <p class="text-sm text-neutral-400 max-w-sm leading-relaxed"> ${shopInfo.slogan || "Trao G\u1EEDi Y\xEAu Th\u01B0\u01A1ng - \u0110ong \u0110\u1EA7y X\xFAc C\u1EA3m"}. Cung cấp hoa tươi nghệ thuật, hoa sinh nhật, khai trương và sự kiện giao nhanh trong nội ô TP. Cần Thơ.
</p> <!-- Social Links --> <div class="flex items-center gap-3 pt-2"> <a${addAttribute(zaloConfig.url, "href")} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary text-white flex items-center justify-center transition-colors" aria-label="Zalo Official"> <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.07-.17 1.05-.62 2.65-1.57 3.86 0 0 2.45-.3 4.25-1.54.48.07.97.11 1.48.11 5.52 0 10-4.03 10-9S17.52 2 12 2z"></path></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors" aria-label="Facebook Page"> <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path></svg> </a> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors" aria-label="Instagram"> <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg> </a> </div> </div> <!-- Quick Links (Col 6-8) --> <div class="lg:col-span-3 space-y-3"> <h4 class="text-white font-serif font-bold text-base tracking-wider uppercase">
Danh mục hoa
</h4> <ul class="space-y-2 text-sm text-neutral-400"> <li><a href="#san-pham" class="hover:text-primary transition-colors">Hoa sinh nhật sang trọng</a></li> <li><a href="#san-pham" class="hover:text-primary transition-colors">Lẵng hoa khai trương tài lộc</a></li> <li><a href="#san-pham" class="hover:text-primary transition-colors">Bó hoa tình yêu & Valentine</a></li> <li><a href="#san-pham" class="hover:text-primary transition-colors">Chậu lan hồ điệp quý phái</a></li> <li><a href="#san-pham" class="hover:text-primary transition-colors">Kệ hoa viếng trang nghiêm</a></li> </ul> </div> <!-- Store Info & Direct Zalo Consultation (Col 9-12) --> <div class="lg:col-span-4 space-y-4"> <h4 class="text-white font-serif font-bold text-base tracking-wider uppercase">
Cửa hàng & Hotline
</h4> <div class="space-y-2.5 text-sm text-neutral-400"> ${shopAddresses.length > 0 ? shopAddresses.map((addressItem) => renderTemplate`<p class="flex items-start gap-2.5"> <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span> ${addressItem.label && renderTemplate`<span class="block font-semibold text-white">${addressItem.label}</span>`} <span>${addressItem.address}</span> </span> </p>`) : renderTemplate`<p class="flex items-start gap-2.5"> <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span>${shopInfo.address}</span> </p>`} <p class="flex items-center gap-2.5"> <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <span class="text-white font-bold">${shopInfo.hotline}</span> </p> <p class="flex items-center gap-2.5"> <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span>${shopInfo.opening_hours}</span> </p> </div> <div class="pt-2"> <a id="footer-zalo-cta"${addAttribute(zaloConfig.url, "href")} target="_blank" rel="noopener noreferrer" class="btn-pill-primary w-full text-center text-sm py-2.5" data-cta-source="footer">
Nhắn Zalo Với Tiệm Hoa
</a> </div> </div> </div> <!-- Copyright and Admin portal entry --> <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4"> <p>${shopInfo.copyright || "\xA9 2026 FLOWER VIBES. All rights reserved."}</p> <div class="flex items-center gap-4"> <span>Designed for conversion via Zalo</span> <a href="/admin" class="text-neutral-500 hover:text-neutral-300 underline transition-colors">
Quản trị Admin
</a> </div> </div> </div> </footer> ${renderScript($$result, "D:/T03/flower-shop/src/components/common/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/components/common/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$FloatingZalo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FloatingZalo;
  const { zaloConfig } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="fixed bottom-6 right-6 z-40 flex items-center group"> <!-- Tooltip Bubble on Hover / Idle --> <div class="hidden sm:flex items-center mr-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-primary/10 text-xs font-semibold text-textColor-primary transform group-hover:scale-105 transition-all"> <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping"></span>
Đang online • Tư vấn ngay
</div> <!-- Floating Button --> <a id="floating-zalo-btn"${addAttribute(zaloConfig.url, "href")} target="_blank" rel="noopener noreferrer" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-xl animate-zalo-pulse hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label="Nhắn tin Zalo với tiệm hoa để được tư vấn và đặt hoa ngay" data-cta-source="floating"> <svg class="w-8 h-8 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.07-.17 1.05-.62 2.65-1.57 3.86 0 0 2.45-.3 4.25-1.54.48.07.97.11 1.48.11 5.52 0 10-4.03 10-9S17.52 2 12 2z"></path> </svg> </a> </div> ${renderScript($$result, "D:/T03/flower-shop/src/components/common/FloatingZalo.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/components/common/FloatingZalo.astro", void 0);

const $$Toast = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="app-toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transform transition-all duration-300 opacity-0 pointer-events-none translate-y-4 max-w-md w-[90%] sm:w-auto" role="alert" aria-live="polite"> <div class="flex items-center gap-3 bg-neutral-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 text-sm md:text-base"> <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <div id="toast-message" class="flex-1 font-medium leading-snug">
Thông báo
</div> </div> </div> ${renderScript($$result, "D:/T03/flower-shop/src/components/common/Toast.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/T03/flower-shop/src/components/common/Toast.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PublicLayout;
  const { settings, pageTitle, pageDescription, ogImage: customOgImage, canonicalUrl, structuredDataExtra } = Astro2.props;
  const title = pageTitle || settings.seo_config.meta_title;
  const description = pageDescription || settings.seo_config.meta_description;
  const ogImage = customOgImage || settings.seo_config.og_image;
  const canonicalDomain = canonicalUrl || settings.seo_config.canonical_domain || "https://flowervibes.vn";
  const shopAddresses = normalizeShopAddresses(settings.shop_info);
  const structuredAddress = shopAddresses.length > 0 ? shopAddresses.map((addressItem) => ({
    "@type": "PostalAddress",
    "streetAddress": addressItem.address,
    "addressLocality": "H\u1ED3 Ch\xED Minh",
    "addressCountry": "VN"
  })) : {
    "@type": "PostalAddress",
    "streetAddress": settings.shop_info.address,
    "addressLocality": "H\u1ED3 Ch\xED Minh",
    "addressCountry": "VN"
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": settings.shop_info.name,
    "description": description,
    "url": canonicalDomain,
    "telephone": settings.shop_info.hotline,
    "address": structuredAddress,
    "openingHours": "Mo-Su 07:30-21:30",
    "image": ogImage,
    "priceRange": "300.000\u0111 - 3.000.000\u0111"
  };
  return renderTemplate(_b || (_b = __template(['<html lang="vi" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- SEO Meta Tags (Section 11) --><title>", '</title><meta name="description"', '><link rel="canonical"', '><meta name="robots"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- JSON-LD Structured Data --><script type="application/ld+json">', "<\/script>", "", '</head> <body class="bg-background text-textColor-primary antialiased selection:bg-accent selection:text-primary min-h-screen flex flex-col"> <!-- Header --> ', ' <!-- Main Page Content --> <main class="flex-1"> ', " </main> <!-- Footer --> ", " <!-- Floating Zalo Button (FE-08) --> ", " <!-- Global Toast Notification Container (FE-06) --> ", " <!-- Analytics & Scroll Depth Tracker (Section 14) --> ", " </body> </html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(canonicalDomain, "href"), addAttribute(settings.seo_config.robots || "index, follow", "content"), addAttribute(canonicalDomain, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), unescapeHTML(JSON.stringify(structuredData)), structuredDataExtra && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredDataExtra))), renderHead(), renderComponent($$result, "Header", $$Header, { "zaloConfig": settings.zalo_config, "shopInfo": settings.shop_info }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "shopInfo": settings.shop_info, "zaloConfig": settings.zalo_config }), renderComponent($$result, "FloatingZalo", $$FloatingZalo, { "zaloConfig": settings.zalo_config }), renderComponent($$result, "Toast", $$Toast, {}), renderScript($$result, "D:/T03/flower-shop/src/layouts/PublicLayout.astro?astro&type=script&index=0&lang.ts"));
}, "D:/T03/flower-shop/src/layouts/PublicLayout.astro", void 0);

export { $$PublicLayout as $ };
