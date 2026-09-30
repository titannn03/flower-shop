import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const settings = db.getSettings();
    const commitments = db.getCommitments();
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          shop_info: settings.shop_info,
          hero_config: settings.hero_config,
          zalo_config: settings.zalo_config,
          seo_config: settings.seo_config,
          commitments
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi lấy cấu hình website" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
