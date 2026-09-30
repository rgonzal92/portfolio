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
  lede: 'Full-stack engineer with 3+ years at General Motors, taking features from stakeholder requirements to production across Java/Spring Boot, PostgreSQL, and Angular.',
  headline: "Hi, I'm Richard.",
  about: [
    'Full-stack software engineer who builds Java/Spring Boot services, PostgreSQL, and Angular applications, and leaves systems faster, more secure, and easier to deploy.',
    'For 3+ years at General Motors, I built and maintained internal applications that configure vehicle features for ~300 business users across 40+ vehicle programs. I gathered requirements directly from business stakeholders, demoed progress to them twice a week, and took features from request to production: cutting vehicle-catalog load times from ~20s to 2s, migrating an app to Kubernetes ahead of a deadline carrying a $1M+ penalty, and raising JUnit coverage from ~20% to 90% across seven microservices.',
    'My recent projects go deeper on correctness: concurrency-safe APIs, idempotent writes, and validated LLM integrations.',
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
    items: [
      'Angular',
      'React',
      'RxJS',
      'NgRx',
      'PrimeNG',
      'Angular Material',
      'AG Grid',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      'Spring Boot',
      'Spring Security',
      'Spring AI',
      'Spring Data JPA',
      'Hibernate',
      'JDBC',
      'REST APIs',
      'PostgreSQL',
      'D1',
      'Flyway',
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      'Cloudflare Workers',
      'KV',
      'Kubernetes',
      'Azure AKS',
      'Docker',
      'Nginx',
      'GitHub Actions (CI/CD)',
    ],
  },
  {
    label: 'Testing & Observability',
    items: ['JUnit 5', 'Jest', 'Playwright', 'Testcontainers', 'JMeter', 'Prometheus', 'Grafana'],
  },
];

// Newest first. The first project is shown full-width as the featured one.
export const PROJECTS: Project[] = [
  {
    title: 'Configuration Rule Engine',
    year: '2026',
    role: 'Full-stack',
    summary:
      'Designed a Spring Boot REST API where Spring AI drafts rules from plain English and a deterministic Java checker blocks contradictions before apply; capped LLM spend with rate limits enforced atomically in PostgreSQL. Made concurrent edits and retries safe with row locks, optimistic versioning, and idempotent apply receipts; secured guest sessions with Spring Security, Spring Session JDBC, and CSRF, proven by 48 Testcontainers tests.',
    stack: ['Java', 'Spring Boot', 'Spring AI', 'Angular', 'PostgreSQL'],
    repo: 'https://github.com/rgonzal92/configuration-rule-engine',
    demo: 'https://cre.rgonz.dev',
  },
  {
    title: 'PagePulse',
    year: '2026',
    role: 'Full-stack',
    summary:
      'Launched a full-stack A/B testing app on Cloudflare Workers, D1, and KV; SQL reporting counts only accounts past their 24-hour window, and an idempotent finalizer saves one immutable result with a confidence interval. Hardened signup admission so lost responses recover the committed assignment, D1 enforces capacity when signups race for the last spot, and KV caches settings but never grants admission; a cron job closes runs and purges sessions.',
    stack: ['TypeScript', 'React', 'Cloudflare Workers', 'D1', 'KV'],
    repo: 'https://github.com/rgonzal92/onboarding-experiments',
    demo: 'https://pagepulse.rgonz.dev',
  },
];

export const RESUME = {
  summary:
    'Full-stack software engineer with 3+ years at General Motors building Java/Spring Boot services, PostgreSQL, and Angular applications, delivering features from stakeholder requirements to production and leaving systems faster, more secure, and easier to deploy. Recent projects extend this to concurrency-safe APIs, idempotent writes, and validated LLM integrations.',
  experience: [
    {
      company: 'General Motors',
      role: 'Software Engineer',
      location: 'Austin, TX',
      start: 'Jan 2023',
      end: 'May 2026',
      summary:
        'Developed and maintained internal applications that configure vehicle features for ~300 business users across 40+ vehicle programs, plus one that resolves supplier warranty claims. Worked across three product teams of 3 to 15 developers, gathering requirements directly from business stakeholders and demoing progress to them twice weekly.',
      highlights: [
        'Cut vehicle-catalog load times from ~20s to 2s (truck catalogs from ~2 min to 20s) by using AI-assisted EXPLAIN analysis to pinpoint and optimize an unbounded subquery, removing a daily bottleneck for business users across 1,000+ catalogs.',
        'Migrated a vehicle-program app from Pivotal Cloud Foundry to on-premises Kubernetes before a year-end deadline carrying a $1M+ penalty, authoring manifests and a deployment pipeline that three other teams reused.',
        'Independently upgraded a security-flagged vehicle-configuration app from end-of-life Angular 15 and Spring Boot 2.7 to 18 and 3.4, fixing PrimeNG and Spring Security breakage to keep a tool business users relied on secure and supported.',
        'Built a business-requested sync across Angular, Spring Boot, and PostgreSQL to keep paired vehicle-feature exclusion rules aligned, stopping bad data from reaching downstream systems and ending routine manual fixes.',
        "Moved regression detection from business users' UAT testing into CI by building the frontend's first Jest and Playwright suite (0% to 50% coverage) and raising JUnit coverage from ~20% to 90% across seven microservices.",
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
