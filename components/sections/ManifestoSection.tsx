'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const QUOTE =
  'Every transaction on NEAR is invisible. That is the point. Technology should disappear. People should not have to know what a blockchain is to benefit from one. The open web belongs to everyone.'

const words = QUOTE.split(' ')

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wordEls = gsap.utils.toArray<HTMLSpanElement>('.m-word')

      gsap.set(wordEls, { opacity: 0.12 })

      const tl = gsap.timeline()
      tl.to(wordEls, {
        opacity: 1,
        duration: 0.08,
        stagger: 0.04,
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=220%',
        pin: stickyRef.current,
        scrub: 0.9,
        animation: tl,
      })

      // Attribution line
      gsap.fromTo(
        '.m-attr',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top+=180% top',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Section label
      gsap.fromTo(
        '.m-label',
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} id="mission" style={{ height: '320vh' }}>
      <div
        ref={stickyRef}
        className="h-screen flex flex-col justify-center overflow-hidden relative"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {/* Cross-grid decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.4,
          }}
        />

        <div className="relative z-10 max-w-site mx-auto site-px w-full">
          <div className="m-label flex items-center gap-3 mb-12">
            <span className="w-6 h-[1px] bg-stone/40" />
            <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
              02 / Our Manifesto
            </span>
          </div>

          <blockquote
            className="font-display font-bold leading-[1.05] tracking-tight text-fg"
            style={{ fontSize: 'clamp(28px, 4.2vw, 64px)' }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="m-word inline-block"
                style={{ marginRight: '0.25em', willChange: 'opacity' }}
              >
                {word}
              </span>
            ))}
          </blockquote>

          <p className="m-attr font-mono text-xs text-stone tracking-widest uppercase mt-10 ml-1">
            — NEAR Protocol Vision Document, 2025
          </p>
        </div>

        {/* Section counter */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <span className="font-mono text-[10px] text-stone/40 tracking-widest">02 / 08</span>
        </div>
      </div>
    </div>
  )
}
