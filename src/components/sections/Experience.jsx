import { Section, Card, Chip, Badge } from './Section.jsx';
import { experience } from '../../data/portfolio.js';

export function Experience() {
  return (
    <Section id="experience" tag="06 / EXPERIENCE" title="Experience">
      <div className="space-y-5 sm:space-y-6">
        {experience.map((job, i) => (
          <Card key={`${job.role}-${i}`} featured={i === 0}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-neutral-50">{job.role}</h3>
                <p className="text-sm text-neutral-400">
                  {job.org}
                  {job.location ? <span className="text-neutral-500"> · {job.location}</span> : null}
                </p>
              </div>
              <Badge accent={i === 0}>{job.period}</Badge>
            </div>

            {job.summary && (
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300">
                {job.summary}
              </p>
            )}

            {job.flagship && (
              <>
                <h4 className="mt-5 font-mono text-xs tracking-[0.25em] text-teal-400">
                  FLAGSHIP PRODUCTS
                </h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-300">
                  {job.flagship.map((f) => (
                    <li key={f.name} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-teal-400" />
                      <span>
                        <span className="font-semibold text-neutral-100">{f.name}</span>
                        {' — '}
                        {f.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {job.bullets && (
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-teal-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {job.closing && (
              <p className="mt-4 rounded-md border border-teal-400/20 bg-teal-400/5 px-3 py-2 text-sm leading-relaxed text-teal-100/90">
                {job.closing}
              </p>
            )}

            {job.chips && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.chips.map((c) => (
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
