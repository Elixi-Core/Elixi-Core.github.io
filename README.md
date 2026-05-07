# Caesar Funches — Cybersecurity Portfolio

Personal portfolio site for **Caesar Funches** — aspiring SOC Analyst, Computer Systems Networking student at Houston City College, and Founder & CEO of **Elixi-Core**.

**Live site:** https://elixi-core.github.io/
**GitHub:** https://github.com/Elixi-Core

---

## Stack

- **Vite + React 18** — single-page React app
- **Tailwind v4** — CSS-first theme (`@theme` directive in `src/styles.css`)
- **react-three-fiber + drei + @react-three/postprocessing** — cinematic 3D hero scene
- **GitHub Actions** — auto-build + deploy to GitHub Pages on every push to `main`
- Procedural 3D only — no `.glb` / `.fbx` model files; the hero is generated entirely in code

## Local development

Requires **Node 20+**.

```bash
npm install
npm run dev      # http://localhost:5173 with HMR
npm run build    # production build to dist/
npm run preview  # serve dist/ at http://localhost:4173 to verify the build
```

## Deploying

Push to `main` → the GitHub Action in `.github/workflows/deploy.yml` runs `npm ci && npm run build`, uploads `dist/` as a Pages artifact, and deploys via `actions/deploy-pages@v4`.

**One-time setup** (already done if Pages was previously enabled): repo → **Settings → Pages → Source: GitHub Actions**.

## Editing content

Every section's content lives in [`src/data/portfolio.js`](src/data/portfolio.js). Change a project, add a certification, swap a job title — edit there, and the section components re-render with the new data.

| To update… | Edit in `src/data/portfolio.js` |
| --- | --- |
| Name, tagline, email, links, stats | `profile`, `nav` |
| About cards | `about` |
| Education | `education` |
| Skills (3 columns) | `skills` |
| Projects | `projects[]` |
| Competitions | `competitions[]` |
| Experience | `experience[]` |
| Reflections | `reflections[]` |
| Certifications | `certifications[]` |
| Documents (résumé, etc.) | `documents[]` |

Drop new files into `public/assets/`:

- `public/assets/resume.pdf` — keep résumé up to date
- `public/assets/xpcyber-dangerous-drives.pdf` — XP Cyber verification PDF
- `public/assets/recommendation-*.pdf` — recommendation letters when received

## 3D hero scene

The cinematic hero (`src/components/Hero3D/`) is a single Three.js scene:

| File | Role |
| --- | --- |
| `index.jsx` | Canvas + post-processing (bloom, chromatic aberration, vignette) |
| `HexFloor.jsx` | Procedural hex-grid floor with shader |
| `BridgeShell.jsx` | Curved cathedral / command-bridge backdrop |
| `CentralMonitor.jsx` | Floating monitor with name + tag |
| `Figure.jsx` | Back-turned silhouette anchor |
| `ParticleField.jsx` | 1200 drifting particles |
| `CrystalAccent.jsx` | Magenta crystal cluster (warm accent corner) |
| `Lights.jsx` | Lighting rig |
| `CameraRig.jsx` | Slow figure-eight camera drift |

The scene runs cinematically — **no mouse, touch, or scroll affects the camera.** This is deliberate: previous "interactive 3D" attempts felt glitchy and trapped content in popups. Now the 3D is purely atmospheric and the rest of the portfolio is normal scrollable HTML.

## Repo layout

```
.
├── index.html                      Vite entry
├── package.json
├── vite.config.js
├── .github/workflows/deploy.yml    auto-deploy on push to main
├── public/assets/                  static files (resume.pdf, favicon, etc.)
└── src/
    ├── main.jsx                    React boot
    ├── App.jsx                     page composition
    ├── styles.css                  Tailwind + theme + global rules
    ├── data/portfolio.js           every piece of editable copy
    └── components/
        ├── Nav.jsx
        ├── Footer.jsx
        ├── Hero3D/                 (the 3D hero, broken by responsibility)
        └── sections/               About, Education, …, Contact
```

## Contact

- **Email:** caesarfunches@gmail.com
- **LinkedIn:** [linkedin.com/in/caesar-funches-a8279a162](https://www.linkedin.com/in/caesar-funches-a8279a162/)
- **Location:** Houston, TX

## License

[MIT](LICENSE) — content (résumé, project writeups) belongs to Caesar Funches; the site code is free to fork as a starting template.
