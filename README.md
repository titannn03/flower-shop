# 🌸 Tiệm Hoa Tươi - Flower Shop Landing Page & Admin Dashboard

Hệ thống Website Bán Hoa Tươi hoàn chỉnh, tối ưu hóa chuyển đổi qua **Zalo Chat**, tích hợp Landing Page tốc độ cao và Trang Quản trị (Admin Dashboard) toàn diện theo tài liệu đặc tả kỹ thuật v2.0.

---

## 📌 1. Tính Năng Nổi Bật

### 🌐 Khách Hàng (Public Landing Page)
- **Tối ưu chuyển đổi qua Zalo (Conversion Engine)**:
  - Nút Zalo nổi góc màn hình kèm hiệu ứng nhịp tim (pulse) và thông báo số tin nhắn mới.
  - Mỗi sản phẩm có nút **"Nhắn Zalo Ngay"**: Tự động sao chép tên sản phẩm vào clipboard, kích hoạt thông báo Toast phản hồi trực quan, và mở cuộc hội thoại Zalo trực tiếp với chủ tiệm.
  - Các nút CTA trên Hero Section và Banner đều tích hợp deep link Zalo kèm tracking `source`.
- **Hiệu ứng cánh hoa rơi nhẹ (Petal Particles)**:
  - Tạo không gian nghệ thuật, lãng mạn cho cửa hàng hoa.
  - Tự động tắt hiệu ứng khi người dùng bật chế độ `prefers-reduced-motion` nhằm bảo vệ trải nghiệm và tiết kiệm tài nguyên.
- **Bộ lọc & Danh mục linh hoạt**:
  - Lọc nhanh theo dịp: Sinh nhật, Khai trương, Tình yêu, Chúc mừng, Chia buồn,...
  - Bộ sưu tập hoa nổi bật và toàn bộ danh mục sản phẩm kèm thông tin giá (VND) minh bạch.
- **Video Thực Tế (YouTube & TikTok)**:
  - Facade player tối ưu tốc độ tải trang ban đầu (Lazy loading iframe).
  - Tương thích định dạng ngang 16:9 (YouTube) và dọc 9:16 (TikTok).
  - Tự động hiển thị fallback banner và nút mở link trực tiếp khi không thể nhúng video.
- **Cam kết & Đánh giá khách hàng**:
  - 4 cam kết vàng về chất lượng hoa tươi, giao hỏa tốc 60 phút, chụp ảnh trước khi giao.
  - Lời chứng thực (Testimonials) chân thực với đánh giá 5 sao.
- **SEO & Tối ưu hiệu năng**:
  - Chuẩn SEO Open Graph, Twitter Cards, Schema.org `Florist` JSON-LD.
  - Tốc độ tải trang đạt điểm tối đa nhờ kiến trúc Astro Zero-JS By Default.

### 🛡️ Quản Trị Viên (Admin Dashboard)
- **Bảo mật & Phân quyền**:
  - Đăng nhập bảo mật với cơ chế Rate Limiting: Khóa tạm thời 60 giây sau 5 lần nhập sai liên tiếp.
  - Middleware bảo vệ toàn bộ các trang và API admin (`/admin/*`, `/api/admin/*`).
- **Quản lý Sản phẩm**:
  - Thêm, sửa, xóa mềm (Soft delete) sản phẩm.
  - Bật/tắt trạng thái kinh doanh nhanh chóng.
  - Hỗ trợ tải ảnh với tính năng **Client-side Auto Resize**: Kiểm tra kích thước tối đa 5MB và tự động nén/thu nhỏ về chiều rộng tối đa 1920px bằng HTML5 Canvas trước khi gửi lên Cloudinary.
- **Quản lý Video & Lời chứng thực**:
  - Trích xuất tự động Video ID từ đường link YouTube hoặc TikTok.
  - Xem trước (Live preview) ngay trong trang quản trị.
  - Quản lý danh sách đánh giá từ khách hàng.
- **Cấu hình Hệ thống**:
  - Điều chỉnh số điện thoại Zalo nhận tin nhắn, tên cửa hàng, hotline, địa chỉ, giờ mở cửa.
  - Cập nhật banner Hero, tiêu đề và mô tả SEO.

---

## 🛠️ 2. Công Nghệ Sử Dụng

