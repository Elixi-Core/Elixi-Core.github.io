import { useEffect, useState } from 'react';
import { nav, profile } from '../data/portfolio.js';

// Sticky top nav. Solid + bordered once the user scrolls past the hero so it
// reads cleanly over the section content.
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 px-6 py-3">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-neutral-100 hover:text-teal-300 transition"
          aria-label="Caesar Funches — home"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-teal-400 to-teal-600 font-display text-sm font-extrabold text-neutral-950"
          >
            CF
          </span>
          <span className="font-display text-sm sm:text-base font-semibold tracking-tight">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-5">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="font-mono text-xs tracking-widest text-neutral-400 hover:text-teal-300 transition"
                >
                  {n.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden inline-flex items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-neutral-300"
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="md:hidden border-t border-neutral-800 bg-neutral-950/95">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 font-mono text-xs tracking-widest text-neutral-300 hover:bg-neutral-900 hover:text-teal-300 border-b border-neutral-900"
                >
                  {n.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
