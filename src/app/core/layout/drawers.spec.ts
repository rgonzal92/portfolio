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

  describe('focus', () => {
    let opener: HTMLButtonElement;
    let inside: HTMLButtonElement;

    beforeEach(() => {
      document.body.innerHTML = '<button id="opener"></button><button id="inside"></button>';
      opener = document.querySelector('#opener')!;
      inside = document.querySelector('#inside')!;
    });

    it('goes back to what opened the drawer when it closes', () => {
      opener.focus();
      drawers.show('contact');
      inside.focus();
      drawers.close();
      expect(document.activeElement).toBe(opener);
    });

    it('goes back to the first opener after switching drawers', () => {
      opener.focus();
      drawers.show('menu');
      inside.focus();
      drawers.show('contact');
      drawers.close();
      expect(document.activeElement).toBe(opener);
    });

    it('stays put when a navigation closes the drawer', async () => {
      opener.focus();
      drawers.show('menu');
      inside.focus();
      await router.navigateByUrl('/resume');
      expect(document.activeElement).toBe(inside);
    });
  });
});
