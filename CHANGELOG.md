# Changelog

## [Unreleased]

### Changed
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
- Projects nav link now scrolls to top when already on `/projects` (desktop and mobile)
- Remove CSS `order` from header grid — rely on DOM order instead
- Blaze Blocksy project description: remove incorrect "headless" label
- ContactForm: remove client-side field validation (rely on native HTML5 validation)
