// Meta Pixel tracking utility functions

type EventName =
  | "AddPaymentInfo"
  | "AddToCart"
  | "AddToWishlist"
  | "CompleteRegistration"
  | "Contact"
  | "CustomizeProduct"
  | "Donate"
  | "FindLocation"
  | "InitiateCheckout"
  | "Lead"
  | "Purchase"
  | "Schedule"
  | "Search"
  | "StartTrial"
  | "SubmitApplication"
  | "Subscribe"
  | "ViewContent"

type EventParams = {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  contents?: Array<{ id: string; quantity: number }>
  currency?: string
  value?: number
  predicted_ltv?: number
  num_items?: number
  search_string?: string
  status?: string
  [key: string]: any
}

/**
 * Track a standard Meta Pixel event
 * @param eventName - Standard event name
 * @param params - Event parameters
 */
export const trackEvent = (eventName: EventName, params?: EventParams) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName, params)
  }
}

/**
 * Track a custom Meta Pixel event
 * @param eventName - Custom event name
 * @param params - Event parameters
 */
export const trackCustomEvent = (eventName: string, params?: EventParams) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("trackCustom", eventName, params)
  }
}

/**
 * Track page view (usually called automatically)
 */
export const trackPageView = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", "PageView")
  }
}

// Common event helpers

export const trackLead = (params?: EventParams) => {
  trackEvent("Lead", params)
}

export const trackPurchase = (value: number, currency = "BRL", params?: EventParams) => {
  trackEvent("Purchase", {
    value,
    currency,
    ...params,
  })
}

export const trackAddToCart = (contentName: string, value: number, currency = "BRL", params?: EventParams) => {
  trackEvent("AddToCart", {
    content_name: contentName,
    value,
    currency,
    ...params,
  })
}

export const trackInitiateCheckout = (value: number, currency = "BRL", params?: EventParams) => {
  trackEvent("InitiateCheckout", {
    value,
    currency,
    ...params,
  })
}

export const trackViewContent = (contentName: string, params?: EventParams) => {
  trackEvent("ViewContent", {
    content_name: contentName,
    ...params,
  })
}

export const trackContact = (params?: EventParams) => {
  trackEvent("Contact", params)
}

export const trackStartTrial = (value?: number, currency = "BRL", params?: EventParams) => {
  trackEvent("StartTrial", {
    value,
    currency,
    ...params,
  })
}

export const trackSubscribe = (value?: number, currency = "BRL", params?: EventParams) => {
  trackEvent("Subscribe", {
    value,
    currency,
    ...params,
  })
}
