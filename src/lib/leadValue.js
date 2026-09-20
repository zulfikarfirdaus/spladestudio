// What an enquiry is worth, which is not what the project costs.
//
// Sending A$3,000 as the value of a Lead would tell Meta every enquiry is a
// sale and report a ROAS that is pure fiction — most enquiries never become
// projects. What goes out is the expected value: the project price times the
// rate at which enquiries actually close.
//
// Tune CLOSE_RATE once there is real history behind it. Being wrong about it
// costs less than it looks: Meta's optimizer works off the ratios between
// events, so even a wrong-but-consistent rate still teaches it that a custom
// build enquiry is worth four times a landing page one.
export const CLOSE_RATE = 0.15

// Mirrors the cards in PricingAU. Quoted in AUD, and the main site uses the
// same table: it publishes no prices of its own, and this is the studio's
// English-language rate card. Meta and GA convert to the account currency for
// reporting, so one currency across both surfaces keeps the numbers readable.
//
// `E-commerce` has no card of its own — the Custom / Web App tier is where
// e-commerce builds live, so it carries that price.
const PROJECT_PRICE_AUD = {
  'Landing Page': 1500,
  'Multi-page Website': 3000,
  'E-commerce': 6000,
  'Custom Feature': 6000,
  // Someone who has not decided yet skews neither cheap nor expensive, so the
  // middle tier is the honest estimate rather than a hopeful one.
  'Not sure yet': 3000,
}

const FALLBACK = PROJECT_PRICE_AUD['Not sure yet']

export function leadValue(service) {
  const price = PROJECT_PRICE_AUD[service] ?? FALLBACK
  return { value: Math.round(price * CLOSE_RATE), currency: 'AUD' }
}
