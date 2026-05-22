export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: 'Understand the constraint before the solution.',
    body: "For a bug, that means reproducing it and reading the surrounding code until I can predict what changed. For a feature, that means understanding who it's for and what 'done' looks like before touching the keyboard.",
  },
  {
    title: 'Premature abstraction is the bug I hunt hardest.',
    body: "Three similar lines is not a pattern. I'd rather have duplication that's easy to delete than an abstraction that's expensive to refactor. The right shape becomes obvious by the third or fourth call site, not the first.",
  },
  {
    title: 'PRs are async writing — if a reviewer needs a call, the description failed.',
    body: "Title, summary, screenshots, test plan, trade-offs. Future-me reading this in six months should be able to reconstruct the decision without context.",
  },
  {
    title: 'In e-commerce, every millisecond is a unit of revenue.',
    body: "A 200ms regression isn't a 'minor perf issue' — it's a measurable drop in conversion. I think about performance, data integrity, and UX as one problem, not three.",
  },
  {
    title: 'Open-source forces a higher standard.',
    body: "Code that goes public has to be readable by strangers, documented well enough to onboard someone in a different timezone, and stable enough not to break their production. That discipline makes the rest of my work better.",
  },
  {
    title: 'Async-first, written-by-default.',
    body: "I keep commits, PRs, and docs detailed enough that someone on another continent can pick up the thread without a sync call. Meetings are a tool, not the default.",
  },
  {
    title: 'Adopt new tech against real constraints, not vibes.',
    body: "Performance, DX, hiring impact, long-term maintenance. If a new tool can't justify itself against those, it stays in a side project until it can.",
  },
];
