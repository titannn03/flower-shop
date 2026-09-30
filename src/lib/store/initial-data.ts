// src/lib/store/initial-data.ts
import type { Product, Occasion, Video, Testimonial, Commitment, SiteSettings } from '../../types';

export const initialOccasions: Occasion[] = [
  { id: 'occ-1', name: 'Tất cả', slug: 'all', sort_order: 0, active: true },
  { id: 'occ-2', name: 'Sinh nhật', slug: 'sinh-nhat', sort_order: 1, active: true },
  { id: 'occ-3', name: 'Tình yêu & Valentine', slug: 'tinh-yeu', sort_order: 2, active: true },
  { id: 'occ-4', name: 'Khai trương & Sự kiện', slug: 'khai-truong', sort_order: 3, active: true },
  { id: 'occ-5', name: 'Tốt nghiệp', slug: 'tot-nghiep', sort_order: 4, active: true },
  { id: 'occ-6', name: 'Chia buồn', slug: 'chia-buon', sort_order: 5, active: true }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Bó Hoa Hồng Đỏ Juliet Khúc Tình Ca',
    slug: 'bo-hoa-hong-do-juliet-khuc-tinh-ca',
    sku: 'FLW-001',
    price: 650000,
    compare_at_price: 780000,
    short_description: 'Bó hoa hồng đỏ Ecuador phối cùng baby trắng tinh khôi, tượng trưng cho tình yêu nồng cháy bất tận.',
    description: '<p>Bó hoa mang phong cách hiện đại lãng mạn, sử dụng <strong>hoa hồng đỏ Ecuador nhập khẩu</strong> cánh dày, bung đều và thơm dịu. Đi kèm giấy gói phong cách Hàn Quốc thanh lịch, tôn vinh trọn vẹn vẻ đẹp kiêu sa của hoa.</p>',
    flower_components: 'Hoa hồng đỏ Ecuador 15 bông, hoa baby trắng Hà Lan, lá bạc nhập khẩu',
    featured: true,
    status: 'published',
    sort_order: 1,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-1-1',
        secure_url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Bó hoa hồng đỏ Ecuador Khúc Tình Ca',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      },
      {
        id: 'img-1-2',
        secure_url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Cận cảnh hoa hồng đỏ Ecuador bung cánh',
        width: 800,
        height: 1000,
        is_cover: false,
        sort_order: 1
      },
      {
        id: 'vid-1-1',
        media_type: 'video',
        video_provider: 'youtube',
        video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        secure_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        alt_text: 'Video quay thực tế bó hoa hồng Ohara',
        width: 1280,
        height: 720,
        is_cover: false,
        sort_order: 2
      }
    ],
    occasions: [
      { id: 'occ-3', name: 'Tình yêu & Valentine', slug: 'tinh-yeu', sort_order: 2, active: true },
      { id: 'occ-2', name: 'Sinh nhật', slug: 'sinh-nhat', sort_order: 1, active: true }
    ]
  },
  {
    id: 'prod-2',
    name: 'Lẵng Hoa Khai Trương Hồng Phát Thịnh Vượng',
    slug: 'lang-hoa-khai-truong-hong-phat-thinh-vuong',
    sku: 'FLW-002',
    price: 1250000,
    compare_at_price: 1500000,
    short_description: 'Lẵng hoa tone cam vàng rực rỡ mang năng lượng may mắn, chúc mừng sự nghiệp khởi sắc và tài lộc dồi dào.',
    description: '<p>Thiết kế lẵng gỗ sang trọng, phối kết tinh tế giữa <strong>hoa hướng dương, lan hồ điệp và hoa đồng tiền tone ấm</strong>. Sự lựa chọn hoàn hảo cho sự kiện khai trương, kỷ niệm thành lập hay tân gia.</p>',
    flower_components: 'Hoa hướng dương Đà Lạt, Lan vũ nữ, Hoa hồng vàng, Đồng tiền cam, lá phụ kiểng',
    featured: true,
    status: 'published',
    sort_order: 2,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-2-1',
        secure_url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Lẵng hoa khai trương tone cam rực rỡ',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      }
    ],
    occasions: [
      { id: 'occ-4', name: 'Khai trương & Sự kiện', slug: 'khai-truong', sort_order: 3, active: true }
    ]
  },
  {
    id: 'prod-3',
    name: 'Hộp Hoa Pastel Nắng Mai Dịu Dàng',
    slug: 'hop-hoa-pastel-nang-mai-diu-dang',
    sku: 'FLW-003',
    price: 590000,
    compare_at_price: 690000,
    short_description: 'Tone hồng pastel nhẹ nhàng dành tặng bạn gái, mẹ hoặc đồng nghiệp nhân ngày sinh nhật.',
    description: '<p>Hộp tròn cao cấp tone pastel vintage, phối màu tao nhã mang lại cảm giác bình yên và ấm áp ngọt ngào.</p>',
    flower_components: 'Hoa hồng Ohara phấn, Cát tường trắng, Cẩm chướng hồng pastel, Hoa nhung tuyết',
    featured: true,
    status: 'published',
    sort_order: 3,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-3-1',
        secure_url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Hộp hoa tone hồng pastel ngọt ngào',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      }
    ],
    occasions: [
      { id: 'occ-2', name: 'Sinh nhật', slug: 'sinh-nhat', sort_order: 1, active: true },
      { id: 'occ-3', name: 'Tình yêu & Valentine', slug: 'tinh-yeu', sort_order: 2, active: true }
    ]
  },
  {
    id: 'prod-4',
    name: 'Bó Hoa Cúc Tana Mộc Mạc Tinh Khôi',
    slug: 'bo-hoa-cuc-tana-moc-mac-tinh-khoi',
    sku: 'FLW-004',
    price: 380000,
    compare_at_price: null,
    short_description: 'Vẻ đẹp trong trẻo, giản dị như nụ cười đầu tiên. Thích hợp tặng tốt nghiệp hoặc kỷ niệm nhẹ nhàng.',
    description: '<p>Cúc Tana thuần khiết điểm lá bạc khuynh diệp thơm mát, gói giấy Kraft tối giản bảo vệ môi trường.</p>',
    flower_components: 'Cúc Tana tươi Đà Lạt, Lá khuynh diệp bạc, Nơ ruy băng lụa',
    featured: false,
    status: 'published',
    sort_order: 4,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-4-1',
        secure_url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Bó hoa cúc tana mộc mạc tinh tế',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      }
    ],
    occasions: [
      { id: 'occ-5', name: 'Tốt nghiệp', slug: 'tot-nghiep', sort_order: 4, active: true },
      { id: 'occ-2', name: 'Sinh nhật', slug: 'sinh-nhat', sort_order: 1, active: true }
    ]
  },
  {
    id: 'prod-5',
    name: 'Bình Hoa Lan Hồ Điệp Trắng Quý Phái',
    slug: 'binh-hoa-lan-ho-diep-trang-quy-phai',
    sku: 'FLW-005',
    price: 2200000,
    compare_at_price: 2600000,
    short_description: '5 cành lan hồ điệp trắng cánh to tuyển chọn chậu gốm sứ Bát Tràng cao cấp dành cho không gian sang trọng.',
    description: '<p>Lan hồ điệp loại A độ bền trên 1 tháng, cành vươn đối xứng mang lại phong thủy cát tường thịnh vượng.</p>',
    flower_components: 'Lan hồ điệp trắng 5 cành loại A, chậu sứ viền vàng, trang trí nơ lụa & rêu xanh tự nhiên',
    featured: true,
    status: 'published',
    sort_order: 5,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-5-1',
        secure_url: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Chậu lan hồ điệp trắng sang trọng',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      }
    ],
    occasions: [
      { id: 'occ-4', name: 'Khai trương & Sự kiện', slug: 'khai-truong', sort_order: 3, active: true }
    ]
  },
  {
    id: 'prod-6',
    name: 'Kệ Hoa Tưởng Niệm Bình An Giấc Mộng',
    slug: 'ke-hoa-tuong-niem-binh-an-giac-mong',
    sku: 'FLW-006',
    price: 950000,
    compare_at_price: null,
    short_description: 'Tone trắng xanh trang nghiêm, gửi gắm lời nguyện cầu thanh thản và sẻ chia chân thành.',
    description: '<p>Kệ hoa 2 tầng sử dụng hoa ly trắng, cúc trắng và cẩm chướng nhẹ nhàng, cắm theo dáng truyền thống trang trọng.</p>',
    flower_components: 'Hoa ly trắng, hoa cúc vạn thọ trắng, cúc mai, cành dương xỉ',
    featured: false,
    status: 'published',
    sort_order: 6,
    created_at: new Date().toISOString(),
    images: [
      {
        id: 'img-6-1',
        secure_url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Kệ hoa viếng trang trọng bình an',
        width: 800,
        height: 1000,
        is_cover: true,
        sort_order: 0
      }
    ],
    occasions: [
      { id: 'occ-6', name: 'Chia buồn', slug: 'chia-buon', sort_order: 5, active: true }
    ]
  }
];

