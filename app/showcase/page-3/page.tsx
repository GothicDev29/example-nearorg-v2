'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Header } from '@/components/layout/Header'
import { DotGrid } from '@/components/ui/DotGrid'
import { MouseGradient } from '@/components/ui/MouseGradient'
import { MagneticButton } from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ───────────────────────────────────────────────── */
const FEATURED = {
  tag: 'Research',
  readTime: '7 min read',
  date: 'Jun 15, 2025',
  title: "Chain Abstraction Is Not a Feature. It's a Paradigm Shift.",
  desc: "We've been asking the wrong question. The question was never 'how do we make blockchains easier?' The question was always 'how do we make blockchains invisible?' Here's why that distinction changes everything.",
  href: '/showcase/page-4',
  gradient: 'linear-gradient(135deg, #7CB518 0%, #C6F135 40%, #D4561E 100%)',
}

const LATEST = [
  {
    tag: 'AI', date: 'Jun 12, 2025', readTime: '5 min',
    title: 'Building NEAR AI: When Your Agent Owns Its Own Wallet',
    desc: "We shipped AI agents that can hold NEAR, sign transactions, and interact with DeFi protocols autonomously. Here's how we built the infrastructure.",
    gradient: 'linear-gradient(135deg, #C6F135 0%, #080807 100%)',
  },
  {
    tag: 'Tutorial', date: 'Jun 8, 2025', readTime: '4 min',
    title: 'From Zero to dApp in 15 Minutes with JavaScript',
    desc: "No Solidity. No Rust. No seed phrases. Just JavaScript, a text editor, and 15 minutes. Here's your first NEAR dApp.",
    gradient: 'linear-gradient(135deg, #7CB518 0%, #080807 100%)',
  },
  {
    tag: 'Protocol', date: 'Jun 3, 2025', readTime: '8 min',
    title: 'Nightshade 2.0: How NEAR Achieves Infinite Scale',
    desc: "An engineering deep dive into how stateless validation works, why it matters, and what 100,000 TPS actually means for your application.",
    gradient: 'linear-gradient(135deg, #D4561E 0%, #080807 100%)',
  },
]

const TECH_DIVES = [
  {
    num: '01', tag: 'Deep Dive', readTime: '12 min',
    title: "NEAR's Account Model: Why It Beats EVM",
    desc: "Named accounts, contract-level permissions, and meta-transactions — NEAR's account model solves problems Ethereum is still trying to fix.",
  },
  {
    num: '02', tag: 'Deep Dive', readTime: '9 min',
    title: 'Async Smart Contracts: The NEAR Way',
    desc: 'Cross-contract calls in NEAR are promise-based and fully asynchronous. Here is why that is architecturally superior to synchronous EVM calls.',
  },
  {
    num: '03', tag: 'Deep Dive', readTime: '10 min',
    title: 'Gas on NEAR: A Complete Technical Reference',
    desc: "Gas on NEAR is deterministic, cheap, and predictable. We break down how the model works, how to optimize for it, and why users never have to think about it.",
  },
]

const ECO_NEWS = [
  { date: 'Jun 14', title: 'Orderly Network reaches $10B in cumulative volume', tag: 'Ecosystem' },
  { date: 'Jun 11', title: 'NEAR Foundation announces $100M AI Fund', tag: 'Foundation' },
  { date: 'Jun 9', title: 'Mintbase crosses 5M NFTs minted on NEAR', tag: 'NFTs' },
  { date: 'Jun 6', title: 'Bitcoin Chain Signatures now live on mainnet', tag: 'Protocol' },
  { date: 'Jun 4', title: 'NEAR launches developer certification program', tag: 'Education' },
  { date: 'Jun 1', title: 'HOT Protocol processes 1M daily transactions', tag: 'Ecosystem' },
]

const SPOTLIGHTS = [
  {
    name: 'Yina Arenas',
    role: 'Founder, Paras',
    quote: "We built Paras on NEAR because we believed NFTs were about more than speculation. They were about ownership and cultural expression. NEAR's low fees made that belief actually economically viable for artists.",
    readTime: '5 min read',
    tag: 'Builder Story',
  },
  {
    name: 'Illia Polosukhin',
    role: 'Co-founder, NEAR Protocol',
    quote: "The original vision was simple: every person on earth should be able to participate in the open web without needing a PhD in cryptography. Everything we build is in service of that.",
    readTime: '8 min read',
    tag: 'Founder Story',
  },
]

