// src/components/SceneBackground/SceneBackground.jsx
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import './SceneBackground.css'

export default function SceneBackground() {
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

    // ── HERO zone objects (center screen) ──
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

    // ── Floating particles (full page) ──
    const N = 2400, pPos = new Float32Array(N*3)
    for (let i = 0; i < N; i++) {
      pPos[i*3]   = (Math.random()-0.5) * 28
      pPos[i*3+1] = (Math.random()-0.5) * 40   // tall — spans all sections
      pPos[i*3+2] = (Math.random()-0.5) * 10 - 2
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({
      color: C_MAIN, size: 0.028, transparent: true, opacity: 0.45, sizeAttenuation: true
    })))

    // ── HERO zone: icosahedron (top-left) ──
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.9, roughness: 0.18 })
    )
    ico.position.set(-3.4, 1.7, -0.8); scene.add(ico)
    const icoW = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.28 })
    )
    icoW.position.copy(ico.position); scene.add(icoW)

    // ── HERO zone: octahedron (top-right) ──
    const octo = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.95, roughness: 0.08 })
    )
    octo.position.set(5.6, 2.0, -0.4); scene.add(octo)

    // ── ABOUT zone: tetrahedron left + dodecahedron right ──
    const tetra = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.45, 0),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.92, roughness: 0.12 })
    )
    tetra.position.set(-4.5, -3.5, -0.6); scene.add(tetra)
    const tetraW = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.45, 0),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.22 })
    )
    tetraW.position.copy(tetra.position); scene.add(tetraW)

    const dodec = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.38, 0),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.88, roughness: 0.15 })
    )
    dodec.position.set(4.8, -4.2, -0.5); scene.add(dodec)

    // ── SKILLS zone: torus left + icosahedron right ──
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.18, 16, 60),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.94, roughness: 0.1 })
    )
    torus2.position.set(-4.8, -8.0, -0.4); scene.add(torus2)

    const ico2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 0),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.9, roughness: 0.18 })
    )
    ico2.position.set(5.2, -7.5, -0.6); scene.add(ico2)
    const ico2W = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 0),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.25 })
    )
    ico2W.position.copy(ico2.position); scene.add(ico2W)

    // ── PROJECTS zone: octahedron left + knot-ring right ──
    const octo2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.40, 0),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.95, roughness: 0.08 })
    )
    octo2.position.set(-5.0, -12.5, -0.5); scene.add(octo2)

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.012, 16, 120),
      new THREE.MeshBasicMaterial({ color: C_MAIN, transparent: true, opacity: 0.18 })
    )
    ring3.position.set(4.5, -13.0, -0.8); ring3.rotation.x = Math.PI * 0.4; scene.add(ring3)

    // ── CONTACT zone: dodecahedron left + tetra right ──
    const dodec2 = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.42, 0),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.88, roughness: 0.15 })
    )
    dodec2.position.set(-4.2, -17.5, -0.5); scene.add(dodec2)

    const tetra2 = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.38, 0),
      new THREE.MeshStandardMaterial({ color: MAIN, metalness: 0.92, roughness: 0.12 })
    )
    tetra2.position.set(5.0, -18.0, -0.4); scene.add(tetra2)
    const tetra2W = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.38, 0),
      new THREE.MeshBasicMaterial({ color: C_MAIN, wireframe: true, transparent: true, opacity: 0.2 })
    )
    tetra2W.position.copy(tetra2.position); scene.add(tetra2W)

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.12))
    const pl1 = new THREE.PointLight(C_LIGHT1, 4.5, 12); pl1.position.set(2, 2, 3); scene.add(pl1)
    const pl2 = new THREE.PointLight(C_LIGHT2, 2.2, 10); pl2.position.set(-2, -1, 2); scene.add(pl2)
    const dl  = new THREE.DirectionalLight(0xffffff, 0.5); dl.position.set(-5, 3, 2); scene.add(dl)

    const clock = new THREE.Clock(); let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const { x, y } = mouseRef.current

      // Scroll offset — camera follows page scroll
      const scrollY = window.scrollY / window.innerHeight
      camera.position.y = -scrollY * 5.5 + (-y * 0.22)
      camera.position.x = x * 0.35
      camera.lookAt(new THREE.Vector3(camera.position.x * 0.1, camera.position.y, 0))

      knot.rotation.x = t*0.18 + y*0.28; knot.rotation.y = t*0.22 + x*0.28
      knotWire.rotation.copy(knot.rotation)
      ring1.rotation.z = t*0.10; ring2.rotation.z = -t*0.07
      ico.rotation.x = t*0.28; ico.rotation.y = t*0.38; icoW.rotation.copy(ico.rotation)
      ico.position.y = 1.7 + Math.sin(t*0.65)*0.18; icoW.position.y = ico.position.y
      octo.rotation.x = t*0.42; octo.rotation.y = t*0.32
      octo.position.y = 2.0 + Math.cos(t*0.5)*0.22

      tetra.rotation.x = t*0.3; tetra.rotation.y = t*0.2; tetraW.rotation.copy(tetra.rotation)
      tetra.position.y = -3.5 + Math.sin(t*0.6)*0.2; tetraW.position.y = tetra.position.y
      dodec.rotation.x = t*0.25; dodec.rotation.y = t*0.35
      dodec.position.y = -4.2 + Math.cos(t*0.7)*0.18

      torus2.rotation.x = t*0.2; torus2.rotation.y = t*0.15
      torus2.position.y = -8.0 + Math.sin(t*0.55)*0.22
      ico2.rotation.x = t*0.32; ico2.rotation.y = t*0.28; ico2W.rotation.copy(ico2.rotation)
      ico2.position.y = -7.5 + Math.cos(t*0.6)*0.2; ico2W.position.y = ico2.position.y

      octo2.rotation.x = t*0.38; octo2.rotation.y = t*0.28
      octo2.position.y = -12.5 + Math.sin(t*0.5)*0.22
      ring3.rotation.z = t*0.12; ring3.rotation.x = Math.PI*0.4 + Math.sin(t*0.3)*0.1

      dodec2.rotation.x = t*0.22; dodec2.rotation.y = t*0.3
      dodec2.position.y = -17.5 + Math.sin(t*0.65)*0.2
      tetra2.rotation.x = t*0.35; tetra2.rotation.y = t*0.25; tetra2W.rotation.copy(tetra2.rotation)
      tetra2.position.y = -18.0 + Math.cos(t*0.55)*0.18; tetra2W.position.y = tetra2.position.y

      pl1.intensity = 4.0 + Math.sin(t*1.1)*0.8
      pl2.intensity = 2.0 + Math.cos(t*0.85)*0.5

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
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

  return <canvas ref={canvasRef} className="scene-bg" />
}