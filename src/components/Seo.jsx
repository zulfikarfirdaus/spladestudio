import { Head } from 'vite-react-ssg'

const SITE = 'https://spladestudio.com'
const OG_IMAGE = `${SITE}/og-image.png`

// Single source of head tags for every page. index.html deliberately declares
// none of these — two copies of <title> is what we shipped before, and crawlers
// disagree about which one wins.
//
// `path` drives both the canonical and og:url, so the two can never drift apart.
// `noindex` is for the ad landing pages, which must not compete with the main
// site in search; they still get full social tags because they're shared in ads.
export default function Seo({
  title,
  description,
  path = '/',
  lang = 'en',
  noindex = false,
  ogTitle,
  ogDescription,
}) {
  const url = `${SITE}${path}`
  const social = {
    title: ogTitle || title,
    description: ogDescription || description,
  }

  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Splade Studio" />
      <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={social.title} />
      <meta property="og:description" content={social.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={social.title} />
      <meta name="twitter:description" content={social.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  )
}
