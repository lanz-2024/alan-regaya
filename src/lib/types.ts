export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalStars: number;
  contributionCalendar: ContributionWeek[];
}

export interface ContributionWeek {
  week: string;
  days: ContributionDay[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
