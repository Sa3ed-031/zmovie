# ZMovie – Task Brief

You are working on ZMovie, a movie & TV discovery website built with React, TailwindCSS, Axios and Material-UI, using the TMDB API. It will be deployed on Netlify and published on GitHub as a portfolio project.

**Before changing anything:** explore the project structure (pages, components, the `api` layer, the custom `useFetch` hook, the watchlist logic). Follow the existing code style. Do not break existing features (filtering tabs, pagination, search, watchlist in Local Storage, details page). Keep the current visual identity (dark background + red accent).

Work through the tasks in priority order. When finished, run `npm run build` to make sure nothing is broken, then give me a short summary of every file you changed.

Replace `YOUR-SITE-URL` below with the real Netlify URL if you find it in the project; otherwise leave the placeholder and tell me.

---

## 🔴 Priority 1 – Security & Deployment (must be done before the repo is pushed)

### 1. Move the TMDB API key out of the source code

- Find every place where the TMDB API key or read-access token is hardcoded.
- Move it to a `.env` file:
  - Vite: `VITE_TMDB_KEY=...` and read it with `import.meta.env.VITE_TMDB_KEY`
  - Create React App: `REACT_APP_TMDB_KEY=...` and read it with `process.env.REACT_APP_TMDB_KEY`
- Read the key in one place only (the `api` layer / Axios instance), not in every component.
- Create `.env.example` with the variable name and an empty value.
- Make sure `.gitignore` includes `node_modules`, `dist`, `build` and `.env`.
- Tell me the exact variable name I need to add in Netlify.

### 2. SPA routing on Netlify

- Make sure `public/_redirects` exists with this content, so refreshing pages like `/movies` or `/movie/123` doesn't return 404:

```
/*    /index.html   200
```

### 3. Dependency check

- Make sure `npm install` works cleanly with no peer-dependency errors (Netlify does a fresh install). If a plugin doesn't support the installed Vite version, update it to a compatible version. Do not use `--legacy-peer-deps`.

---

## 🔴 Priority 2 – Head, SEO & Fonts

### 4. Update `index.html` `<head>`

Remove default titles like "Vite + React" or "React App" and add:

```html
<title>ZMovie – Movie & TV Discovery</title>
<meta
  name="description"
  content="Browse, filter and save movies & TV shows. Built with React & the TMDB API."
/>
<meta name="theme-color" content="#E50914" />

<meta property="og:type" content="website" />
<meta property="og:url" content="https://YOUR-SITE-URL/" />
<meta property="og:title" content="ZMovie – Movie & TV Discovery" />
<meta
  property="og:description"
  content="Browse, filter and save movies & TV shows. Built with React & the TMDB API."
/>
<meta property="og:image" content="https://YOUR-SITE-URL/preview.png" />

<meta name="twitter:card" content="summary_large_image" />
```

- I will place `preview.png` (1200×630) in `public/` myself.
- Make sure the favicon is in `public/` and referenced with an absolute path (e.g. `/favicon.svg`), not a `src/` path.

### 5. Fix inconsistent fonts

- Some text renders in the browser default serif font (Times New Roman), e.g. the "See All" link and the footer copyright. Find the cause (missing or broken font import, or an element overriding the font) and make the whole site use one sans-serif font consistently.
- Because the site shows Arabic content, use a font that supports both Arabic and Latin well, such as **Cairo** or **Tajawal** from Google Fonts. Load it correctly in `index.html` with `preconnect` links and apply it globally (CSS + Tailwind config + MUI theme if used).

---

## 🟡 Priority 3 – UX & Content Quality

### 6. Unify the interface language

The UI currently mixes English (navbar, "Trending Now", "See All", "Filters", "Genres", "Sort by", footer) with Arabic (search placeholder, filter tabs, buttons, page titles).

- Make the whole interface **English**, and request TMDB data in English (`language=en-US`), so the site is consistent for an international audience.
- Put all UI strings for each page in one place (e.g. a constants object), so a translation can be added later.
- Optional (only if it's clean and quick): add an EN/AR toggle that switches UI strings, the TMDB `language` parameter, and `dir="rtl"` on the document. Store the choice in Local Storage. If you do this, make sure RTL layout looks correct on every page.

### 7. Hero banner buttons

- The "Watch Now" button is misleading because the site doesn't stream movies. Change it to **"Watch Trailer"**: fetch the trailer from TMDB's `/videos` endpoint (first result with `site === "YouTube"` and `type === "Trailer"`) and open it in a modal with an embedded YouTube player. If no trailer exists, hide the button.
- The second button ("Remove from list" / "Add to list") has very low contrast (dark red text on a dark red background). Give it a clear outlined or light style that stays readable.

### 8. Search results quality

- Add `include_adult=false` to every TMDB search and discover request.
- Remove duplicate results (same `id`).
- For items with no poster, keep the fallback image but also show the title on the card, so placeholder cards aren't identical.
- Make sure every filter in the sidebar (Genres, Year, Rating, Quality, Language) actually works. If a filter isn't implemented, either implement it with TMDB `discover` parameters or remove it from the UI. No dead controls.
- Fix the search heading so it reads cleanly, e.g. `Results for "inception" · 13 found`.

### 9. Footer

- "Privacy Policy", "Terms of Service", "Help Center" and "Contact Us" are dead links. Remove them, or replace them with useful links: a "Built by Saeed Al-Haj Hussein" link to my portfolio and a GitHub link to the repo.
- Add the TMDB attribution that TMDB's terms require: the TMDB logo (official logo from TMDB's brand page, saved locally in `public/`) and the text: _"This product uses the TMDB API but is not endorsed or certified by TMDB."_

### 10. Details page

- Make the red dot separators between rating / year / runtime smaller and less dominant (e.g. a small `•` in a muted color).
- If not already present, add a **Cast** row (top 8 from the `/credits` endpoint, with profile photos and character names) and a **Similar titles** row (from `/similar` or `/recommendations`). Reuse the existing card component.

---

## 🟢 Priority 4 – Quality Checks

- Every poster `<img>` must have an `alt` with the title, and use `loading="lazy"`.
- Show loading skeletons (or at least a spinner) while data loads, and a friendly message when a request fails or returns no results.
- Check the whole site at 375px, 768px and 1440px widths: no horizontal scrolling, no overlapping text, and the "Add to list" button must be reachable on touch devices (no hover-only actions).
- Remove unused imports, unused components and `console.log` statements.
- In `package.json`, set `"name": "zmovie"`.

---

## 📄 Final Task – README.md

Replace the README with a professional one containing:

- Title **🎬 ZMovie** and a one-line description
- A "Live Demo" shields.io badge linking to the live site
- The preview image: `<img src="./public/preview.png" width="800" alt="ZMovie preview" />`
- Features list (based on what actually exists after your changes: browsing, filtering tabs, search with filters, trending, watchlist, details page, trailers, cast, pagination, responsive design)
- Tech stack table (based on the real `package.json`)
- Getting Started steps (`git clone`, `npm install`, `npm run dev`) and an **Environment variables** section explaining how to get a free TMDB API key and put it in `.env` (copy from `.env.example`)
- The TMDB attribution sentence
- Author section: **Saeed Al-Haj Hussein**, Front-End Developer, with LinkedIn (https://www.linkedin.com/in/sa3ed-al-haj-hussein/), GitHub (https://github.com/Sa3ed-031), Portfolio (https://sa3ed-portfolio.netlify.app) and email (saeedalhajwork@gmail.com)
- At the end: `<p align="center">💼 Need a website for your business? <a href="mailto:saeedalhajwork@gmail.com">Let's talk!</a></p>`
