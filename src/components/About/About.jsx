import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './About.css'

export default function About() {
  const r1 = useScrollReveal({}, 0)
  const r2 = useScrollReveal({}, 100)
  const r3 = useScrollReveal({}, 180)
  const r4 = useScrollReveal({}, 260)

  return (
    <section id="about" className="about">
      <div className="section-wrap about__wrap">
        <div ref={r1}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Passionate about the web,<br/>obsessed with <em>quality</em></h2>
          <div className="gold-divider" />
        </div>

        <div className="about__grid">

          {/* ── PHOTO ── */}
          <div ref={r2} className="about__photo-wrap">
            <div className="about__photo-ring about__photo-ring--outer" />
            <div className="about__photo-ring about__photo-ring--inner" />
            <div className="about__photo-ring about__photo-ring--spin" />
            <div className="about__photo-frame">
              <img src="/paul.jpeg" alt="Paul Miki Mensah" className="about__photo-img" />
              <div className="about__photo-overlay" />
            </div>
            <div className="about__photo-dot about__photo-dot--tl" />
            <div className="about__photo-dot about__photo-dot--br" />
            {/* Floating tag */}
            <div className="about__photo-tag">
              <span className="about__photo-tag-dot" />
              Junior MERN Developer
            </div>
          </div>

          {/* ── TEXT + STATS ── */}
          <div className="about__right">
            <div ref={r3} className="about__text">
              <p>
                I'm <strong>Paul Miki Mensah</strong>, a Junior MERN Stack Developer
                with a deep passion for building full-stack web applications that are
                fast, accessible, and beautifully designed.
              </p>
              <p>
                I work across the entire stack  from designing RESTful APIs with
                <strong> Node.js &amp; Express</strong>, managing data with{' '}
                <strong>MongoDB</strong>, to crafting polished interfaces with{' '}
                <strong>React</strong>. I believe great software is born from
                clarity, craft, and care.
              </p>
              <div className="about__cta">
                <a className="btn btn-ghost" href="/paul-mensah-cv.pdf" download>Download CV</a>
              </div>
            </div>

            <div ref={r4} className="about__stats">
              {[
                ['1+',  'Year of Experience'],
                ['3+', 'Projects Built'],
                ['4',   'Core MERN Skills'],
                ['∞',   'Lines of Code'],
              ].map(([n, l]) => (
                <div key={l} className="about__stat-card">
                  <div className="about__stat-num">{n}</div>
                  <div className="about__stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
