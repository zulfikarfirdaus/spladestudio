# Splade Studio

The studio's own site: marketing pages plus two paid-ads landing pages,
prerendered to static HTML and served from Cloudflare Pages.

## Running it

```bash
npm install
npm run dev      # vite dev server
npm run build    # vite-react-ssg — prerenders every route to its own HTML
npm run lint
```

`npm run dev` is enough for anything that lives inside React. It is *not*
enough for the two things that don't:

```bash
npm run build && npx wrangler pages dev dist
```

That runs the real Pages runtime — Functions routing, `_headers`, `_redirects`,
and the status codes actually served. Use it before touching anything in
[`functions/`](functions/), and to check a 404 is a 404. Note it writes scratch
files to `.wrangler/tmp` that trip eslint, and dirties tracked state under
`.wrangler/state`; `rm -rf .wrangler/tmp && git checkout -- .wrangler/` after.

## Deploying

**Push to `main`.** Cloudflare Pages' Git integration builds and deploys it,
usually within a minute. `dist/` is gitignored — Cloudflare runs the build, so
there is nothing to upload and no `wrangler pages deploy` step. There is no CI.

Server-side secrets (currently `META_CAPI_TOKEN`) live in the Cloudflare
dashboard under Pages > Settings > Environment variables, not in the repo, and
need a redeploy to be picked up.

## Routes

| Path | What it is |
|---|---|
| `/` `/work` `/contact` | The main site |
| `/privacy` `/kebijakan-privasi` | One privacy policy, two languages, reciprocal `hreflang` |
| `/id` `/au` | Paid landing pages, `noindex`, standalone layouts |
| `/api/meta-capi` | Pages Function — Meta Conversions API relay |
| `/404` | Pages Function, so the clean URL returns a real 404 rather than 200 |

Routes are declared in [`src/routes.jsx`](src/routes.jsx) and prerendered from
there. `/id` and `/au` are deliberately absent from
[`sitemap.xml`](public/sitemap.xml); they are kept out of search by the
`noindex` in their head and *only* that — see MARKETING.md before adding any
`Disallow` to [`robots.txt`](public/robots.txt).

## Where things are written down

- [`PRODUCT.md`](PRODUCT.md) — who the site is for, brand personality, the
  design principles a change should be arguable against.
- [`MARKETING.md`](MARKETING.md) — how conversion tracking is wired, the UTM
  convention paid traffic must follow, and the pre-launch checklist. Read
  "Before you spend" before starting a campaign.

Head tags are owned entirely by [`src/components/Seo.jsx`](src/components/Seo.jsx);
`index.html` declares none on purpose, because two copies of `<title>` is what
shipped once already.
