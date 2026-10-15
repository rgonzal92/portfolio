# Portfolio

Personal software engineer portfolio. Angular 22, PrimeNG 22, Tailwind CSS 4, hosted on Cloudflare Workers.

## Edit your content

Everything on the site comes from `src/app/core/content.ts`. Put images and your resume PDF in `public/`:

- your resume PDF: served by the "Download PDF" button (path in `PROFILE.resumePdf`)
- `public/portrait.webp`: your photo (`PROFILE.portrait`); keep it 4:5 and about 800px wide
- `public/projects/<name>.webp`: set `cover: '/projects/<name>.webp'` on a project (and `coverDark` for a dark-theme version)

Update the `<title>` and meta description in `src/index.html` too.

## PrimeUI license key

PrimeNG 22 needs a PrimeUI license key. Put it in a `.env` file in the project root (gitignored):

```sh
PRIMEUI_LICENSE='your-key'
```

Keep the single quotes. The npm scripts load `.env` if it exists, otherwise they use a `PRIMEUI_LICENSE`
environment variable (that's how the Cloudflare build gets it). `npm run build` fails if no key is set, so a
deploy can't ship the "Invalid PrimeUI License" badge; `npm start` still runs without one and shows the badge.

Use `npm start` / `npm run build` (not bare `ng serve`) so the key is passed in.

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build in dist/portfolio/browser
npm test           # unit tests (Vitest)
npm run lint       # ESLint, including Angular template accessibility rules
npm run deploy     # build + deploy to Cloudflare (needs `npx wrangler login` once)
```

## Deploy (GitHub Actions)

`.github/workflows/deploy.yml` lints, tests, and builds every push and pull request, then deploys `main` to
Cloudflare Workers with `wrangler deploy`. It needs three repository secrets:

- `PRIMEUI_LICENSE`: the PrimeUI license key
- `CLOUDFLARE_API_TOKEN`: an API token from the "Edit Cloudflare Workers" template, scoped to your account and
  the `rgonz.dev` zone
- `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID

`wrangler.jsonc` serves the build as static assets with single-page-app fallback, so `/resume` works on refresh.
