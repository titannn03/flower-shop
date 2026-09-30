import { d as db } from '../../../../chunks/db_C-NJjIRF.mjs';
import { s as slugify, v as validateProduct } from '../../../../chunks/product_C2ylGUAV.mjs';
export { renderers } from '../../../../renderers.mjs';

const PATCH = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Thiếu ID sản phẩm" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const body = await request.json().catch(() => ({}));
    if (body.slug) {
      body.slug = slugify(body.slug);
    }
    if (body.price !== void 0) body.price = Number(body.price);
    if (body.compare_at_price !== void 0 && body.compare_at_price !== null && body.compare_at_price !== "") {
      body.compare_at_price = Number(body.compare_at_price);
    } else if (body.compare_at_price === "") {
      body.compare_at_price = null;
    }
    if (body.sort_order !== void 0) body.sort_order = Number(body.sort_order);
    const existing = db.getProductById(id);
    if (!existing) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "NOT_FOUND", message: "Không tìm thấy sản phẩm" } }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const merged = { ...existing, ...body };
    const validation = validateProduct(merged);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Dữ liệu cập nhật không hợp lệ",
            fields: validation.errors
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const updated = db.updateProduct(id, body);
    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi cập nhật sản phẩm" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Thiếu ID sản phẩm" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const success = db.softDeleteProduct(id);
    if (!success) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "NOT_FOUND", message: "Không tìm thấy sản phẩm cần xóa" } }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Đã xóa sản phẩm thành công (soft delete lưu trữ lịch sử)"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi xóa sản phẩm" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const GET = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Thiếu ID sản phẩm" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const product = db.getProductById(id);
    if (!product) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "NOT_FOUND", message: "Không tìm thấy sản phẩm" } }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, data: product }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: { code: "SERVER_ERROR", message: err.message || "Lỗi lấy thông tin sản phẩm" } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
