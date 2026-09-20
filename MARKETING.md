# Marketing & measurement

How the site is instrumented, and the conventions ad traffic has to follow for
that instrumentation to mean anything.

## What's wired up

| Surface | Conversion | Meta event | GA4 event | Attribution |
|---|---|---|---|---|
| Main site `/contact` | Form submit | `Lead` | `generate_lead` | Full — utm + fbclid in the payload |
| AU landing `/au` | Form submit | `Lead` | `generate_lead` | Full — utm + fbclid in the payload |
| ID landing `/id` | WhatsApp click | `Contact` | `contact` | None — see below |

Every conversion carries its market: `content_category` on Meta, `market` on
GA4. One pixel dataset and one GA property cover all three surfaces, so
campaigns build shared conversion history instead of three cold ones.

Code: [`src/lib/analytics.js`](src/lib/analytics.js) is the only module call
sites touch. [`pixel.js`](src/lib/pixel.js) and [`ga.js`](src/lib/ga.js) are
transports; [`attribution.js`](src/lib/attribution.js) captures the ad click.

## UTM convention

Every paid link must carry these. Meta fills the `{{...}}` placeholders in at
delivery time, so one URL template covers a whole campaign and you never hand-
maintain a link per ad.

Paste into **Ad level > Tracking > URL parameters** (the field, not the URL):

```
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}
```

Landing page URLs stay clean: `https://spladestudio.com/id`, `/au`, or `/`.

**Rules:**

- **Lowercase, underscores, no spaces.** Meta injects campaign and ad names
  verbatim, so a campaign called `ID Launch Q4` becomes `ID%20Launch%20Q4` in
  every report and splits into look-alike rows the moment someone renames it.
  Name things `id_launch_q4` in Ads Manager and this problem disappears.
- **`utm_source` is the platform** (`meta`), never the placement. Placement
  belongs in the ad name, which `utm_content` already carries.
- **`utm_medium` is always `paid_social`** for Meta. Keep it stable — it is
  what separates paid from organic in GA4's default channel grouping.
- **One campaign per market.** Prefix every campaign name with `id_`, `au_`, or
  `main_` so the market is legible before you even open a breakdown.

Naming pattern for Ads Manager:

```
campaign   id_launch_q4            au_leadgen_q4
ad set     jakarta_25_45_biz       sydney_smb_lookalike
ad         hero_v2_static          case_study_carousel
```

## Setup still to do

1. **GA4 Measurement ID** — paste into `GA_MEASUREMENT_ID` in
   [`src/lib/ga.js`](src/lib/ga.js). Blank means GA no-ops entirely.
   It is the `G-XXXXXXXXXX` on the stream itself (Admin > Data streams > the
   web stream), *not* the numeric Property ID — GA4 shows both and only the
   `G-` one drives gtag. Property ID for this account is `522969641`, which is
   what the Data API and Looker Studio want later.
2. **Register `market` as a custom dimension** — GA4 Admin > Custom definitions
   > Create, event-scoped, parameter name `market`. Without this the market
   tagging reaches GA but never appears in a report.
3. **Mark key events** — GA4 Admin > Events, toggle `generate_lead` and
   `contact` as key events. They must have fired at least once to appear.
4. **Meta breakdown** — Ads Manager > Breakdown > By dynamic creative element,
   or read `content_category` in Events Manager to split markets.
5. **Search Console** — verified via DNS, sitemap submitted and reading.
   It only ever covers 3 URLs: `/id` and `/au` are noindex and disallowed in
   [`robots.txt`](public/robots.txt), which is correct for ad landing pages —
   just don't expect organic data about the ad markets.

## Consent

Nothing tracks until the visitor accepts. GA4 runs Consent Mode v2 (defaults
denied, so it still models conversions while denied) and the Meta Pixel is
revoked before `fbq('init')`, which is the only ordering that stops it writing
`_fbp` on arrival. The choice persists in localStorage and is re-applied to
both vendors on the next visit.

The bar is localised — Bahasa on `/id`, English everywhere else — and publishes
its measured height as `--consent-h` so hero CTAs lift clear of it. That is
load-bearing for the paid pages: unlifted, the bar sits directly on the
WhatsApp CTA on an ID phone.

Expect a measurable share of visitors to decline, which shows up as a gap
between Meta's reported conversions and GA4's. That gap is the consent rate,
not a tracking bug.

Not done: a privacy policy page. Meta's advertising policies expect advertisers
to have one, and its absence is a common ad-review rejection — worth adding
before the campaign rather than after a rejection.

## Known gaps

**WhatsApp (ID) is a click count, not a lead count.** The `Contact` event fires
when someone taps through to WhatsApp, not when they send a message, and the
chat leaves the site so no utm can follow it. Expect it to over-count real
conversations, and reconcile by hand against actual chats weekly. Closing this
properly needs the WhatsApp Business API.

**No Conversions API.** Browser-side pixel events lose roughly 15-30% to iOS
ATT, ad blockers, and Safari ITP. A server-side CAPI endpoint (a Cloudflare
Pages Function forwarding `Lead` with `event_id` dedup) recovers most of it.
Worth building once spend is consistent — not before.

**Formspree free tier caps at 50 submissions/month**, and both forms post to
the same form ID. A campaign that works will hit that ceiling; check the plan
before spending.

## Reporting

Ads Manager plus a spreadsheet is the right tool until volume justifies more.
When it does, Looker Studio connects natively to GA4 and Search Console with a
community connector for Meta Ads — free, no code, no maintenance. Build a
bespoke dashboard only when there's a question Looker can't answer: GA4's Data
API needs a service account and a server to hold it, and Meta's Marketing API
needs a rotating System User token, which is several days of real work.
