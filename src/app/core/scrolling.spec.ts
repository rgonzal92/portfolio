import { ViewportScroller } from '@angular/common';
import { Component, provideAppInitializer } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { HEADER_OFFSET, initScrolling } from './scrolling';

@Component({ template: '' })
class Page {}

describe('initScrolling', () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', component: Page }]),
        provideAppInitializer(initScrolling),
      ],
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('lands anchor jumps below the fixed header', () => {
    const target = document.createElement('section');
    target.id = 'target';
    document.body.append(target);

    TestBed.inject(ViewportScroller).scrollToAnchor('target');
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: -HEADER_OFFSET }));
    target.remove();
  });

  it('jumps to the top instantly on page changes, but not for anchor links', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/resume');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });

    scrollTo.mockClear();
    await router.navigateByUrl('/#projects');
    expect(scrollTo).not.toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });
});