export const initialCommitments: Commitment[] = [
  {
    id: 'com-1',
    icon_key: 'sparkles',
    title: 'Hoa Tươi Trong Ngày Tuyển Chọn',
    description: '100% hoa được nhập mới mỗi sáng từ Đà Lạt và các vựa hoa uy tín thế giới, đảm bảo độ tươi từ 3–7 ngày.',
    active: true,
    sort_order: 1
  },
  {
    id: 'com-2',
    icon_key: 'clock',
    title: 'Giao Nhanh Hỏa Tốc Trong 2 Giờ',
    description: 'Đội ngũ giao hoa chuyên nghiệp, xe giữ hoa đứng dáng, chụp ảnh hoa thành phẩm xác nhận trước khi giao.',
    active: true,
    sort_order: 2
  },
  {
    id: 'com-3',
    icon_key: 'gift',
    title: 'Tặng Thiệp & Banner Thiết Kế',
    description: 'Miễn phí thiệp chúc mừng hoặc dải banner thiết kế riêng theo tone hoa, nắn nót từng lời chúc yêu thương.',
    active: true,
    sort_order: 3
  },
  {
    id: 'com-4',
    icon_key: 'shield-check',
    title: 'Đổi Trả & Hoàn Tiền 100%',
    description: 'Cam kết đổi mới hoặc hoàn tiền lập tức nếu hoa bị dập nát, héo úa hoặc không đúng mẫu bạn đã đặt.',
    active: true,
    sort_order: 4
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customer_name: 'Chị Mai Anh (Quận 1, TP.HCM)',
    content: 'Hoa nhận được đẹp hơn cả hình chụp trên web! Cánh hoa tươi mơn mởn, shop còn chụp ảnh trước khi giao và gửi thiệp viết tay cực kỳ chỉn chu.',
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'active',
    sort_order: 1
  },
  {
    id: 'test-2',
    customer_name: 'Anh Quốc Bảo (Hà Nội)',
    content: 'Đặt hoa tặng sinh nhật người yêu lúc 9h sáng mà 10h30 đã giao tận tay. Nhắn Zalo được nhân viên tư vấn nhiệt tình, bạn gái mình thích mê bó hồng đỏ.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'active',
    sort_order: 2
  },
  {
    id: 'test-3',
    customer_name: 'Chị Thu Trang (CEO TechLab)',
    content: 'Bên mình thường xuyên đặt lẵng hoa khai trương đối tác ở đây. Đúng giờ, hoa sang trọng, xuất hóa đơn nhanh chóng. Rất yên tâm!',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'active',
    sort_order: 3
  }
];

