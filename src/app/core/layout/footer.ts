import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SocialIcon } from '../../shared/social-icon';
import { PROFILE, SOCIALS } from '../content';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule, SocialIcon],
  template: `
    <footer class="mt-20 border-t border-surface print:hidden">
      <div class="wrap flex flex-wrap items-center justify-between gap-6 py-10">
        <p class="eyebrow">© {{ year }} {{ name }} · Built with Angular + PrimeNG</p>

        <ul class="flex items-center gap-1">
          @for (s of socials; track s.url) {
            @let external = s.url.startsWith('http');
            <li>
              <a
                pButton
                text
                rounded
                iconOnly
                severity="secondary"
                [href]="s.url"
                [attr.target]="external ? '_blank' : null"
                [attr.rel]="external ? 'noopener' : null"
                [attr.aria-label]="external ? s.label + ' (opens in a new tab)' : s.label"
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
