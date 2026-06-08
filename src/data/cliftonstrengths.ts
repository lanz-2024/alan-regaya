export type CSDomain =
  | 'Strategic Thinking'
  | 'Executing'
  | 'Influencing'
  | 'Relationship Building';

export interface CSTheme {
  rank: number;
  name: string;
  domain: CSDomain;
}

export interface CSDomainMeta {
  name: CSDomain;
  /** Canonical Gallup domain color, tuned for the dark theme. */
  color: string;
}

/** The four CliftonStrengths domains, ordered by my top-10 weighting (lead domain first). */
export const csDomains: CSDomainMeta[] = [
  { name: 'Strategic Thinking', color: '#10b981' },
  { name: 'Executing', color: '#a855f7' },
  { name: 'Influencing', color: '#f97316' },
  { name: 'Relationship Building', color: '#3b82f6' },
];

/** Full CliftonStrengths 34 sequence, in rank order (Gallup assessment, Oct 2022). */
export const csThemes: CSTheme[] = [
  { rank: 1, name: 'Futuristic', domain: 'Strategic Thinking' },
  { rank: 2, name: 'Arranger', domain: 'Executing' },
  { rank: 3, name: 'Deliberative', domain: 'Executing' },
  { rank: 4, name: 'Strategic', domain: 'Strategic Thinking' },
  { rank: 5, name: 'Competition', domain: 'Influencing' },
  { rank: 6, name: 'Ideation', domain: 'Strategic Thinking' },
  { rank: 7, name: 'Maximizer', domain: 'Influencing' },
  { rank: 8, name: 'Individualization', domain: 'Relationship Building' },
  { rank: 9, name: 'Achiever', domain: 'Executing' },
  { rank: 10, name: 'Analytical', domain: 'Strategic Thinking' },
  { rank: 11, name: 'Relator', domain: 'Relationship Building' },
  { rank: 12, name: 'Intellection', domain: 'Strategic Thinking' },
  { rank: 13, name: 'Significance', domain: 'Influencing' },
  { rank: 14, name: 'Focus', domain: 'Executing' },
  { rank: 15, name: 'Self-Assurance', domain: 'Influencing' },
  { rank: 16, name: 'Restorative', domain: 'Executing' },
  { rank: 17, name: 'Adaptability', domain: 'Relationship Building' },
  { rank: 18, name: 'Empathy', domain: 'Relationship Building' },
  { rank: 19, name: 'Developer', domain: 'Relationship Building' },
  { rank: 20, name: 'Connectedness', domain: 'Relationship Building' },
  { rank: 21, name: 'Learner', domain: 'Strategic Thinking' },
  { rank: 22, name: 'Belief', domain: 'Executing' },
  { rank: 23, name: 'Responsibility', domain: 'Executing' },
  { rank: 24, name: 'Command', domain: 'Influencing' },
  { rank: 25, name: 'Positivity', domain: 'Relationship Building' },
  { rank: 26, name: 'Activator', domain: 'Influencing' },
  { rank: 27, name: 'Consistency', domain: 'Executing' },
  { rank: 28, name: 'Harmony', domain: 'Relationship Building' },
  { rank: 29, name: 'Input', domain: 'Strategic Thinking' },
  { rank: 30, name: 'Discipline', domain: 'Executing' },
  { rank: 31, name: 'Woo', domain: 'Influencing' },
  { rank: 32, name: 'Communication', domain: 'Influencing' },
  { rank: 33, name: 'Context', domain: 'Strategic Thinking' },
  { rank: 34, name: 'Includer', domain: 'Relationship Building' },
];

/** One-line "how you can thrive" descriptors for the top 10 themes. */
export const csBlurbs: Record<number, string> = {
  1: 'Inspired by the future and what could be — and energizes others with that vision.',
  2: 'Organizes people and resources with flexibility for maximum productivity.',
  3: 'Takes serious care in decisions and anticipates obstacles before they appear.',
  4: 'Creates alternative paths and quickly spots the relevant patterns and issues.',
  5: 'Measures progress against others and strives to finish first.',
  6: 'Fascinated by ideas; finds connections between seemingly unrelated things.',
  7: 'Focuses on strengths to turn something strong into something superb.',
  8: 'Sees what makes each person unique and how they work best together.',
  9: 'Works hard with real stamina; takes satisfaction in getting things done.',
  10: 'Searches for reasons and causes, weighing every factor that shapes a situation.',
};

export const cliftonMeta = {
  leadDomain: 'Strategic Thinking' as CSDomain,
  intro:
    'Gallup’s CliftonStrengths ranks 34 talent themes by how naturally each shows up. My top ten lean hard on Strategic Thinking and Executing — the same “see the pattern, then ship it” instinct behind everything else on this page.',
  assessedOn: 'October 2022',
  source: {
    label: 'Gallup CliftonStrengths 34',
    url: 'https://www.gallup.com/cliftonstrengths/en/253715/34-cliftonstrengths-themes.aspx',
  },
  /** My official Gallup CliftonStrengths 34 report (self-hosted; opens in-browser, not a download). */
  report: {
    label: 'View my full report (PDF)',
    url: '/alan-regaya-cliftonstrengths-34.pdf',
  },
};
