import crypto from 'node:crypto';
export { renderers } from '../../renderers.mjs';

function generateUploadSignature(folder = "flower-shop") {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!apiSecret || !apiKey || !cloudName) {
    return null;
  }
  const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");
  return {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder
  };
}

const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const folder = body.folder || "flower-shop";
    const signatureData = generateUploadSignature(folder);
    if (!signatureData) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "CONFIG_MISSING",
            message: "Cloudinary credentials are not configured in environment variables."
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: signatureData
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: err.message || "Lỗi cấp chữ ký upload" }
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
