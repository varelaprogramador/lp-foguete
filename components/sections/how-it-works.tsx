"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Escolha seu plano",
    description: "Defina o acesso ideal para seu momento",
  },
  {
    number: "02",
    title: "Acesse imediatamente",
    description: "Todos os SaaS liberados na hora",
  },
  {
    number: "03",
    title: "Cresça com suporte",
    description: "E evolua junto com a comunidade",
  },
]

function StepCard({ step, index, isVisible }: { step: (typeof steps)[0]; index: number; isVisible: boolean }) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : index === 0
            ? "translateX(-30px)"
            : index === 2
              ? "translateX(30px)"
              : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 150}ms`,
      }}
      className="group relative flex-1"
    >
      <div className="relative z-10 flex items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 flex items-center justify-center font-bold text-2xl text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {step.number}
        </div>
        <div className="pt-2">
          <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>

      {index < steps.length - 1 && (
        <ArrowRight className="absolute -right-8 top-6 w-6 h-6 text-accent/50 hidden lg:block" />
      )}
    </div>
  )
}

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Como o FogueteApp impulsiona o seu negócio</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 mb-20 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div className="text-center">
          <button
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.9)",
              transition: "all 0.6s ease-out 0.6s",
            }}
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-base hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1"
          >
            Ver planos disponíveis
          </button>
        </div>
      </div>
    </section>
  )
}
