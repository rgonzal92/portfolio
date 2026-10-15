import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Drawers } from './drawers';

@Component({ template: '' })
class Page {}

describe('Drawers', () => {
  let drawers: Drawers;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: Page }])],
    });
    drawers = TestBed.inject(Drawers);
    router = TestBed.inject(Router);
  });

  it('keeps one drawer open at a time', () => {
    drawers.show('menu');
    drawers.show('contact');
    expect(drawers.open()).toBe('contact');
  });

  it('closes when the page changes', async () => {
    drawers.show('menu');
    await router.navigateByUrl('/resume');
    expect(drawers.open()).toBeNull();
  });

  it('closes when a link points at the page already shown', async () => {
    await router.navigateByUrl('/#projects');
    drawers.show('menu');
    await router.navigateByUrl('/#projects');
    expect(drawers.open()).toBeNull();
  });
});
