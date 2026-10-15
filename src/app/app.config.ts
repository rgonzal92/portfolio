import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideRouterWithScrolling } from './core/scrolling';
import { provideTheme } from './core/theme';
import { BrandPreset } from './core/theme-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouterWithScrolling(routes),
    provideTheme(),
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
