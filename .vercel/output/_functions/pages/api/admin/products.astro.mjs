import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
import { s as slugify, v as validateProduct } from '../../../chunks/product_C2ylGUAV.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const products = db.getAllAdminProducts();
    return new Response(
      JSON.stringify({
        success: true,
        data: products,
        meta: { total: products.length }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi lấy danh sách sản phẩm admin" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    } else if (body.slug) {
      body.slug = slugify(body.slug);
    }
    if (body.price !== void 0) body.price = Number(body.price);
    if (body.compare_at_price !== void 0 && body.compare_at_price !== null && body.compare_at_price !== "") {
      body.compare_at_price = Number(body.compare_at_price);
    } else {
      body.compare_at_price = null;
    }
    if (body.sort_order !== void 0) body.sort_order = Number(body.sort_order);
    const validation = validateProduct(body);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Dữ liệu sản phẩm không hợp lệ",
            fields: validation.errors
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const existing = db.getProductBySlug(body.slug);
    if (existing) {
      body.slug = `${body.slug}-${Date.now().toString().slice(-4)}`;
    }
    const created = db.createProduct({
      name: body.name,
      slug: body.slug,
      sku: body.sku || "",
      price: body.price,
      compare_at_price: body.compare_at_price,
      short_description: body.short_description || "",
      description: body.description || "",
      flower_components: body.flower_components || "",
      featured: Boolean(body.featured),
      status: body.status || "published",
      sort_order: body.sort_order || 0,
      images: body.images || [],
      occasions: body.occasions || []
    });
    return new Response(
      JSON.stringify({
        success: true,
        data: created
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi thêm mới sản phẩm" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
