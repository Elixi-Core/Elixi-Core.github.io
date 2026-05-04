# Caesar Funches — Cybersecurity Portfolio

Personal portfolio site for **Caesar Funches** — aspiring SOC Analyst, Computer Systems Networking student at Houston City College, and Founder & CEO of **Elixi-Core**.

**GitHub:** [github.com/Elixi-Core](https://github.com/Elixi-Core)
**Live site:** `https://elixi-core.github.io` _(once the repo is named `Elixi-Core.github.io` and Pages is enabled)_

---

## Stack

- Plain HTML, CSS, and a tiny vanilla JS file. No build step. No `node_modules`.
- One page (`index.html`) split into anchored sections, sticky nav, mobile hamburger.
- Hosted on **GitHub Pages** straight from `main` branch root.

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
