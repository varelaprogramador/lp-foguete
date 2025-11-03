"use client"

import { Users, Zap, Award, Shield, BarChart3, Rocket } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const benefits = [
  {
    icon: BarChart3,
    title: "Economize até 40%",
    description: "Pague uma fração do que pagaria em planos individuais de cada ferramenta",
  },
  {
    icon: Zap,
    title: "Ativa em minutos",
    description: "Nenhuma configuração complexa. Comece a usar agora mesmo",
  },
  {
    icon: Users,
    title: "Comunidade de 5.000+",
    description: "Conecte com profissionais e empresas que crescem juntas",
  },
  {
    icon: Award,
    title: "Suporte prioritário 24/7",
    description: "Equipe especializada pronta para resolver suas dúvidas",
  },
  {
    icon: Shield,
    title: "100% seguro e compliant",
    description: "Todos dados criptografados, LGPD compliant, SSL 256-bit",
  },
  {
    icon: Rocket,
    title: "Crescimento garantido",
    description: "Ferramentas pensadas para escalar com seu negócio",
  },
]

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Icon = benefit.icon

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 100}ms`,
      }}
      className="group p-6 rounded-xl border border-border hover:border-accent/50 bg-card/30 hover:bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5b7dff]/10 to-[#2a4bbf]/10 group-hover:from-[#5b7dff]/20 group-hover:to-[#2a4bbf]/20 flex items-center justify-center transition-colors duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
    </div>
  )
}

export default function Benefits() {
  return (
    <section id="recursos" className="relative py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 space-y-4">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest">Por que FogueteApp</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Tudo que você precisa para crescer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Uma assinatura única, todas as ferramentas, suporte premium e comunidade exclusiva para impulsionar seu
            negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
