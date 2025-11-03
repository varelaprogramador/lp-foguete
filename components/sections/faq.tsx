"use client"

import { ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const faqs = [
  {
    question: "Como funciona o acesso aos SaaS?",
    answer:
      "Após se inscrever, você recebe acesso instantâneo a todos os 5 SaaS através do seu painel FogueteApp. Cada ferramenta está pré-configurada para trabalhar em harmonia com as outras.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Sem perguntas, sem multas. Você pode cancelar sua assinatura com um clique. Se não gostou nos primeiros 7 dias, devolvemos 100% do seu dinheiro.",
  },
  {
    question: "Qual é a diferença entre os planos?",
    answer:
      "Todos os planos incluem acesso a todos os 5 SaaS. A diferença está no suporte, número de workspaces, descontos adicionais e consultoria. Comece com Profissional e mude quando precisar.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer:
      "Se nos primeiros 7 dias você não ficar 100% satisfeito, devolvemos todo o valor pago. Sem necessidade de explicar o motivo.",
  },
  {
    question: "Posso fazer upgrade ou downgrade?",
    answer:
      "Claro! Você pode mudar de plano a qualquer momento. Se fizer upgrade no meio do mês, cobraremos apenas a diferença proporcional.",
  },
  {
    question: "Vocês oferecem suporte em português?",
    answer:
      "Sim! Oferecemos suporte 100% em português. Nosso time está disponível por email, chat e telefone para esclarecer dúvidas.",
  },
]

function FAQItem({ faq, index, isOpen, onToggle, isVisible }: any) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease-out ${index * 75}ms`,
      }}
      className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-accent/30"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
      >
        <h3 className="font-bold text-base text-left text-foreground">{faq.question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-5 bg-secondary/20 border-t border-border text-muted-foreground leading-relaxed animate-in fade-in duration-300">
          {faq.answer}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
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
    <section ref={sectionRef} id="faq" className="relative py-32 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-20 text-center space-y-4">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest">Dúvidas?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Perguntas frequentes</h2>
        </div>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={open === index}
              onToggle={() => setOpen(open === index ? null : index)}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.6s",
          }}
          className="p-8 rounded-xl border border-border bg-card/50 text-center shadow-sm"
        >
          <p className="text-muted-foreground mb-3 font-medium">Ainda não encontrou resposta?</p>
          <p className="font-bold text-lg mb-6 text-foreground">Entre em contato com nosso time</p>
          <button className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-bold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1">
            Enviar mensagem
          </button>
        </div>
      </div>
    </section>
  )
}
