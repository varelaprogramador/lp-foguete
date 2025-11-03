"use client"

import { Play } from "lucide-react"
import { useState, useEffect } from "react"

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <p
              className={`text-blue-600 font-bold text-sm uppercase tracking-widest transition-all duration-700 ${isMounted ? "opacity-100" : "opacity-0"
                }`}
            >
              Chega de gastar 1.500+ por mês em ferramentas separadas
            </p>

            <h1
              className={`text-5xl md:text-7xl font-black leading-tight text-balance transition-all duration-700 delay-100 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              Uma assinatura. Tudo que você precisa.
            </h1>

            <p
              className={`text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              SoftHub é a Netflix de software profissional. Acesse 20+ ferramentas premium com uma única assinatura.
              Economize até 80% vs. planos individuais.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isMounted ? "opacity-100" : "opacity-0"
              }`}
          >
            <a
              href="https://wa.me/?text=Ola,%20Quero%20saber%20mais%20do%20foguete%20App!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-base hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            >
              {"Quero Assinar Agora"}
            </a>

          </div>

          <div
            className={`text-center text-slate-600 text-sm space-y-3 transition-all duration-700 delay-400 ${isMounted ? "opacity-100" : "opacity-0"
              }`}
          >
            <p className="font-semibold text-slate-900">✓ 10.000+ profissionais já economizando</p>
            <p>Suporte 24/7 • Cancelamento simples</p>
          </div>
        </div>


      </div>
    </section>
  )
}
