import { Section, Card } from './Section.jsx';
import { competitions } from '../../data/portfolio.js';

export function Competitions() {
  return (
    <Section id="competitions" tag="05 / COMPETITIONS" title="Competitions & Challenges">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {competitions.map((c) => (
          <Card key={c.title}>
            <h3 className="font-display text-xl font-semibold text-neutral-50">{c.title}</h3>
            {c.summary && (
              <p className="mt-2 font-mono text-xs tracking-wider text-teal-300">{c.summary}</p>
            )}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-300">{c.body}</p>
            {c.href && (
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-xs tracking-wider text-teal-300 underline-offset-4 hover:underline"
              >
                {c.hrefLabel || 'Open →'}
              </a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
