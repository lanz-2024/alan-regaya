export interface FAQ {
  q: string;
  a: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'background',
    title: 'Background & Story',
    items: [
      {
        q: 'Tell me about yourself.',
        a: "I'm Alan Regaya, a Full-Stack Developer with 6+ years of experience building headless WooCommerce storefronts, Next.js e-commerce apps, and WordPress platforms that power 7-figure online stores. I'm currently at Blaze Commerce, where I architect headless commerce systems and maintain the open-source tooling behind them. I'm based in the Philippines and work remotely.",
      },
      {
        q: 'How did you get into development?',
        a: "It started with tinkering — editing Friendster profile layouts as a teenager taught me that you could change how things looked and behaved if you understood the code underneath. That curiosity turned into a BS in Computer Science (AMA Computer College, 2017) and a career building production e-commerce platforms.",
      },
      {
        q: 'Why e-commerce specifically?',
        a: "E-commerce is one of the few domains where every layer of the stack matters: a 200ms regression hurts conversion, a botched migration loses orders, and SEO drives revenue directly. It rewards developers who can think about performance, data integrity, and UX together — which is the kind of work I enjoy most.",
      },
    ],
  },
  {
    id: 'experience',
    title: 'Experience & Roles',
    items: [
      {
        q: 'What is your current role?',
        a: "I'm a Full-Stack Developer at Blaze Commerce, where I architect and build headless WooCommerce storefronts and the open-source tooling that powers them. My day-to-day spans Next.js frontends, WordPress/PHP backends, Typesense search, and the deployment/automation glue in between.",
      },
      {
        q: 'How many years of experience do you have?',
        a: "6+ years of professional development experience, focused on the intersection of modern frontend (Next.js, React, TypeScript) and deep WordPress/WooCommerce. That combination is rare and increasingly in demand as more stores migrate to headless architectures.",
      },
      {
        q: 'Are you open to new opportunities?',
        a: "Yes — I'm open to full-stack roles, especially ones where I can bring deep technical ownership to complex, high-traffic e-commerce systems. Remote-first is preferred. The contact page is the fastest way to reach me.",
      },
    ],
  },
  {
    id: 'stack',
    title: 'Tech Stack & Skills',
    items: [
      {
        q: 'What is your primary tech stack?',
        a: "Frontend: Next.js, React, TypeScript, Tailwind CSS. Backend: PHP 8.x, WordPress/WooCommerce, Node.js, REST and GraphQL. Data & Search: Typesense, MySQL, SQLite, Redis. DevOps: Git, Vercel, Kinsta, GitHub Actions, Docker. I'm also actively learning Rust and Tauri 2.0 for cross-platform tooling.",
      },
      {
        q: 'Why are you learning Rust and Tauri?',
        a: "Most of my career has been in dynamic languages where you trade safety for speed of iteration. Rust forces a different mental model — ownership, lifetimes, and zero-cost abstractions — and Tauri lets me ship that as small, native desktop apps. It's a deliberate move to round out the systems-programming side of my skillset.",
      },
      {
        q: 'How do you stay current with new technology?',
        a: "By shipping with it. I evaluate new tools against real production constraints — performance, DX, hiring impact, long-term maintenance — rather than chasing trends. When I do adopt something new, it usually shows up first in side projects or open-source work before it lands in client code.",
      },
      {
        q: 'What does your dev setup look like?',
        a: "It's documented in detail on the Setup page — hardware, editor, terminal, dotfiles, and the everyday CLI tools I rely on. The short version: a tuned VS Code, a fast terminal workflow, and a strong preference for keyboard-driven tools.",
      },
    ],
  },
  {
    id: 'projects',
    title: 'Projects & Open Source',
    items: [
      {
        q: 'What is your most impactful project?',
        a: "headless-woocommerce — an open-source toolkit for running WooCommerce as a headless backend behind a Next.js storefront. It has 91+ stars on GitHub and is used in production across multiple countries. It's the kind of project where every decision (API shape, caching, search indexing) has visible downstream impact on real stores.",
      },
      {
        q: 'Why open source?',
        a: "Open source forces a higher standard. Code that goes public has to be readable by strangers, documented enough for someone else to onboard, and stable enough not to break their production. That discipline makes the rest of my work better too.",
      },
      {
        q: 'Where can I see your work?',
        a: "The Projects page lists case studies and links. GitHub (github.com/lanz-2024) has the open-source side. For production client work that I can't open-source, the About page has context on what I've shipped and the Contact page is the best way to ask for specifics.",
      },
    ],
  },
  {
    id: 'workstyle',
    title: 'Work Style & Collaboration',
    items: [
      {
        q: 'How do you approach a new problem?',
        a: "I try to understand the constraint before the solution. For a bug, that means reproducing it and reading the surrounding code until I can predict what changed. For a feature, that means understanding who it's for and what 'done' looks like before touching the keyboard. Premature abstraction and speculative generality are the two failure modes I actively avoid.",
      },
      {
        q: 'How do you handle code reviews and disagreement?',
        a: "Reviews are about the code, not the person. I'd rather get pushback on a PR than discover the issue in production a week later. When I disagree, I argue the trade-off in writing — performance, maintainability, scope — and defer to context I might not have.",
      },
      {
        q: 'What is your remote work style?',
        a: "Async-first, written-by-default. I keep PR descriptions, commits, and docs detailed enough that someone in another timezone can pick up the thread without a call. I'm in the Philippines (UTC+8) and overlap comfortably with EU mornings and US evenings.",
      },
      {
        q: 'What kind of team are you looking for?',
        a: "One that values shipping, takes code quality seriously without performing it, and lets engineers own problems end-to-end. I do my best work when I can see how a change reaches users and iterate from there.",
      },
    ],
  },
  {
    id: 'hiring',
    title: 'Availability & Hiring',
    items: [
      {
        q: 'Are you available for full-time work?',
        a: "I'm open to full-stack roles. The Contact page is the fastest way to start a conversation — include the role, team, and stack and I'll respond within a day or two.",
      },
      {
        q: 'Do you take freelance or contract work?',
        a: "Selectively. I prioritize engagements where I can ship something measurable — a headless migration, a performance overhaul, an integration — rather than open-ended retainers. Reach out via the Contact page with scope and timeline.",
      },
      {
        q: 'Where are you based and what are your working hours?',
        a: "Philippines, UTC+8, remote. I have strong overlap with APAC and EU teams, and meaningful overlap with US East Coast mornings. I work async by default but block time for synchronous sessions when a project needs them.",
      },
      {
        q: 'What is the best way to reach you?',
        a: "The Contact page form — it goes straight to my inbox. For longer-form context, the About page covers background and the Projects page covers shipped work. LinkedIn and GitHub are linked in the footer.",
      },
    ],
  },
];
