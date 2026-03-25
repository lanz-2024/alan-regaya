export function OriginStory() {
  return (
    <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6" aria-labelledby="origin-heading">
      <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-2">How It Started</p>
      <h2 id="origin-heading" className="text-3xl sm:text-4xl font-bold mb-10">Before the career, there was the curiosity.</h2>

      <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-3">The Friendster Profile (Elementary School)</h3>
          <p>
            My first encounter with web development wasn&apos;t in a classroom. It was on Friendster, when I was in elementary school and wanted my profile to look different from everyone else&apos;s.
            What started as copying snippets from forums quickly turned into actually understanding what I was copying. I wrote CSS for animations, custom color schemes, and background effects.
            I added JavaScript for interactive elements — modals, scrolling navigation effects, dynamic text. Then I went further and wrote PHP to build a visitor counter and an authenticated chatbox that displayed the commenter&apos;s profile name to prevent impersonation.
          </p>
          <p className="mt-3">
            None of this was planned. It was just a kid who wanted a cool profile and kept following threads of curiosity until he accidentally learned full-stack web development —
            years before any formal computer science education.
          </p>
        </div>

        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-3">The College Thesis (First Real Project)</h3>
          <p>
            For my senior thesis at AMA Computer College, I proposed digitizing my university&apos;s entirely paper-based administrative forms system.
            The core of the project was a custom WordPress plugin that could dynamically generate forms with conditional logic — showing or hiding fields based on user input, applying validation rules per field type, and managing submissions through an approval workflow.
          </p>
          <p className="mt-3">
            The build was the easier part. The majority of the work went into the research: documenting the methodology, the development process, the testing, and the findings in a bound thesis.
            It was my first experience of the full arc of a real project — from problem identification through solution design, implementation, and formal documentation.
            It also happened to be my first serious WordPress project.
          </p>
        </div>

        <p className="text-[var(--color-text)] font-medium border-l-2 border-[var(--color-accent)] pl-4">
          Eight years of professional work later, I still trace the same thread: find the interesting problem, follow the curiosity, build the thing that solves it well.
        </p>
      </div>
    </section>
  );
}
