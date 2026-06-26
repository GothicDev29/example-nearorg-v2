'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

const NAV = [
  { label: 'Mission', href: '#mission' },
  { label: 'Products', href: '#products' },
  { label: 'Technology', href: '#technology' },
  { label: 'Ecosystem', href: '#ecosystem' },
]

export function Header({ showBack = false }: { showBack?: boolean }) {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.6 }
    )

    const trigger = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => setScrolled(self.progress > 0),
    })

    return () => trigger.kill()
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(var(--bg-raw, 8,8,7), 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-site mx-auto site-px py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-display font-extrabold text-xl tracking-tighter text-fg hover:text-accent transition-colors duration-200"
          >
            N.
          </Link>
          {showBack && (
            <Link
              href="/"
              className="font-mono text-xs text-stone hover:text-fg transition-colors duration-200 tracking-widest uppercase"
            >
              ← Showcase
            </Link>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {!showBack && NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-stone hover:text-fg transition-colors duration-200 tracking-widest uppercase"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          {!showBack && (
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-display font-bold text-xs tracking-wide rounded-sm hover:bg-accent-pop transition-colors duration-200"
            >
              Get Started
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
