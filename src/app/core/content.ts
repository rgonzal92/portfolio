// All site content lives here. Replace the placeholder values with your own.
// Images and the resume PDF go in /public (e.g. public/portrait.jpg -> '/portrait.jpg').

export interface Social {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'envelope';
}

export interface Project {
  title: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  cover?: string;
  // Shown instead of cover in the dark theme.
  coverDark?: string;
  repo?: string;
  demo?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Job {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary?: string;
  highlights: string[];
  stack: string[];
}

export interface School {
  school: string;
  degree: string;
  year: string;
}

export const PROFILE = {
  name: 'Richard Gonzalez',
  title: 'Software Engineer',
  location: 'Austin, TX',
  email: 'richard@rgonz.dev',
  availability: 'Open to full-stack & backend roles',
  // Also the description in src/index.html; keep the two in step.
  lede: 'Full-stack software engineer who builds software with the people it serves: 3+ years at General Motors on tools ~300 vehicle program analysts use, and solo projects since 2026.',
  headline: "Hi, I'm Richard.",
  about: [
    "I'm a full-stack software engineer who builds software with the people it serves.",
    'For 3+ years at General Motors, I worked on the internal tools ~300 vehicle program analysts use to plan the features and options of 40+ vehicle programs. I met with those analysts twice a week, turned their requests into features, and went after whatever slowed them down. One slow database query made catalogs take 20 seconds to open (2 minutes for trucks); after I tuned it, they opened in 2, giving analysts back an estimated 1,000+ hours a year. Another feature halved their manual data entry.',
    "I love solving hard, complex problems, and the best part is seeing people have a great experience with something I built. I'm always looking for ways to make an app faster or easier to use, and quality matters to me: I added our app's first frontend tests and raised backend test coverage from about 20% to 90%.",
    "Since 2026, I've been building full-stack projects on my own, from the user interface to the AWS hosting. The latest, Vehicle Catalog, is live: a spreadsheet-style catalog editor with a manager's approval, version history, and AI that proposes rules for a person to sign off.",
  ],
  currently: [
    'Based in Austin, TX',
    'Previously Software Engineer at General Motors',
    'B.S. Computer Science, UTSA',
  ],
  portrait: '/portrait.webp',
  resumePdf: '/Richard-Gonzalez-Resume.pdf',
};

export const SOCIALS: Social[] = [
  { label: 'GitHub', url: 'https://github.com/rgonzal92', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rgonzal92', icon: 'linkedin' },
  { label: 'Email', url: `mailto:${PROFILE.email}`, icon: 'envelope' },
];

export const SKILLS: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'SQL'] },
  {
    label: 'Frontend',
    items: ['Angular', 'RxJS', 'PrimeNG', 'Angular Material', 'AG Grid', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Data',
    items: [
      'Spring Boot',
      'Spring Security',
      'Spring AI',
      'Spring Data JPA',
      'REST APIs',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'Flyway',
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      'AWS',
      'EC2',
      'S3',
      'CloudFront',
      'SQS',
      'Cognito',
      'ECR',
      'IAM',
      'Terraform',
      'Docker',
      'Kubernetes',
      'Git',
      'GitHub Actions',
      'Continuous Integration',
      'Continuous Delivery',
    ],
  },
  {
    label: 'Testing & Observability',
    items: [
      'JUnit 5',
      'Testcontainers',
      'Jest',
      'Playwright',
      'JMeter',
      'CloudWatch',
      'OpenTelemetry',
      'Grafana',
    ],
  },
];

// Shown full-width ahead of the others.
export const FEATURED_PROJECT: Project = {
  title: 'Vehicle Catalog',
  year: '2026',
  role: 'Full-stack',
  summary:
    "A solo, from-scratch vehicle catalog app that defines each vehicle's features, live as a public demo: edit a catalog like a spreadsheet, submit changes for approval, track every version, and have AI propose rules. 24 design records and 1,100+ tests on GitHub.",
  stack: ['Java', 'Spring Boot', 'Spring AI', 'Angular', 'PostgreSQL', 'Redis', 'AWS', 'Terraform'],
  cover: '/projects/vehicle-catalog.webp',
  coverDark: '/projects/vehicle-catalog-dark.webp',
  repo: 'https://github.com/rgonzal92/vehicle-catalog',
  demo: 'https://catalog.rgonz.dev',
};

// Any order: they're shown newest first, and projects from the same year keep the order written here.
const otherProjects: Project[] = [];
export const OTHER_PROJECTS = otherProjects.sort((a, b) => Number(b.year) - Number(a.year));

export const PROJECT_COUNT = 1 + OTHER_PROJECTS.length;

const projectYears = [FEATURED_PROJECT, ...OTHER_PROJECTS].map((p) => Number(p.year));
/** "2024–2026", or a single year when every project shares one. */
export const PROJECT_YEARS = [
  ...new Set([Math.min(...projectYears), Math.max(...projectYears)]),
].join('–');

export const RESUME = {
  summary:
    'Full-stack software engineer who builds software with the people it serves. Spent 3+ years at General Motors meeting twice a week with vehicle program analysts and turning their pain points into features, like a 20-second wait cut to 2. In 2026, independently delivered a complete AI-assisted web app, from the user interface to the AWS hosting.',
  experience: [
    {
      company: 'General Motors',
      role: 'Software Engineer',
      location: 'Austin, TX',
      start: 'Jan 2023',
      end: 'May 2026',
      summary:
        'One of 5 developers on internal tools ~300 GM vehicle program analysts use to plan the features and options of 40+ programs.',
      // The resume's bullets without their tool lists, which the stack chips show.
      highlights: [
        'Slashed vehicle catalog load times 90% (~20 s to 2 s; trucks ~2 min to 20 s) by tuning one slow database query, sparing analysts an estimated 1,000+ hours of waiting per year.',
        "Halved analysts' manual data entry with a feature that mirrors each paired vehicle-option rule, keeping mismatched rules out of about a dozen downstream GM systems.",
        "Migrated a vehicle-planning app onto GM's in-house hosting platform ahead of a deadline carrying $1M+ in penalties; three other teams then adopted the deployment setup and release pipeline created for it.",
        'Closed a must-fix security flag on the planning tool ~300 analysts rely on, single-handedly modernizing its outdated core frameworks and repairing everything the upgrade broke (Angular 15 to 18, Spring Boot 2.7 to 3.4).',
        "Hardened every release with automated tests that block a build when a core workflow fails: the frontend's first tests (0% to 50% coverage) and backend coverage from ~20% to 90% across seven services.",
      ],
      stack: [
        'Java',
        'Spring Boot',
        'Angular',
        'PrimeNG',
        'PostgreSQL',
        'JMeter',
        'Kubernetes',
        'CI/CD',
        'Jest',
        'Playwright',
        'JUnit',
      ],
    },
  ] satisfies Job[],
  education: [
    {
      school: 'The University of Texas at San Antonio',
      degree: 'B.S. Computer Science',
      year: 'May 2022',
    },
  ] satisfies School[],
};
