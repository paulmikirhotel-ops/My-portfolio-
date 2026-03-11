import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}, delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity   = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = `opacity 0.75s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}ms cubic-bezier(0.16,1,0.3,1)`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.unobserve(el)
      }
    }, { threshold: 0.12, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return ref
}
