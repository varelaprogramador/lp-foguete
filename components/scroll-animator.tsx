"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimatorProps {
  children: React.ReactNode
  className?: string
  animation?: "slide-up" | "slide-left" | "slide-right" | "scale"
  delay?: number
}

export function ScrollAnimator({ children, className = "", animation = "slide-up", delay = 0 }: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute(
            "style",
            `animation: ${
              animation === "slide-up"
                ? "slideInUp"
                : animation === "slide-left"
                  ? "slideInLeft"
                  : animation === "slide-right"
                    ? "slideInRight"
                    : "scaleIn"
            } 0.6s ease-out forwards; animation-delay: ${delay}ms;`,
          )
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animation, delay])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
