import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { MotionConfig, motion, useInView } from 'motion/react'
import {
  BatteryFull, Bookmark, Check, ChevronDown, ChevronUp, CircleUser, Clapperboard, Ellipsis, Heart, House,
  MessageCircle, Minus, Palette, PenLine, Play, Search, Send, ShoppingBag, Signal, SquarePlay, Target, Wifi,
} from 'lucide-react'
import Seo from '../components/Seo'
import WaIcon from '../components/id/WaIcon'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { waKenalanHref, waSocialHref, waSocialHrefFor } from '../lib/wa'
import './Social.css'

// Pitch deck for the social media management service, in Bahasa, in two
// editions (see EDITIONS): /social for business owners buying the service,
// /kenalan for an employer, without prices or freelance terms.
// One full-screen slide per section, in the order a business owner decides:
// their problem, the team, how the work is controlled, proof, their own
// control, price against hiring, objections, then the call. Navigation is
// plain scrolling (snap on desktop), plus arrow keys and the top bar.

const IMG = '/images/social'
const IG_URL = 'https://www.instagram.com/spladestudio/'

// ── small building blocks ─────────────────────────────────────────────────

const EASE_OUT = [0.16, 1, 0.3, 1]
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

/** Children rise in one after another when the slide scrolls into view. */
function Stagger({ children, className, as = 'div', gap = 0.08 }) {
  const Tag = motion[as]
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </Tag>
  )
}
const Item = ({ children, className, as = 'div' }) => {
  const Tag = motion[as]
  return <Tag className={className} variants={rise}>{children}</Tag>
}

function WaButton({ href, children, className = 'sd-btn--wa', size }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`sd-btn ${className}${size === 'lg' ? ' sd-btn--lg' : ''}`}>
      <WaIcon size={size === 'lg' ? 20 : 16} /> {children}
    </a>
  )
}

function IgIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const Tick = ({ size = 16 }) => <Check size={size} strokeWidth={3} aria-hidden="true" />

// Timeline maths for the animated mock-ups: everything is a pure function of t.
const clamp01 = (x) => Math.min(1, Math.max(0, x))
const span = (t, a, b) => clamp01((t - a) / (b - a))
const ease = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2)
const lerp = (a, b, p) => a + (b - a) * p

/** Cycles 0..n-1 every `ms` while on screen (and never for reduced motion). */
function useCycle(ref, n, ms) {
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % n), ms)
    return () => clearInterval(id)
  }, [inView, reduced, n, ms])
  return i
}

/** Seconds into a `period`-long loop, ticking only while on screen. Reduced
    motion holds the timeline at `still`, a frame that shows the end result. */
function useLoop(ref, period, still) {
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = usePrefersReducedMotion()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (!inView || reduced) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      setT(((now - start) / 1000) % period)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, period])
  return reduced ? still : t
}

/** A muted, looping reel that plays while it is on screen. If the browser
    still refuses to autoplay (low-power mode, strict settings), a play
    button appears instead of a frozen poster. */
