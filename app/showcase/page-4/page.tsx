'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Header } from '@/components/layout/Header'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { MouseGradient } from '@/components/ui/MouseGradient'

gsap.registerPlugin(ScrollTrigger)

/* ─── Reading progress bar ───────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border">
      <div
        className="h-full bg-accent transition-none"
        style={{ width: `${progress}%`, willChange: 'width' }}
      />
    </div>
  )
}

/* ─── Pull quote ─────────────────────────────────────────── */
function PullQuote({ text }: { text: string }) {
  const ref = useRef<HTMLQuoteElement>(null)

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: -32 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      }
    )
  }, { scope: ref })

  return (
    <blockquote
      ref={ref}
      className="my-14 pl-8 border-l-2 border-accent relative"
    >
      <p className="font-display font-bold text-fg leading-tight"
        style={{ fontSize: 'clamp(22px, 2.2vw, 32px)' }}>
        "{text}"
      </p>
    </blockquote>
  )
}

/* ─── Code block ─────────────────────────────────────────── */
function CodeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-10 border border-border rounded-sm overflow-hidden reveal-up">
      <div className="px-5 py-3 bg-surface border-b border-border flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rust/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
        </div>
        <span className="font-mono text-[11px] text-stone">{title}</span>
      </div>
      <div className="p-6 bg-bg font-mono text-sm leading-[1.8] overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

const RELATED = [
  {
    tag: 'AI', readTime: '5 min', title: 'Building NEAR AI: When Your Agent Owns Its Own Wallet',
    gradient: 'linear-gradient(135deg, #C6F135 0%, #080807 100%)',
  },
  {
    tag: 'Protocol', readTime: '8 min', title: 'Nightshade 2.0: How NEAR Achieves Infinite Scale',
    gradient: 'linear-gradient(135deg, #D4561E 0%, #080807 100%)',
  },
  {
    tag: 'Tutorial', readTime: '4 min', title: 'From Zero to dApp in 15 Minutes with JavaScript',
    gradient: 'linear-gradient(135deg, #7CB518 0%, #080807 100%)',
  },
]

