import { Section, Card } from './Section.jsx';
import { profile } from '../../data/portfolio.js';

const items = [
  { label: 'Email',    text: profile.email,    href: `mailto:${profile.email}` },
  { label: 'LinkedIn', text: profile.linkedin.replace(/^https?:\/\//, ''), href: profile.linkedin },
  { label: 'GitHub',   text: profile.github.replace(/^https?:\/\//, ''),    href: profile.github },
  { label: 'Location', text: profile.location, href: null },
];

export function Contact() {
  return (
    <Section id="contact" tag="10 / CONTACT" title="Contact">
      <Card featured>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Open to <span className="text-neutral-100 font-semibold">SOC Analyst</span>,{' '}
          <span className="text-neutral-100 font-semibold">Cybersecurity Analyst</span>, and{' '}
          <span className="text-neutral-100 font-semibold">IT Security</span> internships in
          Houston and remote.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((i) => (
            <li
              key={i.label}
              className="flex items-baseline gap-3 rounded-md border border-neutral-800 bg-neutral-950/60 px-4 py-3"
            >
              <span className="font-mono text-[11px] tracking-widest text-teal-400 w-20 flex-shrink-0">
                {i.label.toUpperCase()}
              </span>
              {i.href ? (
                <a
                  href={i.href}
                  target={i.href.startsWith('http') ? '_blank' : undefined}
                  rel={i.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-neutral-200 hover:text-teal-300 break-all"
                >
                  {i.text}
                </a>
              ) : (
                <span className="text-sm text-neutral-200">{i.text}</span>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
