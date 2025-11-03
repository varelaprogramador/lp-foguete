"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { trackLead } from "@/lib/meta-pixel"

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  planName?: string
  planPrice?: string
  whatsappNumber: string
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  planName = "Plano Elon Musk",
  planPrice = "R$ 197",
  whatsappNumber,
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres"
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.name)) {
      newErrors.name = "Nome deve conter apenas letras"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido (ex: seu@email.com)"
    }

    // Validate phone (Brazilian format)
    const cleanPhone = formData.phone.replace(/\D/g, "")
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Telefone incompleto (mínimo 10 dígitos)"
    } else if (cleanPhone.length > 11) {
      newErrors.phone = "Telefone com muitos dígitos (máximo 11)"
    } else if (cleanPhone.length === 10 && !["2", "3", "4", "5"].includes(cleanPhone[2])) {
      newErrors.phone = "DDD ou número inválido"
    } else if (cleanPhone.length === 11 && cleanPhone[2] !== "9") {
      newErrors.phone = "Celular deve começar com 9"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhoneForWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    if (!cleanPhone.startsWith("55")) {
      return `55${cleanPhone}`
    }
    return cleanPhone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call (replace with your actual API endpoint)
    try {
      // Track lead event with Meta Pixel
      trackLead({
        content_name: planName,
        value: parseFloat(planPrice.replace(/\D/g, "")) / 100,
        currency: "BRL",
      })

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store lead data (you can send to your backend here)
      console.log("Lead captured:", formData)

      setIsSuccess(true)

      // Wait 1 second before redirecting
      setTimeout(() => {
        const message = `Olá! Sou ${formData.name}.\n\nEmail: ${formData.email}\nTelefone: ${formData.phone}\n\n✨ Quero garantir minha vaga no ${planName} por ${planPrice}! 🚀`
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")

        // Reset and close
        setTimeout(() => {
          setIsSuccess(false)
          setFormData({ name: "", email: "", phone: "" })
          onClose()
        }, 500)
      }, 1000)
    } catch (error) {
      console.error("Error capturing lead:", error)
      setErrors({ submit: "Erro ao enviar. Tente novamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatPhoneInput = (value: string) => {
    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, "")

    // Limita a 11 dígitos
    const limited = cleaned.slice(0, 11)

    // Aplica formatação progressiva
    if (limited.length === 0) return ""
    if (limited.length <= 2) return `(${limited}`
    if (limited.length <= 6) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    if (limited.length <= 10) {
      // Formato fixo: (XX) XXXX-XXXX
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6, 10)}`
    }
    // Formato celular: (XX) 9XXXX-XXXX
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`
  }

  const validatePhoneRealTime = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "")

    if (cleaned.length === 0) return ""
    if (cleaned.length < 10) return "Continue digitando..."
    if (cleaned.length === 10 && !["2", "3", "4", "5"].includes(cleaned[2])) {
      return "⚠️ Verifique o DDD ou número"
    }
    if (cleaned.length === 11 && cleaned[2] !== "9") {
      return "⚠️ Celular deve começar com 9"
    }
    if (cleaned.length >= 10) return "✓ Telefone válido"

    return ""
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {!isSuccess ? (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">🚀 Quase lá!</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Garanta Sua Vaga</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Preencha seus dados para continuar e garantir sua vaga no{" "}
                <span className="font-bold text-blue-600">{planName}</span>
              </p>
            </div>

            {/* Plan Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 mb-1">Você está garantindo:</p>
              <p className="text-lg font-black text-slate-900">{planName}</p>
              <p className="text-2xl font-black text-blue-600">{planPrice}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  placeholder="João Silva"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  placeholder="joao@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", formatPhoneInput(e.target.value))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : formData.phone && !errors.phone && formData.phone.replace(/\D/g, "").length >= 10
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    placeholder="(11) 98765-4321"
                    disabled={isSubmitting}
                    maxLength={15}
                  />
                  {formData.phone && !errors.phone && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {formData.phone.replace(/\D/g, "").length >= 10 ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : null}
                    </div>
                  )}
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                {!errors.phone && formData.phone && (
                  <p
                    className={`mt-1 text-xs ${formData.phone.replace(/\D/g, "").length >= 10 ? "text-green-600" : "text-slate-500"
                      }`}
                  >
                    {validatePhoneRealTime(formData.phone)}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 text-center">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-black text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </span>
                ) : (
                  "Continuar para WhatsApp"
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Ao continuar, você concorda em receber comunicações sobre esta oferta. Seus dados estão seguros conosco.
              </p>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Sucesso! 🎉</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Seus dados foram registrados com sucesso. Você será redirecionado para o WhatsApp em instantes...
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Abrindo WhatsApp...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
