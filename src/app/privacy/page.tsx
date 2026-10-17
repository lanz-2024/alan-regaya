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
            When you submit the contact form, your name, email address, and message are delivered to my inbox via{' '}
            <a
              href="https://resend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-text)] underline underline-offset-2"
            >
              Resend
            </a>{' '}
            (transactional email provider). You will also receive an automated confirmation email at the
            address you provided. No data is stored after delivery. I use your details solely to respond
            to your enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Referral Source</h2>
          <p>
            When you arrive from another website, your browser tells this site which site referred you. If
            you then submit the contact form, that site&apos;s domain name only (for example,{' '}
            <code className="text-sm">linkedin.com</code>) is added to the logo link in the email I receive
            and in your confirmation email, so I know where enquiries come from. A <code className="text-sm">?source=</code>,{' '}
            <code className="text-sm">?utm_source=</code> or <code className="text-sm">?ref=</code> value
            in the link you followed is used the same way. The full page address you came from is never
            recorded, and if no referring site is known, nothing is sent.
          </p>
          <p className="mt-3">
            The domain is held in your browser&apos;s session storage for the current tab only and is
            cleared when you close the tab. It is not a cookie and is never sent anywhere unless you
            submit the form. Separately, the site&apos;s analytics (see below) also see the referring site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">Analytics &amp; Cookies</h2>
          <p>
            This site uses Vercel Web Analytics to see how visitors find and use it. It records
            anonymous page views, including the referring site, the page visited, approximate location
            (such as country), and device, operating system and browser type. Vercel does not collect
            personal identifiers that track you across other websites or applications. Visitors are
            told apart by a hash created from the incoming request rather than by cookies, and that
            session information is discarded after 24 hours.
          </p>
          <p className="mt-3">
            This site does not set cookies itself, and Vercel Web Analytics does not use third-party
            cookies. There is no advertising tracking. For details, see{' '}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              className="text-[var(--color-accent-text)] underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel&apos;s Web Analytics privacy documentation
            </a>
            .
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
          Last updated: October 2026
        </p>
      </div>
    </div>
  );
}
