import { siteConfig } from '@/data/site-config';

type WebPageType =
  | 'WebPage'
  | 'CollectionPage'
  | 'ProfilePage'
  | 'ContactPage'
  | 'AboutPage'
  | 'FAQPage'
  | 'ItemPage';

export function buildWebPage({
  path,
  name,
  description,
  type = 'WebPage',
  primaryImage,
}: {
  path: string;
  name: string;
  description: string;
  type?: WebPageType;
  primaryImage?: string;
}) {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en-US',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${primaryImage ?? siteConfig.ogImage}`,
    },
  };
}
