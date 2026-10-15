import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Routes,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

/**
 * The router with the site's scroll behavior:
 * - router anchor jumps land below the fixed header, using the page's CSS scroll-padding-top
 *   (CSS scroll-padding doesn't apply to them on its own);
 * - page changes jump to the top instantly. The global smooth scrolling is meant for in-page anchors,
 *   and without this the router would smooth-scroll up from the previous page's position;
 * - back/forward restores the previous position.
 */
export function provideRouterWithScrolling(routes: Routes): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideAppInitializer(initScrolling),
  ]);
}

function initScrolling(): void {
  const root = inject(DOCUMENT).documentElement;
  inject(ViewportScroller).setOffset(() => [
    0,
    parseFloat(getComputedStyle(root).scrollPaddingTop) || 0,
  ]);

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
