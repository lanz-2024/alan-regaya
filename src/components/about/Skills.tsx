import { skillCategories } from '@/data/skills';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="skills-heading">
      <SectionHeading label="Capabilities" title="Skills" />
      <div id="skills-heading" className="sr-only">Skills</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="glow-border rounded-lg p-6 bg-[var(--color-surface)]">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span aria-hidden="true">{cat.icon}</span>
              {cat.name}
            </h3>
            <ul className="space-y-3">
              {cat.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--color-text-muted)]">{skill.name}</span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-[var(--color-border)] rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                    <div
                      className="h-full bg-[var(--color-accent)] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