const TOPICS = [
  { name: 'Chain Abstraction', weight: 'large' },
  { name: 'AI Agents', weight: 'large' },
  { name: 'DeFi', weight: 'medium' },
  { name: 'Sharding', weight: 'medium' },
  { name: 'JavaScript SDK', weight: 'small' },
  { name: 'NFTs', weight: 'medium' },
  { name: 'Grants', weight: 'small' },
  { name: 'Security', weight: 'small' },
  { name: 'Rust', weight: 'medium' },
  { name: 'Account Model', weight: 'large' },
  { name: 'Cross-chain', weight: 'medium' },
  { name: 'FastAuth', weight: 'small' },
  { name: 'Governance', weight: 'small' },
  { name: 'L2', weight: 'medium' },
]

const ARCHIVE = [
  { month: 'Jun 2025', count: 8 },
  { month: 'May 2025', count: 12 },
  { month: 'Apr 2025', count: 9 },
  { month: 'Mar 2025', count: 15 },
  { month: 'Feb 2025', count: 11 },
  { month: 'Jan 2025', count: 14 },
]

/* ─── Gradient placeholder ───────────────────────────────── */
function GradientBlock({ gradient, className = '' }: { gradient: string; className?: string }) {
  return (
    <div className={`w-full rounded-sm ${className}`} style={{ background: gradient, aspectRatio: '16/9' }} />
  )
}

