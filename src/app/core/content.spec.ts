import { FEATURED_PROJECT, OTHER_PROJECTS, PROJECT_YEARS } from './content';

const year = (project: { year: string }) => Number(project.year);

// Rules that hold for whatever projects content.ts lists, in whatever order they're written.
describe('projects content', () => {
  it('lists the other projects newest first', () => {
    OTHER_PROJECTS.slice(1).forEach((project, i) =>
      expect(year(project)).toBeLessThanOrEqual(year(OTHER_PROJECTS[i])),
    );
  });

  it('spans the years from the earliest project to the latest, featured included', () => {
    const years = [FEATURED_PROJECT, ...OTHER_PROJECTS].map(year);
    const [first, last = first] = PROJECT_YEARS.split('–').map(Number);
    expect(years.every((y) => first <= y && y <= last)).toBe(true);
    expect(years).toContain(first);
    expect(years).toContain(last);
  });
});
