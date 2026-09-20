import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { clearConsent } from '../lib/analytics'
import './Privacy.css'

const UPDATED = '20 September 2026'

// Written against what the code actually does — the fields the forms post, the
// cookies each vendor sets, the keys in localStorage. Boilerplate copied from
// a generator would describe a different site and would be worth nothing.
//
// Bahasa alongside English because /id is a paid landing page for Indonesian
// businesses: a privacy notice nobody can read is not notice, and the PDP Law
// is the reason this page exists at all for that market.
const CONTENT = {
  en: {
    path: '/privacy',
    lang: 'en',
    alt: { to: '/kebijakan-privasi', label: 'Baca dalam Bahasa Indonesia' },
    title: 'Privacy Policy — Splade Studio',
    description:
      'What Splade Studio collects, why, who it is shared with, and how to withdraw consent or have your data deleted.',
    heading: 'Privacy Policy',
    updated: `Last updated ${UPDATED}`,
    intro:
      'This site is run by Splade Studio, a brand of PT Pedang Bermata Dua. This page explains exactly what we collect, why, and what you can do about it. If anything here is unclear, email us and we will answer plainly.',
    sections: [
      {
        h: 'What we collect when you contact us',
        p: [
          'Our contact form asks for your name, business name, email address, WhatsApp number, the service you are interested in, and your project description. You choose what to put in it.',
          'Alongside that, the form sends which page you submitted from and, if you arrived from an ad, the campaign details carried in the link (utm_source, utm_medium, utm_campaign, utm_content, utm_term, and click identifiers such as fbclid). This is how we know which ad produced an enquiry. It is not used to build a profile of you.',
          'Submissions are delivered to us by Formspree, which passes them to our email inbox.',
        ],
      },
      {
        h: 'WhatsApp and booking links',
        p: [
          'Clicking a WhatsApp button opens a conversation in WhatsApp. Anything you send there is handled by WhatsApp under Meta’s privacy policy, not ours. We see the conversation as any recipient would.',
          'Booking a call opens Google Calendar’s appointment scheduling, which collects whatever you enter there under Google’s privacy policy.',
        ],
      },
      {
        h: 'Analytics and advertising cookies',
        p: [
          'Nothing tracks you until you accept. Until then Google Analytics runs in a cookieless mode that sends no identifiers, and the Meta Pixel is held in a revoked state and sends nothing at all.',
          'If you accept, we use Google Analytics 4 (cookies _ga and _ga_1WWG60NLN5) to measure how many people visit and which pages they use, and the Meta Pixel (cookie _fbp) to measure whether our ads work. We record three events: a page view, a form submission, and a click through to WhatsApp, each labelled with which of our pages it came from. We do not send your name, email, phone number, or message to either of them.',
          'If you decline, both stay off and no such cookies are written.',
        ],
      },
      {
        h: 'What we store in your browser',
        p: [
          'splade_consent holds your accept-or-decline choice, so we do not ask again on every page.',
          'splade_attribution holds the campaign details from the link you arrived on, for up to 90 days, so that if you contact us later we can still tell which ad brought you. It contains no personal details.',
          'Both live only in your browser. Clearing your browser data removes them.',
        ],
      },
      {
        h: 'Hosting',
        p: [
          'The site is served by Cloudflare, which processes request data including your IP address to deliver pages and protect against abuse. We do not keep our own server logs.',
        ],
      },
      {
        h: 'Who your data goes to',
        p: [
          'Formspree (form delivery), Google (Analytics, Calendar booking), Meta (Pixel, WhatsApp), and Cloudflare (hosting). Each processes data on its own terms and may store it outside your country, including in the United States. We do not sell your data, and we do not share it with anyone beyond the services listed here.',
        ],
      },
      {
        h: 'How long we keep it',
        p: [
          'Enquiries stay in our email for as long as we may need them for the working relationship, and we delete them on request. Analytics data follows each provider’s own retention settings. The browser storage above expires as described.',
        ],
      },
      {
        h: 'Your choices',
        p: [
          'You can withdraw consent at any time using the button below, which switches both analytics and advertising cookies off again and asks you afresh.',
          'You can ask us what we hold about you, ask for it to be corrected, or ask us to delete it. Email spladestudio@gmail.com and we will action it. Depending on where you live, you may also have the right to complain to a data protection authority.',
        ],
      },
      {
        h: 'Contact',
        p: [
          'Splade Studio, a brand of PT Pedang Bermata Dua. Email spladestudio@gmail.com.',
        ],
      },
    ],
    resetHeading: 'Cookie choice',
    resetBody: 'Withdraw your consent and choose again.',
    resetBtn: 'Change cookie choice',
  },

  id: {
    path: '/kebijakan-privasi',
    lang: 'id',
    alt: { to: '/privacy', label: 'Read in English' },
    title: 'Kebijakan Privasi — Splade Studio',
    description:
      'Apa yang Splade Studio kumpulkan, untuk apa, dibagikan ke siapa, dan cara menarik persetujuan atau menghapus data Anda.',
    heading: 'Kebijakan Privasi',
    updated: `Terakhir diperbarui ${UPDATED}`,
    intro:
      'Situs ini dikelola oleh Splade Studio, sebuah brand dari PT Pedang Bermata Dua. Halaman ini menjelaskan apa saja yang kami kumpulkan, untuk apa, dan apa yang bisa Anda lakukan. Kalau ada yang kurang jelas, email kami dan akan kami jawab apa adanya.',
    sections: [
      {
        h: 'Data yang kami kumpulkan saat Anda menghubungi kami',
        p: [
          'Formulir kontak kami menanyakan nama, nama bisnis, alamat email, nomor WhatsApp, layanan yang Anda minati, dan deskripsi proyek Anda. Anda sendiri yang menentukan isinya.',
          'Bersamaan dengan itu, formulir mengirimkan halaman tempat Anda mengisinya dan, jika Anda datang dari iklan, detail kampanye yang dibawa tautan tersebut (utm_source, utm_medium, utm_campaign, utm_content, utm_term, serta penanda klik seperti fbclid). Ini cara kami tahu iklan mana yang menghasilkan sebuah pertanyaan. Data ini tidak dipakai untuk menyusun profil tentang Anda.',
          'Kiriman formulir diteruskan kepada kami melalui Formspree, yang meneruskannya ke kotak masuk email kami.',
        ],
      },
      {
        h: 'Tautan WhatsApp dan pemesanan jadwal',
        p: [
          'Menekan tombol WhatsApp akan membuka percakapan di WhatsApp. Apa pun yang Anda kirim di sana ditangani oleh WhatsApp berdasarkan kebijakan privasi Meta, bukan kebijakan kami. Kami melihat percakapan itu sebagaimana penerima pesan pada umumnya.',
          'Memesan jadwal panggilan akan membuka penjadwalan Google Calendar, yang mengumpulkan data yang Anda isi di sana berdasarkan kebijakan privasi Google.',
        ],
      },
      {
        h: 'Cookie analitik dan periklanan',
        p: [
          'Tidak ada pelacakan sebelum Anda menyetujuinya. Sebelum itu, Google Analytics berjalan dalam mode tanpa cookie yang tidak mengirim penanda apa pun, dan Meta Pixel ditahan dalam keadaan dicabut sehingga tidak mengirim apa-apa.',
          'Jika Anda menyetujui, kami memakai Google Analytics 4 (cookie _ga dan _ga_1WWG60NLN5) untuk mengukur berapa banyak orang yang berkunjung dan halaman mana yang dibuka, serta Meta Pixel (cookie _fbp) untuk mengukur apakah iklan kami bekerja. Kami mencatat tiga peristiwa: kunjungan halaman, pengiriman formulir, dan klik menuju WhatsApp, masing-masing ditandai berasal dari halaman kami yang mana. Kami tidak mengirimkan nama, email, nomor telepon, atau isi pesan Anda ke keduanya.',
          'Jika Anda menolak, keduanya tetap mati dan cookie tersebut tidak ditulis.',
        ],
      },
      {
        h: 'Yang kami simpan di peramban Anda',
        p: [
          'splade_consent menyimpan pilihan setuju atau tolak Anda, supaya kami tidak bertanya lagi di setiap halaman.',
          'splade_attribution menyimpan detail kampanye dari tautan yang Anda klik, hingga 90 hari, supaya kalau Anda menghubungi kami di kemudian hari kami masih tahu iklan mana yang membawa Anda. Isinya tidak memuat data pribadi.',
          'Keduanya hanya tersimpan di peramban Anda. Menghapus data peramban akan menghapusnya.',
        ],
      },
      {
        h: 'Hosting',
        p: [
          'Situs ini dilayani oleh Cloudflare, yang memproses data permintaan termasuk alamat IP Anda untuk mengirimkan halaman dan melindungi dari penyalahgunaan. Kami tidak menyimpan log server sendiri.',
        ],
      },
      {
        h: 'Kepada siapa data Anda diteruskan',
        p: [
          'Formspree (pengiriman formulir), Google (Analytics, pemesanan Calendar), Meta (Pixel, WhatsApp), dan Cloudflare (hosting). Masing-masing memproses data berdasarkan ketentuannya sendiri dan dapat menyimpannya di luar negara Anda, termasuk di Amerika Serikat. Kami tidak menjual data Anda, dan tidak membagikannya ke pihak mana pun di luar layanan yang disebut di sini.',
        ],
      },
      {
        h: 'Berapa lama kami menyimpannya',
        p: [
          'Pertanyaan yang masuk tersimpan di email kami selama masih diperlukan untuk hubungan kerja, dan kami hapus bila diminta. Data analitik mengikuti pengaturan retensi masing-masing penyedia. Penyimpanan di peramban di atas kedaluwarsa sebagaimana dijelaskan.',
        ],
      },
      {
        h: 'Pilihan Anda',
        p: [
          'Anda dapat menarik persetujuan kapan saja lewat tombol di bawah, yang akan mematikan kembali cookie analitik dan periklanan lalu menanyakan ulang kepada Anda.',
          'Anda berhak menanyakan data apa yang kami simpan tentang Anda, meminta perbaikan, atau meminta penghapusan. Email ke spladestudio@gmail.com dan akan kami tindaklanjuti. Sesuai Undang-Undang Pelindungan Data Pribadi, Anda juga dapat menyampaikan keluhan kepada otoritas yang berwenang.',
        ],
      },
      {
        h: 'Kontak',
        p: [
          'Splade Studio, brand dari PT Pedang Bermata Dua. Email spladestudio@gmail.com.',
        ],
      },
    ],
    resetHeading: 'Pilihan cookie',
    resetBody: 'Tarik persetujuan Anda dan pilih ulang.',
    resetBtn: 'Ubah pilihan cookie',
  },
}

export default function Privacy({ lang = 'en' }) {
  const t = CONTENT[lang]

  return (
    <>
      <Seo title={t.title} description={t.description} path={t.path} lang={t.lang} />
      <article className="legal">
        <div className="legal__inner">
          <header className="legal__header">
            <h1 className="legal__title">{t.heading}</h1>
            <p className="legal__meta">{t.updated}</p>
            <Link className="legal__alt" to={t.alt.to}>{t.alt.label}</Link>
          </header>

          <p className="legal__lede">{t.intro}</p>

          {t.sections.map((s) => (
            <section key={s.h} className="legal__section">
              <h2 className="legal__h2">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="legal__p">{para}</p>
              ))}
            </section>
          ))}

          {/* The withdrawal control itself, not a description of one: consent
              that cannot be taken back as easily as it was given is not valid. */}
          <section className="legal__section legal__reset">
            <h2 className="legal__h2">{t.resetHeading}</h2>
            <p className="legal__p">{t.resetBody}</p>
            <button type="button" className="legal__btn" onClick={clearConsent}>
              {t.resetBtn}
            </button>
          </section>
        </div>
      </article>
    </>
  )
}
