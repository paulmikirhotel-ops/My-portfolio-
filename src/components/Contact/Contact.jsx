import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './Contact.css'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.79 1.07.79 2.16v3.2c0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
}

export default function Contact() {
  var r1 = useScrollReveal({}, 0)
  var r2 = useScrollReveal({}, 150)
  var r3 = useScrollReveal({}, 280)

  return (
    <section id="contact" className="contact">
      <div className="section-wrap contact__wrap">

        <div ref={r1} className="contact__header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Work <em>Together</em></h2>
          <div className="gold-divider" style={{ margin: '1.4rem auto 2rem' }} />
          <p className="contact__sub">
            Open to junior roles, internships, freelance projects, and exciting collaborations.
          </p>
        </div>

        <div ref={r2} className="contact__email-wrap">
          <a href="mailto:paulmikimensah@gmail.com" className="contact__email">
            paulmikimensah@gmail.com
          </a>
        </div>

        <div ref={r3} className="contact__socials">

          <a href="https://github.com/paulmikirhotel-ops" className="contact__social-link" target="_blank" rel="noopener noreferrer">
            <span className="contact__social-icon"><GitHubIcon /></span>
            <span className="contact__social-label">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/paul-miki-mensah-48120b3b5" className="contact__social-link" target="_blank" rel="noopener noreferrer">
            <span className="contact__social-icon"><LinkedInIcon /></span>
            <span className="contact__social-label">LinkedIn</span>
          </a>

          <a href="https://web.facebook.com/highest.boy" className="contact__social-link" target="_blank" rel="noopener noreferrer">
            <span className="contact__social-icon"><FacebookIcon /></span>
            <span className="contact__social-label">Facebook</span>
          </a>

          <a href="https://www.tiktok.com/@mikigee51" className="contact__social-link" target="_blank" rel="noopener noreferrer">
            <span className="contact__social-icon"><TikTokIcon /></span>
            <span className="contact__social-label">TikTok</span>
          </a>

        </div>

      </div>
    </section>
  )
}