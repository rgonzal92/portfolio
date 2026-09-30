import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ExternalLink } from '../../shared/external-link';
import { SocialIcon } from '../../shared/social-icon';
import { PROFILE, SOCIALS } from '../content';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule, ExternalLink, SocialIcon],
  template: `
    <footer class="mt-20 border-t border-surface print:hidden">
      <div class="wrap flex flex-wrap items-center justify-between gap-6 py-10">
        <p class="eyebrow">© {{ year }} {{ name }} · Built with Angular + PrimeNG</p>

        <ul class="flex items-center gap-1">
          @for (s of socials; track s.url) {
            <li>
              <a
                pButton
                appExternalLink
                text
                rounded
                iconOnly
                severity="secondary"
                [href]="s.url"
                [attr.aria-label]="s.label"
              >
                <app-social-icon [name]="s.icon" />
              </a>
            </li>
          }
        </ul>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly name = PROFILE.name;
  protected readonly socials = SOCIALS;
  protected readonly year = new Date().getFullYear();
}