function Reel({ src, poster, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const [blocked, setBlocked] = useState(false)
  const play = useCallback(() => {
    const v = ref.current
    // Set here as well as in JSX: a prerendered <video> can hydrate without
    // the muted property, and browsers only autoplay video that is muted.
    v.muted = true
    v.play().then(() => setBlocked(false), () => setBlocked(true))
  }, [])
  useEffect(() => {
    if (inView) play()
    else ref.current?.pause()
  }, [inView, play])
  return (
    <>
      <video ref={ref} className="sd-reel__video" src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
      {blocked && (
        <button type="button" className="sd-reel__play" onClick={play} aria-label={`Putar ${label}`}>
          <Play size={22} fill="currentColor" aria-hidden="true" />
        </button>
      )}
    </>
  )
}

// ── Instagram-style post frames ───────────────────────────────────────────

const REMAH = { user: 'remah.bakery', place: 'Dago, Bandung', logo: `${IMG}/logo-remah.svg` }
const SERI = { user: 'seri.dental', place: 'Antapani, Bandung', logo: `${IMG}/logo-seri.svg` }

function IgHeader({ user, place, logo }) {
  return (
    <div className="sd-ig__head">
      <span className="sd-ig__avatar"><img src={logo} alt="" width="28" height="28" /></span>
      <span className="sd-ig__who"><b>{user}</b><small>{place}</small></span>
      <Ellipsis className="sd-ig__dots" size={16} aria-hidden="true" />
    </div>
  )
}

function IgCarousel({ account, posts, alt }) {
  const ref = useRef(null)
  const i = useCycle(ref, posts.length, 2600)
  return (
    <figure className="sd-ig" ref={ref}>
      <IgHeader {...account} />
      <div className="sd-ig__media">
        <div className="sd-ig__track" style={{ transform: `translateX(${-i * 100}%)` }}>
          {posts.map((p, k) => <img key={p} src={`${IMG}/${p}.webp`} alt={`${alt} ${k + 1}`} loading="lazy" width="900" height="1125" />)}
        </div>
        <span className="sd-ig__count">{i + 1}/{posts.length}</span>
      </div>
      <div className="sd-ig__foot">
        <span className="sd-ig__pager">{posts.map((p, k) => <i key={p} className={k === i ? 'on' : ''} />)}</span>
      </div>
    </figure>
  )
}

function IgReel({ account, src, label }) {
  return (
    <figure className="sd-ig sd-ig--reel">
      <IgHeader {...account} />
      <div className="sd-ig__media">
        <Reel src={`${IMG}/${src}.mp4`} poster={`${IMG}/${src}-poster.webp`} label={label} />
        <span className="sd-ig__reelmark" aria-hidden="true"><Clapperboard size={13} /> Reels</span>
      </div>
      <div className="sd-ig__foot"><small>♫ {account.user} · Audio asli</small></div>
    </figure>
  )
}

// ── slides ────────────────────────────────────────────────────────────────

const FEED = [
  { a: REMAH, p: 'post-remah-2', cap: 'Cinroll gula aren, cuma 28rb.' },
  { a: SERI, p: 'post-seri-1', cap: 'Gusi berdarah pas sikat gigi, normal nggak?' },
  { a: REMAH, p: 'post-remah-3', cap: 'Pre-order Sabtu ini, cuma 40 box!' },
  { a: SERI, p: 'post-seri-2', cap: 'Kunjungan pertama si kecil ke dokter gigi.' },
  { a: REMAH, p: 'post-remah-1', cap: 'Dipanggang pagi hari, crunchy sampai sore.' },
  { a: SERI, p: 'post-seri-3', cap: 'Pulang kerja, masih sempat cek gigi.' },
]

// Other accounts in the story row: plain placeholders, not real brands.
const STORY_FILLERS = [['kopi.senja', '#E07A3F'], ['batik.nusa', '#7B5CD6'], ['dapur.ibu', '#2E9C8F']]

const SKILLS = [
  { Icon: Target, label: 'Strategi' },
  { Icon: PenLine, label: 'Copywriting' },
  { Icon: Palette, label: 'Desain' },
  { Icon: Clapperboard, label: 'Video' },
]

/** A tilted iPhone running an Instagram feed of the two demo brands. */
function Iphone() {
  return (
    <div className="sd-iphone" role="img" aria-label="Feed Instagram berisi konten Remah dan Seri">
      <div className="sd-iphone__screen">
        <div className="sd-iphone__status">
          <b>9:41</b><span className="sd-iphone__island" /><span><Signal size={13} /><Wifi size={13} /><BatteryFull size={16} /></span>
        </div>
        <div className="sd-igapp__top"><span className="sd-igapp__brand">Instagram</span><span><Heart size={18} /><Send size={18} /></span></div>
        <div className="sd-igapp__stories">
          {[REMAH, SERI].map((a) => <span key={a.user}><img src={a.logo} alt="" width="40" height="40" /><small>{a.user}</small></span>)}
          {STORY_FILLERS.map(([user, color]) => <span key={user}><i style={{ '--c': color }}>{user[0].toUpperCase()}</i><small>{user}</small></span>)}
        </div>
        <div className="sd-igapp__scroll">
          <div className="sd-igapp__feed">
            {[...FEED, ...FEED].map((f, k) => (
              <div key={k} className="sd-fpost">
                <div className="sd-fpost__head"><img src={f.a.logo} alt="" width="22" height="22" /><b>{f.a.user}</b><Ellipsis size={14} /></div>
                <img className="sd-fpost__img" src={`${IMG}/${f.p}.webp`} alt="" loading={k < 2 ? 'eager' : 'lazy'} width="900" height="1125" />
                <div className="sd-fpost__actions"><Heart size={16} /><MessageCircle size={16} /><Send size={16} /><Bookmark size={16} /></div>
                <p className="sd-fpost__cap"><b>{f.a.user}</b> {f.cap}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sd-igapp__tabs"><House size={18} /><Search size={18} /><SquarePlay size={18} /><ShoppingBag size={18} /><CircleUser size={18} /></div>
      </div>
    </div>
  )
}

function Cover({ ed }) {
  return (
    <div className="sd-slide__inner sd-cover">
      {/* CSS-animated rather than motion: this is the first screen, and it has
          to be visible in the prerendered HTML before any JavaScript runs. */}
      <div className="sd-cover__copy">
        <div className="sd-label sd-in">Social media management · Splade Studio</div>
        <h1 className="sd-h1 sd-in" style={{ '--d': '80ms' }}>Social media bisnis kamu jadi makin rapi dan terjadwal.</h1>
        <p className="sd-lede sd-in" style={{ '--d': '160ms' }}>
          Zul dan 3 AI agent-nya akan bantu bikin desain, copywriting, dan strategi sosmed kamu.{ed.price}
        </p>
        <div className="sd-actions sd-in" style={{ '--d': '240ms' }}>
          <WaButton href={ed.wa}>{ed.cta}</WaButton>
          <a href="#workflow" className="sd-btn sd-btn--ghost">Lihat cara kerjanya</a>
        </div>
      </div>
      <div className="sd-cover__stage sd-in" style={{ '--d': '200ms' }}>
        <Iphone />
        {SKILLS.map(({ Icon, label }, k) => (
          <span key={label} className={`sd-float sd-float--${k}`} style={{ '--d': `${900 + k * 160}ms` }} title={label}>
            <Icon size={26} strokeWidth={1.9} aria-hidden="true" /><span className="sr-only">{label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const STAMP_RED = '#D62B2B'
const star = (cx, cy, r) => Array.from({ length: 10 }, (_, i) => {
  const a = (i * Math.PI) / 5 - Math.PI / 2
  const d = i % 2 ? r * 0.45 : r
  return `${(cx + d * Math.cos(a)).toFixed(1)},${(cy + d * Math.sin(a)).toFixed(1)}`
}).join(' ')
const STAMP_EDGE = Array.from({ length: 120 }, (_, i) => {
  const a = (i / 120) * Math.PI * 2
  const r = i % 2 ? 93 : 99
  return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`
}).join(' ')

/** A red rubber stamp reading "AI SLOP", with the uneven ink of a real one. */
function SlopStamp() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="AI Slop!">
      <defs>
        <filter id={`ink${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -4 3.1" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
        <path id={`top${id}`} d="M 36 100 A 64 64 0 0 1 164 100" />
        <path id={`bot${id}`} d="M 24 100 A 76 76 0 0 0 176 100" />
      </defs>
      <g filter={`url(#ink${id})`} fontFamily="var(--font-body)" fontWeight="800" fill={STAMP_RED}>
        <polygon points={STAMP_EDGE} />
        <circle cx="100" cy="100" r="87" fill="#fff" />
        <circle cx="100" cy="100" r="82" fill="none" stroke={STAMP_RED} strokeWidth="3" />
        <text fontSize="19" letterSpacing="3"><textPath href={`#top${id}`} startOffset="50%" textAnchor="middle">AI SLOP</textPath></text>
        <text fontSize="19" letterSpacing="3"><textPath href={`#bot${id}`} startOffset="50%" textAnchor="middle">AI SLOP</textPath></text>
        <circle cx="100" cy="100" r="52" />
        {[78, 100, 122].map((x) => <polygon key={`a${x}`} points={star(x, 64, 6)} fill="#fff" />)}
        {[78, 100, 122].map((x) => <polygon key={`b${x}`} points={star(x, 136, 6)} fill="#fff" />)}
        <rect x="6" y="80" width="188" height="40" rx="4" stroke="#fff" strokeWidth="3" />
        <text x="100" y="111" fontSize="31" letterSpacing="1" textAnchor="middle" fill="#fff">AI SLOP!</text>
      </g>
    </svg>
  )
}

function Problem() {
  const ref = useRef(null)
  const go = useInView(ref, { once: true, amount: 0.4 })
  const cards = [
    {t: 'Posting nggak konsisten', d: 'Minggu ini rajin, bulan depan sepi. Pelanggan dan algoritma sama-sama lupa sama bisnis kamu.'},
    {t: 'Konten seadanya', d: 'Desain dan caption dibuat buru-buru di sela kerjaan, jadi nggak mencerminkan kualitas bisnis kamu.'},
    {t: 'Pakai AI sendiri, kelihatan AI-nya', d: 'Typo di desain, emoji di mana-mana, mirip ribuan akun lain. Audiens langsung ilfeel.'},
  ]
  const tilt = [-6, 3, 8]
  return (
    <div className="sd-slide__inner">
      <Stagger className="sd-head">
        <Item className="sd-label">The problem</Item>
        <Item as="h2" className="sd-h2">Ngurus bisnis aja udah sibuk. Social media sering ketinggalan.</Item>
      </Stagger>
      <div className="sd-problem">
        <Stagger className="sd-problem__cards" gap={0.12}>
          {cards.map((c, k) => (
            <Item key={c.t} className="sd-card">
              <span className="sd-card__num">0{k + 1}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </Item>
          ))}
        </Stagger>
        {/* One poster at a time, each one stamped before the next arrives. */}
        <div className="sd-slop" ref={ref}>
          {tilt.map((r, k) => (
            <motion.div key={k} className={`sd-slop__img sd-slop__img--${k + 1}`}
              initial={{ opacity: 0, y: 50, rotate: r * 2 }} animate={go ? { opacity: 1, y: 0, rotate: r } : undefined}
              transition={{ delay: 0.2 + k * 1.1, duration: 0.6, ease: EASE_OUT }}>
              <motion.img src={`${IMG}/slop-${k + 1}.webp`} alt="Contoh desain hasil AI yang generik" loading="lazy"
                initial={{ filter: 'grayscale(0)' }} animate={go ? { filter: 'grayscale(1)' } : undefined}
                transition={{ delay: 1.0 + k * 1.1, duration: 0.5 }} />
              <motion.span className="sd-slop__stamp" initial={{ opacity: 0, scale: 1.9 }} animate={go ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: 0.75 + k * 1.1, duration: 0.25, ease: [0.5, 0, 0.75, 0] }}>
                <SlopStamp />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// The illustrations put each chin at a different height (Deden's cap sits
// higher), so each face crop gets its own offset to line the heads up.
const FACE_TOP = { supri: '-4%', kojek: '-1.5%', deden: '7%' }

const AGENTS = [
  {id: 'supri', name: 'Supri', role: 'Social Media Strategist', tasks: ['Riset audiens', 'Pilar konten', 'Rencana sebulan']},
  {id: 'kojek', name: 'Kojek', role: 'Copywriter', tasks: ['Caption', 'Teks di desain', 'Gaya bahasa brand kamu']},
  {id: 'deden', name: 'Deden', role: 'Designer', tasks: ['Desain feed', 'Carousel', 'Video motion']},
]

function Team() {
  return (
    <div className="sd-slide__inner">
      <Stagger className="sd-head">
        <Item className="sd-label">Our team</Item>
        <Item as="h2" className="sd-h2">Satu tim social media lengkap: 3 agen AI dan 1 lead.</Item>
      </Stagger>
      <Stagger className="sd-team" gap={0.1}>
        {AGENTS.map((a) => (
          <Item key={a.id} className="sd-agent">
            <div className="sd-agent__img"><img src={`${IMG}/agent-${a.id}.webp`} alt={`Ilustrasi ${a.name}`} loading="lazy" width="600" height="804" /></div>
            <div className="sd-agent__body">
              <h3>{a.name} <small>{a.role}</small></h3>
              <ul>{a.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </Item>
        ))}
        <Item className="sd-agent sd-agent--lead">
          <div className="sd-agent__img sd-agent__img--zul"><img src={`${IMG}/zul.webp`} alt="Zul, lead Splade Studio" loading="lazy" width="800" height="800" /></div>
          <div className="sd-agent__body">
            <h3>Zul <small>Lead</small></h3>
            <ul><li>Melatih tim untuk brand kamu</li><li>Mengecek setiap konten</li><li>Approve sebelum tayang</li></ul>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

/** Brief → the three agents at work → Zul's approval, played as one loop. */
function Workflow() {
  const ref = useRef(null)
  const STAGE = 3.5
  const t = useLoop(ref, STAGE * 3, STAGE * 3 - 0.1)
  const stage = Math.min(2, Math.floor(t / STAGE))
  // Seconds into stage k: -1 before it starts, 99 once it is done.
  const at = (k) => (stage > k ? 99 : stage === k ? t - k * STAGE : -1)
  const [a, b, c] = [at(0), at(1), at(2)]
  const caption = 'Manisnya gula aren, baru keluar oven. Cuma 28rb!'
  const card = (k) => `sd-flow__card${stage === k ? ' on' : ''}${stage > k ? ' done' : ''}`
  return (
    <div className="sd-slide__inner" ref={ref}>
      <Stagger className="sd-head">
        <Item className="sd-label">Workflow</Item>
        <Item as="h2" className="sd-h2">AI bekerja di bawah kontrol desainer profesional.</Item>
      </Stagger>
      <Stagger className="sd-flow" gap={0.12}>
        <Item className={card(0)}>
          <span className="sd-flow__tag">1 · Brief awal</span>
          <div className="sd-flow__who">
            <span className="sd-face sd-face--zul"><img src={`${IMG}/zul.webp`} alt="" loading="lazy" /></span>
            <p><b>Zul melatih AI</b> untuk brand kamu</p>
          </div>
          <ul className="sd-brief">
            <li className={a > 0.3 ? 'lit' : ''}>
              <small>Referensi visual</small>
              <span className="sd-brief__refs">{['post-remah-1', 'post-remah-3', 'post-remah-2'].map((p) => <img key={p} src={`${IMG}/${p}.webp`} alt="" loading="lazy" />)}</span>
            </li>
            <li className={a > 1.0 ? 'lit' : ''}>
              <small>Tone & voice</small>
              <span className="sd-brief__chips">{['Hangat', 'Santai', 'Lokal'].map((w) => <b key={w}>{w}</b>)}</span>
            </li>
            <li className={a > 1.7 ? 'lit' : ''}>
              <small>Jadwal posting</small>
              <span className="sd-brief__week">{['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, k) => <i key={k} className={k % 2 ? 'post' : ''}>{d}</i>)}</span>
            </li>
          </ul>
        </Item>
        <Item className={card(1)}>
          <span className="sd-flow__tag">2 · AI bekerja</span>
          <ul className="sd-crew">
            <li>
              <span className="sd-face"><img src={`${IMG}/agent-supri.webp`} alt="" loading="lazy" style={{ top: FACE_TOP.supri }} /></span>
              <div><p><b>Supri</b> <small>Strategi</small></p><span className="sd-crew__bar"><i style={{ transform: `scaleX(${ease(span(b, 0.2, 1.5))})` }} /></span></div>
            </li>
            <li>
              <span className="sd-face"><img src={`${IMG}/agent-kojek.webp`} alt="" loading="lazy" style={{ top: FACE_TOP.kojek }} /></span>
              <div><p><b>Kojek</b> <small>Caption</small></p><span className="sd-crew__type">{caption.slice(0, Math.round(span(b, 0.6, 2.3) * caption.length))}{b > 0.6 && b < 2.6 && <i className="sd-caret" />}</span></div>
            </li>
            <li>
              <span className="sd-face"><img src={`${IMG}/agent-deden.webp`} alt="" loading="lazy" style={{ top: FACE_TOP.deden }} /></span>
              <div><p><b>Deden</b> <small>Desain</small></p></div>
              <span className="sd-crew__art"><img src={`${IMG}/post-remah-2.webp`} alt="" loading="lazy" style={{ clipPath: `inset(${(1 - ease(span(b, 1.2, 2.8))) * 100}% 0 0 0)` }} /></span>
            </li>
          </ul>
        </Item>
        <Item className={card(2)}>
          <span className="sd-flow__tag">3 · Approval</span>
          <div className="sd-flow__who">
            <span className="sd-face sd-face--zul"><img src={`${IMG}/zul.webp`} alt="" loading="lazy" /></span>
            <p><b>Zul cek dan edit</b> sebelum sampai ke kamu</p>
          </div>
          <div className="sd-review">
            <div className="sd-review__post">
              <img src={`${IMG}/post-remah-2.webp`} alt="" loading="lazy" />
              <span className={`sd-review__mark${c > 0.4 ? ' on' : ''}`}><PenLine size={11} strokeWidth={2.5} aria-hidden="true" /></span>
              <span className={`sd-review__ok${c > 1.7 ? ' on' : ''}`}><Tick size={14} /> Approved</span>
            </div>
            <ul className="sd-review__list">
              <li className={c > 0.4 ? 'lit' : ''}><PenLine size={15} aria-hidden="true" /> Edit manual: logo diperbesar</li>
              <li className={c > 1.0 ? 'lit' : ''}><Tick size={15} /> Cek kualitas</li>
              <li className={c > 1.7 ? 'lit' : ''}><Tick size={15} /> Siap dikirim ke kamu</li>
            </ul>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function Work() {
  return (
    <div className="sd-slide__inner">
      <Stagger className="sd-head">
        <Item className="sd-label">Portfolio</Item>
        <Item as="h2" className="sd-h2">Dua contoh: Toko Roti dan Klinik Dokter Gigi.</Item>
      </Stagger>
      <Stagger className="sd-work" gap={0.12}>
        <Item className="sd-work__brand">
          <h3>Remah <small>toko roti</small></h3>
          <div className="sd-work__pair">
            <IgCarousel account={REMAH} posts={['post-remah-1', 'post-remah-2', 'post-remah-3']} alt="Postingan Remah" />
            <IgReel account={REMAH} src="remah-reel1" label="Reels Remah" />
          </div>
        </Item>
        <Item className="sd-work__brand">
          <h3>Seri <small>klinik gigi</small></h3>
          <div className="sd-work__pair">
            <IgCarousel account={SERI} posts={['post-seri-1', 'post-seri-2', 'post-seri-3']} alt="Postingan Seri" />
            <IgReel account={SERI} src="seri-reel2" label="Reels Seri" />
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

// Dashboard click-through, in the screenshots' own 1080 × 1350 coordinates.
const SHOT = { w: 1080, h: 1350, chip: [305, 510, 83, 24], input: [459, 968, 500, 34], approve: [49, 1072, 92, 36] }
const FEEDBACK = 'Logonya udah pas. Mantap, lanjut tayang!'
const DASH_STEPS = ['Klik postingan di kalender', 'Tulis feedback', 'Approve']
const place = (x, y) => ({ left: `${(x / SHOT.w) * 100}%`, top: `${(y / SHOT.h) * 100}%` })

function Control() {
  const ref = useRef(null)
  const t = useLoop(ref, 10, 6.9)
  const [cx, cy, cw, ch] = SHOT.chip
  const [ix, iy, iw, ih] = SHOT.input
  const [ax, ay, aw, ah] = SHOT.approve
  const away = [1130, 1330]
  const onChip = [cx + cw * 0.45, cy + ch * 0.6]
  const onInput = [ix + 70, iy + ih * 0.55]
  const onApprove = [ax + aw * 0.5, ay + ah * 0.6]
  // cursor: in -> the post -> the comment box -> Approve -> out
  const legs = [[0.2, 1.2, away, onChip], [2.2, 2.9, onChip, onInput], [5.0, 5.8, onInput, onApprove], [7.3, 8.3, onApprove, away]]
  let pos = away
  for (const [a, b, from, to] of legs) if (t >= a) pos = [lerp(from[0], to[0], ease(span(t, a, b))), lerp(from[1], to[1], ease(span(t, a, b)))]
  const clicks = [[1.35, onChip], [3.0, onInput], [5.95, onApprove]]
  const pressed = clicks.some(([c]) => t > c - 0.08 && t < c + 0.12)
  // the post opens out of its calendar chip, and closes back into it
  const open = ease(span(t, 1.45, 2.0)) * (1 - ease(span(t, 7.9, 8.4)))
  const inset = [cy / SHOT.h, 1 - (cx + cw) / SHOT.w, 1 - (cy + ch) / SHOT.h, cx / SHOT.w]
    .map((v) => `${(v * (1 - open) * 100).toFixed(2)}%`).join(' ')
  const approved = ease(span(t, 6.05, 6.45))
  const typing = t > 3.0
  const typed = FEEDBACK.slice(0, Math.round(span(t, 3.2, 4.9) * FEEDBACK.length))
  const step = t < 2.2 ? 0 : t < 5.0 ? 1 : 2
  return (
    <div className="sd-slide__inner sd-control" ref={ref}>
      <div className="sd-control__copy">
        <Stagger className="sd-head">
          <Item className="sd-label">Dashboard</Item>
          <Item as="h2" className="sd-h2">Review, kasih feedback, dan approve di satu dashboard.</Item>
        </Stagger>
        <Stagger className="sd-report" gap={0.07}>
          <Item as="h3">Plus laporan tiap bulan</Item>
          {['Jangkauan dan tayangan', 'Pertumbuhan followers', 'Like, komentar, simpan, dan bagikan', 'Kunjungan profil dan klik WhatsApp', '3 konten terbaik dan kenapa berhasil', 'Rencana bulan depan'].map((r) => (
            <Item key={r} className="sd-report__row"><Tick /> {r}</Item>
          ))}
        </Stagger>
      </div>
      <motion.figure className="sd-browser" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: EASE_OUT }}>
        <div className="sd-browser__bar"><i /><i /><i /><span>Splade Hub</span></div>
        <div className="sd-browser__screen">
          <img src={`${IMG}/flow-cal.webp`} alt="Kalender konten di dashboard Splade Hub" loading="lazy" width="1080" height="1350" />
          <img src={`${IMG}/flow-cal-after.webp`} alt="" loading="lazy" width="1080" height="1350" style={{ opacity: t > 8.1 ? 1 : 0 }} />
          <div className="sd-browser__dialog" style={{ clipPath: `inset(${inset})`, visibility: open > 0 ? 'visible' : 'hidden' }}>
            <img src={`${IMG}/flow-dialog.webp`} alt="Postingan dibuka dengan caption, komentar, dan tombol approve" loading="lazy" width="1080" height="1350" />
            {typing && (
              <span className="sd-browser__typed" style={{ ...place(ix, iy), width: `${(iw / SHOT.w) * 100}%`, height: `${(ih / SHOT.h) * 100}%` }}>
                {typed}<i className="sd-caret" />
              </span>
            )}
            <img src={`${IMG}/flow-approved.webp`} alt="" loading="lazy" width="1080" height="1350" style={{ clipPath: `inset(0 0 ${(1 - approved) * 100}% 0)` }} />
          </div>
          <span className={`sd-browser__toast${t > 6.25 && t < 7.8 ? ' on' : ''}`}><Tick size={14} /> Approved</span>
          {clicks.map(([c, p]) => t > c && t < c + 0.5 && (
            <span key={c} className="sd-browser__ripple" style={{ ...place(...p), opacity: 1 - span(t, c, c + 0.5), transform: `translate(-50%, -50%) scale(${0.4 + span(t, c, c + 0.5)})` }} />
          ))}
          <svg className="sd-browser__cursor" viewBox="0 0 24 24" aria-hidden="true" style={{ ...place(...pos), scale: pressed ? '0.82' : '1' }}>
            <path d="M5 3l14 8-6.4 1.6L9.4 19z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
        <figcaption>{DASH_STEPS.map((s, k) => <span key={s} className={k === step ? 'on' : ''}>{k + 1}. {s}</span>)}</figcaption>
      </motion.figure>
    </div>
  )
}

// Pricing, side by side with what the same three roles cost to hire.
const INCLUDED = ['Strategi & rencana konten sebulan', 'Caption & teks di desain', 'Desain feed, carousel & video', 'Review & approve lewat dashboard', 'Laporan bulanan', 'Posting ke Instagram & Facebook']
const PLANS = [
  {name: 'Paket 8', desc: 'Untuk bisnis yang mau mulai rutin hadir di feed.', price: 'Rp 1,5 jt', quota: '8 konten / bulan', sub: '2x seminggu · 6 desain feed/carousel + 2 reels', items: INCLUDED},
  {name: 'Paket 12', best: true, desc: 'Untuk bisnis yang mau lebih sering muncul dan jualan.', price: 'Rp 2 jt', quota: '12 konten / bulan', sub: '3x seminggu · 8 desain feed/carousel + 4 reels', plus: 'Semua di Paket 8, plus', items: ['4 konten tambahan tiap bulan', 'Reels 2x lebih banyak', 'Posting 3x seminggu']},
]
// The lowest advertised monthly salary per role (Bandung / Jawa Barat job ads),
// so the comparison never makes Splade look cheaper than it is.
const INHOUSE = [['Social media strategist', 3500000], ['Copywriter / content creator', 3000000], ['Desainer & video editor', 3500000]]
const jt = (n) => `Rp ${(n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`

function Pricing() {
  const inhouse = INHOUSE.reduce((s, [, n]) => s + n, 0)
  return (
    <div className="sd-slide__inner">
      <Stagger className="sd-head">
        <Item className="sd-label">Pricing</Item>
        <Item as="h2" className="sd-h2 sd-h2--wide">Pilih paket kamu dan bandingkan dengan tim in-house.</Item>
      </Stagger>
      <Stagger className="sd-plans" gap={0.12}>
        {PLANS.map((p) => (
          <Item key={p.name} className={`sd-plan${p.best ? ' sd-plan--best' : ''}`}>
            {p.best && <span className="sd-plan__badge">Recommended</span>}
            <h3>{p.name}</h3>
            <p className="sd-plan__desc">{p.desc}</p>
            <p className="sd-plan__amount">{p.price}<small> / bulan</small></p>
            <p className="sd-plan__fine">Kontrak minimum 3 bulan</p>
            <div className="sd-plan__quota"><b>{p.quota}</b><span>{p.sub}</span></div>
            <ul>
              {p.plus && <li className="sd-plan__plus">→ {p.plus}</li>}
              {p.items.map((x) => <li key={x}><Tick size={15} /> {x}</li>)}
            </ul>
            <WaButton href={waSocialHrefFor(p.name)} className={p.best ? 'sd-btn--dark' : 'sd-btn--line'}>Pilih {p.name}</WaButton>
          </Item>
        ))}
        <Item className="sd-plan sd-plan--off">
          <span className="sd-plan__badge sd-plan__badge--off">Pembanding</span>
          <h3>Tim in-house</h3>
          <p className="sd-plan__desc">Kalau kamu rekrut 3 orang sendiri.</p>
          <p className="sd-plan__amount">{jt(inhouse)}<small> / bulan</small></p>
          <p className="sd-plan__fine">Dihitung dari gaji terendah di lowongan</p>
          <div className="sd-plan__quota"><b>3 karyawan full-time</b><span>Kamu yang mengatur dan mengecek kerjanya</span></div>
          <ul>
            {INHOUSE.map(([r, n]) => <li key={r}><Minus size={15} aria-hidden="true" /> {r} <em>{jt(n)}</em></li>)}
          </ul>
          <span className="sd-plan__off">Belum termasuk BPJS, laptop & software</span>
        </Item>
      </Stagger>
      <Stagger className="sd-terms" gap={0.05}>
        {['Kontrak minimum 3 bulan', 'Tanpa biaya onboarding', 'Revisi hingga 2x per konten', 'Konten bisa digunakan di platform lain'].map((x) => <Item key={x} as="span"><Tick size={14} /> {x}</Item>)}
      </Stagger>
      <p className="sd-note">
        Belum termasuk biaya & pengelolaan iklan, sesi foto/video produk, dan desain logo. Gaji tim in-house memakai angka terendah dari lowongan di Bandung dan Jawa Barat untuk tiap peran.
      </p>
    </div>
  )
}

// `terms` marks the answers that are freelance contract terms, which the
// employer edition leaves out.
const FAQ = [
  {terms: true, q: 'Kenapa kontrak minimum 3 bulan?', a: 'Bulan pertama dipakai untuk mengenal brand kamu dan melatih tim. Hasil social media datang dari konsistensi, bukan satu-dua postingan.'},
  {q: 'Konten saya bakal kelihatan AI nggak?', a: 'Itu yang saya jaga. Tim dilatih dengan gaya brand kamu, dan setiap konten saya cek sebelum sampai ke kamu. Yang belum pas, saya kembalikan.'},
  {q: 'Apa yang perlu saya siapkan?', a: 'Info soal bisnis kamu, foto atau video produk kalau ada, dan akses Meta Business Suite supaya kami bisa posting dan membaca hasilnya.'},
  {q: 'Bisa diposting ke TikTok atau Threads?', a: 'Bisa. Kami posting ke Instagram dan Facebook, dan semua file bisa kamu download dari dashboard untuk dipakai di platform lain.'},
  {terms: true, q: 'Berapa kali revisi?', a: 'Hingga 2 kali revisi per konten, langsung lewat komentar di dashboard.'},
  {terms: true, q: 'Apa yang tidak termasuk?', a: 'Biaya dan pengelolaan iklan, sesi foto/video produk, dan desain logo. Semuanya bisa dibahas terpisah.'},
]

function Faq({ ed }) {
  // One answer open at a time: opening a question closes the one before.
  const [open, setOpen] = useState(0)
  return (
    <div className="sd-slide__inner">
      <Stagger className="sd-head">
        <Item className="sd-label">FAQ</Item>
        <Item as="h2" className="sd-h2">Sebelum kamu memutuskan.</Item>
      </Stagger>
      <Stagger className="sd-faq" gap={0.06}>
        {ed.faq.map((f, k) => (
          <Item key={f.q}>
            <details open={open === k} onToggle={(e) => {
              if (e.currentTarget.open) setOpen(k)
              else if (open === k) setOpen(-1)
            }}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          </Item>
        ))}
      </Stagger>
    </div>
  )
}

function Closing({ ed }) {
  return (
    <div className="sd-slide__inner sd-closing">
      <Stagger className="sd-closing__copy">
        <Item className="sd-closing__team">
          <span className="sd-closing__face sd-closing__face--zul"><img src={`${IMG}/zul.webp`} alt="Zul" loading="lazy" width="800" height="800" /></span>
          {AGENTS.map((a) => <span key={a.id} className="sd-closing__face"><img src={`${IMG}/agent-${a.id}.webp`} alt={`${a.name}, ${a.role}`} loading="lazy" width="600" height="830" style={{ top: FACE_TOP[a.id] }} /></span>)}
        </Item>
        <Item as="h2" className="sd-h1">Siap punya tim social media?</Item>
        <Item as="p" className="sd-lede">{ed.closing}</Item>
        <Item className="sd-actions sd-actions--center">
          <WaButton href={ed.wa} size="lg">Chat WhatsApp</WaButton>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="sd-btn sd-btn--ghost"><IgIcon /> @spladestudio</a>
        </Item>
      </Stagger>
    </div>
  )
}

const SLIDES = [
  {id: 'mulai', tone: 'dark', C: Cover},
  {id: 'masalah', tone: 'light', C: Problem},
  {id: 'tim', tone: 'dark', C: Team},
  {id: 'workflow', tone: 'light', C: Workflow},
  {id: 'portfolio', tone: 'dark', C: Work},
  {id: 'dashboard', tone: 'light', C: Control},
  {id: 'harga', tone: 'dark', C: Pricing},
  {id: 'faq', tone: 'light', C: Faq},
  {id: 'konsultasi', tone: 'dark', C: Closing},
]

// The deck in two editions. `client` sells the service to a business owner;
// `employer` introduces the same team to a company hiring for social media,
// so it drops everything that only a freelance buyer needs: the price, the
// pricing slide, and the contract, revision and scope answers in the FAQ.
const EDITIONS = {
  client: {
    path: '/social',
    slides: SLIDES,
    faq: FAQ,
    wa: waSocialHref,
    cta: 'Konsultasi gratis via WhatsApp',
    price: <> Mulai <b>Rp 1,5 juta</b> per bulan.</>,
    closing: 'Jangan ragu hubungi untuk konsultasi dan diskusi.',
    seo: {
      title: 'Jasa Social Media Management untuk UMKM — Splade Studio',
      description: 'Zul dan 3 AI agent-nya bantu bikin strategi, copywriting, dan desain sosmed kamu, dicek manusia sebelum tayang. Mulai Rp 1,5 juta per bulan. Konsultasi gratis via WhatsApp.',
      ogTitle: 'Social media bisnis kamu jadi makin rapi dan terjadwal — Splade Studio',
      ogDescription: 'Zul dan 3 AI agent-nya bantu bikin desain, copywriting, dan strategi sosmed kamu. Mulai Rp 1,5 juta per bulan.',
    },
  },
  employer: {
    path: '/kenalan',
    slides: SLIDES.filter((s) => s.id !== 'harga'),
    faq: FAQ.filter((f) => !f.terms),
    wa: waKenalanHref,
    cta: 'Chat via WhatsApp',
    price: null,
    closing: 'Jangan ragu hubungi untuk ngobrol dan diskusi lebih lanjut.',
    seo: {
      title: 'Kenalan dengan Zul dan tim social media AI-nya — Splade Studio',
      description: 'Zul dan 3 AI agent-nya bantu bikin strategi, copywriting, dan desain sosmed, dicek manusia sebelum tayang.',
      ogTitle: 'Social media bisnis kamu jadi makin rapi dan terjadwal — Splade Studio',
      ogDescription: 'Zul dan 3 AI agent-nya bantu bikin desain, copywriting, dan strategi sosmed kamu.',
    },
  },
}

// ── deck shell: top bar with progress, counter and navigation ────────────

export default function Social({ edition = 'client' }) {
  const ed = EDITIONS[edition]
  const slides = ed.slides
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { threshold: 0.5 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = useCallback((i) => {
    const k = Math.max(0, Math.min(slides.length - 1, i))
    refs.current[k]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [slides])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, summary')) return
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); go(active + 1) }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(active - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go])

  const pad = (n) => String(n).padStart(2, '0')
  return (
    <MotionConfig reducedMotion="user">
      <Seo {...ed.seo} path={ed.path} lang="id" noindex />
      <header className="sd-bar" aria-label="Navigasi slide">
        <span className="sd-bar__progress" style={{ transform: `scaleX(${(active + 1) / slides.length})` }} aria-hidden="true" />
        <a href="#mulai" className="sd-bar__logo" aria-label="Splade Studio, ke awal"><img src="/images/logo-white.svg" alt="Splade Studio" width="120" height="28" /></a>
        <div className="sd-bar__pager">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Slide sebelumnya"><ChevronUp size={18} /></button>
          <span aria-live="polite">{pad(active + 1)} / {pad(slides.length)}</span>
          <button type="button" onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Slide berikutnya"><ChevronDown size={18} /></button>
        </div>
        <a href={ed.wa} target="_blank" rel="noopener noreferrer" className="sd-bar__wa"><WaIcon size={14} /> <span>Chat WhatsApp</span></a>
      </header>
      <main className="sd-deck">
        {slides.map(({id, tone, C}, k) => (
          <section key={id} id={id} data-index={k} ref={(el) => { refs.current[k] = el }} className={`sd-slide sd-slide--${tone}`} aria-label={`Slide ${k + 1}`}>
            <C ed={ed} />
          </section>
        ))}
      </main>
    </MotionConfig>
  )
}
