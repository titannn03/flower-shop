import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const occasion = url.searchParams.get("occasion") || void 0;
    const products = db.getPublicProducts(occasion);
    return new Response(
      JSON.stringify({
        success: true,
        data: products,
        meta: { total: products.length }
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
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi lấy danh sách sản phẩm" }
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
