import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { ArrowUpRight } from '@primeicons/angular/arrow-up-right';
import { Github } from '@primeicons/angular/github';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { Project } from '../../core/content';
import { Theme } from '../../core/theme';
import { ExternalLink } from '../../shared/external-link';

@Component({
  selector: 'app-project-card',
  imports: [
    ArrowUpRight,
    ButtonModule,
    CardModule,
    ChipModule,
    ExternalLink,
    Github,
    NgOptimizedImage,
  ],
  host: { class: 'group block' },
  template: `
    @let p = project();
    <p-card class="h-full overflow-hidden">
      <ng-template #header>
        <div
          class="relative overflow-hidden"
          [class]="featured() ? 'aspect-[16/10] md:aspect-[16/7]' : 'aspect-[16/10]'"
        >
          @if (p.cover) {
            <!-- The screenshot sits tilted in 3D on the card, as if photographed at an angle, and fades out at the bottom. -->
            <div class="absolute inset-0 mask-b-from-55% perspective-[1600px]">
              <div
                class="absolute top-[16%] left-[14%] aspect-[16/10] w-[78%] origin-top overflow-hidden rounded-xl shadow-2xl ring-1 shadow-black/30 ring-black/10 rotate-x-[22deg] -rotate-y-[18deg] rotate-[6deg] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:rotate-x-[16deg] motion-safe:group-hover:-rotate-y-[12deg] motion-safe:group-hover:rotate-[4deg] dark:shadow-black/60 dark:ring-white/10"
              >
                <!-- One image whose source follows the theme: a hidden second image would still be downloaded. -->
                <img
                  [ngSrc]="theme.dark() && p.coverDark ? p.coverDark : p.cover"
                  fill
                  [alt]="p.title + ' screenshot'"
                  class="object-cover object-top opacity-0 motion-safe:transition-opacity motion-safe:duration-700"
                  [class.opacity-100]="coverLoaded()"
                  (load)="coverLoaded.set(true)"
                />
              </div>
            </div>
          } @else {
            <div
              class="grid-bg flex h-full items-end bg-primary/12 p-5 text-primary motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]"
              aria-hidden="true"
            >
              <span class="text-sm font-medium">{{ p.stack.join(' · ') }}</span>
            </div>
          }
        </div>
      </ng-template>

      <ng-template #title>
        <h3 [class]="featured() ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'">
          {{ p.title }}
        </h3>
      </ng-template>

      <ng-template #subtitle>
        <span class="eyebrow">{{ p.year }} · {{ p.role }}</span>
      </ng-template>

      <p class="max-w-[60ch] text-muted-color">{{ p.summary }}</p>
      <ul class="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        @for (t of p.stack; track t) {
          <li><p-chip [label]="t" /></li>
        }
      </ul>

      <ng-template #footer>
        <div class="flex flex-wrap gap-2">
          @if (p.repo) {
            <a
              pButton
              appExternalLink
              outlined
              rounded
              size="small"
              severity="secondary"
              [href]="p.repo"
            >
              <svg data-p-icon="github"></svg> Code
              <span class="sr-only">for {{ p.title }}</span>
            </a>
          }
          @if (p.demo) {
            <a
              pButton
              appExternalLink
              outlined
              rounded
              size="small"
              severity="secondary"
              [href]="p.demo"
            >
              Live <svg data-p-icon="arrow-up-right"></svg>
              <span class="sr-only">site for {{ p.title }}</span>
            </a>
          }
        </div>
      </ng-template>
    </p-card>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly featured = input(false);
  protected readonly theme = inject(Theme);
  protected readonly coverLoaded = signal(false);
}
