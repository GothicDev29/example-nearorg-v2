'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'var(--accent)', duration: 0.25 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(198,241,53,0.4)', duration: 0.25 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    addLinkListeners()
    const obs = new MutationObserver(addLinkListeners)
    obs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [visible])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          width: 6,
          height: 6,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 32,
          height: 32,
          border: '1px solid rgba(198,241,53,0.4)',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
