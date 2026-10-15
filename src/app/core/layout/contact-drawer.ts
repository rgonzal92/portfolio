import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ExternalLink } from '../../shared/external-link';
import { SocialIcon } from '../../shared/social-icon';
import { PROFILE, SOCIALS } from '../content';
import { Drawers } from './drawers';

@Component({
  selector: 'app-contact-drawer',
  imports: [DrawerModule, ExternalLink, RouterLink, SocialIcon],
  template: `
    <p-drawer
      [visible]="drawers.open() === 'contact'"
      (visibleChange)="drawers.close()"
      position="right"
      styleClass="w-full sm:w-[30rem]"
      ariaCloseLabel="Close"
    >
      <ng-template #header>
        <!-- Blue underscore bar, same proportions as the logo. -->
        <h2 class="text-4xl sm:text-5xl">
          <span class="brand-bar">Get in touch</span>
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
              <a
                appExternalLink
                [href]="s.url"
                class="flex items-center gap-3 py-4 transition-colors hover:text-primary"
              >
                <app-social-icon [name]="s.icon" />
                {{ s.label }}
              </a>
            </li>
          }
          <li class="border-b border-surface">
            <a
              routerLink="/resume"
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
  protected readonly drawers = inject(Drawers);
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
}
