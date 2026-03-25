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
    role: 'Senior Full-Stack Developer',
    period: '2021 — Present',
    location: 'Remote',
    description: 'Lead developer for headless WooCommerce projects serving global e-commerce clients. Architect and maintain the BlazeCommerce open-source plugin ecosystem.',
    highlights: [
      'Architected and shipped blazecommerce/headless-woocommerce — 91 GitHub stars, 37 forks',
      'Built blazecommerce/blazecommerce-wp-plugin, powering 30+ production stores',
      'Led frontend migrations from monolithic WP themes to Next.js headless storefronts',
      'Integrated Typesense search across all client storefronts for sub-100ms results',
      'Mentored junior developers and established code review processes',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'PHP', 'WordPress', 'WooCommerce', 'Typesense', 'GraphQL'],
  },
  {
    company: 'Blaze Commerce',
    role: 'Junior Full-Stack Developer',
    period: '2018 — 2021',
    location: 'Remote',
    description: 'Developed custom WordPress themes and plugins for e-commerce clients across Australia, UK, and the US.',
    highlights: [
      'Built custom WooCommerce checkout flows, reducing cart abandonment by 20%',
      'Developed reusable Gutenberg blocks for marketing teams',
      'Maintained and optimized 15+ production WordPress sites',
      'Implemented automated deployment pipelines via GitHub Actions',
    ],
    tech: ['PHP', 'JavaScript', 'WordPress', 'WooCommerce', 'MySQL', 'CSS', 'SCSS'],
  },
  {
    company: 'Asia Pacific Express',
    role: 'Web Developer',
    period: '2017 — 2018',
    location: 'Philippines',
    description: 'Developed and maintained internal web tools for logistics and fleet management operations.',
    highlights: [
      'Built a real-time fleet tracking dashboard using Google Maps API',
      'Developed an internal shipment management system processing 500+ orders/day',
      'Reduced manual data entry by 60% through automated form workflows',
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
  },
  {
    company: "People's Television Network",
    role: 'Web Developer (Intern)',
    period: '2016 — 2017',
    location: 'Philippines',
    description: 'Maintained the public-facing website and developed internal content management tools for the national broadcaster.',
    highlights: [
      'Redesigned the news section, improving page load time by 40%',
      'Built a broadcast schedule management system for program directors',
      'Integrated social media feeds for live news updates',
    ],
    tech: ['PHP', 'WordPress', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
  },
];
