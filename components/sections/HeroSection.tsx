'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin()

const HEADLINE_WORDS = ['The', 'internet,', 'closer', 'than', 'ever.']
const STATS = [
  { value: '40M+', label: 'Accounts' },
  { value: '2B+', label: 'Transactions' },
  { value: '900+', label: 'Projects' },
]

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.h-word > span', { y: '115%' })
      gsap.set('.h-sub', { opacity: 0, y: 28 })
      gsap.set('.h-stat', { opacity: 0, y: 18 })
      gsap.set('.h-cta', { opacity: 0, y: 18 })
      gsap.set('.h-scroll', { opacity: 0 })
      gsap.set('.h-orb', { scale: 0, opacity: 0 })
      gsap.set('.h-label', { opacity: 0, x: -12 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.to('.h-orb', {
        scale: 1,
        opacity: 1,
        duration: 2,
        stagger: 0.2,
        ease: 'power3.out',
      })
        .to('.h-label', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=1.6')
        .to(
          '.h-word > span',
          { y: '0%', duration: 0.9, stagger: 0.08, ease: 'power4.out' },
          '-=1.5'
        )
        .to('.h-sub', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.45')
        .to(
          '.h-stat',
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power3.out' },
          '-=0.4'
        )
        .to('.h-cta', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
        .to('.h-scroll', { opacity: 1, duration: 0.4 }, '-=0.1')

      // Slow orb floats
      gsap.to('.h-orb-1', { y: -35, x: 18, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.h-orb-2', { y: 28, x: -22, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
      gsap.to('.h-orb-3', { y: -22, x: 14, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })

      // Scroll arrow bounce
      gsap.to('.h-scroll-arr', {
        y: 8,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage:
            'radial-gradient(ellipse 85% 75% at 50% 45%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 45%, black 20%, transparent 75%)',
          opacity: 0.5,
        }}
      />

      {/* Ambient orbs */}
      <div
        className="h-orb h-orb-1 absolute top-[15%] right-[12%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)',
          filter: 'blur(90px)',
          opacity: 0,
        }}
      />
      <div
        className="h-orb h-orb-2 absolute bottom-[15%] left-[8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--rust) 0%, transparent 65%)',
          filter: 'blur(110px)',
          opacity: 0,
        }}
      />
      <div
        className="h-orb h-orb-3 absolute top-[55%] left-[45%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-pop) 0%, transparent 65%)',
          filter: 'blur(130px)',
          opacity: 0,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-site mx-auto site-px pt-36 pb-24 w-full">
        {/* Eyebrow label */}
        <div className="h-label mb-10 flex items-center gap-3">
          <span className="w-6 h-[1px] bg-accent" />
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            Near Protocol — Open Web
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-tighter text-fg mb-10"
          style={{ fontSize: 'clamp(60px, 9.5vw, 148px)' }}
          aria-label={HEADLINE_WORDS.join(' ')}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className="h-word inline-block overflow-hidden align-bottom"
              style={{ marginRight: i < HEADLINE_WORDS.length - 1 ? '0.18em' : 0 }}
              aria-hidden
            >
              <span className="inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="h-sub max-w-2xl font-body text-stone leading-relaxed mb-14"
          style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
        >
          NEAR is the chain abstraction layer that makes Web3 invisible to users
          and unstoppable for builders. One account. Every chain. Zero friction.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-end gap-10 mb-14">
          {STATS.map((s) => (
            <div key={s.value} className="h-stat">
              <div className="font-mono font-medium text-fg" style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}>
                {s.value}
              </div>
              <div className="font-mono text-[11px] text-stone tracking-[0.18em] uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#products"
            className="h-cta inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-display font-bold text-sm tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200"
          >
            Start Building
          </a>
          <a
            href="#mission"
            className="h-cta inline-flex items-center gap-2 px-8 py-4 border border-border text-fg font-mono text-xs tracking-widest uppercase hover:border-accent hover:text-accent transition-colors duration-200 rounded-sm"
          >
            Our Mission
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="h-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] text-stone tracking-[0.22em] uppercase">Scroll</span>
        <div className="h-scroll-arr relative w-[1px] h-10 overflow-hidden bg-border">
          <div className="absolute inset-0 bg-accent animate-scroll-line" />
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <span className="font-mono text-[10px] text-stone/40 tracking-widest">01 / 08</span>
      </div>
    </section>
  )
}
