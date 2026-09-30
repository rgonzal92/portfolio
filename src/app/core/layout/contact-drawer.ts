import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { SocialIcon } from '../../shared/social-icon';
import { PROFILE, SOCIALS } from '../content';
import { Contact } from './contact';

@Component({
  selector: 'app-contact-drawer',
  imports: [DrawerModule, RouterLink, SocialIcon],
  template: `
    <p-drawer
      [(visible)]="contact.open"
      position="right"
      styleClass="w-full sm:w-[30rem]"
      [blockScroll]="true"
      ariaCloseLabel="Close"
    >
      <ng-template #header>
        <!-- Blue underscore bar, same proportions as the logo. -->
        <h2 class="text-4xl sm:text-5xl">
          <span
            class="after:ml-[0.11em] after:inline-block after:h-[0.13em] after:w-[0.7em] after:bg-primary-500"
            >Get in touch</span
          >
        </h2>
      </ng-template>

      <div class="flex h-full flex-col gap-10">
        <p class="text-muted-color">Have a role, a project, or a question? My inbox is open.</p>

        <a
          [href]="'mailto:' + profile.email"
          class="text-xl break-all underline decoration-surface-400 underline-offset-8 transition-colors hover:text-primary hover:decoration-current sm:text-2xl"
          >{{ profile.email }}</a
        >

        <ul class="flex flex-col border-t border-surface">
          @for (s of socials; track s.url) {
            <li class="border-b border-surface">
              @let external = s.url.startsWith('http');
              <a
                [href]="s.url"
                [attr.target]="external ? '_blank' : null"
                [attr.rel]="external ? 'noopener' : null"
                class="flex items-center gap-3 py-4 transition-colors hover:text-primary"
              >
                <app-social-icon [name]="s.icon" />
                {{ s.label }}
                @if (external) {
                  <span class="sr-only">(opens in a new tab)</span>
                }
              </a>
            </li>
          }
          <li class="border-b border-surface">
            <a
              routerLink="/resume"
              (click)="contact.open.set(false)"
              class="flex items-center gap-3 py-4 transition-colors hover:text-primary"
              >Resume</a
            >
          </li>
        </ul>

        <p class="eyebrow mt-auto">{{ profile.location }}</p>
      </div>
    </p-drawer>
  `,
})
export class ContactDrawer {
  protected readonly contact = inject(Contact);
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
}
