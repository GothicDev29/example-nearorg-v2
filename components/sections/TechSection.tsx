'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const NODES = [
  { id: 'core', label: 'NEAR Core', x: 260, y: 200, r: 48, main: true },
  { id: 's0', label: 'Shard 0', x: 90, y: 70, r: 32 },
  { id: 's1', label: 'Shard 1', x: 430, y: 70, r: 32 },
  { id: 's2', label: 'Shard 2', x: 90, y: 330, r: 32 },
  { id: 's3', label: 'Shard 3', x: 430, y: 330, r: 32 },
  { id: 'btc', label: 'Bitcoin', x: 30, y: 200, r: 24 },
  { id: 'eth', label: 'Ethereum', x: 490, y: 200, r: 24 },
]

const LINKS = [
  { from: 'core', to: 's0' },
  { from: 'core', to: 's1' },
  { from: 'core', to: 's2' },
  { from: 'core', to: 's3' },
  { from: 's0', to: 's1' },
  { from: 's2', to: 's3' },
  { from: 's0', to: 's2' },
  { from: 's1', to: 's3' },
  { from: 'core', to: 'btc' },
  { from: 'core', to: 'eth' },
]

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!
}

const TECH_STATS = [
  { value: '100K+', label: 'TPS theoretical' },
  { value: '<1s', label: 'Block finality' },
  { value: '~$0', label: 'Avg tx fee' },
  { value: '∞', label: 'Horizontal scale' },
]

export function TechSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.t-label', { opacity: 0, x: -14 })
      gsap.set('.t-headline', { opacity: 0, y: 28 })
      gsap.set('.t-path', { strokeDashoffset: 999 })
      gsap.set('.t-node-circle', { scale: 0, transformOrigin: 'center center' })
      gsap.set('.t-node-text', { opacity: 0 })
      gsap.set('.t-stat', { opacity: 0, y: 20 })
      gsap.set('.t-desc', { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.t-label', { opacity: 1, x: 0, duration: 0.6 })
          gsap.to('.t-headline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
          gsap.to('.t-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })

          // Draw paths sequentially
          const paths = gsap.utils.toArray<SVGPathElement>('.t-path')
          gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: 'power2.inOut',
            delay: 0.3,
          })

          // Pop nodes
          gsap.to('.t-node-circle', {
            scale: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: 'back.out(2)',
            delay: 0.6,
          })
          gsap.to('.t-node-text', {
            opacity: 1,
            duration: 0.4,
            stagger: 0.07,
            delay: 0.9,
          })

          // Stats
          gsap.to('.t-stat', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 1,
          })

          // Pulse animation on core node
          gsap.to('.t-core-pulse', {
            scale: 2.2,
            opacity: 0,
            duration: 1.6,
            repeat: -1,
            ease: 'power2.out',
            delay: 1.5,
            transformOrigin: 'center center',
          })

          // Shard pulse rings
          gsap.to('.t-shard-pulse', {
            scale: 1.8,
            opacity: 0,
            duration: 1.4,
            repeat: -1,
            stagger: 0.3,
            ease: 'power2.out',
            delay: 2,
            transformOrigin: 'center center',
          })
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="technology" className="section-pad bg-surface overflow-hidden">
      <div className="max-w-site mx-auto site-px">
        <div className="t-label flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-stone/40" />
          <span className="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            05 / Technology
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="t-headline font-display font-extrabold text-fg leading-[0.92] tracking-tighter mb-6"
              style={{ fontSize: 'clamp(36px, 4.5vw, 72px)' }}
            >
              Nightshade 2.0
              <br />
              <span className="text-accent">Infinite shards.</span>
            </h2>
            <p className="t-desc font-body text-stone text-base leading-relaxed mb-12">
              NEAR's sharding architecture splits the network into parallel lanes. Each shard
              processes transactions independently, then syncs with the core. As demand grows,
              NEAR adds lanes — automatically, without forks, without downtime.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              {TECH_STATS.map((s) => (
                <div key={s.label} className="t-stat">
                  <div className="font-mono font-medium text-fg" style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-[11px] text-stone tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: SVG diagram */}
          <div className="relative">
            <svg
              viewBox="0 0 520 400"
              className="w-full max-w-lg mx-auto"
              style={{ filter: 'drop-shadow(0 0 40px var(--accent))' }}
            >
              {/* Connection lines */}
              {LINKS.map((link, i) => {
                const from = getNode(link.from)
                const to = getNode(link.to)
                const len = Math.hypot(to.x - from.x, to.y - from.y)
                return (
                  <path
                    key={i}
                    className="t-path"
                    d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    stroke="var(--accent)"
                    strokeWidth={link.from === 'core' || link.to === 'core' ? 1.5 : 0.8}
                    strokeOpacity={link.from === 'core' || link.to === 'core' ? 0.5 : 0.25}
                    fill="none"
                    strokeDasharray={len}
                    strokeDashoffset={len}
                  />
                )
              })}

              {/* Nodes */}
              {NODES.map((node) => (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  {/* Pulse rings */}
                  {node.main ? (
                    <circle
                      className="t-core-pulse"
                      r={node.r}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                  ) : (
                    <circle
                      className="t-shard-pulse"
                      r={node.r}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="0.8"
                      opacity="0.4"
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    className="t-node-circle"
                    r={node.r}
                    fill={node.main ? 'var(--accent)' : 'var(--surface)'}
                    stroke="var(--accent)"
                    strokeWidth={node.main ? 0 : 1}
                    opacity={node.main ? 1 : 0.8}
                  />

                  {/* Label */}
                  <text
                    className="t-node-text"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.main ? 'var(--bg)' : 'var(--fg)'}
                    fontSize={node.main ? '11' : node.r < 28 ? '8' : '9'}
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
