import { Injectable, inject, signal } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router } from '@angular/router';

export type Drawer = 'menu' | 'contact';

/**
 * Which drawer is open: the mobile menu or the contact panel, at most one at a time.
 * Navigating closes it, so links inside a drawer don't have to. That includes a link to the page
 * already shown, which the router skips instead of starting a navigation.
 */
@Injectable({ providedIn: 'root' })
export class Drawers {
  private readonly state = signal<Drawer | null>(null);
  readonly open = this.state.asReadonly();

  constructor() {
    inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) this.close();
    });
  }

  show(drawer: Drawer): void {
    this.state.set(drawer);
  }

  close(): void {
    this.state.set(null);
  }
}
