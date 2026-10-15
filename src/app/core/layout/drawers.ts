import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router } from '@angular/router';

export type Drawer = 'menu' | 'contact';

/**
 * Which drawer is open: the mobile menu or the contact panel, at most one at a time.
 * Navigating closes it, so links inside a drawer don't have to. That includes a link to the page
 * already shown, which the router skips instead of starting a navigation.
 * Closing it otherwise hands keyboard focus back to whatever opened the first drawer.
 */
@Injectable({ providedIn: 'root' })
export class Drawers {
  private readonly document = inject(DOCUMENT);
  private readonly state = signal<Drawer | null>(null);
  readonly open = this.state.asReadonly();
  private opener: HTMLElement | null = null;

  constructor() {
    inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) this.dismiss();
    });
  }

  show(drawer: Drawer): void {
    if (!this.state()) this.opener = this.document.activeElement as HTMLElement | null;
    this.state.set(drawer);
  }

  close(): void {
    const opener = this.opener;
    this.dismiss();
    opener?.focus();
  }

  // A navigation moves the reader somewhere new, so focus isn't pulled back to the opener.
  private dismiss(): void {
    this.state.set(null);
    this.opener = null;
  }
}
