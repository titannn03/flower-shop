// src/lib/analytics/tracker.ts
// Custom analytics tracker conforming to Section 14 (Privacy-friendly, no PII)

export type CtaLocation = 'hero' | 'product_card' | 'floating' | 'footer' | 'testimonial' | 'nav';

export interface AnalyticsEventMap {
  view_product: { product_id: string; slug: string; position?: number };
  click_zalo: { cta_location: CtaLocation; product_id?: string; page_path: string };
  play_video: { provider: 'youtube' | 'tiktok'; video_id: string; position?: number };
  view_testimonial: { testimonial_id: string };
  scroll_depth: { depth: 25 | 50 | 75 | 90 };
}

export function trackEvent<K extends keyof AnalyticsEventMap>(eventName: K, data: AnalyticsEventMap[K]) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    ...data,
    timestamp: new Date().toISOString(),
  };

  // 1. Dispatch custom DOM event
  window.dispatchEvent(new CustomEvent('flower_shop_analytics', { detail: eventPayload }));

  // 2. Log in console for development
  if (process.env.NODE_ENV !== 'production' || window.location.hostname === 'localhost') {
    console.info(`[Analytics Event: ${eventName}]`, eventPayload);
  }

  // 3. Support Google Analytics / GTM if gtag exists
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, data);
  }

  // 4. Support Plausible if window.plausible exists
  if (typeof (window as any).plausible === 'function') {
    (window as any).plausible(eventName, { props: data });
  }
}

// Track scroll depth milestones (25%, 50%, 75%, 90%)
export function initScrollDepthTracker() {
  if (typeof window === 'undefined') return;

  const milestones: Record<number, boolean> = { 25: false, 50: false, 75: false, 90: false };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const percent = Math.round((window.scrollY / scrollHeight) * 100);

    ([25, 50, 75, 90] as const).forEach(m => {
      if (percent >= m && !milestones[m]) {
        milestones[m] = true;
        trackEvent('scroll_depth', { depth: m });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}
