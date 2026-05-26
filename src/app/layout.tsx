import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPaletteLoader } from '@/components/layout/CommandPaletteLoader';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/data/site-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'optional', weight: ['400', '600', '700'], adjustFontFallback: true });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'optional', weight: ['400'], preload: false, adjustFontFallback: true });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.title}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    'Alan Regaya',
    'Full-Stack Developer',
    'Headless WooCommerce Developer',
    'Next.js Developer',
    'WordPress Developer',
    'WooCommerce REST API',
    'Headless E-commerce',
    'Next.js E-commerce',
    'TypeScript',
    'React Developer',
    'Typesense',
    'PHP Developer',
    'Remote Developer Philippines',
    'Tauri Developer',
    'Rust Developer',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  manifest: '/site.webmanifest',
  icons: { apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        url: siteConfig.url,
        email: siteConfig.email,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        sameAs: [siteConfig.github, siteConfig.linkedin],
        knowsAbout: ['Next.js', 'React', 'TypeScript', 'PHP', 'WordPress', 'WooCommerce', 'Headless WooCommerce', 'Headless E-commerce', 'WooCommerce REST API', 'GraphQL', 'Rust', 'Tauri', 'Typesense', 'SQLite', 'Tailwind CSS'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded">
          Skip to content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CommandPaletteLoader />
      </body>
    </html>
  );
}