- **Frontend & Server Engine**: [Astro 5](https://astro.build/) (Hỗ trợ Server-Side Rendering / Node adapter).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Glassmorphism UI.
- **Ngôn ngữ**: TypeScript 5.
- **Cơ sở dữ liệu**:
  - **In-Memory & JSON Storage**: Tích hợp sẵn trong mã nguồn, hoạt động trơn tru ngay cả khi chưa kết nối database ngoài.
  - **Supabase (PostgreSQL)**: Script tạo bảng, RLS Policies và Seed data hoàn chỉnh (`supabase/`).
- **Lưu trữ hình ảnh**: [Cloudinary](https://cloudinary.com/) (Hỗ trợ upload có chữ ký xác thực - Signed uploads).
- **Kiểm thử tự động**: Kịch bản kiểm thử TypeScript kiểm tra toàn bộ Business Rules (BR-01 -> BR-08) và Test Cases (TC-01 -> TC-14).

---

## 🚀 3. Hướng Dẫn Cài Đặt & Chạy Thử

### Yêu Cầu
- [Node.js](https://nodejs.org/) v18.0.0 trở lên.
- Trình quản lý gói `npm`.

### Bước 1: Khởi tạo dự án
```bash
# Clone hoặc mở thư mục dự án
cd d:/T03/flower-shop

# Cài đặt thư viện phụ thuộc
npm install
```

### Bước 2: Thiết lập biến môi trường
File `.env` đã được cấu hình sẵn các giá trị mặc định cho môi trường phát triển cục bộ:
```env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ZALO_PHONE=0901234567

# Thông tin đăng nhập Admin mặc định
ADMIN_USERNAME=admin
ADMIN_PASSWORD=FlowerAdmin@2026
ADMIN_SESSION_SECRET=flower-shop-super-secret-key-change-in-production-2026

# Supabase (Tùy chọn khi kết nối cơ sở dữ liệu cloud)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary (Tùy chọn khi upload ảnh thực tế)
PUBLIC_CLOUDINARY_CLOUD_NAME=demo-cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Bước 3: Chạy ứng dụng
```bash
# Khởi chạy môi trường phát triển (Dev server)
npm run dev
```
Mở trình duyệt tại:
- **Trang chủ (Landing Page)**: [http://localhost:4321](http://localhost:4321)
- **Trang Đăng nhập Quản trị**: [http://localhost:4321/admin/login](http://localhost:4321/admin/login)

---

## 🔑 4. Tài Khoản Quản Trị Mặc Định

| Tên người dùng (Username) | Mật khẩu (Password) | Quyền hạn |
| :--- | :--- | :--- |
| `admin` | `FlowerAdmin@2026` | Toàn quyền (Super Admin) |

---

## 🧪 5. Kiểm Thử Hệ Thống (Testing & Verification)

Dự án đi kèm bộ kịch bản kiểm thử tự động kiểm tra toàn bộ các yêu cầu từ tài liệu đặc tả:
```bash
# Chạy bộ test suite
npm test
```

### Các kịch bản được kiểm thử tự động:
- **BR-01**: Danh mục sản phẩm khởi tạo đầy đủ các trường bắt buộc (`name`, `price > 0`, `image_url`, `occasions`).
- **BR-02**: Số điện thoại Zalo hợp lệ theo định dạng viễn thông Việt Nam (10 chữ số).
- **BR-03**: Định dạng tiền tệ hiển thị đúng chuẩn Việt Nam Đồng (VND / ₫).
- **BR-04 & TC-07**: Trích xuất Video ID chính xác cho các dạng link YouTube thông thường, YouTube Shorts và TikTok.
- **BR-07**: Phủ đủ các danh mục dịp lễ cơ bản (Sinh nhật, Khai trương, Tình yêu,...).
- **TC-02**: Ràng buộc dữ liệu sản phẩm (loại bỏ giá âm, chuỗi tên rỗng).
- **TC-05**: Nghiệp vụ Xóa mềm (Soft Delete) không làm mất dữ liệu gốc.
- **TC-06**: Hệ thống tải dữ liệu Video và Lời chứng thực ổn định.
- **TC-14**: Cập nhật cấu hình cửa hàng từ trang quản trị thành công.

---

## 🗄️ 6. Cơ Sở Dữ Liệu Supabase (Tùy chọn)

Nếu bạn muốn kết nối với cơ sở dữ liệu Supabase trên cloud, hãy thực hiện theo thứ tự trong thư mục `supabase/`:
1. `supabase/migrations/001_initial_schema.sql`: Khởi tạo 10 bảng dữ liệu chuẩn.
2. `supabase/policies.sql`: Thiết lập Row Level Security (RLS) bảo vệ dữ liệu.
3. `supabase/seed.sql`: Nạp dữ liệu mẫu ban đầu về sản phẩm, video, đánh giá và cấu hình.

---

## 📦 7. Đóng Gói Ứng Dụng (Production Build)

```bash
# Biên dịch mã nguồn cho môi trường Production
npm run build

# Chạy bản dựng sản phẩm
npm run preview
```

---
*Dự án hoàn thiện theo tiêu chuẩn tài liệu đặc tả v2.0 - Sẵn sàng vận hành kinh doanh thực tế.*
