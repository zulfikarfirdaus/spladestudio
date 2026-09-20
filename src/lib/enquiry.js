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
