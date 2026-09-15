import { useState } from 'react'
import { ArrowRight, Mail, Calendar } from 'lucide-react'
import { track } from '../../lib/pixel'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import '../../pages/Contact.css'
import './lp-au.css'

// Secondary CTA — for prospects who'd rather talk it through than fill the form.
const BOOKING_URL = 'https://calendar.app.google/o8vaKgZTwKac9kE46'

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const services = [
  'Landing Page',
  'Multi-page Website',
  'E-commerce',
  'Custom Feature',
  'Not sure yet',
]

const INITIAL = {
  name: '',
  business: '',
  email: '',
  whatsapp: '',
  service: '',
  description: '',
}

// The contact page, folded into the landing page as its closing CTA.
// `service` is set by the pricing cards above so the chosen package
// arrives with the enquiry.
export default function ContactAU({ service }) {
  const [form, setForm] = useState(INITIAL)
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useScrollReveal('.contact-hero__content, .contact-form', { stagger: 0.15, y: 30 })

  // Picking a pricing card fills the select — but never overwrites a choice
  // the visitor has already made by hand. Adjusting during render (rather than
  // in an effect) avoids the extra commit and the cascading re-render.
  const [lastService, setLastService] = useState(service)
  if (service !== lastService) {
    setLastService(service)
    if (service) setForm(f => (f.service ? f : { ...f, service }))
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'email' && emailError) {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address.')
    }
  }

  function handleEmailBlur() {
    if (form.email && !validateEmail(form.email)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateEmail(form.email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mlgzpyed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // `source` separates AU landing-page enquiries from the main site's.
        body: JSON.stringify({ ...form, source: 'AU landing page (/au)' }),
      })
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
        // Only on a confirmed 2xx — a Lead that fires on submit-attempt would
        // teach Meta to optimize for people who fail to send the form.
        track('Lead')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-page contact-page--section" id="contact">
      <div className="container contact-layout">
        {/* Left — copy */}
        <div className="contact-hero__content">
          <span className="label contact__label">Get in touch</span>
          <h2 className="heading-lg contact__heading">
            Let's build<br />together.
          </h2>
          <p className="contact__sub">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <div className="contact__links">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="contact__email">
              <Calendar size={16} />
              Book a call
            </a>
            <a href="mailto:spladestudio@gmail.com" className="contact__email">
              <Mail size={16} />
              Send Email
            </a>
            <a href="https://www.instagram.com/spladestudio/" target="_blank" rel="noopener noreferrer" className="contact__email">
              <IconInstagram />
              @spladestudio
            </a>
          </div>
        </div>

        {/* Right — form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row form-row--2">
            <div className="form-group">
              <label htmlFor="au-name">Your name *</label>
              <input
                id="au-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="au-business">Business name *</label>
              <input
                id="au-business"
                name="business"
                type="text"
                placeholder="Acme Corp"
                value={form.business}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row form-row--2">
            <div className="form-group">
              <label htmlFor="au-email">Email *</label>
              <input
                id="au-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                className={emailError ? 'input--error' : ''}
              />
              {emailError && <span className="form-field-error">{emailError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="au-whatsapp">
                Phone number
                <span className="form-optional"> — optional</span>
              </label>
              <input
                id="au-whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="+61 4XX XXX XXX"
                value={form.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="au-service">What do you need? *</label>
            <select
              id="au-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a service</option>
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="au-description">Tell us about your project *</label>
            <textarea
              id="au-description"
              name="description"
              rows={5}
              placeholder="What's the goal of the website? Any references or inspirations?"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary contact-form__submit" disabled={status === 'sending' || status === 'success'}>
            {status === 'sending' ? 'Sending…' : 'Send message'} {status !== 'sending' && <ArrowRight size={16} />}
          </button>

          {status === 'success' && (
            <p className="contact-form__thanks">
              Message sent! We'll get back to you within 24 hours.
            </p>
          )}
          {status === 'error' && (
            <p className="contact-form__error">
              Something went wrong. Please email us directly at spladestudio@gmail.com
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
