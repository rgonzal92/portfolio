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
  lede: 'Software engineer with 3+ years at General Motors building Java, Spring Boot, Angular, and PostgreSQL applications, now building and deploying AI-integrated applications on AWS.',
  headline: "Hi, I'm Richard.",
  about: [
    'Software engineer who designs and develops applications with Java, Spring Boot, Angular, and PostgreSQL, working directly with business users to turn requirements into features, optimize performance, and improve software quality.',
    'For 3+ years at General Motors, I built and maintained internal applications that configure vehicle features for ~300 business users across 40+ vehicle programs. I gathered requirements directly from business stakeholders, demoed progress to them twice a week, and took features from request to production: cutting vehicle-catalog load times from ~20s to 2s, migrating an app to Kubernetes ahead of a deadline carrying a $1M+ penalty, and raising JUnit coverage from ~20% to 90% across seven microservices.',
    'I also build and deploy AI-integrated applications on AWS on my own, using Terraform and CI/CD. My latest, Vehicle Catalog, adds approval workflows, versioning, and AI-assisted rule drafting with validated output and a $1/day spending limit.',
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
    'Solo-built an AWS-hosted catalog management platform with a 48,000-cell autosaving grid, rule validation, approvals, versioning, and three-way merge, cutting the largest save from 517 ms to 57 ms. Spring AI drafts rules, analyzes changes with tool calling, and searches documents with pgvector RAG behind Java-side output validation and an atomic $1/day spending limit; Terraform and GitHub Actions deploy it across EC2, CloudFront, S3, Cognito, SQS, and ECR with keyless OIDC and health-check rollback.',
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
    'Software engineer with 3+ years of experience designing and developing applications using Java, Spring Boot, Angular, and PostgreSQL. Collaborates directly with business users to translate requirements into features, optimize performance, and improve software quality. Independently builds and deploys AI-integrated applications on AWS using Terraform and CI/CD.',
  experience: [
    {
      company: 'General Motors',
      role: 'Software Engineer',
      location: 'Austin, TX',
      start: 'Jan 2023',
      end: 'May 2026',
      summary:
        'Developed and maintained vehicle-configuration applications serving ~300 business users across 40+ vehicle programs, along with a supplier-warranty claims platform.',
      highlights: [
        'Engineered an automated vehicle-option rule management feature using Angular, Spring Boot, and PostgreSQL, lowering manual updates by 50% and preventing invalid data from reaching downstream systems.',
        'Optimized PostgreSQL query performance using JMeter and EXPLAIN to identify and fix an unbounded subquery, cutting vehicle-catalog load times from ~20s to 2s (truck catalogs from ~2 min to 20s) across 1,000+ catalogs.',
        'Migrated a vehicle-program application from Pivotal Cloud Foundry to on-premises Kubernetes ahead of a deadline carrying $1M+ in penalties, building deployment manifests and a CI/CD pipeline reused by three other teams.',
        'Modernized a security-flagged vehicle-configuration application by independently upgrading Angular 15 to 18 and Spring Boot 2.7 to 3.4, resolving PrimeNG and Spring Security compatibility issues to restore security support.',
        "Automated regression testing by introducing the frontend's first Jest and Playwright suites (0% to 50% coverage) and increasing JUnit coverage from ~20% to 90% across seven microservices, shifting defect detection from UAT into CI.",
      ],
      stack: [
        'Java',
        'Spring Boot',
        'Angular',
        'PrimeNG',
        'PostgreSQL',
        'Kubernetes',
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