export default function Page4() {
  const articleRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo('.post-title span',
      { y: '115%' },
      { y: '0%', duration: 0.9, stagger: 0.06, ease: 'power4.out', delay: 0.3 }
    )
    gsap.fromTo(['.post-meta', '.post-hero-img'],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.7 }
    )

    // Reveal article body elements
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%' },
      })
    })

    // Related cards
    gsap.utils.toArray<HTMLElement>('.related-card').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })
  }, { scope: articleRef })

  return (
    <main ref={articleRef}>
      <ReadingProgress />
      <Header showBack />

      {/* ── HERO ── */}
      <section className="section-pad bg-bg pt-40">
        <div className="max-w-content mx-auto site-px">
          {/* Breadcrumb */}
          <div className="post-meta flex items-center gap-2 mb-10">
            <Link href="/showcase/page-3" className="font-mono text-[11px] text-stone hover:text-fg transition-colors tracking-widest uppercase">Blog</Link>
            <span className="text-border">/</span>
            <span className="font-mono text-[11px] text-stone/50 tracking-widest uppercase">Research</span>
          </div>

          {/* Tags */}
          <div className="post-meta flex items-center gap-2 mb-6">
            {['Research', 'Chain Abstraction', 'Protocol'].map(tag => (
              <span key={tag} className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded-sm">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-extrabold text-fg leading-[0.9] tracking-tighter mb-8 overflow-hidden"
            style={{ fontSize: 'clamp(36px, 6vw, 96px)' }}>
            {["Chain Abstraction", "Is Not a Feature.", "It's a", "Paradigm Shift."].map((line, i) => (
              <span key={i} className="post-title block overflow-hidden">
                <span className="inline-block">{line}</span>
              </span>
            ))}
          </h1>

          {/* Meta row */}
          <div className="post-meta flex flex-wrap items-center gap-6 border-t border-b border-border py-5 mb-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-[10px] text-accent">AR</span>
              </div>
              <div>
                <div className="font-display font-bold text-fg text-sm">Alex Reyes</div>
                <div className="font-mono text-[11px] text-stone">Protocol Research Lead, NEAR</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="w-1 h-1 rounded-full bg-stone/40" />
              <span className="font-mono text-[11px] text-stone">Jun 15, 2025</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="font-mono text-[11px] text-accent">7 min read</span>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div
            className="post-hero-img w-full rounded-sm mb-14"
            style={{ height: 'clamp(240px, 40vw, 520px)', background: 'linear-gradient(135deg, #7CB518 0%, #C6F135 40%, #D4561E 100%)' }}
          />
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <article className="max-w-[720px] mx-auto site-px pb-24">
        <div className="reveal-up prose-like">
          <p className="font-body text-fg/90 leading-[1.85] mb-6" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            For the past five years, the Web3 industry has been trying to solve the wrong problem. The question was never <em>"how do we make blockchains easier to use?"</em> The real question — the one that actually matters — is <strong>"how do we make blockchains invisible?"</strong>
          </p>
          <p className="font-body text-fg/90 leading-[1.85] mb-6" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Those two questions sound similar. They are not. The first question is about interface design. The second is about paradigms. And paradigm shifts are what actually move industries forward.
          </p>
        </div>

        <PullQuote text="The best technology is the kind you stop thinking about." />

        <h2 className="reveal-up font-display font-bold text-fg tracking-tight mt-12 mb-5"
          style={{ fontSize: 'clamp(24px, 2.2vw, 34px)' }}>
          What chain abstraction actually means
        </h2>
        <div className="reveal-up space-y-5">
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Chain abstraction is the idea that users should interact with applications, not with blockchains. When you open a bank app, you don't select which clearing house processes your transaction. When you use Google Maps, you don't choose which CDN serves your tiles. The infrastructure is invisible. The value is front and center.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Web3's UX problem has never been complexity per se — it's been forced exposure to complexity. Users are made to confront seed phrases, gas tokens, network selectors, and bridge confirmations not because these things are inherently necessary for the user experience, but because the tooling to hide them didn't exist yet.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            NEAR is building the tooling to hide them. Not through abstraction <em>within</em> the application layer — but at the protocol layer, where the decisions are actually made.
          </p>
        </div>

        <h2 className="reveal-up font-display font-bold text-fg tracking-tight mt-14 mb-5"
          style={{ fontSize: 'clamp(24px, 2.2vw, 34px)' }}>
          Chain signatures: the concrete example
        </h2>
        <div className="reveal-up space-y-5 mb-8">
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Let's make this concrete. With NEAR's chain signatures, a single NEAR account can sign transactions on Bitcoin, Ethereum, Solana, and every other major chain. Not through bridges. Not through wrapped assets. Through a threshold signature scheme (TSS) protocol that runs on the NEAR validators.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            From the user's perspective: they have one account. From the protocol's perspective: that account has signing authority over N chains. From the developer's perspective: they call one API.
          </p>
        </div>

        <CodeBlock title="chain-signatures-example.ts">
          <p><span className="text-stone">// One account. Every chain. One call.</span></p>
          <p className="mt-2">
            <span className="text-accent">const</span> <span className="text-fg">signature</span> <span className="text-stone">=</span> <span className="text-accent">await</span> <span className="text-fg">nearAccount</span>
          </p>
          <p className="ml-4">
            <span className="text-fg">.signTransactionForChain</span><span className="text-stone">{'({'}</span>
          </p>
          <p className="ml-8"><span className="text-fg">chain</span><span className="text-stone">:</span> <span className="text-rust">'bitcoin'</span><span className="text-stone">,</span></p>
          <p className="ml-8"><span className="text-fg">transaction</span><span className="text-stone">:</span> <span className="text-fg">btcTxPayload</span><span className="text-stone">,</span></p>
          <p className="ml-8"><span className="text-fg">derivationPath</span><span className="text-stone">:</span> <span className="text-rust">'bitcoin-1'</span></p>
          <p className="ml-4"><span className="text-stone">{'})'}</span></p>
          <p className="mt-3 text-stone">
            <span className="text-accent">→</span> Bitcoin transaction signed by NEAR validator network
          </p>
        </CodeBlock>

        <PullQuote text="One account. Every chain. No bridges. No wrapping. No waiting." />

        <h2 className="reveal-up font-display font-bold text-fg tracking-tight mt-12 mb-5"
          style={{ fontSize: 'clamp(24px, 2.2vw, 34px)' }}>
          Why this is a paradigm shift, not a feature
        </h2>
        <div className="reveal-up space-y-5">
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Features are additive. Paradigm shifts are structural. When TCP/IP abstracted away the hardware layer, it didn't just make networking "easier" — it made a completely new category of application possible. Developers could build for "the internet" without knowing which physical network their packets would traverse.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            NEAR's chain abstraction is the equivalent move for blockchains. Developers will build for "the open web" — not for Ethereum, not for Bitcoin, not for NEAR. The underlying chain is a routing decision, not an application decision.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            This changes what kinds of applications become possible. It makes multi-chain UX the default, not the exception. It means users never have to know which chain they're on. And it means the competitive moat for any given blockchain shifts from "ecosystem lock-in" to "network quality" — which is exactly the competition we want.
          </p>
        </div>

        <h2 className="reveal-up font-display font-bold text-fg tracking-tight mt-14 mb-5"
          style={{ fontSize: 'clamp(24px, 2.2vw, 34px)' }}>
          What it means for builders
        </h2>
        <div className="reveal-up space-y-5">
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            If you're building a dApp today, you make a choice early: which chain? That choice cascades into every subsequent decision — tooling, wallet support, liquidity, community. It's a high-stakes bet made on incomplete information.
          </p>
          <p className="font-body text-fg/90 leading-[1.85]" style={{ fontSize: 'clamp(17px, 1.3vw, 19px)' }}>
            Chain abstraction changes that. You build once, on NEAR, and your users have access to every asset on every chain. You don't lose Ethereum users because they can't bridge. You don't lose Bitcoin holders because you're not on Bitcoin. The barrier to your application is the quality of your idea — which is exactly where the competition should be.
          </p>
        </div>

        {/* Author bio */}
        <div className="reveal-up mt-16 p-8 bg-surface border border-border rounded-sm flex items-start gap-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-sm text-accent font-medium">AR</span>
          </div>
          <div>
            <div className="font-display font-bold text-fg mb-1">Alex Reyes</div>
            <div className="font-mono text-xs text-stone tracking-wide mb-3">Protocol Research Lead, NEAR Foundation</div>
            <p className="font-body text-stone text-sm leading-relaxed">
              Alex leads protocol research at the NEAR Foundation, focusing on chain abstraction, cross-chain security, and the economics of decentralized networks. Previously at Ethereum Foundation and Protocol Labs.
            </p>
          </div>
        </div>

        {/* Share row */}
        <div className="reveal-up mt-10 flex items-center justify-between border-t border-border pt-8">
          <span className="font-mono text-xs text-stone tracking-widest uppercase">Share this article</span>
          <div className="flex gap-4">
            {['Twitter / X', 'LinkedIn', 'Copy Link'].map(p => (
              <button key={p} className="font-mono text-[11px] text-stone hover:text-accent transition-colors tracking-widest uppercase">
                {p}
              </button>
            ))}
          </div>
        </div>
      </article>

      {/* ── RELATED ARTICLES ── */}
      <section className="section-pad bg-surface">
        <div className="max-w-site mx-auto site-px">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-6 h-[1px] bg-stone/40" />
            <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">Continue Reading</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {RELATED.map((r, i) => (
              <div key={i} className="related-card border-draw group bg-surface hover:bg-bg transition-colors duration-200 overflow-hidden flex flex-col cursor-pointer relative">
                <MouseGradient />
                <div className="h-36" style={{ background: r.gradient }} />
                <div className="p-7 flex flex-col gap-4 flex-1 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded-sm">{r.tag}</span>
                    <span className="font-mono text-[10px] text-stone">{r.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-fg group-hover:text-accent transition-colors duration-200 leading-tight text-base">{r.title}</h3>
                  <div className="font-mono text-[10px] text-stone group-hover:text-accent transition-colors tracking-widest uppercase mt-auto">Read →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-bg relative overflow-hidden">
        <MouseGradient />
        <div className="relative z-10 max-w-site mx-auto site-px text-center">
          <h2 className="reveal-up font-display font-extrabold text-fg tracking-tighter mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 80px)' }}>
            Ready to build on NEAR?
          </h2>
          <p className="reveal-up font-body text-stone text-base leading-relaxed max-w-lg mx-auto mb-10">
            Everything you read about in this article is live on mainnet today. Your first dApp takes 15 minutes.
          </p>
          <div className="reveal-up flex flex-wrap items-center justify-center gap-5">
            <MagneticButton className="px-10 py-4 bg-accent text-bg font-display font-bold text-sm tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200">
              Start Building →
            </MagneticButton>
            <Link href="/showcase/page-3"
              className="font-mono text-xs text-stone tracking-widest uppercase hover:text-fg transition-colors duration-200">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
