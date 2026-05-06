# Caesar Funches — Cybersecurity Portfolio

Personal portfolio site for **Caesar Funches** — aspiring SOC Analyst, Computer Systems Networking student at Houston City College, and Founder & CEO of **Elixi-Core**.

**GitHub:** [github.com/Elixi-Core](https://github.com/Elixi-Core)
**Live site:** `https://elixi-core.github.io` _(once the repo is named `Elixi-Core.github.io` and Pages is enabled)_

---

## Stack

- Plain HTML, CSS, and vanilla JS. No build step. No `node_modules`.
- Three.js (loaded via CDN importmap) drives the interactive 3D **Cyber-Ops Command Center** layered over the semantic page. See "3D scene" below.
- One page (`index.html`) split into anchored sections, sticky nav, mobile hamburger.
- Hosted on **GitHub Pages** straight from `main` branch root.

## 3D scene

The site loads as a navigable 3D command center: a dark room with CRT-style monitors on the walls, each representing one section. Click or tap a monitor to open that section's content as an overlay. Touch and mouse both work; an FPS probe automatically downgrades quality on low-end devices.

The flat semantic HTML stays in `<main>` exactly as before — that's what search engines, screen readers, reader-mode, and the **Skip 3D** button (top-right) all see. Progressive enhancement: if WebGL is unavailable, the canvas is removed and the original portfolio renders.

Files:

- `scene.js` — Three.js scene, monitor factory, raycaster, dialog opener (~500 lines, ESM, CDN-loaded `three`)
- `styles.css` — appended `#scene` / `#section-dialog` / `#skip-3d` styles below the original design system
- `index.html` — adds `<canvas id="scene">`, `<dialog id="section-dialog">`, and an importmap pointing at `unpkg.com/three`

The 10 monitors map to the 10 sections in `<main>`:

| Monitor | Section id |
|---|---|
| 01 ABOUT | `#about` |
| 02 EDUCATION | `#education` |
| 03 SKILLS | `#skills` |
| 04 PROJECTS | `#projects` |
| 05 COMPETITIONS | `#competitions` |
| 06 EXPERIENCE | `#experience` |
| 07 REFLECTIONS | `#reflections` |
| 08 CERTIFICATIONS | `#certifications` |
| 09 DOCUMENTS | `#documents` |
| 10 CONTACT | `#contact` |

## Local preview

Open `index.html` directly in any browser. That's it.

For an auto-reloading server (optional), if you have Python installed:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploying to GitHub Pages

1. Create a new **public** repo under the [Elixi-Core](https://github.com/Elixi-Core) account. Recommended name: **`Elixi-Core.github.io`** (gives you the clean URL `https://elixi-core.github.io` with no subpath). Any other repo name works too — the URL just becomes `https://elixi-core.github.io/<repo>/`.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Elixi-Core/Elixi-Core.github.io.git
   git push -u origin main
   ```
3. GitHub repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → **Save**.
4. Wait ~60 seconds, then load the URL.

## Updating content

Everything that needs to change is in `index.html`:

| Want to update… | Edit this section in `index.html` |
| --- | --- |
| Hero name, tagline, photo | `<section class="hero">` |
| About / role-model quote | `<section id="about">` |
| Education, coursework | `<section id="education">` |
| Skills chips | `<section id="skills">` |
| Projects | `<section id="projects">` |
| Competitions | `<section id="competitions">` |
| Experience, Elixi-Core details | `<section id="experience">` |
| Reflections | `<section id="reflections">` |
| Certifications | `<section id="certifications">` |
| Document downloads | `<section id="documents">` |
| Email / LinkedIn / GitHub | `<section id="contact">` |

Drop new files into `/assets/`:

- `assets/photo.jpg` — replace placeholder with a professional headshot
- `assets/resume.pdf` — keep résumé up to date
- `assets/xpcyber-dangerous-drives.pdf` — verification PDF
- `assets/recommendation-*.pdf` — recommendation letters when you receive them

## Repo layout

```
.
├── index.html
├── styles.css
├── script.js
├── scene.js                    (3D cyber-ops command center)
├── assets/
│   ├── favicon.svg
│   ├── photo.jpg               (placeholder — add your headshot)
│   ├── resume.pdf
│   └── xpcyber-dangerous-drives.pdf
├── .gitignore
├── LICENSE
└── README.md
```

## Contact

- **Email:** caesarfunches@gmail.com
- **LinkedIn:** [linkedin.com/in/caesar-funches-a8279a162](https://www.linkedin.com/in/caesar-funches-a8279a162/)
- **Location:** Houston, TX

## License

[MIT](LICENSE) — content (résumé, project writeups, photo) belongs to Caesar Funches; the site code is free to fork as a starting template.
