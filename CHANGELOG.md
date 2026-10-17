# Changelog

## [Unreleased]

### Fixed
- Contact: the visitor's confirmation email logo now carries the same `?source=` link as the notification email, and the sent/failed message scrolls into view after submitting (v0.9.2).
- Security: upgrade next and eslint-config-next 16.2.7 to 16.4.2 (critical Next.js advisories: middleware bypass, Server Actions DoS/SSRF, image optimizer issues), which also pulls patched postcss and sharp (v0.9.1).
- `api/contact/route.ts`: Capitalize "New Enquiry" in notify email subject/heading/text and replace colon with pipe divider in subject (`New Enquiry | {topic} — {name}`)
- `experience.ts`: Replace Algolia with Typesense (actual search tech used across client sites)
- `experience.ts`: Remove fabricated "66 semantic releases" stat — unverifiable, not from any known source
- `experience.ts`: Update 30+ → 40+ migrations/storefronts/production sites (ClickUp Delivery space: 40+ distinct client projects)
- `experience.ts`: Update 48+ → 70+ custom Claude Code skills (verified: 76 skill directories)
- `experience.ts`: Update Smart Time Tracker 24 → 54 releases (verified against blaze-commerce/blaze-smart-time-tracker GitHub tags)
- `projects.ts`: Fix Shine Trim description — was "automotive detailing", actual industry is craft embellishments (rhinestones, beads, sequins)
- `projects.ts`: Remove "headless storefront" from Porselli Dancewear — site was rebuilt as traditional WordPress/Blocksy
- `github.ts`: Remove inflated +4500/+990 commit/PR offsets; update fallback stats to verified totals (9,438 commits / 1,454 PRs via GraphQL all-years query)

### Added
- Contact enquiries record the referring site (v0.9.0). `ReferralSourceCapture` in the root layout reads `?source=` / `?utm_source=` / `?ref=` or `document.referrer` on landing, normalizes it to a bare hostname (aliases for lnkd.in, t.co, l.facebook.com and Android app referrers such as `android-app://com.linkedin.android/`), ignores this site's own referrers, and keeps it in `sessionStorage` for the tab.
- `api/contact/route.ts`: notification email logo links to `https://alanregaya.dev/?source=<host>` when a valid source is known; plain link when it is not.
- Privacy policy "Referral Source" section; contact form notice mentions the referring site and links to the policy.
- Custom 404 page (`not-found.tsx`) with branded dark theme and "Go Home" button
- TechStack: group technologies by category (Frontend/Backend/Data/Systems/DevOps) with colored labels
- FeaturedProjects: project screenshot images with `aspect-video` / `object-cover` layout
- ContactSection: visible "Email", "GitHub", "LinkedIn" text labels below icons
- Scroll fade-in animations on Stats, FeaturedProjects, TechStack, and ContactSection sections
- Hero: "Learn More" ghost button linking to `#stats`
- Hero: "AR" initials avatar with accent gradient background

### Changed
- AnimatedCounter: `useState(target)` initial value so SSR HTML shows real numbers (resets to 0 on mount to animate up)
- Contact page: 2-column desktop layout (info sidebar + form column), stacked on mobile
- MobileNav: always-rendered overlay with CSS `translate-x`/`opacity` transition; Tailwind hamburger morph with `duration-300`
- Extract `NavLinks` into shared component for active-state awareness
- Extract `ContactSection` shared component
- Replace `alan@regaya:~$` text in header with AR gradient logo image (32px mobile, 36px sm+)
- Move "Get in Touch" CTA to header (desktop button, mobile nav); remove Contact nav link
- Hero section now shows only "View Projects" CTA

### Fixed
- Missing `Link` import in privacy policy page
- Mobile/tablet header layout: hamburger left, logo center, CTA right (envelope icon <640px, "Get in Touch" text 640–767px)
- Replace default Next.js favicon with AR logo
- Scroll-down chevron added to Hero section
- Projects (and About) nav links scroll to top from any page, not just when already on that page (desktop and mobile)
- Remove CSS `order` from header grid — rely on DOM order instead
- Blaze Blocksy project description: remove incorrect "headless" label
- ContactForm: remove client-side field validation (rely on native HTML5 validation)
