import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight } from '@primeicons/angular/arrow-right';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { PROFILE, PROJECTS, SKILLS } from '../../core/content';
import { Contact } from '../../core/layout/contact';
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
  protected readonly contact = inject(Contact);
  // Enter animation for pAnimateOnScroll: fade up 24px over 700ms (disabled for reduced motion in styles.css).
  protected readonly fadeIn =
    'animate-enter fade-in-0 slide-in-from-b-6 animate-duration-700 animate-ease-out';
  protected readonly profile = PROFILE;
  protected readonly portraitLoaded = signal(false);
  // Wordmark lines: first name, then the rest of the name.
  protected readonly firstName = PROFILE.name.split(' ')[0];
  protected readonly lastName = PROFILE.name.split(' ').slice(1).join(' ');
  protected readonly skills = SKILLS;
  protected readonly featured = PROJECTS[0];
  protected readonly rest = PROJECTS.slice(1);
  protected readonly projectCount = String(PROJECTS.length).padStart(2, '0');
  protected readonly yearRange = yearRange(PROJECTS);
}

/** "2024–2026" for projects listed newest first, or a single year when they all share one. */
export function yearRange(projects: { year: string }[]): string {
  return [...new Set([projects.at(-1)?.year, projects[0]?.year])].join('–');
}
