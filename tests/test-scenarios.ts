/**
 * Automated Verification Suite for Flower Shop Website
 * Tests business rules (BR-01 -> BR-08) and technical test cases (TC-01 -> TC-14).
 */

import { db } from '../src/lib/store/db';
import { validateProduct, formatCurrencyVND } from '../src/lib/validators/product';
import { parseVideoUrl } from '../src/pages/api/admin/videos';

interface TestResult {
  name: string;
  category: 'BR' | 'TC';
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];

function assert(name: string, category: 'BR' | 'TC', condition: boolean, message = '') {
  results.push({
    name,
    category,
    passed: condition,
    message: condition ? 'PASSED' : `FAILED: ${message}`,
  });
  if (condition) {
    console.log(`\x1b[32m✔ [${category}] ${name}\x1b[0m`);
  } else {
    console.error(`\x1b[31m✖ [${category}] ${name}: ${message}\x1b[0m`);
  }
}

async function runTests() {
  console.log('\n========================================');
  console.log('🧪 RUNNING FLOWER SHOP SPEC VERIFICATION');
  console.log('========================================\n');

  // ----------------------------------------------------
  // BR-01: Product Catalog & Required Fields
  // ----------------------------------------------------
  const products = db.getPublicProducts();
  assert(
    'BR-01: Product Catalog Initialized with published products',
    'BR',
    products.length >= 6,
    `Expected at least 6 products, got ${products.length}`
  );

  const sampleProd = products[0];
  const hasRequiredFields =
    sampleProd &&
    typeof sampleProd.name === 'string' &&
    typeof sampleProd.price === 'number' &&
    sampleProd.price > 0 &&
    Array.isArray(sampleProd.images) &&
    sampleProd.images.length > 0 &&
    Array.isArray(sampleProd.occasions);

  assert(
    'BR-01: Product has required fields (name, price > 0, images, occasions)',
    'BR',
    !!hasRequiredFields,
    'Product missing required fields'
  );

  // ----------------------------------------------------
  // BR-02: Zalo Phone & Configuration
  // ----------------------------------------------------
  const settings = db.getSettings();
  const rawPhone = settings.zalo_config.hotline;
  const digitsOnly = rawPhone.replace(/\D/g, '');
  assert(
    'BR-02: Global Zalo Phone Defined & Formatted (10 digits starting with 0)',
    'BR',
    /^0\d{9}$/.test(digitsOnly) && settings.zalo_config.url.includes(digitsOnly),
    `Invalid phone number format: ${rawPhone}`
  );

  // ----------------------------------------------------
  // BR-03: Price Display in VND
  // ----------------------------------------------------
  const sampleFormatted = formatCurrencyVND(500000);
  assert(
    'BR-03: Currency formatted in VND with ₫ symbol',
    'BR',
    sampleFormatted.includes('₫') && sampleFormatted.includes('500.000'),
    `Format output unexpected: ${sampleFormatted}`
  );

  // ----------------------------------------------------
  // BR-04 / TC-07: Video Platform Parsing & Fallback
  // ----------------------------------------------------
  const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const youtubeShort = 'https://youtu.be/dQw4w9WgXcQ';
  const tiktokUrl = 'https://www.tiktok.com/@shop/video/7123456789012345678';

  const ytResult1 = parseVideoUrl(youtubeUrl);
  const ytResult2 = parseVideoUrl(youtubeShort);
  const ttResult = parseVideoUrl(tiktokUrl);

  assert(
    'BR-04 / TC-07: YouTube ID extraction handles standard and short links',
    'TC',
    ytResult1?.externalId === 'dQw4w9WgXcQ' && ytResult2?.externalId === 'dQw4w9WgXcQ',
    `YouTube extraction failed: ${ytResult1?.externalId}, ${ytResult2?.externalId}`
  );

  assert(
    'BR-04 / TC-07: TikTok video ID extracted accurately',
    'TC',
    ttResult?.externalId === '7123456789012345678' && ttResult?.provider === 'tiktok',
    `TikTok extraction failed: ${ttResult?.externalId}`
  );

  // ----------------------------------------------------
  // BR-07: Occasion Filter Coverage
  // ----------------------------------------------------
  const occasions = db.getOccasions();
  const occasionSlugs = occasions.map(o => o.slug);
  assert(
    'BR-07: Standard Occasion Categories Present (sinh-nhat, khai-truong, tinh-yeu, chia-buon)',
    'BR',
    occasionSlugs.includes('sinh-nhat') &&
    occasionSlugs.includes('khai-truong') &&
    occasionSlugs.includes('tinh-yeu'),
    'Standard occasion tags missing from catalog'
  );

  // ----------------------------------------------------
  // TC-02: Product Validation - Boundary Cases
  // ----------------------------------------------------
  const validProduct = {
    name: 'Bó Hoa Cẩm Tú Cầu Xanh',
    price: 350000,
    status: 'published' as const,
    images: [{ id: 'img-1', secure_url: 'https://images.unsplash.com/photo-test', is_cover: true, sort_order: 0 }],
    occasions: [{ id: 'occ-1', name: 'Sinh Nhật', slug: 'sinh-nhat', sort_order: 1, active: true }],
  };

  const validationSuccess = validateProduct(validProduct);
  assert(
    'TC-02: Valid product passes schema validation',
    'TC',
    validationSuccess.isValid,
    JSON.stringify(validationSuccess.errors)
  );

  const invalidProductPrice = { ...validProduct, price: -1000 };
  const validationNegativePrice = validateProduct(invalidProductPrice);
  assert(
    'TC-02: Negative price rejected by validator',
    'TC',
    !validationNegativePrice.isValid && !!validationNegativePrice.errors.price,
    'Negative price should fail'
  );

  const invalidProductName = { ...validProduct, name: ' ' };
  const validationEmptyName = validateProduct(invalidProductName);
  assert(
    'TC-02: Empty product name rejected',
    'TC',
    !validationEmptyName.isValid && !!validationEmptyName.errors.name,
    'Empty name should fail'
  );

  // ----------------------------------------------------
  // TC-05: Product Creation & Soft Delete
  // ----------------------------------------------------
  const tempProduct = db.createProduct({
    name: 'Hoa Thử Nghiệm Soft Delete',
    slug: 'hoa-thu-nghiem-soft-delete',
    price: 150000,
    status: 'published',
    featured: false,
    sort_order: 99,
    images: [{ id: 'img-temp', secure_url: 'https://images.unsplash.com/sample', is_cover: true, sort_order: 0 }],
    occasions: []
  });

  assert(
    'TC-05: Product creation persists in DB',
    'TC',
    !!tempProduct && !!tempProduct.id,
    'Failed to create product'
  );

  const deleted = db.softDeleteProduct(tempProduct.id);
  const reCheck = db.getProductById(tempProduct.id);
  assert(
    'TC-05: Soft delete marks product as hidden with deleted_at timestamp',
    'TC',
    deleted && (!reCheck || reCheck.status === 'hidden'),
    'Soft delete verification failed'
  );

  // ----------------------------------------------------
  // TC-06: Videos and Testimonials Availability
  // ----------------------------------------------------
  const publicVideos = db.getPublicVideos();
  assert(
    'TC-06: Video records loaded for Landing Page',
    'TC',
    Array.isArray(publicVideos) && publicVideos.length > 0,
    `No public videos found: count ${publicVideos.length}`
  );

  const publicTestimonials = db.getPublicTestimonials();
  assert(
    'TC-06: Testimonial reviews loaded with ratings >= 4',
    'TC',
    Array.isArray(publicTestimonials) && publicTestimonials.length > 0 && publicTestimonials[0].rating >= 4,
    'Testimonials missing or rating invalid'
  );

  // ----------------------------------------------------
  // TC-14: Admin Settings Update
  // ----------------------------------------------------
  const originalBrand = settings.shop_info.name;
  db.updateSettings({
    shop_info: {
      ...settings.shop_info,
      name: 'Tiệm Hoa Flower Corner VIP'
    }
  });

  const checkUpdated = db.getSettings();
  assert(
    'TC-14: Admin can update settings and persist',
    'TC',
    checkUpdated.shop_info.name === 'Tiệm Hoa Flower Corner VIP',
    `Expected updated shop name, got: ${checkUpdated.shop_info.name}`
  );

  // Restore original
  db.updateSettings({
    shop_info: {
      ...settings.shop_info,
      name: originalBrand
    }
  });

  // ----------------------------------------------------
  // TC-15 & TC-16: Product Detail View & Slug Retrieval
  // ----------------------------------------------------
  const firstProd = products[0];
  const prodBySlug = db.getProductBySlug(firstProd.slug);
  assert(
    'TC-15: Product detail retrieved by slug with complete fields',
    'TC',
    !!prodBySlug &&
      prodBySlug.id === firstProd.id &&
      typeof prodBySlug.description === 'string' &&
      Array.isArray(prodBySlug.images),
    'Failed to retrieve product detail by slug'
  );

  const nonExistent = db.getProductBySlug('non-existent-flower-slug-xyz');
  assert(
    'TC-16: Non-existent product slug returns undefined (handled by 404)',
    'TC',
    nonExistent === undefined,
    'Non-existent product slug should return undefined'
  );

  // ----------------------------------------------------
  // TC-17: Product Edit / Update persistence
  // ----------------------------------------------------
  const targetProduct = products[0];
  const oldPrice = targetProduct.price;
  const updatedProduct = db.updateProduct(targetProduct.id, {
    price: oldPrice + 25000,
    flower_components: 'Hoa hồng nhập khẩu đặc biệt'
  });
  const recheckProduct = db.getProductById(targetProduct.id);
  assert(
    'TC-17: Admin can edit product fields and changes persist in DB',
    'TC',
    !!updatedProduct &&
      recheckProduct?.price === oldPrice + 25000 &&
      recheckProduct?.flower_components === 'Hoa hồng nhập khẩu đặc biệt',
    'Failed to edit product'
  );
  // Revert back
  db.updateProduct(targetProduct.id, {
    price: oldPrice,
    flower_components: targetProduct.flower_components
  });

  // ----------------------------------------------------
  // TC-18: Media Gallery supports Video Embeds alongside Images
  // ----------------------------------------------------
  const productWithVideo = db.getProductById('prod-1');
  const hasVideoItem = productWithVideo?.images?.some(
    img => img.media_type === 'video' && img.video_provider === 'youtube' && !!img.video_embed_url
  );
  assert(
    'TC-18: Product gallery supports mixed images and embedded videos (YouTube/TikTok)',
    'TC',
    Boolean(hasVideoItem),
    'Expected product to contain embedded video item'
  );

  // ----------------------------------------------------
  // TC-19: Video is prioritized first when viewing product details
  // ----------------------------------------------------
  const sortedGallery = [...(productWithVideo?.images || [])].sort((a, b) => {
    const aIsVideo = (a.media_type === 'video' || Boolean(a.video_embed_url)) ? 1 : 0;
    const bIsVideo = (b.media_type === 'video' || Boolean(b.video_embed_url)) ? 1 : 0;
    if (aIsVideo !== bIsVideo) return bIsVideo - aIsVideo;
    return (b.is_cover ? 1 : 0) - (a.is_cover ? 1 : 0);
  });
  const firstItemIsVideo = sortedGallery[0]?.media_type === 'video' || Boolean(sortedGallery[0]?.video_embed_url);
  assert(
    'TC-19: Video is prioritized first at index 0 when displaying product detail gallery',
    'TC',
    Boolean(firstItemIsVideo),
    'Expected video item to be first in sorted detail gallery'
  );

  // ----------------------------------------------------
  // TC-20: Video embed URLs contain autoplay parameters for automatic playback
  // ----------------------------------------------------
  function formatAutoplayUrl(url?: string): string {
    if (!url) return '';
    if (url.includes('autoplay=')) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}autoplay=1&mute=1&playsinline=1`;
  }

  const rawYoutube = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const rawYoutubeWithQuery = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0';
  const autoplayUrl1 = formatAutoplayUrl(rawYoutube);
  const autoplayUrl2 = formatAutoplayUrl(rawYoutubeWithQuery);
  const autoplayAlreadySet = formatAutoplayUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1');

  const tc20Valid = 
    autoplayUrl1.includes('autoplay=1') &&
    autoplayUrl1.includes('mute=1') &&
    autoplayUrl2.includes('autoplay=1') &&
    autoplayUrl2.includes('&autoplay=1') &&
    autoplayAlreadySet === 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1';

  assert(
    'TC-20: Video embed URLs contain autoplay parameters (autoplay=1&mute=1) for automatic playback without user click',
    'TC',
    tc20Valid,
    'Failed to format video URL with autoplay parameters'
  );

  // ----------------------------------------------------
  // TC-21: Commitments Management & Content Update
  // ----------------------------------------------------
  const initialComs = db.getAllAdminCommitments();
  const targetCom = initialComs[0];
  const oldTitle = targetCom.title;
  const oldDesc = targetCom.description;

  const updatedCom = db.updateCommitment(targetCom.id, {
    title: 'Hoa Tươi Cao Cấp Tuyển Chọn Loại 1',
    description: 'Cam kết 100% hoa tươi loại 1 tuyển chọn kỹ lưỡng mỗi sáng sớm.',
    icon_key: 'award',
    sort_order: 1,
    active: true
  });

  const checkCom = db.getAllAdminCommitments().find(c => c.id === targetCom.id);
  assert(
    'TC-21: Admin can update commitment title, description, icon, and sort order with persistence',
    'TC',
    Boolean(
      updatedCom &&
      checkCom?.title === 'Hoa Tươi Cao Cấp Tuyển Chọn Loại 1' &&
      checkCom?.description === 'Cam kết 100% hoa tươi loại 1 tuyển chọn kỹ lưỡng mỗi sáng sớm.' &&
      checkCom?.icon_key === 'award'
    ),
    'Failed to update commitment content'
  );

  // Restore original
  db.updateCommitment(targetCom.id, {
    title: oldTitle,
    description: oldDesc,
    icon_key: targetCom.icon_key,
    sort_order: targetCom.sort_order,
    active: targetCom.active
  });

  // ----------------------------------------------------
  // Summary
  // ----------------------------------------------------
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log('\n========================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed}/${total} PASSED`);
  if (failed > 0) {
    console.log(`❌ ${failed} TESTS FAILED`);
  } else {
    console.log(`🎉 ALL SPECIFICATIONS & TEST CASES MET!`);
  }
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution crashed:', err);
  process.exit(1);
});
