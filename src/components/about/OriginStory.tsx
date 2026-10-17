export function OriginStory() {
  return (
    <section id="story" className="py-24 max-w-3xl mx-auto px-4 sm:px-6" aria-labelledby="origin-heading">
      <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">How It Started</p>
      <h2 id="origin-heading" className="text-3xl sm:text-4xl font-bold mb-10">Curiosity came before the career.</h2>

      <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-3">The Friendster Profile (Elementary School)</h3>
          <p>
            I first ran into web development on Friendster, in elementary school, when I wanted my profile to look different from everyone else&apos;s.
            What started as copying snippets from forums quickly turned into understanding what I was copying. I wrote CSS for animations, custom color schemes, and background effects.
            I added JavaScript for interactive elements: modals, scrolling navigation effects, dynamic text. Then I went further and wrote PHP to build a visitor counter and an authenticated chatbox that displayed the commenter&apos;s profile name to prevent impersonation.
          </p>
          <p className="mt-3">
            None of this was planned. I was a kid who wanted a cool profile and kept going until I had accidentally learned full-stack web development,
            years before any formal computer science education.
          </p>
        </div>

        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-3">High school: the mentor who made it click</h3>
          <p>
            The curiosity carried into high school, where a teacher sharpened it: Carmelo &quot;Melo&quot; Diaz.
            He was my computer and web development instructor, and a mentor I genuinely respected.
            He saw potential in me before I saw it in myself, and that mattered.
          </p>
          <p className="mt-3">
            I got consistent 99s and 100s on quizzes and exams, but I think that came from mindset more than talent.
            Believing I could do it was more than half the battle, and the skills grew from there.
            Sir Melo gave me that foundation.
          </p>
          <p className="mt-3">
            Outside of class, I had another habit nobody really taught me: dismantling laptops. I&apos;d take them apart just to understand
            how everything fit together, then reassemble them, just to see if I could. I was just curious. It was the same instinct that had me
            reverse-engineering Friendster CSS, and now it had me learning what a heatsink does and why RAM slots matter.
          </p>
        </div>

        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-3">The college thesis (first real project)</h3>
          <p>
            For my senior thesis at AMA Computer College, I proposed digitizing my university&apos;s entirely paper-based administrative forms system.
            The core of the project was a custom WordPress plugin that could dynamically generate forms with conditional logic: showing or hiding fields based on user input, applying validation rules per field type, and managing submissions through an approval workflow.
          </p>
          <p className="mt-3">
            The build was the easier part. The majority of the work went into the research: documenting the methodology, the development process, the testing, and the findings in a bound thesis.
            It was also where I first learned to think in flowcharts, mapping out every conditional branch of the form logic as proper flowchart diagrams, with decision nodes, process boxes, and defined flow formats, before writing a single line of code. A habit that stuck.
            It was my first real project from start to finish: identifying the problem, designing the solution, implementing it, and documenting it formally.
            It was also my first serious WordPress project.
          </p>
        </div>

        <p className="text-[var(--color-text)] font-medium border-l-2 border-[var(--color-accent)] pl-4">
          Eight years of professional work later, it&apos;s the same pattern: find an interesting problem and build something that solves it well.
        </p>
      </div>
    </section>
  );
}
