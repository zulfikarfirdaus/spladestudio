import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Mail, Calendar } from 'lucide-react'
import gsap from 'gsap'
import { trackLead, MARKET_MAIN } from '../lib/analytics'
import { buildEnquiry } from '../lib/enquiry'
import Seo from '../components/Seo'
import './Contact.css'

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

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

export default function Contact() {
  const [searchParams] = useSearchParams()
  // Arriving from a pricing card: carry the chosen package into the form.
  const preset = searchParams.get('service')
  const [form, setForm] = useState(
    services.includes(preset) ? { ...INITIAL, service: preset } : INITIAL
  )
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero__content > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

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
        body: JSON.stringify(
          buildEnquiry(form, { source: 'Main site (/contact)', market: MARKET_MAIN }),
        ),
      })
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
        // Only on a confirmed 2xx — a Lead that fires on submit-attempt would
        // teach Meta to optimize for people who fail to send the form.
        trackLead(MARKET_MAIN)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={pageRef}>
      <Seo
        title="Contact — Start a Project With Splade Studio"
        description="Tell us about your project and we'll get back to you within 24 hours. Book a call, send an email, or fill in the brief."
        path="/contact"
      />
      <section className="contact-page">
        <div className="container contact-layout">
          {/* Left — copy */}
          <div className="contact-hero__content">
            <span className="label contact__label">Get in touch</span>
            <h1 className="heading-lg contact__heading">
              Let's build<br />together.
            </h1>
            <p className="contact__sub">
              Tell me about your project and I'll get back to you within 24 hours.
            </p>
            <div className="contact__links">
              <a href="mailto:spladestudio@gmail.com" className="contact__email">
                <Mail size={16} />
                Send Email
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="contact__email">
                <Calendar size={16} />
                Book a call
              </a>
              <a href="https://www.instagram.com/spladestudio/" target="_blank" rel="noopener noreferrer" className="contact__email">
                <IconInstagram />
                @spladestudio
              </a>
              <a href="https://wa.me/6281217398515" target="_blank" rel="noopener noreferrer" className="contact__email">
                <IconWhatsApp />
                Send WhatsApp
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row form-row--2">
              <div className="form-group">
                <label htmlFor="name">Your name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Business name *</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row form-row--2">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  className={emailError ? 'input--error' : ''}
                />
                {emailError && <span className="form-field-error">{emailError}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  WhatsApp number
                  <span className="form-optional"> — optional</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">What do you need? *</label>
              <select
                id="service"
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
              <label htmlFor="message">Tell me about your project *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What's the goal of the website? Any references or inspirations?"
                value={form.message}
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
    </div>
  )
}
