import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExternalLink } from './external-link';

@Component({
  imports: [ExternalLink],
  template: `
    <a appExternalLink href="https://github.com/rgonzal92">GitHub</a>
    <a appExternalLink href="mailto:richard@rgonz.dev">Email</a>
  `,
})
class Host {}

describe('ExternalLink', () => {
  it('opens web links in a new tab and tells screen readers', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const [web, mail]: HTMLAnchorElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('a'),
    );

    expect(web.getAttribute('href')).toBe('https://github.com/rgonzal92');
    expect(web.target).toBe('_blank');
    expect(web.rel).toBe('noopener');
    expect(web.getAttribute('aria-describedby')).toBe('new-tab-note');

    expect(mail.getAttribute('href')).toBe('mailto:richard@rgonz.dev');
    expect(mail.hasAttribute('target')).toBe(false);
    expect(mail.hasAttribute('rel')).toBe(false);
    expect(mail.hasAttribute('aria-describedby')).toBe(false);
  });
});
