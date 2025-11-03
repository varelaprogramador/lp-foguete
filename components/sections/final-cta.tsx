"use client"

import { useEffect, useRef, useState } from "react"

export default function FinalCTA() {
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
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out",
          }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-black text-balance text-slate-900 leading-tight">
            A escolha é sua.
          </h2>

          <p className="text-xl md:text-2xl text-slate-700 text-balance leading-relaxed font-semibold">
            Continue pagando caro em 10 ferramentas diferentes.
          </p>

          <p className="text-xl md:text-2xl text-blue-600 text-balance leading-relaxed font-black">
            Ou comece hoje e economize 80% imediatamente.
          </p>
        </div>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
          className="space-y-8 pt-8"
        >
          <p className="text-lg text-slate-700 leading-relaxed font-semibold">
            SoftHub é usado por 10.000+ profissionais para gerenciar seus negócios mais rápido.
          </p>

          <a
            href="https://wa.me/?text=Ola,%20Quero%20saber%20mais%20do%20foguete%20App!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            Falar com um Vendedor Agora
          </a>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Resposta em até 2 horas • Suporte dedicado • Sem compromisso
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-center text-slate-600 text-sm">
          <a href="#" className="hover:text-blue-600 transition-colors duration-300 font-medium">
            Privacidade
          </a>
          <span className="hidden sm:block">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors duration-300 font-medium">
            Termos
          </a>
          <span className="hidden sm:block">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors duration-300 font-medium">
            Contato
          </a>
        </div>
      </div>
    </section>
  )
}
