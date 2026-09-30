import { d as db } from '../../../chunks/db_C-NJjIRF.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const list = db.getAllAdminTestimonials();
    return new Response(
      JSON.stringify({ success: true, data: list }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: { code: "SERVER_ERROR", message: err.message } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { customer_name, content, image_url, rating = 5, status = "active", sort_order = 0 } = body;
    if (!customer_name || !content) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Tên khách hàng và nội dung đánh giá là bắt buộc" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const created = db.createTestimonial({
      customer_name,
      content,
      image_url: image_url || "",
      rating: Number(rating) || 5,
      status: status === "inactive" ? "inactive" : "active",
      sort_order: Number(sort_order) || 0
    });
    return new Response(
      JSON.stringify({ success: true, data: created }),
      { status: 201, headers: { "Content-Type": "application/json" } }
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
    const { id, ...updates } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Thiếu ID đánh giá" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const updated = db.updateTestimonial(id, updates);
    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: { code: "SERVER_ERROR", message: err.message } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: { code: "BAD_REQUEST", message: "Thiếu ID đánh giá" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    db.deleteTestimonial(id);
    return new Response(
      JSON.stringify({ success: true, message: "Đã xóa đánh giá thành công" }),
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
  DELETE,
  GET,
  PATCH,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
