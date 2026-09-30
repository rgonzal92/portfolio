import { yearRange } from './home';

describe('yearRange', () => {
  it('spans oldest to newest for projects listed newest first', () => {
    expect(yearRange([{ year: '2026' }, { year: '2025' }, { year: '2024' }])).toBe('2024–2026');
  });

  it('shows a single year when all projects share it', () => {
    expect(yearRange([{ year: '2026' }, { year: '2026' }])).toBe('2026');
    expect(yearRange([{ year: '2026' }])).toBe('2026');
  });

  it('is empty when there are no projects', () => {
    expect(yearRange([])).toBe('');
  });
});
