import { profile } from '../data/portfolio.js';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-900 px-6 py-8">
      <div className="mx-auto max-w-6xl flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] tracking-widest text-neutral-500">
          © {year} {profile.name} · FOUNDER & CEO OF ELIXI-CORE
        </p>
        <p className="font-mono text-[11px] tracking-widest text-neutral-600">
          BUILT WITH VITE · REACT · TAILWIND · THREE.JS
        </p>
      </div>
    </footer>
  );
}
