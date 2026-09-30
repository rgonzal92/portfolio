import { Component } from '@angular/core';
import { Download } from '@primeicons/angular/download';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { PROFILE, RESUME, SKILLS, SOCIALS } from '../../core/content';
import { SocialIcon } from '../../shared/social-icon';

@Component({
  selector: 'app-resume',
  imports: [ButtonModule, ChipModule, DividerModule, Download, SocialIcon],
  templateUrl: './resume.html',
})
export class Resume {
  protected readonly profile = PROFILE;
  protected readonly resume = RESUME;
  protected readonly skills = SKILLS;
  // Show the bare address so links still read correctly on paper.
  protected readonly links = SOCIALS.map((s) => ({
    ...s,
    text: s.url.replace(/^(https?:\/\/(www\.)?|mailto:)/, ''),
  }));
}
