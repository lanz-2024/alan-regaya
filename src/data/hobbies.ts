export interface Hobby {
  title: string;
  description: string;
  icon: string;
}

export const hobbies: Hobby[] = [
  {
    title: 'Automation Systems',
    description: 'Building tools like the Smart Time Tracker for Claude CLI session logging and workflow automation.',
    icon: '⚙️',
  },
  {
    title: 'Mountain Biking',
    description: 'Hitting trails and exploring terrain on two wheels.',
    icon: '🚵',
  },
  {
    title: 'Gaming',
    description: 'Nintendo Switch OLED — gaming sessions when the build queue is clear.',
    icon: '🎮',
  },
  {
    title: 'Bodyweight & Core Training',
    description: 'Pushups, pull-ups, planks (front/side), squats, and calf raises — no gym required.',
    icon: '💪',
  },
  {
    title: 'Cryptocurrency & Staking',
    description: 'Exploring DeFi protocols and passive income through staking.',
    icon: '₿',
  },
  {
    title: 'Choir Service',
    description: 'Serving as a singer in the Catholic Church choir.',
    icon: '🎵',
  },
];
