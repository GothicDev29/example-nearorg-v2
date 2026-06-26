'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-16 h-5" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="group flex items-center gap-2.5 font-mono text-xs text-stone hover:text-fg transition-colors duration-200"
    >
      <span className="relative w-9 h-5 rounded-full border border-border bg-surface transition-colors duration-300 group-hover:border-accent">
        <span
          className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-accent transition-transform duration-300"
          style={{ transform: isDark ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </span>
      <span className="tracking-widest uppercase">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
