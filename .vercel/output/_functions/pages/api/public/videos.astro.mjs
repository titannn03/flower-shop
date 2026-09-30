import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const videos = db.getPublicVideos();
    return new Response(
      JSON.stringify({
        success: true,
        data: videos,
        meta: { total: videos.length }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi lấy danh sách video" }
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
