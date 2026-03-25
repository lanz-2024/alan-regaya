# Changelog

## [Unreleased]

### Added
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
