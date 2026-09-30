import { Component, input } from '@angular/core';
import { Discord } from '@primeicons/angular/discord';
import { Envelope } from '@primeicons/angular/envelope';
import { Github } from '@primeicons/angular/github';
import { Linkedin } from '@primeicons/angular/linkedin';
import { Twitter } from '@primeicons/angular/twitter';
import { Social } from '../core/content';

@Component({
  selector: 'app-social-icon',
  imports: [Discord, Envelope, Github, Linkedin, Twitter],
  host: { class: 'inline-flex' },
  template: `
    @switch (name()) {
      @case ('github') {
        <svg data-p-icon="github" [size]="size()"></svg>
      }
      @case ('linkedin') {
        <svg data-p-icon="linkedin" [size]="size()"></svg>
      }
      @case ('envelope') {
        <svg data-p-icon="envelope" [size]="size()"></svg>
      }
      @case ('twitter') {
        <svg data-p-icon="twitter" [size]="size()"></svg>
      }
      @case ('discord') {
        <svg data-p-icon="discord" [size]="size()"></svg>
      }
    }
  `,
})
export class SocialIcon {
  readonly name = input.required<Social['icon']>();
  readonly size = input(18);
}
