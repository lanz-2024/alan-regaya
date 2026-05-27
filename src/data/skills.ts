export type SkillCategoryId = 'frontend' | 'backend' | 'data' | 'systems' | 'devops';

export interface Skill {
  name: string;
  level: number;
  featured?: boolean;
  shortName?: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  name: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: '⚡',
    skills: [
      { name: 'Next.js', level: 95, featured: true },
      { name: 'React', level: 95, featured: true },
      { name: 'TypeScript', level: 90, featured: true },
      { name: 'Tailwind CSS', level: 90, featured: true },
      { name: 'JavaScript (ES2023+)', level: 95 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '🔧',
    skills: [
      { name: 'PHP 8.x', level: 90, featured: true, shortName: 'PHP' },
      { name: 'Laravel', level: 70, featured: true },
      { name: 'CodeIgniter', level: 65, featured: true, shortName: 'CodeIgniter' },
      { name: 'ASP.NET (C#)', level: 65, featured: true, shortName: 'ASP.NET' },
      { name: 'WordPress', level: 95, featured: true },
      { name: 'WooCommerce', level: 95, featured: true },
      { name: 'Divi', level: 80, featured: true },
      { name: 'Node.js', level: 80, featured: true },
      { name: 'REST API Design', level: 90 },
      { name: 'GraphQL', level: 80, featured: true },
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    icon: '🦀',
    skills: [
      { name: 'Rust', level: 65, featured: true },
      { name: 'Tauri 2.0', level: 70, featured: true, shortName: 'Tauri' },
      { name: 'WP-CLI', level: 85 },
      { name: 'Bash / Shell', level: 80 },
      { name: 'Linux / SSH', level: 85 },
    ],
  },
  {
    id: 'data',
    name: 'Data & Search',
    icon: '🔍',
    skills: [
      { name: 'Typesense', level: 90, featured: true },
      { name: 'MySQL', level: 85, featured: true },
      { name: 'SQLite', level: 75 },
      { name: 'Redis', level: 70 },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: '🚀',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Vercel', level: 90, featured: true },
      { name: 'Kinsta', level: 85 },
      { name: 'GitHub Actions', level: 80, featured: true },
      { name: 'Docker', level: 70 },
    ],
  },
];

export interface TechStackIcon {
  name: string;
  category: SkillCategoryId;
}

export const techStackIcons: TechStackIcon[] = skillCategories.flatMap((cat) =>
  cat.skills
    .filter((s) => s.featured)
    .map((s) => ({ name: s.shortName ?? s.name, category: cat.id })),
);
