"use client"

import { Database, Zap, MessageSquare, Wallet, Layout } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const products = [
  {
    icon: Database,
    name: "Matra CRM",
    description: "Gerencie seus clientes de forma inteligente e escalável",
    originalPrice: "R$ 197",
    foguetePrice: "Incluído",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    name: "Strike Lead",
    description: "Gere leads no piloto automático com AI",
    originalPrice: "R$ 497",
    foguetePrice: "Incluído",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    name: "NotifyX",
    description: "Dispare mensagens pelo WhatsApp com eficiência",
    originalPrice: "R$ 197",
    foguetePrice: "Incluído",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Wallet,
    name: "FireBank",
    description: "Controle financeiro completo para sua empresa",
    originalPrice: "R$ 397",
    foguetePrice: "Incluído",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Layout,
    name: "Spotform",
    description: "Crie formulários modernos e integrados com IA",
    originalPrice: "R$ 147",
    foguetePrice: "Incluído",
    color: "from-indigo-500 to-blue-600",
  },
]

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
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

  const Icon = product.icon

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 100}ms`,
      }}
      className="group relative rounded-xl border border-border overflow-hidden bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <Icon className="w-8 h-8 text-accent" />
        </div>

        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-auto leading-relaxed">{product.description}</p>

        <div className="flex items-end justify-between pt-6 border-t border-border mt-6">
          <div>
            <p className="text-xs text-muted-foreground line-through mb-1">{product.originalPrice}/mês</p>
            <p className="text-accent font-bold text-lg">{product.foguetePrice}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-accent/70 font-semibold">INCLUSO</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const savingsRef = useRef<HTMLDivElement>(null)
  const [isSavingsVisible, setIsSavingsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSavingsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (savingsRef.current) observer.observe(savingsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="ferramentas" className="relative py-32 px-4 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 space-y-4">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest">Seu ecossistema completo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">5 ferramentas premium em um lugar</h2>
          <p className="text-lg text-muted-foreground">
            Todas essas ferramentas individualmente custariam mais de R$ 1.500/mês. No FogueteApp, estão todas
            incluídas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>

        <div
          ref={savingsRef}
          style={{
            opacity: isSavingsVisible ? 1 : 0,
            transform: isSavingsVisible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.8s ease-out",
          }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-8 text-center shadow-lg"
        >
          <p className="text-muted-foreground mb-3 font-medium">Economia mensal com FogueteApp:</p>
          <p className="text-5xl font-bold text-accent mb-2">R$ 1.535</p>
          <p className="text-muted-foreground">Todos os meses. Garantido.</p>
        </div>
      </div>
    </section>
  )
}
