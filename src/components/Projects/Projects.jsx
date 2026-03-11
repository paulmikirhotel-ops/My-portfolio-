import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './Projects.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Task Manager App',
    tags: ['React', 'Node.js', 'MongoDB'],
    desc: 'Full-stack task management with auth, real-time updates, and drag-and-drop interface.',
    live: 'https://mikis-task-app.onrender.com',
    code: 'https://github.com/paulmikirhotel-ops/task-app-frontend',
  },
  {
    num: '02',
    title: 'Hospital Site API',
    tags: ['Express', 'MongoDB', 'JWT'],
    desc: 'RESTful API for a hospital platform — patient records, appointments, and secure JWT auth.',
    live: 'https://hospital-web-app-8slq.onrender.com',
    code: 'https://github.com/paulmikirhotel-ops/hospital-web-app-full-Stack',
  },
  {
    num: '03',
    title: 'Portfolio Site',
    tags: ['React', 'Three.js', 'CSS'],
    desc: 'This very portfolio — built with React and Three.js featuring 3D animations and dark luxury design.',
    live: 'https://paul-mensah-dev-portfolio.onrender.com',
    code: 'https://github.com/paulmikirhotel-ops/My-portfolio-',
  },
]

function ProjectCard({ project, index }) {
  const ref = useScrollReveal({}, index * 120)

  return (
    <div ref={ref} className="project-card">
      <div className="project-card__thumb">
        <div className="project-card__thumb-pattern" />
        <div className="project-card__num">{project.num}</div>
      </div>
      <div className="project-card__body">
        <div className="project-card__tags">
          {project.tags.map(function(t) {
            return (
              <span key={t} className="project-card__tag">
                {t}
              </span>
            )
          })}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__links">
          {project.live !== '' && (
            <a href={project.live} className="project-card__link" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          <a href={project.code} className="project-card__link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
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
        <div className="projects__grid">
          {PROJECTS.map(function(p, i) {
            return <ProjectCard key={p.num} project={p} index={i} />
          })}
        </div>
      </div>
    </section>
  )
}