import { waSocialHref } from '../../lib/wa'

// Bahasa copy for the social media deck (/social and /kenalan). The deck's
// layout lives in Social.jsx; everything a reader sees in words lives here,
// in the same shape as the English copy in en.jsx.

const IMG = '/images/social'
const post = (name, alt) => ({ src: `${IMG}/${name}.webp`, alt })

const REMAH = [1, 2, 3].map((k) => post(`post-remah-${k}`, `Postingan Remah ${k}`))
const SERI = [1, 2, 3].map((k) => post(`post-seri-${k}`, `Postingan Seri ${k}`))

export default {
  lang: 'id',
  bar: { nav: 'Navigasi slide', home: 'Splade Studio, ke awal', prev: 'Slide sebelumnya', next: 'Slide berikutnya', lang: 'Bahasa' },
  cta: { href: waSocialHref, mail: false, main: 'Konsultasi gratis via WhatsApp', short: 'Chat WhatsApp' },

  cover: {
    label: 'Social media management · Splade Studio',
    h1: 'Social media bisnis kamu jadi makin rapi dan terjadwal.',
    lede: 'Zul dan 3 AI agent-nya akan bantu bikin desain, copywriting, dan strategi sosmed kamu.',
    more: 'Lihat cara kerjanya',
  },
  skills: ['Strategi', 'Copywriting', 'Desain', 'Video'],
  iphone: {
    label: 'Feed Instagram berisi konten Remah dan Seri',
    feed: [
      { a: 'remah', p: REMAH[1], cap: 'Cinroll gula aren, cuma 28rb.' },
      { a: 'seri', p: SERI[0], cap: 'Gusi berdarah pas sikat gigi, normal nggak?' },
      { a: 'remah', p: REMAH[2], cap: 'Pre-order Sabtu ini, cuma 40 box!' },
      { a: 'seri', p: SERI[1], cap: 'Kunjungan pertama si kecil ke dokter gigi.' },
      { a: 'remah', p: REMAH[0], cap: 'Dipanggang pagi hari, crunchy sampai sore.' },
      { a: 'seri', p: SERI[2], cap: 'Pulang kerja, masih sempat cek gigi.' },
    ],
  },

  problem: {
    label: 'The problem',
    h2: 'Ngurus bisnis aja udah sibuk. Social media sering ketinggalan.',
    cards: [
      { t: 'Posting nggak konsisten', d: 'Minggu ini rajin, bulan depan sepi. Pelanggan dan algoritma sama-sama lupa sama bisnis kamu.' },
      { t: 'Konten seadanya', d: 'Desain dan caption dibuat buru-buru di sela kerjaan, jadi nggak mencerminkan kualitas bisnis kamu.' },
      { t: 'Pakai AI sendiri, kelihatan AI-nya', d: 'Typo di desain, emoji di mana-mana, mirip ribuan akun lain. Audiens langsung ilfeel.' },
    ],
    slopAlt: 'Contoh desain hasil AI yang generik',
  },

  team: {
    label: 'Our team',
    h2: 'Satu tim social media lengkap: 3 agen AI dan 1 lead.',
    illustration: (name) => `Ilustrasi ${name}`,
    agents: {
      supri: { name: 'Supri', role: 'Social Media Strategist', tasks: ['Riset audiens', 'Pilar konten', 'Rencana sebulan'] },
      kojek: { name: 'Kojek', role: 'Copywriter', tasks: ['Caption', 'Teks di desain', 'Gaya bahasa brand kamu'] },
      deden: { name: 'Deden', role: 'Designer', tasks: ['Desain feed', 'Carousel', 'Video motion'] },
    },
    lead: { alt: 'Zul, lead Splade Studio', role: 'Lead', tasks: ['Melatih tim untuk brand kamu', 'Mengecek setiap konten', 'Approve sebelum tayang'] },
  },

  workflow: {
    label: 'Workflow',
    h2: 'AI bekerja di bawah kontrol desainer profesional.',
    tags: ['1 · Brief awal', '2 · AI bekerja', '3 · Approval'],
    train: <><b>Zul melatih AI</b> untuk brand kamu</>,
    refs: 'Referensi visual',
    refImgs: [REMAH[0], REMAH[2], REMAH[1]],
    tone: 'Tone & voice',
    toneWords: ['Hangat', 'Santai', 'Lokal'],
    schedule: 'Jadwal posting',
    days: ['S', 'S', 'R', 'K', 'J', 'S', 'M'],
    roles: { supri: 'Strategi', kojek: 'Caption', deden: 'Desain' },
    caption: 'Manisnya gula aren, baru keluar oven. Cuma 28rb!',
    art: REMAH[1],
    review: <><b>Zul cek dan edit</b> sebelum sampai ke kamu</>,
    checks: ['Edit manual: logo diperbesar', 'Cek kualitas', 'Siap dikirim ke kamu'],
    approved: 'Approved',
    next: null,
  },

  work: {
    label: 'Portfolio',
    h2: 'Dua contoh: Toko Roti dan Klinik Dokter Gigi.',
    play: (label) => `Putar ${label}`,
    audio: 'Audio asli',
    brands: [
      { a: 'remah', name: 'Remah', kind: 'toko roti', posts: REMAH, reel: { src: `${IMG}/remah-reel1.mp4`, poster: `${IMG}/remah-reel1-poster.webp`, label: 'Reels Remah' } },
      { a: 'seri', name: 'Seri', kind: 'klinik gigi', posts: SERI, reel: { src: `${IMG}/seri-reel2.mp4`, poster: `${IMG}/seri-reel2-poster.webp`, label: 'Reels Seri' } },
    ],
  },

  control: {
    label: 'Dashboard',
    h2: 'Review, kasih feedback, dan approve di satu dashboard.',
    lede: null,
    reportTitle: 'Plus laporan tiap bulan',
    report: ['Jangkauan dan tayangan', 'Pertumbuhan followers', 'Like, komentar, simpan, dan bagikan', 'Kunjungan profil dan klik WhatsApp', '3 konten terbaik dan kenapa berhasil', 'Rencana bulan depan'],
    feedback: 'Logonya udah pas. Mantap, lanjut tayang!',
    steps: ['Klik postingan di kalender', 'Tulis feedback', 'Approve'],
    calAlt: 'Kalender konten di dashboard Splade Hub',
    dialogAlt: 'Postingan dibuka dengan caption, komentar, dan tombol approve',
  },

  faq: {
    h2: 'Sebelum kamu memutuskan.',
    items: [
      { q: 'Kenapa kontrak minimum 3 bulan?', a: 'Bulan pertama dipakai untuk mengenal brand kamu dan melatih tim. Hasil social media datang dari konsistensi, bukan satu-dua postingan.' },
      { q: 'Konten saya bakal kelihatan AI nggak?', a: 'Itu yang saya jaga. Tim dilatih dengan gaya brand kamu, dan setiap konten saya cek sebelum sampai ke kamu. Yang belum pas, saya kembalikan.' },
      { q: 'Apa yang perlu saya siapkan?', a: 'Info soal bisnis kamu, foto atau video produk kalau ada, dan akses Meta Business Suite supaya kami bisa posting dan membaca hasilnya.' },
      { q: 'Bisa diposting ke TikTok atau Threads?', a: 'Bisa. Kami posting ke Instagram dan Facebook, dan semua file bisa kamu download dari dashboard untuk dipakai di platform lain.' },
      { q: 'Berapa kali revisi?', a: 'Hingga 2 kali revisi per konten, langsung lewat komentar di dashboard.' },
      { q: 'Apa yang tidak termasuk?', a: 'Biaya dan pengelolaan iklan, sesi foto/video produk, dan desain logo. Semuanya bisa dibahas terpisah.' },
    ],
  },

  closing: {
    h1: 'Siap punya tim social media?',
    lede: 'Jangan ragu hubungi untuk konsultasi dan diskusi.',
    instagram: true,
    address: null,
  },
}
