'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ROW_1 = [
  'Sweat Economy', 'Mintbase', 'Paras', 'Sender Wallet',
  'Ref Finance', 'Aurora Labs', 'Burrow Finance', 'Meta Pool',
  'SpinFi', 'LiNEAR Protocol', 'HOT Protocol', 'Calimero',
]
const ROW_2 = [
  'Proximity Labs', 'Orderly Network', 'NEAR Foundation',
  'Pagoda', 'Keypom', 'ShardDog', 'PlayEmber', 'Few & Far',
  'Armored Kingdom', 'Pumpopoly', 'Cheddar', 'Roketo',
]

const TESTIMONIAL = {
  quote:
    "We chose NEAR because it was the only chain where our users never had to know they were on a blockchain. Sweat Economy has 6 million monthly actives, and most of them have no idea what Web3 means — and that’s exactly the point.",
  name: 'Oleg Fomenko',
  role: 'Co-founder, Sweat Economy',
  metric: '6M MAU',
}

export function BuildersSection() {
  const containerRef = useRef<HTMLElement>(null)
  const marquee1Ref = useRef<HTMLDivElement>(null)
  const marquee2Ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set('.b-label', { opacity: 0, x: -14 })
      gsap.set('.b-quote-word', { opacity: 0, y: 16 })
      gsap.set('.b-attr', { opacity: 0, y: 12 })
      gsap.set('.b-metric', { opacity: 0, scale: 0.8 })

      gsap.to('.b-label', {
        opacity: 1, x: 0, duration: 0.6,
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })

      ScrollTrigger.create({
        trigger: '.b-testimonial',
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.b-quote-word', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.015,
            ease: 'power3.out',
          })
          gsap.to('.b-attr', { opacity: 1, y: 0, duration: 0.5, delay: 0.6 })
          gsap.to('.b-metric', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            delay: 0.4,
          })
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="ecosystem" className="section-pad bg-bg overflow-hidden">
      <div className="max-w-site mx-auto site-px">
        <div className="b-label flex items-center gap-3 mb-14">
          <span className="w-6 h-[1px] bg-stone/40" />
          <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            06 / Who's Building
          </span>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="mb-16 space-y-4 overflow-hidden">
        {/* Row 1 — left to right */}
        <div className="flex whitespace-nowrap gap-0">
          <div className="flex gap-8 animate-marquee will-change-transform">
            {[...ROW_1, ...ROW_1].map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 px-0"
              >
                <span className="font-display font-bold text-fg/80 hover:text-accent transition-colors duration-200 cursor-default"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}>
                  {name}
                </span>
                <span className="text-stone/30 text-2xl select-none">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="flex whitespace-nowrap gap-0">
          <div className="flex gap-8 animate-marquee-reverse will-change-transform">
            {[...ROW_2, ...ROW_2].map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4"
              >
                <span className="font-display font-bold text-stone/50 hover:text-fg transition-colors duration-200 cursor-default"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}>
                  {name}
                </span>
                <span className="text-stone/20 text-2xl select-none">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-site mx-auto site-px">
        <div className="b-testimonial border border-border rounded-sm p-10 lg:p-14 bg-surface relative overflow-hidden">
          {/* Accent corner */}
          <div
            className="absolute top-0 left-0 w-1 h-full bg-accent"
            style={{ opacity: 0.8 }}
          />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="flex-1">
              <blockquote
                className="font-display font-bold leading-[1.1] text-fg mb-8"
                style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
              >
                {TESTIMONIAL.quote.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="b-quote-word inline-block"
                    style={{ marginRight: '0.28em', willChange: 'opacity, transform' }}
                  >
                    {word}
                  </span>
                ))}
              </blockquote>

              <div className="b-attr flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-accent font-medium">OF</span>
                </div>
                <div>
                  <div className="font-display font-bold text-fg text-sm">{TESTIMONIAL.name}</div>
                  <div className="font-mono text-xs text-stone tracking-wide">{TESTIMONIAL.role}</div>
                </div>
              </div>
            </div>

            <div className="b-metric flex-shrink-0 text-center lg:text-right">
              <div className="font-mono font-medium text-accent" style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}>
                {TESTIMONIAL.metric}
              </div>
              <div className="font-mono text-xs text-stone tracking-widest uppercase mt-1">
                Monthly Active Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
