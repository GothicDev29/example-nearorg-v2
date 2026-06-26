import type { Metadata } from 'next'
import { Syne, Inter, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CursorEffect } from '@/components/ui/CursorEffect'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NEAR — Redesign Showcase',
  description: 'Exploring new directions for the open web.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>
            <CursorEffect />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
