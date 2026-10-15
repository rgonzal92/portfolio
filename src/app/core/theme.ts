import {
  DOCUMENT,
  DestroyRef,
  EnvironmentProviders,
  Injectable,
  inject,
  provideAppInitializer,
  signal,
} from '@angular/core';

const DARK_CLASS = 'p-dark';

/** Light/dark theme. The initial class is set by the inline script in index.html. */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly root = inject(DOCUMENT).documentElement;
  private readonly isDark = signal(this.root.classList.contains(DARK_CLASS));
  readonly dark = this.isDark.asReadonly();

  constructor() {
    // Print the resume in light mode, then restore the viewer's theme.
    const view = this.root.ownerDocument.defaultView;
    const listening = new AbortController();
    inject(DestroyRef).onDestroy(() => listening.abort());
    const options = { signal: listening.signal };
    const printLight = () => this.root.classList.remove(DARK_CLASS);
    const restore = () => this.root.classList.toggle(DARK_CLASS, this.dark());
    view?.addEventListener('beforeprint', printLight, options);
    view?.addEventListener('afterprint', restore, options);
  }

  toggle(): void {
    this.isDark.update((d) => !d);
    this.root.classList.toggle(DARK_CLASS, this.dark());
    try {
      localStorage.setItem('theme', this.dark() ? 'dark' : 'light');
    } catch {
      // Storage blocked (private mode): the theme still switches for this visit.
    }
  }
}

/** Starts the theme with the app, so printing in light mode doesn't wait for something to inject it. */
export function provideTheme(): EnvironmentProviders {
  return provideAppInitializer(() => {
    inject(Theme);
  });
}
