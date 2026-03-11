import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './Skills.css'

const SKILLS = [
  { group: 'Frontend',  items: ['React', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { group: 'Backend',   items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { group: 'Database',  items: ['MongoDB', 'Mongoose', 'Atlas', 'Aggregation'] },
  { group: 'Tools',     items: ['Git & GitHub', 'VS Code', 'Postman', 'Figma', 'Vercel'] },
]

export default function Skills() {
  const r1 = useScrollReveal({}, 0)
  return (
    <section id="skills" className="skills">
      <div className="section-wrap">
        <div ref={r1}>
          <p className="section-label">Skills</p>
          <h2 className="section-title">Tools &amp; <em>Technologies</em></h2>
          <div className="gold-divider" />
        </div>
        <div className="skills__grid">
          {SKILLS.map(({ group, items }, gi) => (
            <SkillCard key={group} group={group} items={items} delay={gi * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, items, delay }) {
  const ref = useScrollReveal({}, delay)
  return (
    <div ref={ref} className="skills__card">
      <h3 className="skills__group">{group}</h3>
      <div className="skills__tags">
        {items.map(item => <span key={item} className="skills__tag">{item}</span>)}
      </div>
    </div>
  )
}
