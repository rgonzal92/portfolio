import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight } from '@primeicons/angular/arrow-right';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import {
  FEATURED_PROJECT,
  OTHER_PROJECTS,
  PROFILE,
  PROJECT_COUNT,
  PROJECT_YEARS,
  SKILLS,
} from '../../core/content';
import { Drawers } from '../../core/layout/drawers';
import { ProjectCard } from './project-card';

@Component({
  selector: 'app-home',
  imports: [
    AnimateOnScrollModule,
    ArrowRight,
    ButtonModule,
    ChipModule,
    DividerModule,
    NgOptimizedImage,
    ProjectCard,
    RouterLink,
    TagModule,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly drawers = inject(Drawers);
  // Enter animation for pAnimateOnScroll: fade up 24px over 700ms (disabled for reduced motion in styles.css).
  protected readonly fadeIn =
    'animate-enter fade-in-0 slide-in-from-b-6 animate-duration-700 animate-ease-out';
  protected readonly profile = PROFILE;
  protected readonly portraitLoaded = signal(false);
  // Wordmark lines: first name, then the rest of the name.
  protected readonly firstName = PROFILE.name.split(' ')[0];
  protected readonly lastName = PROFILE.name.split(' ').slice(1).join(' ');
  protected readonly skills = SKILLS;
  protected readonly featured = FEATURED_PROJECT;
  protected readonly rest = OTHER_PROJECTS;
  protected readonly projectCount = String(PROJECT_COUNT).padStart(2, '0');
  protected readonly projectYears = PROJECT_YEARS;
}
