export interface Hobby {
  title: string;
  description: string;
  icon: string;
}

export const hobbies: Hobby[] = [
  {
    title: 'Automation systems',
    description: 'Building tools like the Smart Time Tracker for Claude CLI session logging and workflow automation.',
    icon: '⚙️',
  },
  {
    title: 'Mountain biking',
    description: 'Hitting trails and exploring terrain on two wheels.',
    icon: '🚵',
  },
  {
    title: 'Gaming',
    description: 'Nintendo Switch OLED: Pokémon Mystery Dungeon DX, FireRed, UNITE, and the Naruto Ultimate Ninja Storm series when the build queue is clear.',
    icon: '🎮',
  },
  {
    title: 'Bodyweight & core training',
    description: 'Pushups, pull-ups, planks (front/side), squats, and calf raises. No gym required.',
    icon: '💪',
  },
  {
    title: 'Cryptocurrency & staking',
    description: 'Exploring DeFi protocols and passive income through staking.',
    icon: '₿',
  },
  {
    title: 'Choir service',
    description: 'Serving as a Tenor 2 in the Catholic Church choir.',
    icon: '🎵',
  },
];
