'use client'
import { useEffect, useRef } from 'react'

const SPACING = 36
const INFLUENCE = 130
const DISPLACE = 28

export function DotGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
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

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMove)

    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '')
      return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)]
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const m = mouseRef.current
      const [r, g, b] = hexToRgb(colorRef.current)
      const cols = Math.ceil(canvas.width / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const hx = col * SPACING - SPACING / 2
          const hy = row * SPACING - SPACING / 2
          const dx = hx - m.x
          const dy = hy - m.y
          const d = Math.sqrt(dx * dx + dy * dy)
          let drawX = hx; let drawY = hy; let opacity = 0.18

          if (d < INFLUENCE && d > 0) {
            const f = 1 - d / INFLUENCE
            drawX += (dx / d) * f * DISPLACE
            drawY += (dy / d) * f * DISPLACE
            opacity = 0.18 + f * 0.65
          }

          ctx.beginPath()
          ctx.arc(drawX, drawY, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
          ctx.fill()
        }
      }

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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
