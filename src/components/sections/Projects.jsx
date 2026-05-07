import { Section, Card, Chip, Badge } from './Section.jsx';
import { projects } from '../../data/portfolio.js';

export function Projects() {
  return (
    <Section
      id="projects"
      tag="04 / PROJECTS"
      title="Projects"
      subtitle="Hands-on labs and challenges. Real IPs, real configs, real reflections — pulled from my coursework submissions."
    >
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} featured={p.featured}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="font-display text-lg sm:text-xl font-semibold text-neutral-50">
                {p.title}
              </h3>
              {p.badge && <Badge accent={p.featured}>{p.badge}</Badge>}
            </div>

            {p.bullets && (
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-teal-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {p.takeaway && (
              <p className="mt-4 rounded-md border border-teal-400/20 bg-teal-400/5 px-3 py-2 text-sm text-teal-100/90">
                <span className="font-mono text-[11px] tracking-widest text-teal-400">
                  TAKEAWAY ›{' '}
                </span>
                {p.takeaway}
              </p>
            )}

            {p.verifyHref && (
              <a
                href={p.verifyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-xs tracking-wider text-teal-300 underline-offset-4 hover:underline"
              >
                {p.verifyLabel || 'Verify →'}
              </a>
            )}

            {p.chips && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.chips.map((c) => (
                  <li key={c}>
                    <Chip>{c}</Chip>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
