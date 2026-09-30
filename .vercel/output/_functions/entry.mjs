import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B3gCl_Wa.mjs';
import { manifest } from './manifest_COlxRVze.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/products/new.astro.mjs');
const _page4 = () => import('./pages/admin/products/_id_/edit.astro.mjs');
const _page5 = () => import('./pages/admin/products.astro.mjs');
const _page6 = () => import('./pages/admin/settings.astro.mjs');
const _page7 = () => import('./pages/admin/testimonials.astro.mjs');
const _page8 = () => import('./pages/admin/videos.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/api/admin/auth.astro.mjs');
const _page11 = () => import('./pages/api/admin/media.astro.mjs');
const _page12 = () => import('./pages/api/admin/products/_id_.astro.mjs');
const _page13 = () => import('./pages/api/admin/products.astro.mjs');
const _page14 = () => import('./pages/api/admin/settings.astro.mjs');
const _page15 = () => import('./pages/api/admin/testimonials.astro.mjs');
const _page16 = () => import('./pages/api/admin/videos.astro.mjs');
const _page17 = () => import('./pages/api/cloudinary-sign.astro.mjs');
const _page18 = () => import('./pages/api/public/products/_slug_.astro.mjs');
const _page19 = () => import('./pages/api/public/products.astro.mjs');
const _page20 = () => import('./pages/api/public/site.astro.mjs');
const _page21 = () => import('./pages/api/public/testimonials.astro.mjs');
const _page22 = () => import('./pages/api/public/videos.astro.mjs');
const _page23 = () => import('./pages/products/_slug_.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/products/new.astro", _page3],
    ["src/pages/admin/products/[id]/edit.astro", _page4],
    ["src/pages/admin/products/index.astro", _page5],
    ["src/pages/admin/settings/index.astro", _page6],
    ["src/pages/admin/testimonials/index.astro", _page7],
    ["src/pages/admin/videos/index.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/api/admin/auth.ts", _page10],
    ["src/pages/api/admin/media.ts", _page11],
    ["src/pages/api/admin/products/[id].ts", _page12],
    ["src/pages/api/admin/products.ts", _page13],
    ["src/pages/api/admin/settings.ts", _page14],
    ["src/pages/api/admin/testimonials.ts", _page15],
    ["src/pages/api/admin/videos.ts", _page16],
    ["src/pages/api/cloudinary-sign.ts", _page17],
    ["src/pages/api/public/products/[slug].ts", _page18],
    ["src/pages/api/public/products.ts", _page19],
    ["src/pages/api/public/site.ts", _page20],
    ["src/pages/api/public/testimonials.ts", _page21],
    ["src/pages/api/public/videos.ts", _page22],
    ["src/pages/products/[slug].astro", _page23],
    ["src/pages/index.astro", _page24]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "57233a0d-0c33-4408-a4dc-3a967e1b03ea",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
