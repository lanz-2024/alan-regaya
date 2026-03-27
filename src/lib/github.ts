import { GitHubStats } from './types';

const FALLBACK_STATS: GitHubStats = {
  totalCommits: 9438,
  totalPRs: 1454,
  totalStars: 91,
  contributionCalendar: [],
};

export async function getGitHubStats(): Promise<GitHubStats> {
  if (!process.env.GITHUB_TOKEN) {
    return FALLBACK_STATS;
  }

  try {
    const query = `
      query {
        user(login: "lanz-2024") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
            totalCommitContributions
            totalPullRequestContributions
          }
          repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR]) {
            nodes {
              stargazerCount
            }
          }
        }
      }
    `;

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return FALLBACK_STATS;

    const { data } = await res.json();
    const user = data?.user;
    if (!user) return FALLBACK_STATS;

    const contributions = user.contributionsCollection;
    const totalStars = user.repositories.nodes.reduce(
      (sum: number, repo: { stargazerCount: number }) => sum + repo.stargazerCount,
      0
    );

    const calendar = contributions.contributionCalendar.weeks.map(
      (week: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) => ({
        week: week.contributionDays[0]?.date ?? '',
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelToNumber(day.contributionLevel),
        })),
      })
    );

    return {
      totalCommits: contributions.totalCommitContributions,
      totalPRs: contributions.totalPullRequestContributions,
      totalStars,
      contributionCalendar: calendar,
    };
  } catch {
    return FALLBACK_STATS;
  }
}

function levelToNumber(level: string): 0 | 1 | 2 | 3 | 4 {
  const map: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return map[level] ?? 0;
}
