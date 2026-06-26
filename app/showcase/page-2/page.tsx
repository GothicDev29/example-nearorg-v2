'use client'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Header } from '@/components/layout/Header'
import { ParticleField } from '@/components/ui/ParticleField'
import { MouseGradient } from '@/components/ui/MouseGradient'
import { MagneticButton } from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ──────────────────────────────────────────────── */
const ECO_STATS = [
  { val: '9K+', label: 'Active Projects' },
  { val: '$2.4B', label: 'Total Value Locked' },
  { val: '190+', label: 'Countries' },
  { val: '12', label: 'Integrated Chains' },
]

const CATEGORIES = [
  { name: 'DeFi', count: '210+', accent: '#C6F135' },
  { name: 'NFTs & Digital Assets', count: '180+', accent: '#D4561E' },
  { name: 'Gaming & Metaverse', count: '140+', accent: '#7CB518' },
  { name: 'AI Agents', count: '95+', accent: '#C6F135' },
  { name: 'DAOs & Governance', count: '120+', accent: '#D4561E' },
  { name: 'Infrastructure', count: '230+', accent: '#7CB518' },
  { name: 'Social & Identity', count: '88+', accent: '#C6F135' },
  { name: 'Payments & Commerce', count: '75+', accent: '#D4561E' },
]

const PROJECTS = [
  {
    name: 'Ref Finance',
    cat: 'DeFi',
    desc: "NEAR's flagship AMM and DEX. $400M+ in liquidity, cross-chain swaps, and yield strategies — all from one interface.",
    metric: '$400M TVL',
  },
  {
    name: 'Mintbase',
    cat: 'NFTs',
    desc: 'The NFT infrastructure layer for NEAR. Power over 500 creator stores, ticketing systems, and loyalty programs.',
    metric: '2M+ NFTs Minted',
  },
  {
    name: 'Sweat Economy',
    cat: 'Gaming',
    desc: 'Move-to-earn pioneered at scale. 6 million monthly active users, none of whom had to touch a wallet.',
    metric: '6M MAU',
  },
  {
    name: 'Orderly Network',
    cat: 'Infrastructure',
    desc: 'On-chain order book infrastructure for perpetuals and spot markets. Powers 40+ trading frontends across chains.',
    metric: '40+ Integrations',
  },
  {
    name: 'Meta Pool',
    cat: 'DeFi',
    desc: 'Liquid staking for NEAR. Stake NEAR, receive stNEAR, and put your staked assets to work across DeFi.',
    metric: '$80M Staked',
  },
  {
    name: 'Calimero',
    cat: 'Infrastructure',
    desc: 'Private shards for enterprises that need the speed of NEAR with the data sovereignty of a permissioned system.',
    metric: '50+ Enterprise Clients',
  },
]

const TOOLS = [
  { name: 'JavaScript SDK', tag: 'Frontend', desc: 'Build dApps in minutes with the most ergonomic Web3 SDK in existence.' },
  { name: 'Rust SDK', tag: 'Contracts', desc: 'Write smart contracts in Rust with full access to NEAR\'s native capabilities.' },
  { name: 'Python SDK', tag: 'Scripts', desc: 'Automate chain interactions, run scripts, and build bots with Python.' },
  { name: 'REST API', tag: 'Integration', desc: 'Query NEAR state, submit transactions, and read events via standard HTTP.' },
]

const GRANTS = [
  { tier: 'Seed', range: '$5K – $50K', items: ['Early-stage projects', 'Proof of concepts', 'Research initiatives', 'Community tools'] },
  { tier: 'Growth', range: '$50K – $250K', highlighted: true, items: ['Production-ready dApps', 'Protocol integrations', 'Developer tooling', 'Cross-chain projects'] },
  { tier: 'Scale', range: '$250K+', items: ['Ecosystem-defining infrastructure', 'Strategic partnerships', 'Research with NEAR Labs', 'L2 / L3 deployments'] },
]

