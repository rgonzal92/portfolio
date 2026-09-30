import { ViewportScroller } from '@angular/common';
import { inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

/** Space above anchor targets for the fixed 72px header. */
export const HEADER_OFFSET = 80;

/**
 * App-wide scroll behavior, run once at startup:
 * - router anchor jumps land below the fixed header (CSS scroll-padding doesn't apply to them);
 * - page changes jump to the top instantly. The global smooth scrolling is meant for in-page anchors,
 *   and without this the router would smooth-scroll up from the previous page's position.
 *   Back/forward is left alone so the router can restore the previous position.
 */
export function initScrolling(): void {
  inject(ViewportScroller).setOffset([0, HEADER_OFFSET]);

  const router = inject(Router);
  let backOrForward = false;
  router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      backOrForward = event.navigationTrigger === 'popstate';
    } else if (
      event instanceof NavigationEnd &&
      !backOrForward &&
      !router.parseUrl(event.urlAfterRedirects).fragment
    ) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
}
