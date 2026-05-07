import { Section, Card } from './Section.jsx';
import { reflections } from '../../data/portfolio.js';

export function Reflections() {
  return (
    <Section id="reflections" tag="07 / REFLECTIONS" title="Reflections">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {reflections.map((r) => (
          <Card key={r.title}>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-neutral-50">
              {r.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-300">{r.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
