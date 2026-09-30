import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { BrandPreset } from './core/theme-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Clicking "Work" again after scrolling away should scroll back to it.
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    providePrimeNG({
      license: PRIMEUI_LICENSE,
      ripple: true,
      theme: {
        preset: BrandPreset,
        options: {
          darkModeSelector: '.p-dark',
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
  ],
};
