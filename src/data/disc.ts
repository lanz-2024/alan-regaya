export interface DiscFactor {
  /** Single-letter DISC code. */
  letter: 'D' | 'I' | 'S' | 'C';
  /** Full factor name. */
  name: string;
  /** Score as a percentage of the 100% total. */
  score: number;
  /** One-line, first-person description of what the factor measures. */
  definition: string;
  /** Canonical DISC color, tuned for the dark theme. */
  color: string;
}

export interface DiscProfileData {
  /** Two-letter profile code, most distinctive factors first. */
  type: string;
  /** Short, plain-language name for the profile. */
  typeLabel: string;
  /** Lead paragraph tying the profile back to how I build. */
  intro: string;
  /** Factors ordered highest score first. */
  factors: DiscFactor[];
  /** Where the assessment came from. */
  source: { label: string; url: string };
}

/**
 * Results of a DISC personality assessment (123test).
 * Ordered C → S → D → I, matching the descending score sequence.
 */
export const discProfile: DiscProfileData = {
  type: 'C-S',
  typeLabel: 'Conscientious · Steady',
  intro:
    'A DISC assessment reads me as a C‑S type — conscientious and steady. It’s the same instinct behind the principles above: understand the constraint, sweat the details, and ship something precise.',
  factors: [
    {
      letter: 'C',
      name: 'Compliance',
      score: 38,
      definition: 'How I approach and organize activity, procedures, and responsibilities.',
      color: '#3b82f6',
    },
    {
      letter: 'S',
      name: 'Steadiness',
      score: 30,
      definition: 'My temperament — patience, persistence, and thoughtfulness.',
      color: '#22c55e',
    },
    {
      letter: 'D',
      name: 'Dominance',
      score: 18,
      definition: 'How I deal with problems, assert myself, and control situations.',
      color: '#ef4444',
    },
    {
      letter: 'I',
      name: 'Influence',
      score: 14,
      definition: 'How I deal with people, communicate, and relate to others.',
      color: '#f59e0b',
    },
  ],
  source: {
    label: '123test DISC assessment',
    url: 'https://www.123test.com/disc-personality-test/',
  },
};
