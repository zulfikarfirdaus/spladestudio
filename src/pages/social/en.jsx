// English copy for the social media deck (/en/social-media), for international
// clients arriving from Upwork and Contra. Same shape as id.jsx; the layout is
// Social.jsx. Voice: first person, "I" is Zul, "my AI team" is Smith, Kurt
// and Dylan. No pricing anywhere, no WhatsApp: email is the only contact.

const IMG = '/images/social/en'
const post = (name, alt) => ({ src: `${IMG}/${name}.webp`, alt })

// Remah and Seri are fictional brands made as samples, not clients.
const REMAH = [
  post('remah-01-baked-this-morning', 'Remah post: croissants on a baking tray, with the headline "Baked this morning. Crunchy till the afternoon."'),
  post('remah-02-palm-sugar-cinnamon-roll', 'Remah post: a palm sugar cinnamon roll on deep green, with the headline "Made with palm sugar." and a price tag reading "just 28k".'),
  post('remah-03-saturday-preorder', 'Remah post: a yellow card announcing a Saturday pre-order of 40 boxes, pickup 7 to 10 AM, with butter croissant, country sourdough and milk bread.'),
]
const SERI = [
  post('seri-01-bleeding-gums', 'Seri post: "Bleeding gums when you brush, is that normal?" with three quick tips beside a red toothbrush.'),
  post('seri-02-first-dental-visit', 'Seri post: a smiling toddler holding a toothbrush, with the headline "Since the first tooth arrives." about a child\'s first dental visit.'),
  post('seri-03-open-after-work', 'Seri post: a bright dental treatment room, open Monday to Saturday 9 AM to 8 PM, with the headline "After work, still time to smile."'),
]

export const EMAIL = 'spladestudio@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=Social%20media%20content%20enquiry`

