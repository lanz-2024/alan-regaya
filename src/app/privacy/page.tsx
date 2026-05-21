import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name}'s portfolio site.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Contact Form</h2>
          <p>
            When you submit the contact form, your name, email address, and message are sent via{' '}
            <a
              href="https://web3forms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-text)] underline underline-offset-2"
            >
              Web3Forms
            </a>{' '}
            and delivered directly to my inbox. No data is stored by Web3Forms after delivery.
            I use your details solely to respond to your enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Analytics &amp; Cookies</h2>
          <p>
            This site does not use cookies, tracking scripts, or third-party analytics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Third-Party Links</h2>
          <p>
            Links to GitHub, LinkedIn, and other external sites are provided for reference.
            I am not responsible for the privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Contact</h2>
          <p>
            Questions?{' '}
            <Link href="/contact" className="text-[var(--color-accent-text)] underline underline-offset-2">
              Get in touch via the contact page.
            </Link>
          </p>
        </section>

        <p className="text-sm pt-4 border-t border-[var(--color-border)]">
          Last updated: March 2026
        </p>
      </div>
    </div>
  );
}
