function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function validateProduct(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Tên sản phẩm phải có ít nhất 2 ký tự";
  } else if (data.name.trim().length > 150) {
    errors.name = "Tên sản phẩm không được vượt quá 150 ký tự";
  }
  if (typeof data.price !== "number" || data.price < 0) {
    errors.price = "Giá bán phải là số không âm";
  }
  if (data.compare_at_price !== void 0 && data.compare_at_price !== null) {
    if (data.compare_at_price < 0) {
      errors.compare_at_price = "Giá gốc không được là số âm";
    } else if (typeof data.price === "number" && data.compare_at_price < data.price) {
      errors.compare_at_price = "Giá gốc (nếu có) phải lớn hơn hoặc bằng giá bán";
    }
  }
  if (data.short_description && data.short_description.length > 250) {
    errors.short_description = "Mô tả ngắn tối đa 250 ký tự";
  }
  if (data.status === "published") {
    if (!data.name || typeof data.price !== "number") {
      errors.status = "Cần đầy đủ tên và giá để xuất bản";
    }
    const hasCover = data.images && data.images.some((img) => img.is_cover || img.secure_url);
    if (!hasCover) {
      errors.images = "Sản phẩm cần tối thiểu một ảnh bìa (cover image) trước khi xuất bản";
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
function formatCurrencyVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(amount).replace("₫", "").trim() + " ₫";
}

export { formatCurrencyVND as f, slugify as s, validateProduct as v };
