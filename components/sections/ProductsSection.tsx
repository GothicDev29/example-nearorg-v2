'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    num: '01',
    name: 'FastAuth',
    tag: 'Onboarding',
    headline: 'Sign in with email. Own your assets.',
    desc: 'FastAuth removes the biggest barrier in Web3: the wallet. Users create an account with just an email. No seed phrases, no extensions, no waiting. Just the open web, finally accessible.',
    detail: ['Email & biometric login', 'Cross-device sync', 'No seed phrases', 'Social recovery'],
  },
  {
    num: '02',
    name: 'Chain Abstraction',
    tag: 'Infrastructure',
    headline: 'Build once. Reach every chain.',
    desc: 'NEAR\'s chain abstraction layer unifies Bitcoin, Ethereum, Solana, and more under a single account. Your users never see bridging. They never see gas tokens. They just see your product.',
    detail: ['Multi-chain accounts', 'Native BTC & ETH', 'No bridges', 'One gas token'],
  },
  {
    num: '03',
    name: 'NEAR AI',
    tag: 'Agents',
    headline: 'Autonomous agents that own wallets.',
    desc: 'NEAR AI enables agents that can hold assets, sign transactions, and operate on-chain without human approval for every step. The first platform where AI and ownership collide.',
    detail: ['On-chain wallets', 'Autonomous signing', 'Agent marketplace', 'Verifiable actions'],
  },
]

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope: cardRef })

  const onMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current!
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(el, {
      rotateX: -ny * 7,
      rotateY: nx * 7,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
    })
    gsap.to('.p-inner', { x: nx * 4, y: ny * 4, duration: 0.35, ease: 'power2.out' })
    gsap.to('.p-glow', {
      opacity: 0.6,
      x: (nx * rect.width) / 2,
      y: (ny * rect.height) / 2,
      duration: 0.3,
    })
  })

  const onLeave = contextSafe(() => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    gsap.to('.p-inner', { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    gsap.to('.p-glow', { opacity: 0, duration: 0.4 })
  })

  return (
    <div
      ref={cardRef}
      className={`p-card-${index} border-draw relative p-8 lg:p-10 bg-bg border border-border rounded-sm cursor-pointer flex flex-col gap-8 overflow-hidden`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Glow */}
      <div
        className="p-glow absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
        }}
      />

      <div className="p-inner relative z-10 flex flex-col gap-8 h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] text-stone tracking-[0.2em] uppercase block mb-2">
              {product.tag}
            </span>
            <h3 className="font-display font-extrabold text-fg" style={{ fontSize: 'clamp(22px, 2.2vw, 32px)' }}>
              {product.name}
            </h3>
          </div>
          <span className="font-mono text-xs text-accent/60 tracking-widest">{product.num}</span>
        </div>

        {/* Headline */}
        <p className="font-display font-bold text-fg/90 text-lg leading-tight">
          {product.headline}
        </p>

        {/* Desc */}
        <p className="font-body text-stone text-sm leading-relaxed flex-1">{product.desc}</p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2">
          {product.detail.map((d) => (
            <div key={d} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              <span className="font-mono text-[11px] text-stone tracking-wide">{d}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase hover:text-accent-pop transition-colors cursor-pointer">
            Learn more →
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.p-label', { opacity: 0, x: -14 })
      gsap.set('.p-headline', { opacity: 0, y: 28 })

      gsap.to('.p-label', {
        opacity: 1, x: 0, duration: 0.6,
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })
      gsap.to('.p-headline', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.p-headline', start: 'top 85%' },
      })

      // Stagger cards
      ;[0, 1, 2].forEach((i) => {
        gsap.fromTo(
          `.p-card-${i}`,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.p-card-${i}`,
              start: 'top 85%',
            },
            delay: i * 0.1,
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="products" className="section-pad bg-bg">
      <div className="max-w-site mx-auto site-px">
        <div className="p-label flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-stone/40" />
          <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            04 / Products
          </span>
        </div>

        <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="p-headline font-display font-extrabold text-fg leading-[0.92] tracking-tighter"
            style={{ fontSize: 'clamp(36px, 5vw, 80px)' }}
          >
            What we're<br />
            <span className="text-accent">building.</span>
          </h2>
          <p className="max-w-md font-body text-stone text-base leading-relaxed">
            Three layers. One vision: a web where everyone participates without
            understanding the infrastructure underneath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.num} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
