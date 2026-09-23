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

## Before you spend

Ordered by what it costs you to get wrong. The first two lose real leads or
real attribution; the rest only cost you legibility in reports.

1. **Confirm the Conversions API is actually delivering.** The token *is*
   configured in production — probe the relay with a junk payload and it
   answers `400 eventName and eventId are required`, which it can only reach
   past the token check; unconfigured, it answers `200 {"skipped"}` instead.
   What that does not prove is that the token still *works*. A revoked or
   expired token fails silently: the form still submits, the browser pixel
   still fires, and only server-side coverage quietly disappears. So verify
   delivery, not configuration — Events Manager > Test Events, per the steps
   under Known gaps, and watch for `capi_error` in GA4 afterwards
   ([`src/lib/capi.js`](src/lib/capi.js) reports failures there precisely
   because Meta cannot be trusted to report its own outage).
2. **Formspree is off the free tier** — or you have consciously accepted losing
   leads past 50 a month. Both forms post to the same form ID, so that cap is
   shared across the main site and `/au`. A campaign that works is precisely
   what hits it. The forms do fail honestly: the visitor gets a mailto fallback
   carrying everything they typed. But a lead that has to be re-sent by hand is
   mostly a lead you don't get.
3. **`market` is registered as a custom dimension** — GA4 Admin > Custom
   definitions > Create, event-scoped, parameter name `market`. Every event
   already carries it; without this it reaches GA and never surfaces anywhere.
4. **`generate_lead` and `contact` are marked key events** — GA4 Admin >
   Events. They must have fired at least once to appear, so send a test
   enquiry first.
5. **The UTM template is pasted at ad level**, per the convention above. An ad
   without it still converts; you just can't tell which ad did it.

Already done — don't redo these: the GA4 Measurement ID is live in
[`src/lib/ga.js`](src/lib/ga.js) (`G-1WWG60NLN5`; the numeric Property ID the
Data API and Looker Studio want later is `522969641`), the privacy policy ships
at `/privacy` and `/kebijakan-privasi`, and Search Console is verified by DNS
with the sitemap reading.

**Reading the markets apart.** Ads Manager > Breakdown > By dynamic creative
element, or read `content_category` in Events Manager. Search Console only ever
covers the 5 sitemap URLs: `/id` and `/au` are held out of search by the
`noindex` in their head, and *only* that. They used to also be disallowed in
[`robots.txt`](public/robots.txt), which defeated it — a URL the crawler may
not fetch is a URL whose `noindex` is never read, so an ad link shared onward
could still be indexed bare. The Disallow is gone; don't put it back, and don't
expect organic data about the ad markets either way.

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

The privacy policy Meta's advertising policies expect is live, in both markets
— `/privacy` and `/kebijakan-privasi`, linked from every footer. Its absence is
a common ad-review rejection, so this one is genuinely load-bearing for getting
ads approved, not just for the PDP Law.

## Known gaps

**WhatsApp (ID) is a click count, not a lead count.** The `Contact` event fires
when someone taps through to WhatsApp, not when they send a message, and the
chat leaves the site so no utm can follow it. Expect it to over-count real
conversations, and reconcile by hand against actual chats weekly. Closing this
properly needs the WhatsApp Business API.

**Conversions API: configured, delivery unverified.** The relay is built,
deployed and consent-gated ([`functions/api/meta-capi.js`](functions/api/meta-capi.js)),
and `META_CAPI_TOKEN` is set in production. Without it every call returns
`{"skipped"}` and nothing reaches Meta; it no longer does that, which is how we
know the token is there. Whether Meta *accepts* it is a separate question and
the one that matters.

To verify delivery, or to rotate the token later:

1. Token comes from Events Manager > your dataset > Settings > Conversions API >
   **Generate access token** (or a System User token with `ads_management`).
2. It lives in the Cloudflare dashboard > Pages > your project > Settings >
   Environment variables, as an encrypted secret, Production.
3. A change there needs a redeploy before the Function sees it.
4. Verify in Events Manager > Test Events: set `META_CAPI_TEST_CODE` to the
   code shown there, submit a form, confirm the event arrives marked both
   Browser and Server with one deduplicated count — then delete the test var.

Browser and server events share an `event_id`, which is what makes Meta merge
them instead of double-counting; the dedup window is 48 hours.

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
