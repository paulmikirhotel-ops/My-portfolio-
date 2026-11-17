import React from 'react'
import './Hero.css'

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// The 3D scene behind the hero is drawn by <SceneBackground /> (one shared
// WebGL canvas for the whole page), so this component is markup only.
export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <div className="hero__inner">
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            Available for opportunities
          </div>
          <h1 className="hero__name">
            Paul
            <span className="hero__name-l2"><em className="hero__name-accent">Miki</em></span>
            <span className="hero__name-l3">Mensah</span>
          </h1>
          <div className="hero__title-row">
            <div className="hero__title-line" />
            <p className="hero__title-text"><span>MERN-Stack</span> Developer</p>
          </div>
          <p className="hero__desc">
            Crafting full-stack digital experiences with MongoDB, Express,
            React &amp; Node clean architecture, elegant UI, real results.
          </p>
          <div className="hero__cta">
            <button className="btn btn-gold" onClick={() => scrollToId('projects')}>
              View Projects
            </button>
            <a className="btn btn-ghost" href="#contact">Contact Me</a>
          </div>
        </div>

        <div className="hero__photo-wrap">
          <div className="hero__photo-ring hero__photo-ring--outer" />
          <div className="hero__photo-ring hero__photo-ring--inner" />
          <div className="hero__photo-ring hero__photo-ring--spin" />
          <div className="hero__photo-frame">
            <img src="/paul.jpeg" alt="Paul Miki Mensah" className="hero__photo-img" />
            <div className="hero__photo-overlay" />
          </div>
          <div className="hero__photo-dot hero__photo-dot--tl" />
          <div className="hero__photo-dot hero__photo-dot--br" />
          <div className="hero__photo-label">Paul Miki Mensah</div>
        </div>
      </div>

      <div
        className="hero__scroll"
        role="button"
        tabIndex={0}
        aria-label="Scroll to the About section"
        onClick={() => scrollToId('about')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToId('about') } }}
      >
        <div className="hero__scroll-track" />
        <span className="hero__scroll-label">Scroll</span>
      </div>

      <div className="hero__badge" aria-hidden="true">
        <svg className="hero__badge-svg" viewBox="0 0 108 108">
          <circle cx="54" cy="54" r="48" fill="none" stroke="rgba(200,169,110,0.18)" strokeWidth="1"/>
          <path id="badge-arc" d="M 54,54 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none"/>
          <text fontFamily="'DM Mono',monospace" fontSize="7.2" letterSpacing="3" fill="currentColor" style={{color:'var(--accent)'}}>
            <textPath href="#badge-arc">MERN · STACK · DEVELOPER · 2026·</textPath>
          </text>
        </svg>
        <div className="hero__badge-center">PM</div>
      </div>
    </section>
  )
}
