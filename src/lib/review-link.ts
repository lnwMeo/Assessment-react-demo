// src/lib/review-link.ts
export type ReviewPayload = {
  prefix?: string
  fullName?: string
  affiliation?: string
  providerGroup?: string
  staff?: string[]
  description?: string
  items?: { id: string; name: string; price: number }[]
  total?: number
  photoDataUrl?: string
  createdAt?: string
}

export function encodePayload(payload: ReviewPayload) {
  const json = JSON.stringify(payload)
  // btoa รองรับ ascii เท่านั้น -> แปลง utf-8 ก่อน
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodePayload(encoded: string): ReviewPayload | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function buildReviewLink(payload: ReviewPayload) {
  const base = window.location.origin
  const d = encodePayload(payload)
  return `${base}/review?d=${d}`
}
