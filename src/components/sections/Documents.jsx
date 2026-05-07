import { Section, Card } from './Section.jsx';
import { documents } from '../../data/portfolio.js';

export function Documents() {
  return (
    <Section id="documents" tag="09 / DOCUMENTS" title="Supporting Documents">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {documents.map((d) =>
          d.placeholder ? (
            <Card key={d.title} className="opacity-70">
              <h3 className="font-display text-lg font-semibold text-neutral-50">{d.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{d.meta}</p>
            </Card>
          ) : (
            <a
              key={d.title}
              href={d.href}
              download
              className="group block rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-sm transition hover:border-teal-400/50 hover:bg-neutral-900/80"
            >
              <h3 className="font-display text-lg font-semibold text-neutral-50">{d.title}</h3>
              <p className="mt-1 text-sm text-neutral-400">{d.meta}</p>
              <span className="mt-4 inline-block font-mono text-xs tracking-widest text-teal-300 transition group-hover:text-teal-200">
                {d.cta}
              </span>
            </a>
          )
        )}
      </div>
    </Section>
  );
}