export const initialVideos: Video[] = [
  {
    id: 'vid-1',
    provider: 'youtube',
    source_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    external_id: 'dQw4w9WgXcQ',
    embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    title: 'Hành Trình Cắm Bó Hoa Hồng Ohara Cao Cấp',
    caption: 'Từng cành hoa được florists nắn nót tỉ mỉ để gửi trọn tâm tình đến người nhận.',
    status: 'active',
    sort_order: 1
  },
  {
    id: 'vid-2',
    provider: 'tiktok',
    source_url: 'https://www.tiktok.com/@flowervibes/video/7123456789012345678',
    external_id: '7123456789012345678',
    embed_url: 'https://www.tiktok.com/embed/v2/7123456789012345678',
    thumbnail_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
    title: 'Tips Giữ Hoa Tươi Lâu Hơn 7 Ngày Tại Nhà',
    caption: 'Bí quyết cắt gốc vát 45 độ và thay nước dưỡng hoa cùng chuyên gia cắm hoa.',
    status: 'active',
    sort_order: 2
  }
];

export const initialSettings: SiteSettings = {
  zalo_config: {
    url: 'https://zalo.me/0901234567',
    hotline: '0901.234.567',
    zalo_oa_id: '1234567890123'
  },
  shop_info: {
    name: 'FLOWER VIBES STUDIO',
    slogan: 'Trao Gửi Yêu Thương - Đong Đầy Xúc Cảm',
    address: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    hotline: '0901.234.567',
    email: 'contact@flowervibes.vn',
    opening_hours: '07:30 - 21:30 (Mỗi ngày, kể cả Lễ Tết)',
    copyright: '© 2026 FLOWER VIBES STUDIO. All rights reserved.'
  },
  hero_config: {
    eyebrow: 'TIỆM HOA NGHỆ THUẬT & QUÀ TẶNG CẢM XÚC',
    headline: 'Mỗi Bó Hoa Là Một Câu Chuyện Tình Yêu',
    subheadline: 'Tuyển chọn những đóa hoa tươi rạng rỡ nhất từ Đà Lạt và hoa nhập khẩu. Thiết kế tinh tế, giao hỏa tốc 2 giờ, tư vấn tận tâm qua Zalo.',
    cta_label: 'Tư Vấn & Đặt Hoa Ngay',
    cta_secondary_label: 'Khám Phá Bộ Sưu Tập'
  },
  seo_config: {
    meta_title: 'FLOWER VIBES - Tiệm Hoa Tươi Nghệ Thuật & Quà Tặng Giao Nhanh 2H',
    meta_description: 'Tiệm hoa tươi cao cấp giao nhanh 2 giờ tại TP.HCM. Hoa sinh nhật, khai trương, tốt nghiệp, hoa tình yêu thiết kế tinh tế. Chat Zalo nhận mẫu và ưu đãi ngay!',
    og_image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
    canonical_domain: 'https://flowervibes.vn',
    robots: 'index, follow'
  }
};
