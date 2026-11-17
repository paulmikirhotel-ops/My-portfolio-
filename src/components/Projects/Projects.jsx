import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './Projects.css'

// status: 'live' (deployed, link works) | 'dev' (still being built)
// Add `code: 'https://github.com/...'` to any project to show a GitHub link.
const PROJECTS = [
  {
    num: '01',
    status: 'live',
    title: 'Community Treasury',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    desc: 'Multi-tenant finance and expenditure management for community organizations: role-based purchase approvals, delegate treasurers, audit logs, and monthly and annual reports with PDF export.',
    live: 'https://communitytreasury.netlify.app',
  },
  {
    num: '02',
    status: 'live',
    title: 'LifeOS',
    tags: ['Web App'],
    desc: 'A personal digital life manager: one place to organise your day-to-day life.',
    live: 'https://lifepilot-os.netlify.app',
  },
  {
    num: '03',
    status: 'live',
    title: "Saint Joseph's Catholic Hospital Portal",
    tags: ['React', 'Redux', 'Express', 'Cloudinary'],
    desc: "Public website and portal for Saint Joseph's Catholic Hospital, with animated themes, mobile-first layouts and Cloudinary-backed image and document uploads.",
    live: 'https://sjchliberia.vercel.app/',
    code: 'https://github.com/paulmikirhotel-ops/hospital-web-app-full-Stack',
  },
  {
    num: '04',
    status: 'dev',
    title: "Kadi's Kitchen",
    tags: ['Restaurant App'],
    desc: 'A restaurant app currently in development.',
  },
  {
    num: '05',
    status: 'dev',
    title: 'Liberia Marketplace',
    tags: ['MERN', 'E-commerce'],
    desc: 'A multi-role e-commerce platform for buyers and sellers in Liberia, with a spin-wheel rewards feature.',
  },
  {
    num: '06',
    status: 'dev',
    title: 'Stories & Business Platform',
    tags: ['MERN', 'Role-based'],
    desc: 'A publishing platform with blogs, stories, creator and business accounts, follows, notifications and admin dashboards.',
  },
]

const GROUPS = [
  { status: 'live', label: 'Live' },
  { status: 'dev',  label: 'In development' },
]

const STATUS_LABEL = { live: 'Live', dev: 'In development' }

function ProjectCard({ project, index }) {
  const ref = useScrollReveal({}, index * 120)

  return (
    <article ref={ref} className="project-card">
      <div className="project-card__thumb">
        <div className="project-card__thumb-pattern" />
        <span className={`project-card__status project-card__status--${project.status}`}>
          <span className="project-card__status-dot" />
          {STATUS_LABEL[project.status]}
        </span>
        <div className="project-card__num" aria-hidden="true">{project.num}</div>
      </div>
      <div className="project-card__body">
        <div className="project-card__tags">
          {project.tags.map(t => (
            <span key={t} className="project-card__tag">{t}</span>
          ))}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__links">
          {project.live && (
            <a href={project.live} className="project-card__link" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          {project.code && (
            <a href={project.code} className="project-card__link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {!project.live && !project.code && (
            <span className="project-card__soon">Coming soon</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const r1 = useScrollReveal({}, 0)

  return (
    <section id="projects" className="projects">
      <div className="section-wrap">
        <div ref={r1}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            Selected <em>Work</em>
          </h2>
          <div className="gold-divider" />
        </div>

        {GROUPS.map(({ status, label }) => (
          <div key={status} className="projects__group">
            <h3 className="projects__group-label">{label}</h3>
            <div className="projects__grid">
              {PROJECTS.filter(p => p.status === status).map(p => (
                <ProjectCard key={p.num} project={p} index={Number(p.num) - 1} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
