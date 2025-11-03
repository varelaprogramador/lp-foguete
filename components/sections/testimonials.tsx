"use client"

import { Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const testimonials = [
  {
    quote: "O melhor investimento que fiz pro meu negócio!",
    author: "João Silva",
    role: "Empreendedor Digital",
  },
  {
    quote: "Economizei mais de R$400 no primeiro mês.",
    author: "Maria Santos",
    role: "Proprietária de Agência",
  },
  {
    quote: "Tudo integrado, rápido e fácil de usar.",
    author: "Pedro Costa",
    role: "Consultor de Negócios",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
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
    <section ref={sectionRef} className="relative py-32 px-4 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-4xl mx-auto">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance text-foreground">
            Quem já decolou com o Foguete App
          </h2>
        </div>

        <div className="relative min-h-64 flex flex-col justify-center">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease-out 0.2s",
            }}
            className="space-y-6"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <div className="min-h-20">
              <p className="text-2xl md:text-3xl font-bold leading-relaxed text-balance">
                "{testimonials[current].quote}"
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-lg text-foreground">{testimonials[current].author}</p>
              <p className="text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? "bg-accent w-8" : "bg-border hover:bg-border/80 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
