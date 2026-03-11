import { useEffect, useRef, useState } from 'react'

export default function useMouseParallax(lerp = 0.06) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const target  = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    document.addEventListener('mousemove', onMove)
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp
      setPos({ x: current.current.x, y: current.current.y })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [lerp])
  return pos
}
