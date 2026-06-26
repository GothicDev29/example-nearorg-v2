import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { NumbersSection } from '@/components/sections/NumbersSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { TechSection } from '@/components/sections/TechSection'
import { BuildersSection } from '@/components/sections/BuildersSection'
import { FutureSection } from '@/components/sections/FutureSection'
import { CTASection } from '@/components/sections/CTASection'

export const metadata = {
  title: 'NEAR — Homepage Concept · Showcase 01',
  description: 'A visual exploration of a reimagined NEAR Protocol homepage.',
}

export default function Page1() {
  return (
    <main>
      <Header showBack />
      <HeroSection />
      <ManifestoSection />
      <NumbersSection />
      <ProductsSection />
      <TechSection />
      <BuildersSection />
      <FutureSection />
      <CTASection />
    </main>
  )
}
