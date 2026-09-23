// Cloudflare Pages serves `404.html` for unmatched paths with a real 404, but
// it also exposes that same file as an ordinary static asset at the clean URL
// `/404` — where it answers 200. Google crawled it, read "Page Not Found" over
// a success status, and filed the site's one Soft 404.
//
// A Function on `/404` takes precedence over the static asset, so the page a
// crawler fetches directly now carries the status its content claims. Real
// unmatched paths never reach here: Pages answers those from `404.html`
// inline, without redirecting through this route.
export async function onRequest({ request, env }) {
  // `ASSETS.fetch` bypasses Functions routing, so asking it for a path that
  // cannot match anything returns the custom 404 page with a 404 already set —
  // the same bytes, the same status, no second copy of the markup to maintain.
  const url = new URL(request.url)
  url.pathname = '/__pages_not_found__'
  return env.ASSETS.fetch(new Request(url, request))
}
