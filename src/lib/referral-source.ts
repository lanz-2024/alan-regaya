// Referral source for contact enquiries: the site a visitor arrived from, as a bare
// hostname (e.g. "linkedin.com"). Captured once per browser tab session, sent with the
// contact form, and appended to the notification email's logo link as ?source=.

export const SOURCE_STORAGE_KEY = 'enquiry-source';

const OWN_HOSTS = ['alanregaya.dev'];

// Redirect/shortener hosts and Android app referrers (android-app://<package>/) mapped to
// the site the visitor actually came from.
const ALIASES: Record<string, string> = {
  'lnkd.in': 'linkedin.com',
  'com.linkedin.android': 'linkedin.com',
  't.co': 'x.com',
  'twitter.com': 'x.com',
  'com.twitter.android': 'x.com',
  'l.facebook.com': 'facebook.com',
  'lm.facebook.com': 'facebook.com',
  'com.facebook.katana': 'facebook.com',
  'l.instagram.com': 'instagram.com',
  'com.instagram.android': 'instagram.com',
  'out.reddit.com': 'reddit.com',
  'com.reddit.frontpage': 'reddit.com',
  'com.google.android.gm': 'mail.google.com',
  'com.google.android.googlequicksearchbox': 'google.com',
  'com.slack': 'slack.com',
};

const HOSTNAME_RE = /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

/** Lowercase, strip www./m., apply aliases; returns null unless it is a valid hostname. */
export function normalizeSource(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let host = raw.trim().toLowerCase();
  if (!host) return null;
  // Accept full URLs as well as bare hostnames ("linkedin.com", "https://www.linkedin.com/feed").
  if (host.includes('://')) {
    try {
      host = new URL(host).hostname;
    } catch {
      return null;
    }
  } else {
    host = host.split(/[/?#:]/)[0];
  }
  host = host.replace(/\.$/, '').replace(/^(www|m)\./, '');
  host = ALIASES[host] ?? host;
  return HOSTNAME_RE.test(host) ? host : null;
}

function isOwnHost(host: string, currentHost: string): boolean {
  const h = host.replace(/^www\./, '');
  const c = currentHost.toLowerCase().replace(/^www\./, '');
  return h === c || OWN_HOSTS.some((own) => h === own || h.endsWith(`.${own}`));
}

/**
 * Work out where the visitor came from on landing. An explicit ?source=, ?utm_source= or
 * ?ref= on the landing URL wins over document.referrer. Referrers from this site itself
 * (internal navigation, reloads) are ignored. Returns null when the origin is unknown.
 */
export function detectSource(landingUrl: string, referrer: string): string | null {
  let url: URL;
  try {
    url = new URL(landingUrl);
  } catch {
    return null;
  }
  for (const key of ['source', 'utm_source', 'ref']) {
    const fromParam = normalizeSource(url.searchParams.get(key));
    if (fromParam && !isOwnHost(fromParam, url.hostname)) return fromParam;
  }
  if (!referrer) return null;
  let refHost: string;
  try {
    // android-app://com.linkedin.android/ parses with the package name as the hostname.
    refHost = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (!refHost || isOwnHost(refHost, url.hostname)) return null;
  return normalizeSource(refHost);
}

/** Logo link for the notification email; no ?source= when the origin is unknown. */
export function sourceLink(base: string, source: string | null): string {
  if (!source) return base;
  const url = new URL(base);
  url.searchParams.set('source', source);
  return url.toString();
}
