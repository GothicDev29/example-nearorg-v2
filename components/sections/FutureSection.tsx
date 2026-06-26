'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    date: 'Q4 2024',
    status: 'completed',
    title: 'Stateless Validation',
    desc: 'NEAR decouples execution from storage, enabling 100K+ TPS and slashing infrastructure costs by 10×. The first production blockchain to achieve stateless validation.',
  },
  {
    date: 'Q1 2025',
    status: 'completed',
    title: 'Bitcoin Chain Signatures',
    desc: 'NEAR accounts can sign Bitcoin transactions natively. No bridging. No wrapped assets. Native BTC, controlled by a NEAR key. The first time Bitcoin becomes truly composable.',
  },
  {
    date: 'Q2 2025',
    status: 'active',
    title: 'NEAR AI Mainnet',
    desc: 'Autonomous AI agents with on-chain wallets launch on mainnet. Agents that earn, spend, and govern — without human co-signing for every step.',
  },
  {
    date: 'Q3 2025',
    status: 'upcoming',
    title: 'Ethereum L2',
    desc: 'NEAR becomes an Ethereum Layer 2, inheriting Ethereum\'s battle-tested security while maintaining sub-second finality and near-zero fees.',
  },
  {
    date: 'Q4 2025',
    status: 'upcoming',
    title: 'Nightshade 2.0 Full Deploy',
    desc: 'Dynamic resharding reaches full deployment. NEAR scales infinitely, horizontally, without any coordinated upgrade — the first truly elastic blockchain.',
  },
]

export function FutureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const milestoneCount = MILESTONES.length
      const track = containerRef.current?.querySelector<HTMLElement>('.f-track')
      if (!track) return

      gsap.set('.f-label', { opacity: 0, x: -14 })
      gsap.set('.f-headline', { opacity: 0, y: 24 })
      gsap.set('.f-milestone', { opacity: 0, x: 40 })
      gsap.set('.f-bar-fill', { scaleX: 0, transformOrigin: 'left center' })

      const mainTl = gsap.timeline()

      mainTl
        .to('.f-bar-fill', { scaleX: 1, duration: 1, ease: 'none' })
        .to(
          '.f-milestone',
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.2, ease: 'power3.out' },
          0
        )

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280%',
        pin: stickyRef.current,
        scrub: 1,
        animation: mainTl,
      })

      gsap.to('.f-label', {
        opacity: 1, x: 0, duration: 0.6,
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })
      gsap.to('.f-headline', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} style={{ height: '380vh' }}>
      <div
        ref={stickyRef}
        className="h-screen flex flex-col justify-center overflow-hidden bg-surface"
      >
        <div className="max-w-site mx-auto site-px w-full">
          <div className="f-label flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-stone/40" />
            <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
              07 / Roadmap
            </span>
          </div>

          <h2
            className="f-headline font-display font-extrabold text-fg leading-[0.9] tracking-tighter mb-14"
            style={{ fontSize: 'clamp(36px, 5vw, 80px)' }}
          >
            The road to<br />
            <span className="text-accent">the open web.</span>
          </h2>

          {/* Progress bar */}
          <div className="relative mb-12">
            <div className="h-[1px] bg-border w-full" />
            <div className="f-bar-fill absolute inset-y-0 left-0 right-0 h-[2px] bg-accent -top-[0.5px]" />
          </div>

          {/* Milestones grid */}
          <div className="f-track grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MILESTONES.map((m, i) => (
              <div key={i} className="f-milestone flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        m.status === 'completed'
                          ? 'var(--accent)'
                          : m.status === 'active'
                          ? 'var(--rust)'
                          : 'var(--border)',
                      boxShadow:
                        m.status === 'active' ? '0 0 8px var(--rust)' : 'none',
                    }}
                  />
                  <span className="font-mono text-[10px] text-stone tracking-widest uppercase">
                    {m.date}
                  </span>
                </div>

                <div>
                  <div className="font-display font-bold text-fg text-sm leading-tight mb-2">
                    {m.title}
                  </div>
                  <p className="font-body text-stone text-xs leading-relaxed">{m.desc}</p>
                </div>

                {m.status === 'completed' && (
                  <span className="inline-flex items-center gap-1.5 w-fit">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                      Live
                    </span>
                  </span>
                )}
                {m.status === 'active' && (
                  <span className="inline-flex items-center gap-1.5 w-fit">
                    <span className="w-1 h-1 rounded-full bg-rust animate-pulse" />
                    <span className="font-mono text-[10px] text-rust tracking-widest uppercase">
                      In Progress
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:block">
          <span className="font-mono text-[10px] text-stone/40 tracking-widest">07 / 08</span>
        </div>
      </div>
    </div>
  )
}
