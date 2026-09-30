import { displayUrl } from './resume';

describe('displayUrl', () => {
  it('strips the scheme, www. and mailto: so links read cleanly on paper', () => {
    expect(displayUrl('https://github.com/rgonzal92')).toBe('github.com/rgonzal92');
    expect(displayUrl('https://www.linkedin.com/in/rgonzal92')).toBe('linkedin.com/in/rgonzal92');
    expect(displayUrl('http://example.com/a')).toBe('example.com/a');
    expect(displayUrl('mailto:richard@rgonz.dev')).toBe('richard@rgonz.dev');
  });
});
