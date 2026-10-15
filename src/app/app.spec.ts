import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { PROFILE } from './core/content';

describe('App', () => {
  let errors: unknown[];

  beforeEach(async () => {
    errors = [];
    // jsdom has no IntersectionObserver; the nav's scroll observer only needs one to exist.
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: ErrorHandler, useValue: { handleError: (e: unknown) => errors.push(e) } },
      ],
    }).compileComponents();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show the name in the home link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header a')?.textContent).toContain(PROFILE.name);
  });

  it('renders the shell without errors, after-render hooks included', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    TestBed.tick();
    expect(errors).toEqual([]);
  });
});
