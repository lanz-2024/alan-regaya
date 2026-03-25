export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '⚡',
    skills: [
      { name: 'Next.js', level: 95 },
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript (ES2023+)', level: 95 },
    ],
  },
  {
    name: 'Backend',
    icon: '🔧',
    skills: [
      { name: 'PHP 8.x', level: 90 },
      { name: 'WordPress / WooCommerce', level: 95 },
      { name: 'Node.js', level: 80 },
      { name: 'REST API Design', level: 90 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    name: 'Systems',
    icon: '🦀',
    skills: [
      { name: 'Rust', level: 65 },
      { name: 'Tauri 2.0', level: 70 },
      { name: 'WP-CLI', level: 85 },
      { name: 'Bash / Shell', level: 80 },
      { name: 'Linux / SSH', level: 85 },
    ],
  },
  {
    name: 'Data & Search',
    icon: '🔍',
    skills: [
      { name: 'Typesense', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'SQLite', level: 75 },
      { name: 'Redis', level: 70 },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: '🚀',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Vercel', level: 90 },
      { name: 'Kinsta', level: 85 },
      { name: 'GitHub Actions', level: 80 },
      { name: 'Docker', level: 70 },
    ],
  },
];

export const techStackIcons: { name: string; category: string }[] = [
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'PHP', category: 'backend' },
  { name: 'WordPress', category: 'backend' },
  { name: 'WooCommerce', category: 'backend' },
  { name: 'Typesense', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'GraphQL', category: 'data' },
  { name: 'Rust', category: 'systems' },
  { name: 'Tauri', category: 'systems' },
  { name: 'Vercel', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'Node.js', category: 'backend' },
];
