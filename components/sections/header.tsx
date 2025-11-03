"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import LeadCaptureModal from "@/components/lead-capture-modal"
import config from "@/lib/config"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="FogueteApp"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-foreground">FogueteApp</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#recursos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Recursos
          </Link>
          <Link
            href="#ferramentas"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Ferramentas
          </Link>
          <Link
            href="#preco"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Preços
          </Link>
          <Link
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            FAQ
          </Link>
        </div>



        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={config.pricing.planName}
        planPrice={config.pricing.promoPrice}
        whatsappNumber={config.whatsapp.number}
      />
    </header>
  )
}
