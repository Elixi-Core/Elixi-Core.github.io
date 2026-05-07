import { Section, Card } from './Section.jsx';
import { certifications } from '../../data/portfolio.js';

const statusStyles = {
  Earned:   { tag: 'border-teal-400/60 bg-teal-400/15 text-teal-200', dot: 'bg-teal-400' },
  Pursuing: { tag: 'border-magenta-400/50 bg-magenta-400/10 text-magenta-300', dot: 'bg-magenta-400' },
  Planned:  { tag: 'border-neutral-700 bg-neutral-800/60 text-neutral-300', dot: 'bg-neutral-500' },
};

export function Certifications() {
  return (
    <Section id="certifications" tag="08 / CERTIFICATIONS" title="Certifications">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {certifications.map((c) => {
          const s = statusStyles[c.status] || statusStyles.Planned;
          return (
            <Card key={c.title} featured={c.status === 'Earned'}>
              <span
                className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-widest ${s.tag}`}
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                {c.status.toUpperCase()}
              </span>
              <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold text-neutral-50">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">{c.meta}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
