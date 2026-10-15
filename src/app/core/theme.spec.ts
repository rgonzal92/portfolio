import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Theme, provideTheme } from './theme';

describe('Theme', () => {
  const root = document.documentElement;

  beforeEach(() => {
    root.classList.add('p-dark'); // what the inline script in index.html does by default
    localStorage.clear();
  });
  afterEach(() => root.classList.remove('p-dark'));

  it('starts from the page class, then toggles and saves the choice', () => {
    const theme = TestBed.inject(Theme);
    expect(theme.dark()).toBe(true);

    theme.toggle();
    expect(theme.dark()).toBe(false);
    expect(root.classList.contains('p-dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');

    theme.toggle();
    expect(root.classList.contains('p-dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('prints in light mode and restores dark mode afterwards, from app startup', () => {
    TestBed.configureTestingModule({ providers: [provideTheme()] });
    TestBed.inject(ApplicationRef); // starts the app without anything injecting Theme

    window.dispatchEvent(new Event('beforeprint'));
    expect(root.classList.contains('p-dark')).toBe(false);

    window.dispatchEvent(new Event('afterprint'));
    expect(root.classList.contains('p-dark')).toBe(true);
  });
});
