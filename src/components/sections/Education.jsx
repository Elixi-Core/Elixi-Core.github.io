import { Section, Card, Badge, Chip } from './Section.jsx';
import { education } from '../../data/portfolio.js';

export function Education() {
  return (
    <Section id="education" tag="02 / EDUCATION" title="Education">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-50">{education.school}</h3>
            <p className="text-sm text-neutral-400">{education.city}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{education.degree}</Badge>
            <Badge accent>{education.expected}</Badge>
          </div>
        </div>

        <h4 className="mt-6 font-mono text-xs tracking-[0.25em] text-teal-400">
          RELEVANT COURSEWORK
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {education.coursework.map((c) => (
            <li key={c}>
              <Chip>{c}</Chip>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-300">
          {education.description}
        </p>
      </Card>
    </Section>
  );
}
