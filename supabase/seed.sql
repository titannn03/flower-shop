-- seed.sql
-- Dữ liệu mẫu cho Flower Shop
-- Dùng để dán trực tiếp vào Supabase SQL editor

BEGIN;

-- 1) Occasions
INSERT INTO public.occasions (id, name, slug, sort_order, active)
VALUES
    ('11111111-1111-1111-1111-111111111101', 'Tất cả', 'all', 0, true),
    ('11111111-1111-1111-1111-111111111102', 'Sinh nhật', 'sinh-nhat', 1, true),
    ('11111111-1111-1111-1111-111111111103', 'Tình yêu & Valentine', 'tinh-yeu', 2, true),
    ('11111111-1111-1111-1111-111111111104', 'Khai trương & Sự kiện', 'khai-truong', 3, true),
    ('11111111-1111-1111-1111-111111111105', 'Tốt nghiệp', 'tot-nghiep', 4, true),
    ('11111111-1111-1111-1111-111111111106', 'Chia buồn', 'chia-buon', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- 2) Products
INSERT INTO public.products (
    id, name, slug, sku, price, compare_at_price,
    short_description, description, flower_components,
    featured, status, sort_order
)
VALUES
    (
        '22222222-2222-2222-2222-222222222201',
        'Bó Hoa Hồng Đỏ Juliet Khúc Tình Ca',
        'bo-hoa-hong-do-juliet-khuc-tinh-ca',
        'FLW-001',
        650000,
        780000,
        'Bó hoa hồng đỏ Ecuador phối cùng baby trắng tinh khôi, tượng trưng cho tình yêu nồng cháy bất tận.',
        'Bó hoa mang phong cách hiện đại lãng mạn, sử dụng hoa hồng đỏ Ecuador nhập khẩu cánh dày, bung đều và thơm dịu. Đi kèm giấy gói phong cách Hàn Quốc thanh lịch.',
        'Hoa hồng đỏ Ecuador 15 bông, hoa baby trắng Hà Lan, lá bạc nhập khẩu',
        true,
        'published',
        1
    ),
    (
        '22222222-2222-2222-2222-222222222202',
        'Lẵng Hoa Khai Trương Hồng Phát Thịnh Vượng',
        'lang-hoa-khai-truong-hong-phat-thinh-vuong',
        'FLW-002',
        1250000,
        1500000,
        'Lẵng hoa tone cam vàng rực rỡ mang năng lượng may mắn, chúc mừng sự nghiệp khởi sắc và tài lộc.',
        'Thiết kế lẵng gỗ sang trọng, kết hợp hoa hướng dương, lan hồ điệp và hoa đồng tiền tone ấm, thích hợp gửi gắm lời chúc phát đạt.',
        'Hoa hướng dương Đà Lạt, Lan vũ nữ, Hoa hồng vàng, Đồng tiền cam, lá phụ',
        true,
        'published',
        2
    ),
    (
        '22222222-2222-2222-2222-222222222203',
        'Hộp Hoa Pastel Nắng Mai Dịu Dàng',
        'hop-hoa-pastel-nang-mai-diu-dang',
        'FLW-003',
        590000,
        690000,
        'Tone hồng pastel nhẹ nhàng dành tặng bạn gái, mẹ hoặc đồng nghiệp nhân ngày sinh nhật.',
        'Hộp tròn cao cấp tone pastel vintage, phối màu tao nhã mang lại cảm giác bình yên và ấm áp.',
        'Hoa hồng Ohara phấn, Cát tường trắng, Cẩm chướng hồng pastel, Hoa nhung tuyết',
        true,
        'published',
        3
    ),
    (
        '22222222-2222-2222-2222-222222222204',
        'Bó Hoa Cúc Tana Mộc Mạc Tinh Khôi',
        'bo-hoa-cuc-tana-moc-mac-tinh-khoi',
        'FLW-004',
        380000,
        NULL,
        'Vẻ đẹp trong trẻo, giản dị như nụ cười đầu tiên. Thích hợp tặng tốt nghiệp hoặc kỷ niệm nhẹ nhàng.',
        'Cúc Tana thuần khiết điểm lá bạc khuynh diệp thơm mát, gói giấy Kraft tối giản bảo vệ môi trường.',
        'Cúc Tana tươi Đà Lạt, Lá khuynh diệp bạc, Nơ ruy băng lụa',
        false,
        'published',
        4
    ),
    (
        '22222222-2222-2222-2222-222222222205',
        'Bình Hoa Lan Hồ Điệp Trắng Quý Phái',
        'binh-hoa-lan-ho-diep-trang-quy-phai',
        'FLW-005',
        2200000,
        2600000,
        '5 cành lan hồ điệp trắng cánh to tuyển chọn chậu gốm sứ Bát Tràng cao cấp dành cho không gian sang trọng.',
        'Lan hồ điệp loại A độ bền trên 1 tháng, cành vươn đối xứng mang lại phong thủy cát tường.',
        'Lan hồ điệp trắng 5 cành loại A, chậu sứ viền vàng, trang trí nơ lụa & rêu xanh tự nhiên',
        true,
        'published',
        5
    ),
    (
        '22222222-2222-2222-2222-222222222206',
        'Kệ Hoa Tưởng Niệm Bình An Giấc Mộng',
        'ke-hoa-tuong-niem-binh-an-giac-mong',
        'FLW-006',
        950000,
        NULL,
        'Tone trắng xanh trang nghiêm, gửi gắm lời nguyện cầu thanh thản và sẻ chia chân thành.',
        'Kệ hoa 2 tầng sử dụng hoa ly trắng, cúc trắng và cẩm chướng nhẹ nhàng, cắm theo dáng truyền thống trang trọng.',
        'Hoa ly trắng, hoa cúc vạn thọ trắng, cúc mai, cành dương xỉ',
        false,
        'published',
        6
    )