const INFRA = [
  'The Graph', 'Chainlink', 'LayerZero', 'Pyth Network',
  'Wormhole', 'Axelar', 'Band Protocol', 'Biconomy',
  'Alchemy', 'QuickNode', 'Infura', 'Tenderly',
]

const COMMUNITY = [
  { val: '180K', label: 'Discord Members' },
  { val: '500K', label: 'Twitter Followers' },
  { val: '85K', label: 'Registered Devs' },
  { val: '120', label: 'Local Builder Groups' },
]

const EVENTS = [
  { date: 'Sep 30, 2025', name: 'ETH Global — NEAR Track', location: 'San Francisco, CA', prize: '$100K' },
  { date: 'Oct 18, 2025', name: 'NEARCON 2025', location: 'Bangkok, Thailand', prize: '$1M+' },
  { date: 'Nov 15, 2025', name: 'NEAR Horizon Hack', location: 'Online · Global', prize: '$250K' },
  { date: 'Dec 5, 2025', name: 'NEAR AI Summit', location: 'London, UK', prize: '$500K' },
]

/* ─── Sub-components ─────────────────────────────────────── */

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`section-pad relative overflow-hidden ${className}`}>
      {children}
    </section>
  )
}

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-6 h-[1px] bg-stone/40" />
      <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">{num} / {text}</span>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
