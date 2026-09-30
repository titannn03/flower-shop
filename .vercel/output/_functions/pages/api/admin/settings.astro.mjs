import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const settings = db.getSettings();
    const commitments = db.getAllAdminCommitments();
    const auditLogs = db.getAuditLogs();
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          settings,
          commitments,
          auditLogs: auditLogs.slice(0, 50)
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: { code: "SERVER_ERROR", message: err.message } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const PATCH = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { zalo_config, shop_info, hero_config, seo_config, commitments } = body;
    if (zalo_config && zalo_config.url) {
      const url = zalo_config.url.trim();
      if (!url.startsWith("https://")) {
        return new Response(
          JSON.stringify({
            success: false,
            error: {
              code: "INVALID_ZALO_URL",
              message: "Link Zalo phải sử dụng giao thức bảo mật https:// (ví dụ: https://zalo.me/...)"
            }
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    const updated = db.updateSettings({
      ...zalo_config && { zalo_config },
      ...shop_info && { shop_info },
      ...hero_config && { hero_config },
      ...seo_config && { seo_config }
    });
    if (Array.isArray(commitments)) {
      for (const com of commitments) {
        if (com.id) {
          db.updateCommitment(com.id, com);
        }
      }
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: updated,
        message: "Cập nhật cấu hình website thành công"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: { code: "SERVER_ERROR", message: err.message } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