ON CONFLICT (slug) DO NOTHING;

-- 3) Product occasions
INSERT INTO public.product_occasions (product_id, occasion_id)
VALUES
    ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111103'),
    ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111102'),
    ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111104'),
    ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111102'),
    ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111103'),
    ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111105'),
    ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111102'),
    ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111104'),
    ('22222222-2222-2222-2222-222222222206', '11111111-1111-1111-1111-111111111106')
ON CONFLICT (product_id, occasion_id) DO NOTHING;

-- 4) Product images
INSERT INTO public.product_images (id, product_id, secure_url, alt_text, width, height, is_cover, sort_order)
VALUES
    ('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80', 'Bó hoa hồng đỏ Ecuador Khúc Tình Ca', 800, 1000, true, 0),
    ('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222201', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80', 'Cận cảnh hoa hồng đỏ Ecuador', 800, 1000, false, 1),
    ('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222202', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', 'Lẵng hoa khai trương tone cam rực rỡ', 800, 1000, true, 0),
    ('33333333-3333-3333-3333-333333333304', '22222222-2222-2222-2222-222222222203', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', 'Hộp hoa tone hồng pastel ngọt ngào', 800, 1000, true, 0),
    ('33333333-3333-3333-3333-333333333305', '22222222-2222-2222-2222-222222222204', 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80', 'Bó hoa cúc tana mộc mạc tinh tế', 800, 1000, true, 0),
    ('33333333-3333-3333-3333-333333333306', '22222222-2222-2222-2222-222222222205', 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80', 'Chậu lan hồ điệp trắng sang trọng', 800, 1000, true, 0),
    ('33333333-3333-3333-3333-333333333307', '22222222-2222-2222-2222-222222222206', 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80', 'Kệ hoa viếng trang trọng bình an', 800, 1000, true, 0)
ON CONFLICT (product_id, secure_url) DO NOTHING;

-- 5) Commitments
INSERT INTO public.commitments (id, icon_key, title, description, active, sort_order)
VALUES
    ('44444444-4444-4444-4444-444444444401', 'sparkles', 'Hoa Tươi Trong Ngày Tuyển Chọn', '100% hoa được nhập mới mỗi sáng từ Đà Lạt và nguồn nhập khẩu uy tín, giữ độ bền 3-7 ngày.', true, 1),
    ('44444444-4444-4444-4444-444444444402', 'clock', 'Giao Nhanh Trong 2 Giờ', 'Đội ngũ giao hoa chuyên nghiệp, bảo quản hoa đứng dáng, chụp ảnh hoa thành phẩm gửi khách trước khi đi.', true, 2),
    ('44444444-4444-4444-4444-444444444403', 'gift', 'Tặng Thiệp & Banner Thiết Kế', 'Miễn phí thiệp chúc mừng hoặc banner in theo yêu cầu, nắn nót từng thông điệp yêu thương.', true, 3),
    ('44444444-4444-4444-4444-444444444404', 'shield-check', 'Đổi Trả & Hoàn Tiền 100%', 'Cam kết đổi mới hoặc hoàn tiền ngay lập tức nếu hoa bị dập nát, héo úa hoặc không đúng mẫu cam kết.', true, 4)
ON CONFLICT (title) DO NOTHING;

-- 6) Testimonials
INSERT INTO public.testimonials (id, customer_name, content, image_url, rating, status, sort_order)
VALUES
    ('55555555-5555-5555-5555-555555555501', 'Chị Mai Anh (Quận 1, TP.HCM)', 'Hoa nhận được đẹp hơn cả hình mẫu trên web! Cánh hoa tươi mơn mởn, shop còn chụp ảnh trước khi giao và gửi thiệp viết tay cực kỳ chỉn chu.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', 5, 'active', 1),
    ('55555555-5555-5555-5555-555555555502', 'Anh Quốc Bảo (Hà Nội)', 'Đặt hoa tặng sinh nhật người yêu lúc 9h sáng mà 10h30 đã giao tận tay. Nhắn Zalo được nhân viên tư vấn nhiệt tình, bạn gái mình thích mê bó hồng đỏ.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 5, 'active', 2),
    ('55555555-5555-5555-5555-555555555503', 'Chị Thu Trang (CEO TechLab)', 'Bên mình thường xuyên đặt lẵng hoa khai trương đối tác ở đây. Đúng giờ, hoa sang trọng, xuất hóa đơn nhanh chóng. Rất yên tâm!', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 5, 'active', 3)
ON CONFLICT (customer_name, content) DO NOTHING;

-- 7) Videos
INSERT INTO public.videos (id, provider, source_url, external_id, embed_url, thumbnail_url, title, caption, status, sort_order)
VALUES
    ('66666666-6666-6666-6666-666666666601', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', 'Hành Trình Cắm Bó Hoa Hồng Ohara Cao Cấp', 'Từng cành hoa được florists nắn nót tỉ mỉ để gửi trọn tâm tình đến người nhận.', 'active', 1),
    ('66666666-6666-6666-6666-666666666602', 'tiktok', 'https://www.tiktok.com/@flowershop/video/7123456789012345678', '7123456789012345678', 'https://www.tiktok.com/embed/v2/7123456789012345678', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80', 'Tips Giữ Hoa Tươi Lâu Hơn 7 Ngày Tại Nhà', 'Bí quyết cắt gốc vát 45 độ và thay nước dưỡng hoa cùng chuyên gia cắm hoa.', 'active', 2)
ON CONFLICT (source_url) DO NOTHING;

-- 8) Site settings
INSERT INTO public.site_settings (key, value)
VALUES
    (
        'zalo_config',
        '{
          "url": "https://zalo.me/0901234567",
          "hotline": "0939.206.602",
          "zalo_oa_id": "0939206602"
        }'::jsonb
    ),
    (
        'shop_info',
        '{
          "name": "TIỆM HOA AN KHÁNH",
          "slogan": "Trao Gửi Yêu Thương - Đong Đầy Xúc Cảm",
          "address": "126 Trần Bạch Đằng, phường An Khánh (cũ), quận Ninh Kiều, TP. Cần Thơ",
          "addresses": [
            {"id": "branch-1", "label": "Chi nhánh 1", "address": "126 Trần Bạch Đằng, phường An Khánh (cũ), quận Ninh Kiều, TP. Cần Thơ"},
            {"id": "branch-2", "label": "Chi nhánh 2", "address": "2025 Hùng Vương, Tp Ngã Bảy (chỉ nhận đặt trước)"},
            {"id": "branch-3", "label": "Chi nhánh 3", "address": "Thị Trấn Long Hồ - Tỉnh Vĩnh Long (chỉ nhận đặt trước)"}
          ],
          "hotline": "0939.206.602",
          "email": "contact@flowervibes.vn",
          "opening_hours": "08:00 - 22:00 (Mỗi ngày, kể cả Lễ Tết)",
          "copyright": "© 2026 FLOWER VIBES STUDIO. All rights reserved."
        }'::jsonb
    ),
    (
        'hero_config',
        '{
          "eyebrow": "TIỆM HOA NGHỆ THUẬT & QUÀ TẶNG CẢM XÚC",
          "headline": "Mỗi Bó Hoa Là Một Câu Chuyện Tình Yêu",
          "subheadline": "Tuyển chọn những đóa hoa tươi rạng rỡ nhất từ Đà Lạt và hoa nhập khẩu. Thiết kế tinh tế, giao hỏa tốc 2 giờ, tư vấn tận tâm qua Zalo.",
          "cta_label": "Tư Vấn & Đặt Hoa Ngay",
          "cta_secondary_label": "Khám Phá Bộ Sưu Tập"
        }'::jsonb
    ),
    (
        'seo_config',
        '{
          "meta_title": "FLOWER VIBES - Tiệm Hoa Tươi Nghệ Thuật & Quà Tặng Giao Nhanh 2H",
          "meta_description": "Tiệm hoa tươi cao cấp giao nhanh nội ô TP. Cần Thơ. Hoa sinh nhật, khai trương, tốt nghiệp, hoa tình yêu thiết kế tinh tế. Chat Zalo nhận mẫu và ưu đãi ngay!",
          "og_image": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
          "canonical_domain": "https://flowervibes.vn",
          "robots": "index, follow"
        }'::jsonb
    )
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

COMMIT;
