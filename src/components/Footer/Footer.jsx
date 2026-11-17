import React from 'react'
import './Footer.css'

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── LOGO + AVAILABILITY ── */}
        <div className="footer__brand">
          <a href="#hero" className="footer__logo" onClick={backToTop}>
            <span className="footer__logo-accent">PM</span>Mensah
          </a>
          <div className="footer__badge">
            <span className="footer__badge-dot" />
            Available for opportunities
          </div>
        </div>

        <div className="footer__divider" />

        {/* ── NAV + SOCIALS ── */}
        <div className="footer__mid">
          <nav className="footer__nav">
            {['about','skills','projects','contact'].map(id => (
              <button key={id} className="footer__nav-link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="footer__socials">
            {[
              { label: 'GitHub',   href: 'https://github.com/paulmikirhotel-ops' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/paul-miki-mensah-48120b3b5' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="footer__social" target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__divider" />

        {/* ── BOTTOM ROW ── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} <span>Paul Miki Mensah</span>. All rights reserved.
          </p>
          <p className="footer__made">
            Designed &amp; built with <span className="footer__heart">♥</span> using React &amp; Three.js
          </p>
          <button className="footer__top-btn" onClick={backToTop} aria-label="Back to top">
            <span className="footer__top-arrow">↑</span>
            <span className="footer__top-label">Top</span>
          </button>
        </div>

      </div>
    </footer>
  )
}