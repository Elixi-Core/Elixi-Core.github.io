import { Section, Card, Chip } from './Section.jsx';
import { skills } from '../../data/portfolio.js';

const groups = [
  { title: 'Technical',     key: 'technical',    accent: false },
  { title: 'Security Domains', key: 'domains',   accent: true  },
  { title: 'Professional',  key: 'professional', accent: false },
];

export function Skills() {
  return (
    <Section id="skills" tag="03 / SKILLS" title="Skills">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {groups.map((g) => (
          <Card key={g.key} featured={g.accent}>
            <h3 className="font-display text-xl font-semibold text-neutral-50">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills[g.key].map((s) => (
                <li key={s}>
                  <Chip accent={g.accent}>{s}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
