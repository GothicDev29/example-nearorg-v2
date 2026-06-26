'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

const N = 90
const MAX_DIST = 130

export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const raf = useRef<number>(0)
  const colorRef = useRef('#C6F135')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const syncColor = () => {
      colorRef.current = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#C6F135'
    }
    syncColor()

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      syncColor()
    }
    resize()
    window.addEventListener('resize', resize)

    particles.current = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.45 + 0.25,
    }))

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMove)

    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '')
      return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
      ]
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const p = particles.current
      const m = mouseRef.current
      const [r, g, b] = hexToRgb(colorRef.current)

      p.forEach(pt => {
        const dx = pt.x - m.x
        const dy = pt.y - m.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 110 && d > 0) {
          const f = (110 - d) / 110
          pt.vx += (dx / d) * f * 0.9
          pt.vy += (dy / d) * f * 0.9
        }
        const speed = Math.sqrt(pt.vx * pt.vx + pt.vy * pt.vy)
        if (speed > 1.8) { pt.vx = (pt.vx / speed) * 1.8; pt.vy = (pt.vy / speed) * 1.8 }
        pt.vx *= 0.985; pt.vy *= 0.985
        pt.x += pt.vx; pt.y += pt.vy
        if (pt.x < 0) { pt.x = 0; pt.vx *= -1 }
        if (pt.x > canvas.width) { pt.x = canvas.width; pt.vx *= -1 }
        if (pt.y < 0) { pt.y = 0; pt.vy *= -1 }
        if (pt.y > canvas.height) { pt.y = canvas.height; pt.vy *= -1 }
      })

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x
          const dy = p[i].y - p[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
            ctx.lineWidth = 0.6
            ctx.moveTo(p[i].x, p[i].y)
            ctx.lineTo(p[j].x, p[j].y)
            ctx.stroke()
          }
        }
      }

      p.forEach(pt => {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${pt.opacity})`
        ctx.fill()
      })

      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    const obs = new MutationObserver(syncColor)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.55 }}
    />
  )
}
