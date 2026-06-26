'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { end: 40, suffix: 'M+', label: 'Accounts Created', desc: 'Humans who joined the open web with a single click' },
  { end: 2, suffix: 'B+', label: 'Transactions', desc: 'Executed on NEAR at near-zero cost and sub-second finality' },
  { end: 900, suffix: '+', label: 'Active Projects', desc: 'Teams worldwide who chose NEAR as their foundation' },
  { end: 100, suffix: 'K+', label: 'Developers', desc: 'Engineers redefining what the web can do' },
]

export function NumbersSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.n-line', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.n-card', { opacity: 0, y: 32 })
      gsap.set('.n-label', { opacity: 0, x: -14 })

      gsap.to('.n-label', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })

      gsap.to('.n-card', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.n-grid',
          start: 'top 78%',
        },
      })

      gsap.to('.n-line', {
        scaleX: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.n-grid',
          start: 'top 78%',
        },
      })

      // Count-up animations
      STATS.forEach((stat, i) => {
        const target = { value: 0 }
        const el = document.querySelector(`.n-count-${i}`)
        if (!el) return

        ScrollTrigger.create({
          trigger: `.n-card-${i}`,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(target, {
              value: stat.end,
              duration: 2,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = Math.round(target.value) + stat.suffix
              },
            })
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="numbers" className="section-pad bg-surface">
      <div className="max-w-site mx-auto site-px">
        <div className="n-label flex items-center gap-3 mb-16">
          <span className="w-6 h-[1px] bg-stone/40" />
          <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            03 / By the Numbers
          </span>
        </div>

        <div className="n-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`n-card n-card-${i} bg-surface p-8 lg:p-10 flex flex-col gap-6`}
            >
              <div>
                <div
                  className={`n-count-${i} font-mono font-medium text-fg`}
                  style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
                >
                  0{stat.suffix}
                </div>
                <div className="n-line mt-3 h-[2px] bg-accent w-12" />
              </div>

              <div>
                <div className="font-display font-bold text-fg text-sm tracking-tight mb-2">
                  {stat.label}
                </div>
                <p className="font-body text-stone text-sm leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center justify-end gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-stone tracking-widest uppercase">
            Live network data · Updated continuously
          </span>
        </div>
      </div>
    </section>
  )
}
