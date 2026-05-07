// Reusable section shell — number tag, title, optional subtitle, content slot.
// All ten section components compose this so vertical rhythm + spacing stays
// identical across the page.
export function Section({ id, tag, title, subtitle, children, accent = false }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <span
            className={`font-mono text-xs tracking-[0.3em] ${
              accent ? 'text-magenta-400' : 'text-teal-400'
            }`}
          >
            {tag}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-400">{subtitle}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = '', featured = false }) {
  return (
    <article
      className={`rounded-xl border bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-sm ${
        featured
          ? 'border-teal-400/50 pulse-teal'
          : 'border-neutral-800 hover:border-neutral-700'
      } transition ${className}`}
    >
      {children}
    </article>
  );
}

export function Chip({ children, accent = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] sm:text-xs tracking-wider ${
        accent
          ? 'border-teal-400/40 bg-teal-400/10 text-teal-300'
          : 'border-neutral-700 bg-neutral-800/60 text-neutral-300'
      }`}
    >
      {children}
    </span>
  );
}

export function Badge({ children, accent = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wider ${
        accent
          ? 'border-teal-400/50 bg-teal-400/15 text-teal-200'
          : 'border-neutral-700 bg-neutral-800/80 text-neutral-300'
      }`}
    >
      {children}
    </span>
  );
}
