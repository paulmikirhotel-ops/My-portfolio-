import React, { useState, useEffect } from 'react'
import './Navbar.css'

const LINKS = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      LINKS.forEach(l => {
        const s = document.getElementById(l.toLowerCase())
        if (!s) return
        const r = s.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) setActive(l.toLowerCase())
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className="navbar__logo" href="#hero">
        <span className="navbar__logo-accent">PM</span>Mensah
      </a>
      <ul className="navbar__links">
        {LINKS.map(l => (
          <li key={l}>
            <button
              className={`navbar__link ${active === l.toLowerCase() ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo(l.toLowerCase())}
            >{l}</button>
          </li>
        ))}
        <li><span className="navbar__dot" /></li>
      </ul>
      <button className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
        onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        {LINKS.map(l => (
          <button key={l} className="navbar__drawer-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
        ))}
      </div>
    </nav>
  )
}
