'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

gsap.registerPlugin()

const SHOWCASES = [
  {
    num: '01',
    title: 'Homepage',
    sections: '8 sections',
    desc: 'Landing page con scroll-pinned manifesto, SVG de sharding animado, contador de stats y botón magnético.',
    tags: ['ScrollTrigger', 'SVG', 'Magnetic'],
    href: '/showcase/page-1',
    gradient: 'linear-gradient(135deg, #7CB518 0%, #C6F135 100%)',
  },
  {
    num: '02',
    title: 'Ecosystem',
    sections: '11 sections',
    desc: 'Página interior con campo de partículas canvas, lista animada de categorías, marquee de partners y stat tipográfico.',
    tags: ['Canvas', 'Particles', 'Marquee'],
    href: '/showcase/page-2',
    gradient: 'linear-gradient(135deg, #C6F135 0%, #D4561E 100%)',
  },
  {
    num: '03',
    title: 'Blog',
    sections: '11 sections',
    desc: 'The Open Web Journal. Grid de puntos interactivo, artículos con reveal escalonado y newsletter animado.',
    tags: ['DotGrid', 'GSAP', 'Canvas'],
    href: '/showcase/page-3',
    gradient: 'linear-gradient(135deg, #D4561E 0%, #7CB518 100%)',
  },
  {
    num: '04',
    title: 'Blog Post',
    sections: 'Article',
    desc: 'Post single con barra de lectura en tiempo real, pull quotes parallax y bloques de código estilizados.',
    tags: ['Progress Bar', 'Parallax', 'Pull Quote'],
    href: '/showcase/page-4',
    gradient: 'linear-gradient(135deg, #1a1a17 0%, #C6F135 100%)',
  },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set('.home-title span', { y: '115%' })
      gsap.set(['.home-sub', '.home-meta'], { opacity: 0, y: 18 })
      gsap.set('.home-card', { opacity: 0, y: 36 })
      gsap.set('.home-bg-orb', { scale: 0, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.to('.home-bg-orb', { scale: 1, opacity: 1, duration: 2, stagger: 0.25, ease: 'power3.out' })
        .to('.home-title span', { y: '0%', duration: 0.85, stagger: 0.06, ease: 'power4.out' }, '-=1.6')
        .to('.home-sub', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.4')
        .to('.home-meta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
        .to('.home-card', { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.3')

      gsap.to('.home-bg-orb-1', { x: 20, y: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.home-bg-orb-2', { x: -18, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg relative overflow-hidden flex flex-col"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 75%)',
          opacity: 0.35,
        }}
      />

      {/* Ambient orbs */}
      <div
        className="home-bg-orb home-bg-orb-1 absolute top-[15%] right-[6%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)', filter: 'blur(100px)', opacity: 0 }}
      />
      <div
        className="home-bg-orb home-bg-orb-2 absolute bottom-[10%] left-[4%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--rust) 0%, transparent 65%)', filter: 'blur(120px)', opacity: 0 }}
      />

      {/* Nav */}
      <nav className="relative z-10 max-w-site mx-auto site-px w-full pt-8 flex items-center justify-between">
        <span className="font-display font-extrabold text-xl tracking-tighter text-fg">N.</span>
        <ThemeToggle />
      </nav>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-site mx-auto site-px w-full py-20">

        {/* Header */}
        <div className="mb-14">
          <div className="home-meta flex items-center gap-3 mb-8">
            <span className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              Design Exploration · 2025
            </span>
          </div>

          <h1
            className="home-title font-display font-extrabold text-fg leading-[0.88] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(44px, 7vw, 110px)' }}
            aria-label="NEAR Redesign Showcase"
          >
            {['NEAR', 'Redesign', 'Showcase'].map((word, i) => (
              <span key={i} className="block overflow-hidden" aria-hidden>
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="home-sub max-w-lg font-body text-stone leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.3vw, 18px)' }}>
            Cuatro páginas de animaciones independientes construidas con Next.js, GSAP y Lenis.
            Cada una explora una dirección visual distinta.
          </p>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {SHOWCASES.map((s) => (
            <Link key={s.num} href={s.href} className="block">
              <div className="home-card bg-bg flex flex-col group cursor-pointer relative overflow-hidden h-full hover:bg-surface transition-colors duration-200">

                {/* Gradient stripe */}
                <div
                  className="w-full flex-shrink-0"
                  style={{
                    height: 'clamp(90px, 10vw, 140px)',
                    background: s.gradient,
                    transition: 'filter 0.4s ease',
                  }}
                />

                {/* Content */}
                <div className="p-7 lg:p-9 flex flex-col gap-5 flex-1">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-stone tracking-widest">{s.num}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Live</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className="font-display font-extrabold text-fg group-hover:text-accent transition-colors duration-200 tracking-tight leading-none"
                        style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}>
                        {s.title}
                      </h2>
                      <span className="font-mono text-[10px] text-stone/50 tracking-widest uppercase flex-shrink-0">
                        {s.sections}
                      </span>
                    </div>
                    <p className="font-body text-stone leading-relaxed"
                      style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}>
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-sm tracking-widest uppercase border border-border text-stone group-hover:border-accent/30 group-hover:text-accent transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-stone/50 group-hover:text-accent transition-colors duration-200 flex-shrink-0 ml-3">
                      →
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between">
          <span className="font-mono text-[11px] text-stone/40 tracking-widest uppercase">
            Next.js 15 · GSAP · Lenis · Tailwind
          </span>
          <span className="font-mono text-[11px] text-stone/40 tracking-widest">
            4 showcases
          </span>
        </div>
      </main>
    </div>
  )
}
