export interface Lesson {
  id: string;
  title: string;
  context: string;
  whatHappened: string;
  whatIMissed: string;
  whatChanged: string;
  date: string;
}

export const lessons: Lesson[] = [
  {
    id: 'cache-key-collision',
    title: 'A cache key collision quietly served the wrong product page for hours.',
    context:
      'Headless WooCommerce storefront with edge caching keyed by product slug. Two products in different categories ended up with overlapping cache keys after a slug normalization change.',
    whatHappened:
      'For a window of about four hours, a small percentage of visitors saw the wrong product detail page. The site looked healthy — no 500s, no error spike — until a customer support ticket surfaced it.',
    whatIMissed:
      "I trusted the slug as a unique cache key without re-deriving uniqueness after the normalization change. The test suite didn't cover cache-layer behavior, only the response shape.",
    whatChanged:
      'I now treat cache keys as a first-class part of any data-shape change. The repo got a small integration test that hits the cache layer with adjacent product IDs and asserts response identity. PR template now has a "Does this change anything cache-keyed?" line.',
    date: '2024',
  },
  {
    id: 'migration-dry-run',
    title: 'I called a migration "done" without running it against a production-sized dataset.',
    context:
      'WooCommerce-to-headless migration involving a Typesense reindex of ~50k products with custom attribute mapping.',
    whatHappened:
      'It worked perfectly on staging (~2k products). On production it OOM\'d the indexer mid-run, left the index in a partial state, and search returned half-empty results until I caught it.',
    whatIMissed:
      "I optimized for correctness of the mapping logic and assumed scale was a separate, later concern. The staging dataset wasn't representative — it was 4% the size.",
    whatChanged:
      'Migrations now have an explicit "scale rehearsal" step: snapshot of production data, run against it in an isolated environment, measure peak memory and time. No migration ships without that rehearsal artifact in the PR.',
    date: '2024',
  },
  {
    id: 'silent-rollback',
    title: 'A "small" CSS rollback removed the entire add-to-cart button on mobile.',
    context:
      'WooCommerce theme on a client storefront. A visual regression PR was reverted to "unblock release" without re-running the visual diff after revert.',
    whatHappened:
      'The revert touched a shared utility class. Mobile add-to-cart was display:none for a few hours overnight. Conversion dropped sharply before the team caught it the next morning.',
    whatIMissed:
      "I treated 'revert' as a safe operation. It isn't — a revert is just another commit, and it deserves the same visual-regression gate as the original PR.",
    whatChanged:
      "Reverts now go through the full CI gate, including visual diff. I'm also more willing to ship a forward fix than a revert when a revert touches shared code.",
    date: '2025',
  },
  {
    id: 'overengineered-abstraction',
    title: 'I built a "flexible" hook system that no one used and I had to maintain.',
    context:
      'Early version of an internal plugin. I designed a pluggable filter system anticipating future extension points.',
    whatHappened:
      'A year later, the filter system had zero external consumers. It had two: me, calling it from inside the plugin. The indirection made every change harder to trace.',
    whatIMissed:
      "I optimized for hypothetical future requirements. I'd convinced myself flexibility was free — it isn't, you pay for it in readability, debuggability, and onboarding cost.",
    whatChanged:
      'I now wait for the third real use case before extracting an abstraction. Two looks like a pattern but is usually a coincidence; three is when the right shape becomes obvious.',
    date: '2023',
  },
];