function ArticleCard({ article, size = 'md' }: { article: typeof LATEST[0]; size?: 'md' | 'lg' }) {
  return (
    <div className="group border-draw bg-bg border border-border rounded-sm overflow-hidden flex flex-col cursor-pointer h-full hover:bg-surface transition-colors duration-200 relative">
      <MouseGradient />
      <div className={size === 'lg' ? 'h-52' : 'h-36'}>
        <div className="w-full h-full" style={{ background: article.gradient }} />
      </div>
      <div className="p-7 flex flex-col gap-4 flex-1 relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded-sm">{article.tag}</span>
          <span className="font-mono text-[10px] text-stone tracking-wide">{article.readTime}</span>
          <span className="font-mono text-[10px] text-stone/50">{article.date}</span>
        </div>
        <h3 className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 leading-tight"
          style={{ fontSize: size === 'lg' ? 'clamp(20px, 1.8vw, 26px)' : 'clamp(16px, 1.4vw, 20px)' }}>
          {article.title}
        </h3>
        <p className="font-body text-stone text-sm leading-relaxed flex-1">{article.desc}</p>
        <div className="font-mono text-[10px] text-stone group-hover:text-accent transition-colors tracking-widest uppercase">
          Read More →
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Page3() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.set('.blog-h-word > span', { y: '115%' })
    gsap.set(['.blog-h-sub', '.blog-h-meta', '.blog-h-badge'], { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to('.blog-h-word > span', { y: '0%', duration: 0.85, stagger: 0.08, ease: 'power4.out' })
      .to('.blog-h-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.blog-h-meta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to('.blog-h-badge', { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
  }, { scope: heroRef })

  const bodyRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })
    gsap.utils.toArray<HTMLElement>('.stagger-up').forEach(parent => {
      const children = parent.querySelectorAll(':scope > *')
      gsap.fromTo(children, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: parent, start: 'top 82%' },
      })
    })

    // Newsletter input
    const input = bodyRef.current?.querySelector('.nl-input')
    if (input) {
      input.addEventListener('focus', () => {
        gsap.to('.nl-underline', { scaleX: 1, duration: 0.4, ease: 'power3.out' })
      })
      input.addEventListener('blur', () => {
        gsap.to('.nl-underline', { scaleX: 0, duration: 0.3, ease: 'power3.in' })
      })
    }
  }, { scope: bodyRef })

  return (
    <main>
      <Header showBack />

      {/* 01 — HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg">
        <DotGrid />
        <div className="relative z-10 max-w-site mx-auto site-px pt-36 pb-24 w-full">
          <div className="blog-h-meta flex items-center gap-3 mb-10">
            <span className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">The Open Web Journal</span>
          </div>
          <h1 className="font-display font-extrabold leading-[0.88] tracking-tighter text-fg mb-8"
            style={{ fontSize: 'clamp(52px, 8.5vw, 136px)' }}
            aria-label="Ideas that build the future.">
            {['Ideas', 'that', 'build', 'the future.'].map((w, i) => (
              <span key={i} className="blog-h-word inline-block overflow-hidden align-bottom mr-[0.18em]" aria-hidden>
                <span className="inline-block">{w}</span>
              </span>
            ))}
          </h1>
          <p className="blog-h-sub max-w-xl font-body text-stone leading-relaxed mb-10"
            style={{ fontSize: 'clamp(17px, 1.4vw, 21px)' }}>
            Deep dives, ecosystem stories, and engineering write-ups from the teams building the open web.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Chain Abstraction', 'AI Agents', 'Protocol', 'DeFi', 'Builder Stories'].map(tag => (
              <span key={tag} className="blog-h-badge font-mono text-[11px] text-stone tracking-widest uppercase border border-border px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <span className="font-mono text-[10px] text-stone/40 tracking-widest">01 / 11</span>
        </div>
      </section>

      <div ref={bodyRef}>
        {/* 02 — FEATURED */}
        <section className="section-pad bg-surface">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">02 / Featured</span>
            </div>
            <div className="reveal-up border border-border rounded-sm overflow-hidden bg-bg group cursor-pointer relative">
              <MouseGradient />
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto min-h-[320px]" style={{ background: FEATURED.gradient }} />
                <div className="p-10 lg:p-14 flex flex-col gap-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded-sm">{FEATURED.tag}</span>
                    <span className="font-mono text-[10px] text-stone">{FEATURED.readTime}</span>
                    <span className="font-mono text-[10px] text-stone/50">{FEATURED.date}</span>
                  </div>
                  <h2 className="font-display font-extrabold text-fg group-hover:text-accent transition-colors duration-200 leading-tight"
                    style={{ fontSize: 'clamp(24px, 2.5vw, 38px)' }}>
                    {FEATURED.title}
                  </h2>
                  <p className="font-body text-stone text-sm leading-relaxed">{FEATURED.desc}</p>
                  <div className="mt-auto">
                    <Link href={FEATURED.href}
                      className="inline-flex items-center gap-2 font-mono text-[11px] text-accent tracking-widest uppercase hover:gap-3 transition-all duration-200">
                      Read Full Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — LATEST */}
        <section className="section-pad bg-bg">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">03 / Latest Articles</span>
            </div>
            <div className="stagger-up grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {LATEST.map((a, i) => <ArticleCard key={i} article={a} />)}
            </div>
          </div>
        </section>

        {/* 04 — TECHNICAL DEEP DIVES */}
        <section className="section-pad bg-surface">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">04 / Technical Deep Dives</span>
            </div>
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-12"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
              For the engineers<br />who want to know <span className="text-accent">why.</span>
            </h2>
            <div className="space-y-px bg-border">
              {TECH_DIVES.map((a) => (
                <div key={a.num} className="reveal-up group bg-surface hover:bg-bg transition-colors duration-200 p-8 flex gap-8 cursor-pointer relative overflow-hidden">
                  <MouseGradient />
                  <span className="font-mono text-3xl font-medium text-border group-hover:text-accent/30 transition-colors duration-300 flex-shrink-0 relative z-10">
                    {a.num}
                  </span>
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-stone tracking-widest uppercase border border-border px-2 py-0.5">{a.tag}</span>
                      <span className="font-mono text-[10px] text-stone">{a.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 mb-3"
                      style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}>{a.title}</h3>
                    <p className="font-body text-stone text-sm leading-relaxed">{a.desc}</p>
                    <div className="mt-4 font-mono text-[10px] text-stone group-hover:text-accent transition-colors tracking-widest uppercase">Read →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — ECOSYSTEM NEWS */}
        <section className="section-pad bg-bg">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">05 / Ecosystem News</span>
            </div>
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-12"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
              What happened<br />this week.
            </h2>
            <div className="stagger-up grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {ECO_NEWS.map((n, i) => (
                <div key={i} className="group bg-bg hover:bg-surface transition-colors duration-200 p-6 flex items-start gap-5 cursor-pointer">
                  <span className="font-mono text-[10px] text-stone/50 w-12 flex-shrink-0 mt-0.5">{n.date}</span>
                  <div>
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/20 px-1.5 py-0.5 rounded-sm mb-2 inline-block">{n.tag}</span>
                    <p className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 text-sm leading-tight mt-1">{n.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — BUILDER SPOTLIGHTS */}
        <section className="section-pad bg-surface">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">06 / Builder Spotlights</span>
            </div>
            <div className="stagger-up grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
              {SPOTLIGHTS.map((s, i) => (
                <div key={i} className="border-draw group bg-surface hover:bg-bg transition-colors duration-200 p-10 flex flex-col gap-7 cursor-pointer relative overflow-hidden">
                  <MouseGradient />
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded-sm mb-6 inline-block">
                      {s.tag}
                    </span>
                    <blockquote className="font-display font-bold text-fg leading-tight mb-8 group-hover:text-fg/90"
                      style={{ fontSize: 'clamp(17px, 1.5vw, 22px)' }}>
                      "{s.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-fg text-sm">{s.name}</div>
                        <div className="font-mono text-xs text-stone tracking-wide">{s.role}</div>
                      </div>
                      <span className="font-mono text-[10px] text-stone group-hover:text-accent transition-colors tracking-widest uppercase">
                        {s.readTime} →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — BY THE NUMBERS */}
        <section className="section-pad bg-bg relative overflow-hidden">
          <MouseGradient />
          <div className="relative z-10 max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">07 / By the Numbers</span>
            </div>
            <div className="stagger-up grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {[
                { val: '1.2M+', label: 'Monthly Readers' },
                { val: '42K', label: 'Newsletter Subscribers' },
                { val: '280+', label: 'Articles Published' },
                { val: '18', label: 'Languages Translated' },
              ].map(s => (
                <div key={s.label} className="bg-bg p-8">
                  <div className="font-mono font-medium text-accent mb-2" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{s.val}</div>
                  <div className="h-[2px] w-8 bg-accent mb-4" />
                  <div className="font-mono text-[11px] text-stone tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — TOPICS */}
        <section className="section-pad bg-surface overflow-hidden">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">08 / Topics</span>
            </div>
            <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-12"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
              Explore by topic.
            </h2>
            <div className="reveal-up flex flex-wrap gap-3">
              {TOPICS.map(t => {
                const sizes = { large: 'text-2xl py-3 px-6', medium: 'text-base py-2.5 px-5', small: 'text-sm py-2 px-4' }
                return (
                  <button key={t.name}
                    className={`font-display font-bold border border-border text-stone hover:border-accent hover:text-accent transition-colors duration-200 rounded-full ${sizes[t.weight as 'large'|'medium'|'small']}`}>
                    {t.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 09 — NEWSLETTER */}
        <section className="section-pad bg-bg">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">09 / Newsletter</span>
            </div>
            <div className="reveal-up max-w-2xl">
              <h2 className="font-display font-extrabold text-fg tracking-tighter mb-4"
                style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
                The Open Web<br /><span className="text-accent">Weekly.</span>
              </h2>
              <p className="font-body text-stone text-base leading-relaxed mb-10">
                Every Tuesday. Protocol updates, ecosystem highlights, and the one technical concept that changed how we think about the open web. 42,000 builders already get it.
              </p>
              {!subscribed ? (
                <div className="flex gap-0 border-b border-border pb-0">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="nl-input flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-stone/40 outline-none py-3 pr-4"
                  />
                  <div className="nl-underline absolute bottom-0 left-0 right-0 h-[1px] bg-accent origin-left scale-x-0" style={{ position: 'absolute' }} />
                  <MagneticButton
                    onClick={() => email && setSubscribed(true)}
                    className="font-mono text-[11px] text-bg bg-accent tracking-widest uppercase px-6 py-3 hover:bg-accent-pop transition-colors duration-200 flex-shrink-0"
                  >
                    Subscribe →
                  </MagneticButton>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 border-b border-accent">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-mono text-sm text-accent">You're subscribed. See you Tuesday.</span>
                </div>
              )}
              <p className="font-mono text-[11px] text-stone/50 tracking-wide mt-3">No spam. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>

        {/* 10 — ARCHIVE */}
        <section className="section-pad bg-surface">
          <div className="max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">10 / Archive</span>
            </div>
            <div className="stagger-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
              {ARCHIVE.map((a) => (
                <div key={a.month} className="group bg-surface hover:bg-bg transition-colors duration-200 p-6 cursor-pointer text-center">
                  <div className="font-mono text-xs text-stone tracking-wide mb-2">{a.month}</div>
                  <div className="font-display font-bold text-fg group-hover:text-accent transition-colors text-xl">{a.count}</div>
                  <div className="font-mono text-[10px] text-stone/50 tracking-widest mt-1">articles</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11 — CTA / START WRITING */}
        <section className="section-pad bg-bg relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'repeating-linear-gradient(-45deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 50px)', opacity: 0.1 }}
          />
          <div className="relative z-10 max-w-site mx-auto site-px">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-6 h-[1px] bg-stone/40" />
              <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">11 / Write With Us</span>
            </div>
            <div className="reveal-up flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div>
                <h2 className="font-display font-extrabold text-fg tracking-tighter mb-4"
                  style={{ fontSize: 'clamp(36px, 5vw, 80px)' }}>
                  Got something<br /><span className="text-accent">worth saying?</span>
                </h2>
                <p className="font-body text-stone text-base leading-relaxed max-w-md">
                  We publish technical deep dives, ecosystem stories, and research from builders across the NEAR ecosystem. No marketing. Just ideas.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <MagneticButton className="px-10 py-4 bg-accent text-bg font-display font-bold text-sm tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200 whitespace-nowrap">
                  Submit an Article
                </MagneticButton>
                <a href="#" className="font-mono text-[11px] text-center text-stone tracking-widest uppercase hover:text-fg transition-colors">
                  View Guidelines →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
