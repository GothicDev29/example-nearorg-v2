'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin()

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { contextSafe } = useGSAP({ scope: buttonRef })

  const onMove = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = buttonRef.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: 'power2.out',
    })
  })

  const onLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
    })
  })

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </button>
  )
}
