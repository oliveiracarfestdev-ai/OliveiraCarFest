import { headers } from 'next/headers'

type RateLimit = {
  count: number
  lastReset: number
}

const rateLimits = new Map<string, RateLimit>()
const WINDOW_MS = 60 * 1000 // 1 minuto
const MAX_REQUESTS = 5

export async function rateLimit() {
  const headersList = await headers()
  // Em produção (ex: Vercel), o IP real vem no header x-forwarded-for
  const ip = headersList.get('x-forwarded-for') || '127.0.0.1'
  
  const now = Date.now()
  const record = rateLimits.get(ip)

  if (!record) {
    rateLimits.set(ip, { count: 1, lastReset: now })
    return { success: true }
  }

  if (now - record.lastReset > WINDOW_MS) {
    rateLimits.set(ip, { count: 1, lastReset: now })
    return { success: true }
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' }
  }

  record.count += 1
  return { success: true }
}
