"use client"

import { Check, Rocket } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Foguete",
    price: "R$ 47",
    period: "/mês",
    description: "Para quem está começando",
    popular: false,
    badge: "Até 15% de desconto extra",
    features: ["Acesso a ofertas exclusivas", "Suporte prioritário", "Comunidade exclusiva", "Onboarding guiado"],
    cta: "Falar com Vendedor",
  },
  {
    name: "Jato Particular",
    price: "R$ 97",
    period: "/mês",
    description: "Para profissionais sérios",
    popular: true,
    badge: "Até 25% de desconto extra",
    features: [
      "Acesso antecipado a lançamentos",
      "Consultoria mensal gratuita",
      "Tudo do plano Foguete",
      "API access ilimitado",
      "Integrações avançadas",
      "Analytics detalhado",
    ],
    cta: "Falar com Vendedor",
  },
  {
    name: "Elon Musk",
    price: "R$ 197",
    period: "/semana",
    description: "Para visionários",
    popular: false,
    badge: "Até 40% de desconto extra",
    features: [
      "Desenvolvimento personalizado",
      "Consultoria semanal 1:1",
      "Tudo dos planos anteriores",
      "Suporte 24/7 dedicado",
      "Gestor de conta pessoal",
      "Prioridade máxima",
    ],
    cta: "Agendar Demo",
  },
]

function PricingCard({ plan, index, isVisible }: { plan: (typeof plans)[0]; index: number; isVisible: boolean }) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 150}ms`,
      }}
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        plan.popular
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-2xl shadow-blue-600/20 md:scale-105 md:-translate-y-4"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg"
      }`}
    >
      {plan.popular && <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>}

      <div className="p-8">
        {plan.popular && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
            <Rocket size={14} className="text-blue-600" />
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mais Escolhido</p>
          </div>
        )}
        {plan.badge && !plan.popular && (
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">{plan.badge}</p>
          </div>
        )}

        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
        <p className="text-slate-600 text-sm mb-8 leading-relaxed">{plan.description}</p>

        <div className="mb-8 pb-8 border-b border-slate-200">
          <span className="text-5xl font-black text-slate-900">{plan.price}</span>
          {plan.period && <span className="text-slate-600 ml-2 text-lg">{plan.period}</span>}
        </div>

        <button
          className={`w-full py-3 px-6 rounded-lg font-bold mb-8 transition-all duration-300 ${
            plan.popular
              ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0"
              : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100"
          }`}
          onClick={() => {
            const message = `Ola, Quero saber mais do ${plan.name} App!`
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, "_blank")
          }}
        >
          {plan.cta}
        </button>

        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 leading-relaxed font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Pricing() {
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
    <section ref={sectionRef} id="preco" className="relative py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Escolha seu caminho</p>
          <h2 className="text-4xl md:text-5xl font-black text-balance text-slate-900">Planos que crescem com você</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Acesso imediato. Faturamento transparente. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div className="text-center text-slate-600 text-sm space-y-2">
          <p className="font-semibold">🔥 Milhares de profissionais já estão aqui - não fique para trás</p>
          <p>✓ Satisfação garantida | ✓ Cancelamento instant | ✓ Zero arrependimento</p>
        </div>
      </div>
    </section>
  )
}
