"use client"

import { useEffect, useRef, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

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

    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-background border-t border-border py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out",
            }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg text-foreground">FogueteApp</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O ecossistema completo para escalar seu negócio com ferramentas premium.
            </p>
          </div>

          {/* Product column */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.1s",
            }}
            className="space-y-4"
          >
            <h4 className="font-bold text-foreground">Produto</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <a href="#recursos" className="hover:text-accent transition-colors duration-300">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#preco" className="hover:text-accent transition-colors duration-300">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Segurança
                </a>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.2s",
            }}
            className="space-y-4"
          >
            <h4 className="font-bold text-foreground">Empresa</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.3s",
            }}
            className="space-y-4"
          >
            <h4 className="font-bold text-foreground">Legal</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm">© {currentYear} FogueteApp. Todos os direitos reservados.</p>
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.4s",
              }}
              className="flex gap-6"
            >
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm font-medium"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm font-medium"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm font-medium"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
