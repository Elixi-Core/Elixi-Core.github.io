import { Nav }            from './components/Nav.jsx';
import { Hero3D }         from './components/Hero3D/index.jsx';
import { About }          from './components/sections/About.jsx';
import { Education }      from './components/sections/Education.jsx';
import { Skills }         from './components/sections/Skills.jsx';
import { Projects }       from './components/sections/Projects.jsx';
import { Competitions }   from './components/sections/Competitions.jsx';
import { Experience }     from './components/sections/Experience.jsx';
import { Reflections }    from './components/sections/Reflections.jsx';
import { Certifications } from './components/sections/Certifications.jsx';
import { Documents }      from './components/sections/Documents.jsx';
import { Contact }        from './components/sections/Contact.jsx';
import { Footer }         from './components/Footer.jsx';
import { profile }        from './data/portfolio.js';

export default function App() {
  return (
    <div className="grain bg-neutral-950 text-neutral-100 min-h-screen">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-teal-400 focus:text-neutral-950 focus:px-3 focus:py-1 focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero3D
          name={profile.name}
          tag="// SOC ANALYST · HOUSTON, TX"
        />

        {/* All semantic content lives in normal scrollable sections so
            screen readers, search engines, and reader-mode all see it. */}
        <About />
        <Education />
        <Skills />
        <Projects />
        <Competitions />
        <Experience />
        <Reflections />
        <Certifications />
        <Documents />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
