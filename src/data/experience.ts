export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Blaze Commerce',
    role: 'Full-Stack Developer',
    period: 'Feb 2023 — Present',
    location: 'Remote',
    description: 'Lead engineer for headless CMS migrations and WooCommerce storefronts serving clients across AU, UK, and US. Architect of the open-source headless WooCommerce library and the internal Claude Code workflow system.',
    highlights: [
      'Led 40+ migrations from WordPress to headless TypeScript-native architectures with zero-downtime deployment strategies',
      'Built production-ready headless WooCommerce → Next.js library — 90+ GitHub stars, 37 forks, 40+ live storefronts',
      'Integrated Typesense search across multiple client sites with automated re-indexing and InstantSearch UI with faceted filtering',
      'Implemented GTM data layer architecture with Marketo integration for lead capture across all client projects',
      'Ensured WCAG AA compliance across all projects via Lighthouse audits, 4.5:1 contrast ratios, and keyboard navigation testing',
      'Built Claude Code workflow system with 70+ custom skills and 8+ MCP integrations, enabling 60% faster delivery cycles',
      'Optimized 5,500+ client site images saving 181MB; tuned Core Web Vitals across 40+ production sites',
      'Developed Smart Time Tracker (Rust + React + Tauri) with dual-signal activity detection and ClickUp OAuth — 54 releases',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'PHP', 'WordPress', 'WooCommerce', 'Typesense', 'GTM', 'Tailwind CSS', 'Vercel'],
  },
  {
    company: 'Blaze Commerce',
    role: 'Jr. PHP Developer',
    period: 'May 2022 — Jan 2023',
    location: 'Remote',
    description: 'Developed custom WordPress plugins and themes for e-commerce clients, focusing on WooCommerce customization and database performance.',
    highlights: [
      'Developed custom WordPress plugins and themes with modern PHP standards — PSR-4 autoloading, namespaces, dependency injection',
      'Optimized MySQL database queries, reducing page load times by 60% through index optimization and query refactoring',
      'Implemented Git workflows with feature branching, code reviews, and automated deployment pipelines',
    ],
    tech: ['PHP', 'JavaScript', 'WordPress', 'WooCommerce', 'MySQL', 'CSS', 'GitHub Actions'],
  },
  {
    company: 'Asia Pacific Express Corporation',
    role: 'MIS Administrator',
    period: 'Apr 2018 — Mar 2021',
    location: 'Philippines',
    description: 'Managed corporate IT infrastructure including websites, email servers, domain management, and cloud hosting for a logistics company. Also built and maintained internal business applications and integrations using Laravel, CodeIgniter, and ASP.NET over ~3 years.',
    highlights: [
      'Managed corporate websites, domain infrastructure, email servers (Exchange/SMTP), and cloud hosting environments (AWS, cPanel)',
      'Built and maintained internal web apps and tools using Laravel, CodeIgniter, and ASP.NET (C#) — operations dashboards, shipment tracking utilities, and intranet integrations',
      'Coordinated with vendors for DNS management, SSL certificate renewals, and server security patching',
      'Provided technical support for 200+ employees across multiple office locations',
    ],
    tech: ['AWS', 'cPanel', 'Exchange', 'DNS', 'SSL', 'WordPress', 'Laravel', 'CodeIgniter', 'ASP.NET', 'C#'],
  },
  {
    company: "People's Television Network, Inc.",
    role: 'Systems Support / Junior Programmer',
    period: 'Dec 2016 — Apr 2018',
    location: 'Philippines',
    description: 'Maintained news portal and corporate websites for the national broadcaster while administering Windows Server infrastructure for 500+ users.',
    highlights: [
      'Maintained news portal and corporate websites on WordPress, implementing security updates and custom functionality',
      'Administered Windows Server Active Directory for 500+ user accounts, group policies, and network permissions',
      'Developed internal tools for content management and broadcast scheduling automation',
    ],
    tech: ['PHP', 'WordPress', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Windows Server'],
  },
];
