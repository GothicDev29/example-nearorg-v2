'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MagneticButton } from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const CTA_WORDS_1 = ['Build', 'what']
const CTA_WORDS_2 = ["you've", 'been', 'afraid', 'to.']

export function CTASection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.c-word > span', { y: '110%' })
      gsap.set('.c-label', { opacity: 0, x: -14 })
      gsap.set('.c-sub', { opacity: 0, y: 20 })
      gsap.set('.c-actions', { opacity: 0, y: 20 })
      gsap.set('.c-bg-orb', { scale: 0, opacity: 0 })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        onEnter: () => {
          const tl = gsap.timeline()

          tl.to('.c-bg-orb', { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' })
            .to('.c-label', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=1.2')
            .to(
              '.c-word > span',
              { y: '0%', duration: 0.85, stagger: 0.06, ease: 'power4.out' },
              '-=1'
            )
            .to('.c-sub', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
            .to('.c-actions', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
        },
      })

      // Ambient orb motion
      gsap.to('.c-bg-orb-1', { x: 30, y: -25, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.c-bg-orb-2', { x: -25, y: 30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="cta"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Ambient orbs */}
      <div
        className="c-bg-orb c-bg-orb-1 absolute top-[10%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
          filter: 'blur(120px)',
          opacity: 0,
        }}
      />
      <div
        className="c-bg-orb c-bg-orb-2 absolute bottom-[5%] left-[2%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--rust) 0%, transparent 60%)',
          filter: 'blur(140px)',
          opacity: 0,
        }}
      />

      {/* Diagonal lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 60px)',
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 max-w-site mx-auto site-px w-full">
        <div className="c-label flex items-center gap-3 mb-10">
          <span className="w-6 h-[1px] bg-stone/40" />
          <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            08 / Join Us
          </span>
        </div>

        <h2
          className="font-display font-extrabold text-fg leading-[0.88] tracking-tighter mb-10"
          style={{ fontSize: 'clamp(56px, 9vw, 148px)' }}
          aria-label="Build what you've been afraid to."
        >
          <div className="block">
            {CTA_WORDS_1.map((word, i) => (
              <span
                key={i}
                className="c-word inline-block overflow-hidden align-bottom"
                style={{ marginRight: '0.2em' }}
                aria-hidden
              >
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </div>
          <div className="block">
            {CTA_WORDS_2.map((word, i) => (
              <span
                key={i}
                className={`c-word inline-block overflow-hidden align-bottom ${word === 'been' || word.startsWith('afraid') ? 'text-accent' : ''}`}
                style={{ marginRight: '0.2em' }}
                aria-hidden
              >
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </div>
        </h2>

        <p className="c-sub max-w-xl font-body text-stone leading-relaxed mb-12"
          style={{ fontSize: 'clamp(17px, 1.4vw, 21px)' }}>
          No fees for the first year. No permission required. Just a vision and a keyboard.
          The open web is waiting.
        </p>

        <div className="c-actions flex flex-wrap items-center gap-5">
          <MagneticButton
            className="relative px-10 py-5 bg-accent text-bg font-display font-bold text-sm tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200 overflow-hidden group"
          >
            <span className="relative z-10">Start Building →</span>
          </MagneticButton>

          <a
            href="#"
            className="inline-flex items-center gap-2 font-mono text-xs text-stone tracking-widest uppercase hover:text-fg transition-colors duration-200 group"
          >
            <span>Read the Docs</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Bottom grid — social links */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-stone tracking-widest uppercase">
            NEAR Protocol © 2025
          </div>
          <div className="flex items-center gap-6">
            {['Twitter / X', 'GitHub', 'Discord', 'Docs'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-[11px] text-stone hover:text-accent transition-colors duration-200 tracking-widest uppercase"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