export default {
  lang: 'en',
  bar: { nav: 'Slide navigation', home: 'Splade Studio, back to start', prev: 'Previous slide', next: 'Next slide', lang: 'Language' },
  cta: { href: MAILTO, mail: true, main: 'Email me', short: 'Email me' },

  seo: {
    title: 'Social Media Content for Small Businesses | Splade Studio',
    description: 'Consistent, on-brand social media without hiring a full team. My AI team drafts strategy, captions and designs. I review every post.',
    ogTitle: 'Consistent, on-brand social media, without hiring a full team',
    ogDescription: 'Strategy, captions and designs drafted by my AI team, then reviewed and edited by me before you see them.',
    ogImage: '/og-social-media-en.jpg',
    ogImageAlt: 'Consistent, on-brand social media, without hiring a full team: Zul and an AI team of three, with sample Instagram posts for a bakery and a dental clinic.',
  },

  cover: {
    label: 'Social media management · Splade Studio',
    // "on-brand" kept on one line: a break at its hyphen reads as a typo.
    h1: <>Consistent, <span style={{ whiteSpace: 'nowrap' }}>on-brand</span> social media. Without hiring a full team.</>,
    lede: 'I\'m Zul, a designer. My AI team drafts your strategy, captions and designs. I review and edit every post before it reaches you.',
    more: 'See how it works',
  },
  skills: ['Strategy', 'Copywriting', 'Design', 'Video'],
  iphone: {
    label: 'An Instagram feed of sample posts for Remah and Seri',
    feed: [
      { a: 'remah', p: REMAH[1], cap: 'Palm sugar cinnamon roll, just 28k.' },
      { a: 'seri', p: SERI[0], cap: 'Bleeding gums when you brush. Normal or not?' },
      { a: 'remah', p: REMAH[2], cap: 'Saturday pre-order, only 40 boxes!' },
      { a: 'seri', p: SERI[1], cap: 'Your little one\'s first trip to the dentist.' },
      { a: 'remah', p: REMAH[0], cap: 'Baked this morning, crunchy till the afternoon.' },
      { a: 'seri', p: SERI[2], cap: 'After work, still time for a check-up.' },
    ],
  },

  problem: {
    label: 'The problem',
    h2: 'Running a business is busy enough. Social media slips.',
    cards: [
      { t: 'Posting comes and goes', d: 'Busy one week, quiet the next. Your customers forget you, and so does the algorithm.' },
      { t: 'Content made in a rush', d: 'Designs and captions squeezed in between real work. They don\'t show how good your business is.' },
      { t: 'DIY AI that looks like AI', d: 'Typos in the graphics, emojis everywhere, the same look as a thousand other accounts. People scroll past.' },
    ],
    slopAlt: 'An example of a generic AI-made poster',
  },

  team: {
    label: 'The team',
    h2: 'A full social media team: my AI team of three, and me.',
    illustration: (name) => `Illustration of ${name}`,
    agents: {
      supri: { name: 'Smith', role: 'Social Media Strategist', tasks: ['Audience research', 'Content pillars', 'A plan for the month'] },
      kojek: { name: 'Kurt', role: 'Copywriter', tasks: ['Captions', 'On-image copy', 'Your brand\'s voice'] },
      deden: { name: 'Dylan', role: 'Designer', tasks: ['Feed posts', 'Carousels', 'Reels and motion'] },
    },
    lead: { alt: 'Zul, lead of Splade Studio', role: 'Lead', tasks: ['Trains the team on your brand', 'Checks every post', 'Signs off before it reaches you'] },
  },

  workflow: {
    label: 'How it works',
    h2: 'My AI team drafts. I\'m accountable for every post.',
    tags: ['1 · Brand training', '2 · AI drafts', '3 · I review and edit'],
    train: <><b>I train my AI team</b> on your brand</>,
    refs: 'Visual references',
    refImgs: [REMAH[0], REMAH[2], REMAH[1]],
    tone: 'Tone & voice',
    toneWords: ['Warm', 'Relaxed', 'Local'],
    schedule: 'Posting schedule',
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    roles: { supri: 'Strategy', kojek: 'Captions', deden: 'Design' },
    caption: 'Palm sugar sweetness, fresh from the oven. Just 28k!',
    art: REMAH[1],
    review: <><b>I check and edit</b> before it reaches you</>,
    checks: ['Hand edit: bigger logo', 'Quality check', 'Ready to send to you'],
    approved: 'Approved',
    // The fourth step is the dashboard slide that follows.
    next: { href: '#dashboard', label: '4 · You approve it in Splade Hub' },
  },

  work: {
    label: 'Sample work',
    h2: 'Two samples: a bakery and a dental clinic.',
    play: (label) => `Play ${label}`,
    audio: 'Original audio',
    // English cuts of the Reels (720 × 900, muted, from splade-reel's out/<brand>/en/).
    // The posters are a frame past each Reel's blank intro.
    brands: [
      { a: 'remah', name: 'Remah', kind: 'Sample work for a fictional bakery', posts: REMAH, reel: { src: `${IMG}/remah-reel-en.mp4`, poster: `${IMG}/remah-reel-en-poster.webp`, label: 'Remah Reel: croissants and cinnamon rolls on plates, "Baked every morning"' } },
      { a: 'seri', name: 'Seri', kind: 'Sample work for a fictional dental clinic', posts: SERI, reel: { src: `${IMG}/seri-reel-en.mp4`, poster: `${IMG}/seri-reel-en-poster.webp`, label: 'Seri Reel: a two-minute brushing timer for kids, area by area' } },
    ],
  },

  control: {
    label: 'Step 4 · You approve',
    h2: 'Review, comment on and approve every post in one calendar.',
    lede: 'Something not quite right? Leave a comment on the post and I\'ll revise it, up to 2 times per post.',
    reportTitle: 'Plus a report every month',
    report: ['Reach and impressions', 'Follower growth', 'Likes, comments, saves and shares', 'Profile visits and link clicks', 'Your top 3 posts and why they worked', 'The plan for next month'],
    feedback: 'The logo looks right now. Good to go!',
    steps: ['Click a post in the calendar', 'Leave feedback', 'Approve'],
    calAlt: 'The content calendar in the Splade Hub dashboard',
    dialogAlt: 'A post opened with its caption, comments and an Approve button',
  },

  scope: {
    label: 'Scope',
    h2: 'Scope is agreed per client. Start with one pack, or go monthly.',
    plans: [
      {
        name: 'Starter pack',
        desc: 'A one-off first batch of posts. Good for a launch, or to see how we work together.',
        quota: 'One-off',
        sub: 'Number of posts agreed up front',
        items: ['Training on your brand', 'Captions and on-image copy', 'Feed, carousel and Reels designs', 'Review and approval in Splade Hub', 'Up to 2 revisions per post'],
      },
      {
        name: 'Monthly retainer',
        desc: 'Ongoing content, planned a month ahead and reported on every month.',
        quota: 'Monthly',
        sub: 'Volume agreed per client',
        plus: 'Everything in the starter pack, plus',
        items: ['Strategy and a monthly content plan', 'New posts every month', 'A monthly report'],
      },
    ],
    excluded: {
      name: 'Not included',
      desc: 'Available as separate scopes.',
      items: ['Ad management', 'Photo and video shoots', 'Logo design'],
      foot: 'Ask about these separately',
    },
    terms: ['Scope agreed per client', 'Up to 2 revisions per post', 'Use the files on any platform'],
  },

  faq: {
    h2: 'Before you decide.',
    items: [
      { q: 'Will my content look AI-made?', a: 'That\'s what I\'m there to prevent. My AI team is trained on your brand\'s style, and I check every post before it reaches you. If something isn\'t right, it goes back.' },
      { q: 'Is there a minimum contract?', a: 'No. We agree the scope together: a one-off starter pack, or a monthly retainer.' },
      { q: 'What do I need to provide?', a: 'Some background on your business, plus product photos or videos if you have them.' },
      { q: 'Which platforms is this for?', a: 'The designs are made for Instagram and Facebook. Every file can be downloaded from Splade Hub, so you can use it on TikTok, LinkedIn or anywhere else.' },
      { q: 'How many revisions do I get?', a: 'Up to 2 revisions per post. Just leave a comment on the post in Splade Hub.' },
      { q: 'Do we need to be in the same time zone?', a: 'No. Review and approval happen in Splade Hub, so you can check posts whenever suits you, and we talk by email.' },
      { q: 'What isn\'t included?', a: 'Ad management, photo and video shoots, and logo design. Each is available as a separate scope.' },
    ],
  },

  closing: {
    h1: 'Ready for a social media team?',
    lede: 'Tell me about your business and what you need, and we\'ll work out the right scope.',
    instagram: false,
    address: EMAIL,
  },
}
