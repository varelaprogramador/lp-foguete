// Global configuration file

export const config = {
  // WhatsApp Configuration
  whatsapp: {
    // Add your WhatsApp number with country code (e.g., 5511999999999)
    // Format: Country code + Area code + Number (no spaces or special characters)
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999",
  },

  // Company Information
  company: {
    name: "Foguete App",
    email: "contato@fogueteapp.com",
    supportEmail: "suporte@fogueteapp.com",
  },

  // Pricing
  pricing: {
    planName: "Elon Musk",
    originalPrice: "R$ 597",
    promoPrice: "R$ 297",
    discount: "50% OFF",
  },

  // Social Links (optional)
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
  },
}

export default config
