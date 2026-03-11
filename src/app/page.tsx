'use client'

import { useState } from 'react'
import LeadModal from '@/components/landing/LeadModal'
import HeroSection from '@/components/landing/HeroSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import ModulesSection from '@/components/landing/ModulesSection'
import SocialProofSection from '@/components/landing/SocialProofSection'
import FinalCTA from '@/components/landing/FinalCTA'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <HeroSection onCTA={() => setModalOpen(true)} />
      <BenefitsSection />
      <ModulesSection />
      <SocialProofSection />
      <FinalCTA onCTA={() => setModalOpen(true)} />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  )
}
