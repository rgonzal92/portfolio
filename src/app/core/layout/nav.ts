import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bars } from '@primeicons/angular/bars';
import { Moon } from '@primeicons/angular/moon';
import { Sun } from '@primeicons/angular/sun';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PROFILE } from '../content';
import { Theme } from '../theme';
import { Contact } from './contact';

const LINKS = [
  { label: 'Projects', path: '/', fragment: 'projects' },
  { label: 'About', path: '/', fragment: 'about' },
  { label: 'Resume', path: '/resume' },
];

@Component({
  selector: 'app-nav',
  imports: [Bars, ButtonModule, DrawerModule, Moon, RouterLink, Sun],
  template: `
    <!-- 20px strip at the top of the page; the nav counts as scrolled once it leaves the viewport. -->
    <div #topSentinel class="absolute top-0 h-5 w-px" aria-hidden="true"></div>

    <!-- Transparent over the hero at the very top; background and divider appear once scrolled
         (300ms fade in, 150ms fade out so it clears quickly when you return to the top). -->
    <header
      class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] print:hidden"
      [class]="
        scrolled()
          ? 'border-surface bg-surface-50/80 backdrop-blur-md dark:bg-surface-950/80'
          : 'border-transparent duration-150'
      "
    >
      <div class="wrap flex h-18 items-center justify-between gap-3">
        <a routerLink="/" class="flex items-center gap-3 text-sm font-extrabold tracking-tight">
          <!-- RG_ mark from the favicon, as text so it stays transparent and follows the theme. -->
          <span
            aria-hidden="true"
            class="brand-bar text-lg leading-none font-extrabold tracking-tight [--brand-bar-h:0.1em] [--brand-bar-w:0.36em]"
            >RG</span
          >
          <span>{{ name }}</span>
        </a>

        <nav class="hidden items-center gap-9 md:flex" aria-label="Main">
          @for (l of links; track l.label) {
            <a
              [routerLink]="l.path"
              [fragment]="l.fragment"
              class="text-sm text-muted-color transition-colors hover:text-color"
              >{{ l.label }}</a
            >
          }
        </nav>

        <div class="flex items-center gap-2">
          <button
            pButton
            text
            rounded
            iconOnly
            severity="secondary"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.dark() ? 'Switch to light theme' : 'Switch to dark theme'"
          >
            @if (theme.dark()) {
              <svg data-p-icon="sun"></svg>
            } @else {
              <svg data-p-icon="moon"></svg>
            }
          </button>
          <button
            pButton
            rounded
            size="small"
            class="hidden md:inline-flex"
            (click)="contact.open.set(true)"
          >
            Get in touch
          </button>
          <button
            pButton
            text
            rounded
            iconOnly
            severity="secondary"
            class="md:hidden"
            aria-label="Open menu"
            [attr.aria-expanded]="menuOpen()"
            (click)="menuOpen.set(true)"
          >
            <svg data-p-icon="bars"></svg>
          </button>
        </div>
      </div>
    </header>

    <p-drawer [(visible)]="menuOpen" position="top" styleClass="h-auto" ariaCloseLabel="Close">
      <nav class="flex flex-col" aria-label="Mobile">
        @for (l of links; track l.label) {
          <a
            [routerLink]="l.path"
            [fragment]="l.fragment"
            (click)="menuOpen.set(false)"
            class="border-t border-surface py-3 text-3xl font-extrabold tracking-tight"
            >{{ l.label }}</a
          >
        }
      </nav>
      <button pButton rounded class="mt-6" (click)="menuOpen.set(false); contact.open.set(true)">
        Get in touch
      </button>
    </p-drawer>
  `,
})
export class Nav {
  protected readonly theme = inject(Theme);
  protected readonly contact = inject(Contact);
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly name = PROFILE.name;
  protected readonly links = LINKS;
  private readonly topSentinel = viewChild.required<ElementRef<HTMLElement>>('topSentinel');

  constructor() {
    // Watching a 20px strip instead of every scroll event: the signal only changes when crossing the
    // threshold, and the nav clears while smooth scrolling is still easing into the top.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(([entry]) =>
        this.scrolled.set(!entry.isIntersecting),
      );
      observer.observe(this.topSentinel().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
