'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function MouseGradient({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return
      gsap.to(el, {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)',
        filter: 'blur(80px)',
        opacity: 0.07,
        transform: 'translate(-50%, -50%)',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  )
}
