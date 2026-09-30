import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

const DARK_CLASS = 'p-dark';

/** Light/dark theme. The initial class is set by the inline script in index.html. */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly root = inject(DOCUMENT).documentElement;
  readonly dark = signal(this.root.classList.contains(DARK_CLASS));

  constructor() {
    // Print the resume in light mode, then restore the viewer's theme.
    const view = this.root.ownerDocument.defaultView;
    view?.addEventListener('beforeprint', () => this.root.classList.remove(DARK_CLASS));
    view?.addEventListener('afterprint', () => this.root.classList.toggle(DARK_CLASS, this.dark()));
  }

  toggle(): void {
    this.dark.update((d) => !d);
    this.root.classList.toggle(DARK_CLASS, this.dark());
    try {
      localStorage.setItem('theme', this.dark() ? 'dark' : 'light');
    } catch {
      // Storage blocked (private mode): the theme still switches for this visit.
    }
  }
}
