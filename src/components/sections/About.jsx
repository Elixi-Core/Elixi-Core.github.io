import { Section, Card } from './Section.jsx';
import { about, profile } from '../../data/portfolio.js';

export function About() {
  return (
    <Section id="about" tag="01 / ABOUT" title="About">
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-xl font-semibold text-neutral-50">Who I am</h3>
          <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-neutral-300">
            {about.who.map((item) => (
              <li key={item.k} className="leading-relaxed">
                <span className="font-semibold text-neutral-100">{item.k}: </span>
                {item.v}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-display text-xl font-semibold text-neutral-50">Quick stats</h3>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3"
              >
                <dt className="font-mono text-[11px] tracking-widest text-neutral-500">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-bold text-teal-300">
                  {s.num}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-neutral-400">
            Open to SOC Analyst, Cybersecurity Analyst, and IT Security internships.
          </p>
        </Card>
      </div>
    </Section>
  );
}
