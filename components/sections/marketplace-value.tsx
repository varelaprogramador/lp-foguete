"use client"

import { Zap, TrendingUp, Headphones, Bolt } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const valueProps = [
  {
    icon: TrendingUp,
    title: "Economize R$ 1.535/mês",
    description: "Todas essas ferramentas individualmente custam +R$ 1.535. Na FogueteApp, está tudo incluído",
  },
  {
    icon: Zap,
    title: "Integração perfeita",
    description: "Todos os SaaS conectados em um painel único e intuitivo. Nenhuma configuração",
  },
  {
    icon: Headphones,
    title: "Suporte especializado",
    description: "Equipe de experts pronta 24/7 para ajudar com implementação e otimização",
  },
  {
    icon: Bolt,
    title: "Comunidade exclusiva",
    description: "Rede de profissionais compartilhando estratégias e cases de sucesso",
  },
]

function ValueProp({ prop, index, isVisible }: { prop: (typeof valueProps)[0]; index: number; isVisible: boolean }) {
  const Icon = prop.icon

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 100}ms`,
      }}
      className="group relative p-6 rounded-xl border border-border bg-card/30 hover:bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="font-bold text-lg mb-2 text-foreground">{prop.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
    </div>
  )
}

export default function MarketplaceValue() {
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
    <section ref={sectionRef} className="relative py-32 px-4 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Sua solução completa chega aqui</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Uma assinatura, todas as respostas. Crescimento sem complicações.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <ValueProp key={index} prop={prop} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
