import { getGitHubStats } from '@/lib/github';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { TechStack } from '@/components/home/TechStack';
import { ContactSection } from '@/components/shared/ContactSection';
import { siteConfig } from '@/data/site-config';
import { buildWebPage } from '@/lib/seo/webpage';
import { JsonLd } from '@/components/seo/JsonLd';

const webPageLd = buildWebPage({
  path: '/',
  name: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.description,
});

export default async function HomePage() {
  const stats = await getGitHubStats();

  return (
    <>
      <JsonLd data={webPageLd} />
      <Hero />
      <Stats stats={{ commits: stats.totalCommits, prs: stats.totalPRs, stars: stats.totalStars }} />
      <FeaturedProjects />
      <TechStack />
      <ContactSection />
    </>
  );
}
