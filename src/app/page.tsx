import { getGitHubStats } from '@/lib/github';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { TechStack } from '@/components/home/TechStack';
import { ContactSection } from '@/components/shared/ContactSection';

export default async function HomePage() {
  const stats = await getGitHubStats();

  return (
    <>
      <Hero />
      <Stats stats={{ commits: stats.totalCommits, prs: stats.totalPRs, stars: stats.totalStars }} />
      <FeaturedProjects />
      <TechStack />
      <ContactSection />
    </>
  );
}
