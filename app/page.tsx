"use client"

import Header from "@/components/sections/header"
import Hero from "@/components/sections/hero"
import VideoPlayer from "@/components/video-player"
import MarketplaceValue from "@/components/sections/marketplace-value"
import Products from "@/components/sections/products"
import Benefits from "@/components/sections/benefits"
import HowItWorks from "@/components/sections/how-it-works"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"
import FinalCTA from "@/components/sections/final-cta"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <section className="container mx-auto px-4 py-12 md:py-16">
        <VideoPlayer />
      </section>
      <MarketplaceValue />
      <Products />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