/* ─── Category animated row ──────────────────────────────── */
function CategoryRow({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP(() => {
    gsap.set('.cr-idx', { opacity: 0, x: 10 })
    gsap.set('.cr-fill', { scaleX: 0, transformOrigin: 'left center' })
    gsap.set('.cr-bar', { scaleX: 0, transformOrigin: 'left center' })

    gsap.fromTo(ref.current,
      { opacity: 0, x: -24 },
      {
        opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
        delay: index * 0.055,
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      }
    )
  }, { scope: ref })

  const onEnter = contextSafe(() => {
    gsap.to('.cr-name', { color: 'var(--accent)', duration: 0.18 })
    gsap.to('.cr-idx', { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' })
    gsap.to('.cr-fill', { scaleX: 1, duration: 0.4, ease: 'power3.out' })
    gsap.to('.cr-bar', { scaleX: 1, duration: 0.5, ease: 'power3.out' })
    gsap.to('.cr-count', { color: 'var(--fg)', duration: 0.18 })
    gsap.to('.cr-arrow', { opacity: 1, x: 0, duration: 0.22 })
  })
  const onLeave = contextSafe(() => {
    gsap.to('.cr-name', { color: 'var(--fg)', duration: 0.22 })
    gsap.to('.cr-idx', { opacity: 0, x: 10, duration: 0.2 })
    gsap.to('.cr-fill', { scaleX: 0, duration: 0.32, ease: 'power3.in' })
    gsap.to('.cr-bar', { scaleX: 0, duration: 0.3, ease: 'power3.in' })
    gsap.to('.cr-count', { color: 'var(--stone)', duration: 0.18 })
    gsap.to('.cr-arrow', { opacity: 0, x: -6, duration: 0.18 })
  })

  return (
    <div
      ref={ref}
      className="relative border-b border-border flex items-center justify-between py-5 lg:py-7 cursor-pointer overflow-hidden"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Hover fill */}
      <div className="cr-fill absolute inset-0 bg-bg pointer-events-none" />
      {/* Accent bottom bar */}
      <div className="cr-bar absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-5 lg:gap-7">
        <span className="cr-idx font-mono text-[11px] text-accent tracking-widest w-6 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="cr-name font-display font-extrabold text-fg"
          style={{ fontSize: 'clamp(22px, 3vw, 48px)' }}>
          {cat.name}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="cr-count font-mono text-sm text-stone tracking-wide">{cat.count} projects</span>
        <span className="cr-arrow font-mono text-sm text-accent opacity-0 -translate-x-1.5">→</span>
      </div>
    </div>
  )
}

export default function Page2() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  /* Hero animations */
  const heroRef = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.set('.eco-h-word > span', { y: '115%' })
    gsap.set(['.eco-h-sub', '.eco-h-meta', '.eco-h-stat'], { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to('.eco-h-word > span', { y: '0%', duration: 0.85, stagger: 0.07, ease: 'power4.out' })
      .to('.eco-h-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.eco-h-meta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to('.eco-h-stat', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
  }, { scope: heroRef })

  /* Scroll animations */
  const bodyRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })
    gsap.utils.toArray<HTMLElement>('.reveal-left').forEach(el => {
      gsap.fromTo(el, { opacity: 0, x: -28 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })
    gsap.utils.toArray<HTMLElement>('.stagger-up').forEach(parent => {
      const children = parent.querySelectorAll(':scope > *')
      gsap.fromTo(children, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: parent, start: 'top 80%' },
      })
    })
  }, { scope: bodyRef })

  return (
    <main>
      <Header showBack />

      {/* 01 — HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg">
        <ParticleField />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 80%)',
            opacity: 0.3,
          }}
        />
        <div className="relative z-10 max-w-site mx-auto site-px pt-36 pb-24 w-full">
          <div className="eco-h-meta flex items-center gap-3 mb-10">
            <span className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Ecosystem — 2025</span>
          </div>
          <h1 className="font-display font-extrabold leading-[0.88] tracking-tighter text-fg mb-8"
            style={{ fontSize: 'clamp(64px, 10vw, 152px)' }}
            aria-label="9,000+ builders. One web.">
            {["9,000+", "builders.", "One web."].map((w, i) => (
              <span key={i} className="eco-h-word block overflow-hidden" aria-hidden>
                <span className="inline-block">{w}</span>
              </span>
            ))}
          </h1>
          <p className="eco-h-sub max-w-2xl font-body text-stone leading-relaxed mb-14"
            style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}>
            The NEAR ecosystem spans DeFi, gaming, AI, infrastructure, and identity — unified by one belief: that the best user experience is one where the blockchain disappears entirely.
          </p>
          <div className="flex flex-wrap gap-10">
            {ECO_STATS.map(s => (
              <div key={s.val} className="eco-h-stat">
                <div className="font-mono font-medium text-fg" style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>{s.val}</div>
                <div className="font-mono text-[11px] text-stone tracking-[0.18em] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <span className="font-mono text-[10px] text-stone/40 tracking-widest">01 / 11</span>
        </div>
      </section>

      <div ref={bodyRef}>
        {/* 02 — CATEGORIES */}
        <Section id="categories" className="bg-surface">
          <div className="max-w-site mx-auto site-px">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div>
                <SectionLabel num="02" text="Categories" />
                <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter"
                  style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
                  Every corner<br />of the open web.
                </h2>
              </div>
              <p className="reveal-up max-w-xs font-body text-stone text-sm leading-relaxed">
                9,000+ projects across 8 verticals. Filter by category to find the builders shaping each corner of Web3.
              </p>
            </div>
            <div className="border-t border-border">
              {CATEGORIES.map((cat, i) => (
                <CategoryRow key={cat.name} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </Section>

        {/* 03 — FEATURED PROJECTS */}
        <Section id="projects" className="bg-bg">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="03" text="Featured Projects" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter"
                style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
                Built on NEAR.<br /><span className="text-accent">Built for everyone.</span>
              </h2>
              <p className="reveal-up max-w-sm font-body text-stone text-sm leading-relaxed">
                Six of the hundreds of projects proving that Web3 can be invisible, joyful, and actually used.
              </p>
            </div>
            <div className="stagger-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {PROJECTS.map((p, i) => (
                <div key={i} className="border-draw group bg-bg p-8 flex flex-col gap-5 relative overflow-hidden cursor-pointer">
                  <MouseGradient />
                  <div className="relative z-10 flex flex-col gap-5 h-full">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] text-accent tracking-widest uppercase px-2 py-1 border border-accent/30 rounded-sm">{p.cat}</span>
                      <span className="font-mono text-[10px] text-stone tracking-widest">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <h3 className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200"
                      style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}>{p.name}</h3>
                    <p className="font-body text-stone text-sm leading-relaxed flex-1">{p.desc}</p>
                    <div className="border-t border-border pt-4 flex items-center justify-between">
                      <span className="font-mono font-medium text-accent text-sm">{p.metric}</span>
                      <span className="font-mono text-[10px] text-stone tracking-widest uppercase group-hover:text-fg transition-colors">Visit →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 04 — DEVELOPER TOOLS */}
        <Section id="tools" className="bg-surface">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="04" text="Developer Tools" />
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-14"
              style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Your stack.<br />Our foundation.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-14">
              {TOOLS.map((t, i) => (
                <div key={i} className="bg-surface p-8 reveal-up group hover:bg-bg transition-colors duration-200 relative overflow-hidden cursor-pointer">
                  <div className="flex items-start gap-5">
                    <div className="font-mono text-4xl font-medium text-border group-hover:text-accent transition-colors duration-300">
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 text-lg">{t.name}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 border border-border text-stone rounded-sm tracking-widest uppercase">{t.tag}</span>
                      </div>
                      <p className="font-body text-stone text-sm leading-relaxed">{t.desc}</p>
                      <div className="mt-5 font-mono text-[10px] text-accent tracking-widest uppercase">
                        <span className="group-hover:underline">View Documentation →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Code snippet visual */}
            <div className="reveal-up border border-border rounded-sm overflow-hidden">
              <div className="px-5 py-3 bg-surface border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rust/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                </div>
                <span className="font-mono text-[11px] text-stone">quick-start.js</span>
              </div>
              <div className="p-6 bg-bg font-mono text-sm leading-relaxed overflow-x-auto">
                <p><span className="text-stone">// Connect to NEAR in 4 lines</span></p>
                <p><span className="text-accent">import</span> <span className="text-fg">{'{ connect }'}</span> <span className="text-accent">from</span> <span className="text-rust">'near-api-js'</span></p>
                <p className="mt-3"><span className="text-accent">const</span> <span className="text-fg">near</span> <span className="text-stone">=</span> <span className="text-accent">await</span> <span className="text-fg">connect</span><span className="text-stone">({'{'}</span></p>
                <p className="ml-6"><span className="text-fg">networkId</span><span className="text-stone">:</span> <span className="text-rust">'mainnet'</span><span className="text-stone">,</span></p>
                <p className="ml-6"><span className="text-fg">nodeUrl</span><span className="text-stone">:</span> <span className="text-rust">'https://rpc.mainnet.near.org'</span></p>
                <p><span className="text-stone">{'})'}</span></p>
                <p className="mt-3"><span className="text-stone">// That's it. You're on NEAR.</span></p>
                <p className="mt-1 flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span className="text-stone">Connected to mainnet in 23ms</span>
                  <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 05 — GRANTS */}
        <Section id="grants" className="bg-bg">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="05" text="Grants Program" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter"
                style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
                Up to <span className="text-accent">$10M</span><br />to build what's next.
              </h2>
              <p className="reveal-up max-w-sm font-body text-stone text-sm leading-relaxed">
                The NEAR Foundation Grants Program funds builders at every stage — from a weekend idea to a protocol-level infrastructure project.
              </p>
            </div>
            <div className="stagger-up grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {GRANTS.map((g) => (
                <div key={g.tier} className={`p-8 flex flex-col gap-6 relative overflow-hidden ${g.highlighted ? 'bg-accent' : 'bg-surface'}`}>
                  {g.highlighted && <MouseGradient className="opacity-20" />}
                  <div className="relative z-10">
                    <div className={`font-mono text-[10px] tracking-widest uppercase mb-4 ${g.highlighted ? 'text-bg/60' : 'text-stone'}`}>Grant Tier</div>
                    <div className={`font-display font-extrabold mb-1 ${g.highlighted ? 'text-bg' : 'text-fg'}`}
                      style={{ fontSize: 'clamp(26px, 2.5vw, 36px)' }}>{g.tier}</div>
                    <div className={`font-mono text-sm font-medium mb-8 ${g.highlighted ? 'text-bg/80' : 'text-accent'}`}>{g.range}</div>
                    <div className="space-y-3">
                      {g.items.map(item => (
                        <div key={item} className="flex items-center gap-2.5">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${g.highlighted ? 'bg-bg/60' : 'bg-accent'}`} />
                          <span className={`font-mono text-xs tracking-wide ${g.highlighted ? 'text-bg/80' : 'text-stone'}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <span className={`font-mono text-[10px] tracking-widest uppercase border px-4 py-2 rounded-sm ${g.highlighted ? 'border-bg/30 text-bg/80 hover:text-bg hover:border-bg' : 'border-border text-stone hover:border-accent hover:text-accent'} transition-colors cursor-pointer`}>
                        Apply Now →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 06 — EVENTS */}
        <Section id="events" className="bg-surface">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="06" text="Events & Hackathons" />
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-14"
              style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Where builders<br />become founders.
            </h2>
            <div className="space-y-px bg-border">
              {EVENTS.map((ev, i) => (
                <div key={i} className="reveal-up group bg-surface hover:bg-bg transition-colors duration-200 p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[10px] text-stone tracking-widest w-28 flex-shrink-0">{ev.date}</span>
                    <div>
                      <div className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 text-base">{ev.name}</div>
                      <div className="font-mono text-[11px] text-stone tracking-wide mt-1">{ev.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-mono text-xs text-stone tracking-widest uppercase">Prize Pool</div>
                      <div className="font-mono font-medium text-accent text-lg">{ev.prize}</div>
                    </div>
                    <span className="font-mono text-[10px] text-stone group-hover:text-fg transition-colors tracking-widest uppercase border border-border group-hover:border-accent px-3 py-1.5 rounded-sm">Register →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 07 — INFRASTRUCTURE PARTNERS */}
        <section id="infra" className="section-pad bg-bg overflow-hidden">
          <div className="max-w-site mx-auto site-px mb-14">
            <SectionLabel num="07" text="Infrastructure Partners" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter"
                style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
                The stack behind<br />the builders.
              </h2>
              <p className="reveal-up max-w-xs font-body text-stone text-sm leading-relaxed">
                Oracles, indexers, bridges, and RPC nodes — everything you need to go live on day one.
              </p>
            </div>
          </div>

          {/* Dual marquee */}
          <div className="space-y-4 mb-14">
            <div className="flex whitespace-nowrap overflow-hidden border-y border-border py-5">
              <div className="flex gap-14 animate-marquee will-change-transform">
                {[...INFRA, ...INFRA].map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-14">
                    <span className="font-display font-bold text-fg/70 hover:text-accent transition-colors duration-200 cursor-default"
                      style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}>
                      {name}
                    </span>
                    <span className="text-stone/25 text-lg select-none">×</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex whitespace-nowrap overflow-hidden border-b border-border py-5">
              <div className="flex gap-14 animate-marquee-reverse will-change-transform">
                {[...INFRA.slice(6), ...INFRA.slice(0, 6), ...INFRA.slice(6), ...INFRA.slice(0, 6)].map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-14">
                    <span className="font-display font-bold text-stone/40 hover:text-fg transition-colors duration-200 cursor-default"
                      style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}>
                      {name}
                    </span>
                    <span className="text-stone/15 text-lg select-none">×</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-site mx-auto site-px">
            <div className="reveal-up flex items-center justify-between pt-2">
              <span className="font-mono text-[11px] text-stone tracking-widest uppercase">12 trusted infrastructure partners</span>
              <a href="#" className="font-mono text-[11px] text-accent tracking-widest uppercase hover:text-accent-pop transition-colors">
                Become a partner →
              </a>
            </div>
          </div>
        </section>

        {/* 08 — COMMUNITY */}
        <Section id="community" className="bg-surface relative overflow-hidden">
          {/* Ghost number bg */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              className="font-display font-extrabold text-fg/[0.03] leading-none"
              style={{ fontSize: '42vw', whiteSpace: 'nowrap' }}
            >
              180K
            </span>
          </div>

          <div className="relative z-10 max-w-site mx-auto site-px">
            <SectionLabel num="08" text="Community" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">
              {/* Big number */}
              <div>
                <div className="font-mono text-[11px] text-stone tracking-[0.2em] uppercase mb-4">Discord Members</div>
                <div
                  className="reveal-up font-display font-extrabold text-fg leading-[0.82] tracking-tighter"
                  style={{ fontSize: 'clamp(88px, 16vw, 220px)' }}
                >
                  180<span className="text-accent">K</span>
                </div>
                <p className="font-body text-stone text-base leading-relaxed mt-8 max-w-sm">
                  The most active blockchain developer community in the world. Code reviews, launch announcements, grant applications — happening right now.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Discord', 'Twitter / X', 'Dev Forum', 'Telegram'].map(p => (
                    <a key={p} href="#"
                      className="font-mono text-[11px] text-stone hover:text-accent transition-colors tracking-widest uppercase border border-border hover:border-accent px-4 py-2 rounded-sm">
                      {p} →
                    </a>
                  ))}
                </div>
              </div>

              {/* Supporting stats */}
              <div className="space-y-px bg-border">
                {COMMUNITY.slice(1).map((c, i) => (
                  <div key={c.label} className="reveal-up bg-surface p-8 flex items-center justify-between group hover:bg-bg transition-colors duration-200 cursor-default">
                    <div className="font-mono text-xs text-stone tracking-widest uppercase">{c.label}</div>
                    <div className="font-mono font-medium text-fg group-hover:text-accent transition-colors duration-200"
                      style={{ fontSize: 'clamp(24px, 2.5vw, 38px)' }}>
                      {c.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 09 — ECOSYSTEM RADIAL VIZ */}
        <Section id="viz" className="bg-bg">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="09" text="Ecosystem Map" />
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="reveal-left font-display font-extrabold text-fg tracking-tighter mb-6"
                  style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
                  One network.<br /><span className="text-accent">Infinite surfaces.</span>
                </h2>
                <p className="reveal-left font-body text-stone text-base leading-relaxed">
                  Every project in the NEAR ecosystem connects back to the same foundation: an account system where users own their data, their assets, and their identity across every chain.
                </p>
              </div>
              {/* Radial SVG */}
              <EcosystemRadial />
            </div>
          </div>
        </Section>

        {/* 10 — NEAR HORIZON */}
        <Section id="horizon" className="bg-surface">
          <div className="max-w-site mx-auto site-px">
            <SectionLabel num="10" text="NEAR Horizon" />
            <div className="reveal-up border border-border rounded-sm p-10 lg:p-14 bg-bg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent" style={{ opacity: 0.7 }} />
              <MouseGradient />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase block mb-4">Accelerator Program</span>
                  <h3 className="font-display font-extrabold text-fg tracking-tighter mb-5"
                    style={{ fontSize: 'clamp(28px, 3vw, 48px)' }}>
                    NEAR Horizon is not just funding. It's a co-founder.
                  </h3>
                  <p className="font-body text-stone text-sm leading-relaxed">
                    NEAR Horizon connects early-stage projects with technical mentors, VC networks, legal resources, and a global community of builders who've done it before. Accepted projects receive up to $50K + 6 months of hands-on support.
                  </p>
                </div>
                <div className="space-y-5">
                  {['Technical mentorship from NEAR engineers', 'Access to $2B+ in VC network', 'Co-marketing with NEAR Foundation', 'Legal & compliance resources', '6-month structured program', 'Global demo day & investor access'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="font-mono text-sm text-stone">{item}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <MagneticButton className="font-mono text-[11px] text-fg tracking-widest uppercase border border-border hover:border-accent hover:text-accent px-5 py-2.5 rounded-sm transition-colors">
                      Apply to Horizon →
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 11 — CTA */}
        <Section id="eco-cta" className="bg-bg relative">
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 50px)',
              opacity: 0.12,
            }}
          />
          <div className="relative z-10 max-w-site mx-auto site-px text-center">
            <SectionLabel num="11" text="Join the Ecosystem" />
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 110px)' }}>
              Find your place<br />in the open web.
            </h2>
            <p className="reveal-up max-w-xl mx-auto font-body text-stone leading-relaxed mb-12"
              style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}>
              Whether you're launching a protocol, building a product, or creating a community — NEAR has the tools, funding, and network you need.
            </p>
            <div className="reveal-up flex flex-wrap items-center justify-center gap-5">
              <MagneticButton className="px-10 py-4 bg-accent text-bg font-display font-bold text-sm tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200">
                Explore Projects →
              </MagneticButton>
              <a href="#grants" className="font-mono text-xs text-stone tracking-widest uppercase hover:text-fg transition-colors duration-200">
                Apply for Grants
              </a>
            </div>
          </div>
        </Section>
      </div>
    </main>
  )
}

/* ─── Radial ecosystem SVG ───────────────────────────────── */
function EcosystemRadial() {
  const svgRef = useRef<SVGSVGElement>(null)
  useGSAP(() => {
    const spokes = svgRef.current?.querySelectorAll('.eco-spoke')
    const nodes = svgRef.current?.querySelectorAll('.eco-node')
    const labels = svgRef.current?.querySelectorAll('.eco-label')
    if (!spokes || !nodes || !labels) return

    gsap.set(spokes, { strokeDashoffset: 120, strokeDasharray: 120 })
    gsap.set(nodes, { scale: 0, transformOrigin: 'center center' })
    gsap.set(labels, { opacity: 0 })

    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(spokes, { strokeDashoffset: 0, duration: 0.6, stagger: 0.08, ease: 'power2.inOut' })
        gsap.to(nodes, { scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)', delay: 0.4 })
        gsap.to(labels, { opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.8 })
        gsap.to('.eco-core-pulse', { scale: 1.4, opacity: 0, duration: 1.8, repeat: -1, ease: 'power2.out', delay: 1, transformOrigin: 'center center' })
      }
    })
  }, { scope: svgRef })

  const center = { x: 200, y: 200 }
  const r = 130
  const cats = CATEGORIES.slice(0, 8)

  return (
    <svg ref={svgRef} viewBox="0 0 400 400" className="w-full max-w-sm mx-auto flex-shrink-0"
      style={{ filter: 'drop-shadow(0 0 30px var(--accent))' }}>
      {cats.map((cat, i) => {
        const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2
        const nx = center.x + Math.cos(angle) * r
        const ny = center.y + Math.sin(angle) * r
        const lx = center.x + Math.cos(angle) * (r + 22)
        const ly = center.y + Math.sin(angle) * (r + 22)
        return (
          <g key={cat.name}>
            <line className="eco-spoke" x1={center.x} y1={center.y} x2={nx} y2={ny}
              stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.35" />
            <circle className="eco-node" cx={nx} cy={ny} r="10"
              fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" opacity="0.9" />
            <text className="eco-label" x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fill="var(--stone)" fontSize="8" fontFamily="var(--font-mono)">
              {cat.name.split(' ')[0]}
            </text>
          </g>
        )
      })}
      {/* Core */}
      <circle className="eco-core-pulse" cx={center.x} cy={center.y} r="28"
        fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
      <circle cx={center.x} cy={center.y} r="28" fill="var(--accent)" />
      <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="middle"
        fill="var(--bg)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)">
        NEAR
      </text>
    </svg>
  )
}
