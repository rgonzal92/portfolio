import { Component } from '@angular/core';
import { Download } from '@primeicons/angular/download';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { PROFILE, RESUME, SKILLS, SOCIALS } from '../../core/content';
import { ExternalLink } from '../../shared/external-link';
import { SocialIcon } from '../../shared/social-icon';

@Component({
  selector: 'app-resume',
  imports: [ButtonModule, ChipModule, DividerModule, Download, ExternalLink, SocialIcon],
  templateUrl: './resume.html',
})
export class Resume {
  protected readonly profile = PROFILE;
  protected readonly resume = RESUME;
  protected readonly skills = SKILLS;
  protected readonly links = SOCIALS.map((s) => ({ ...s, text: displayUrl(s.url) }));
}

/** The bare address (no scheme, www. or mailto:), so links still read correctly on paper. */
export function displayUrl(url: string): string {
  return url.replace(/^(https?:\/\/(www\.)?|mailto:)/, '');
}
