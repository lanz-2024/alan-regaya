import { hobbies } from '@/data/hobbies';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function HobbiesSection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="hobbies-heading">
      <SectionHeading label="Outside the terminal" title="Hobbies & Interests" />
      <div id="hobbies-heading" className="sr-only">Hobbies & Interests</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby) => (
          <div key={hobby.title} className="glow-border rounded-lg p-6 bg-[var(--color-surface)]">
            <div className="text-2xl mb-3" aria-hidden="true">{hobby.icon}</div>
            <h3 className="font-semibold text-[var(--color-text)] mb-2">{hobby.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
