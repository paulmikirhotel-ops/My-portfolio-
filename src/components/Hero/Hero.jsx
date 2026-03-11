import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isBlue  = theme === 'blue'
    const C_MAIN  = isBlue ? 0x00d2ff : 0xc8a96e
    const C_ACC   = isBlue ? 0x38e8ff : 0xe8c97e
    const C_BG    = isBlue ? 0x050d18 : 0x080808
    const C_EMIT  = isBlue ? 0x001a2e  : 0x1a1005
    const C_LIGHT1= isBlue ? 0x00d2ff : 0xc8a96e
    const C_LIGHT2= isBlue ? 0x0066ff : 0xe8c97e

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(C_BG, 1)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 5)

    const MAIN = new THREE.Color(C_MAIN)
    const ACC  = new THREE.Color(C_ACC)

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.08, 0.3, 200, 20, 2, 3),
      new THREE.MeshStandardMaterial({
        color: MAIN, metalness: 0.96, roughness: 0.1,
        emissive: new THREE.Color(C_EMIT), emissiveIntensity: 0.25
      })
    )
    knot.position.set(3.0, -0.1, 0)
    scene.add(knot)

    const knotWire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.08, 0.3, 60, 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.07 })
    )
    knotWire.position.copy(knot.position)
    scene.add(knotWire)

    const mkRing = (r, op, rx, ry) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.011, 16, 140),
        new THREE.MeshBasicMaterial({ color: C_MAIN, transparent: true, opacity: op })
      )
      m.position.copy(knot.position); m.rotation.x = rx; m.rotation.y = ry
      scene.add(m); return m
    }
    const ring1 = mkRing(1.9, 0.22, Math.PI*0.35, 0)
    const ring2 = mkRing(2.45, 0.10, Math.PI*0.5, Math.PI*0.22)

    const N = 1800, pPos = new Float32Array(N*3)
    for (let i=0;i<N;i++) {
      pPos[i*3]  =(Math.random()-0.5)*26
      pPos[i*3+1]=(Math.random()-0.5)*16
      pPos[i*3+2]=(Math.random()-0.5)*10-2
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pPos,3))
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({
      color: C_MAIN, size: 0.028, transparent: true, opacity: 0.45, sizeAttenuation: true
    })))

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5,0),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.9, roughness: 0.18 })
    )
    ico.position.set(-3.4,1.7,-0.8); scene.add(ico)
    const icoW = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5,0),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.28 })
    )
    icoW.position.copy(ico.position); scene.add(icoW)

    const octo = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34,0),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.95, roughness: 0.08 })
    )
    octo.position.set(5.6,2.0,-0.4); scene.add(octo)

    scene.add(new THREE.AmbientLight(0xffffff, 0.12))
    const pl1 = new THREE.PointLight(C_LIGHT1, 4.5, 12); pl1.position.set(2,2,3); scene.add(pl1)
    const pl2 = new THREE.PointLight(C_LIGHT2, 2.2, 10); pl2.position.set(-2,-1,2); scene.add(pl2)
    const dl  = new THREE.DirectionalLight(0xffffff, 0.5); dl.position.set(-5,3,2); scene.add(dl)

    const clock = new THREE.Clock(); let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const { x, y } = mouseRef.current
      knot.rotation.x = t*0.18+y*0.28; knot.rotation.y = t*0.22+x*0.28
      knotWire.rotation.copy(knot.rotation)
      ring1.rotation.z = t*0.10; ring2.rotation.z = -t*0.07
      ico.rotation.x = t*0.28; ico.rotation.y = t*0.38; icoW.rotation.copy(ico.rotation)
      ico.position.y = 1.7+Math.sin(t*0.65)*0.18; icoW.position.y = ico.position.y
      octo.rotation.x = t*0.42; octo.rotation.y = t*0.32; octo.position.y = 2.0+Math.cos(t*0.5)*0.22
      pl1.intensity = 4.0+Math.sin(t*1.1)*0.8; pl2.intensity = 2.0+Math.cos(t*0.85)*0.5
      camera.position.x = x*0.35; camera.position.y = -y*0.22; camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth/window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [theme])

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
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
            <button className="btn btn-gold" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </button>
            <a className="btn btn-ghost" href="/paul-mensah-cv.pdf" download>Download CV</a>
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

      <div className="hero__scroll" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="hero__scroll-track" />
        <span className="hero__scroll-label">Scroll</span>
      </div>

      <div className="hero__badge">
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
