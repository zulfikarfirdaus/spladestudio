import { readAttribution } from './attribution'

// Formspree recognises a specific set of field names — name, email, phone,
// company, message and subject — and renders them as the sender, the body and
// the subject line. Anything else arrives as an anonymous row. Matching those
// names is the whole difference between an email that reads like an enquiry
// and one that reads like a database dump, and it costs nothing.
//
// Both forms build their payload here so the two inboxes can never drift into
// different shapes.
export function buildEnquiry(form, { source, market }) {
  return {
    ...form,

    // Inbox triage, most distinguishing part first: Gmail truncates the
    // subject, and "New enquiry from the website" ×40 is not a subject line.
    subject: `${market}: ${form.name} — ${form.service || 'Not specified'}`,

    // Which surface it came from, then which ad paid for it.
    source,
    ...readAttribution(),
  }
}

const INBOX = 'spladestudio@gmail.com'

// Some mail clients truncate very long mailto URLs, and a silently cut-off
// brief is worse than a short one that arrives whole.
const MAX_BODY = 1500

/**
 * A mailto carrying everything the visitor already typed.
 *
 * Formspree rejects submissions once the monthly cap is hit — they are not
 * queued, the lead is simply gone. Same for an outage or a flaky connection.
 * Since the form is only cleared on success, the state is still intact at that
 * point, so the recovery path can be one click instead of asking someone to
 * retype their brief into their own mail client.
 */
export function enquiryMailto(form, market) {
  const subject = `${market}: ${form.name} — ${form.service || 'Not specified'}`
  const body = [
    `Name: ${form.name}`,
    `Business: ${form.company}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Service: ${form.service || 'Not specified'}`,
    '',
    (form.message || '').slice(0, MAX_BODY),
  ].join('\n')

  return `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
