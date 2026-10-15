import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { ApplicationRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { provideRouterWithScrolling } from './scrolling';

@Component({ template: '' })
class Page {}

@Component({ selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />' })
class Root {}

describe('provideRouterWithScrolling', () => {
  let scrollTo: ReturnType<typeof vi.fn>;
  let router: Router;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    document.documentElement.style.scrollPaddingTop = '96px';
    document.body.innerHTML = '<app-root></app-root><section id="projects"></section>';
    TestBed.configureTestingModule({
      providers: [
        provideRouterWithScrolling([{ path: '**', component: Page }]),
        provideLocationMocks(),
      ],
    });
    // The router's anchor scrolling only starts when the app bootstraps.
    TestBed.inject(ApplicationRef).bootstrap(Root);
    router = TestBed.inject(Router);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.style.scrollPaddingTop = '';
  });

  it('lands section links below the header, using the CSS scroll padding', async () => {
    await router.navigateByUrl('/#projects');
    await vi.waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: -96 })),
    );
  });

  it('jumps to the top instantly on page changes', async () => {
    await router.navigateByUrl('/resume');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('restores the previous position on back/forward instead of jumping to the top', async () => {
    await router.navigateByUrl('/home');
    vi.stubGlobal('scrollY', 500);
    await router.navigateByUrl('/resume');
    vi.stubGlobal('scrollY', 0);
    scrollTo.mockClear();

    TestBed.inject(Location).back();
    await vi.waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 500 })),
    );
    expect(scrollTo).not.toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });
});
