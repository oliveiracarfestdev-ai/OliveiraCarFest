'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { rateLimit } from '@/lib/rate-limit'
import crypto from 'crypto'

const SECRET = process.env.PORTAL_SESSION_SECRET || (process.env.NODE_ENV !== 'production' ? 'default_dev_secret_please_change' : '')

if (!SECRET) {
  throw new Error('A variável de ambiente PORTAL_SESSION_SECRET é obrigatória em produção.')
}

function signSession(data: string) {
  const hmac = crypto.createHmac('sha256', SECRET)
  hmac.update(data)
  return `${data}.${hmac.digest('hex')}`
}

function verifySession(signedData: string) {
  const lastDot = signedData.lastIndexOf('.')
  if (lastDot === -1) return null
  
  const data = signedData.substring(0, lastDot)
  const signature = signedData.substring(lastDot + 1)
  
  const hmac = crypto.createHmac('sha256', SECRET)
  hmac.update(data)
  
  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac.digest('hex')))) {
    return data
  }
  return null
}

export async function loginToPortal(formData: FormData) {
  const rateLimitResult = await rateLimit()
  if (!rateLimitResult.success) {
    return { error: rateLimitResult.error }
  }

  const car_plate = formData.get('car_plate') as string
  const phone = formData.get('phone') as string

  if (!car_plate || !phone) {
    return { error: 'Placa e WhatsApp são obrigatórios.' }
  }

  const supabase = await createClient()

  // Buscar leads aprovados pela placa
  const { data: leads, error } = await supabase
    .from('exhibitor_leads')
    .select('id, status, car_plate, phone')
    .ilike('car_plate', car_plate.trim())
    .eq('status', 'aprovado')

  if (error || !leads || leads.length === 0) {
    return { error: 'Acesso não autorizado. Seu projeto ainda pode estar em análise, não foi encontrado ou as credenciais estão incorretas.' }
  }

  // Encontrar o lead com o telefone correspondente (ignorando formatação)
  const cleanInputPhone = phone.replace(/\D/g, '')
  const matchedLead = leads.find(lead => {
    const cleanDbPhone = lead.phone.replace(/\D/g, '')
    return cleanDbPhone === cleanInputPhone
  })

  if (!matchedLead) {
    return { error: 'Acesso não autorizado. Seu projeto ainda pode estar em análise, não foi encontrado ou as credenciais estão incorretas.' }
  }

  // Criar cookie de sessão com a placa e telefone exatos do banco
  const sessionData = JSON.stringify({ plate: matchedLead.car_plate, phone: matchedLead.phone })
  const signedSession = signSession(sessionData)
  
  const cookieStore = await cookies()
  cookieStore.set('portal_session', signedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  redirect('/portal/dashboard')
}

export async function logoutPortal() {
  const cookieStore = await cookies()
  cookieStore.delete('portal_session')
  redirect('/portal')
}

export async function getPortalSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('portal_session')

  if (!sessionCookie) {
    return null
  }

  try {
    const verifiedData = verifySession(sessionCookie.value)
    if (!verifiedData) return null
    
    const session = JSON.parse(verifiedData)
    
    // Validate session against DB
    const supabase = await createClient()
    const { data: leads } = await supabase
      .from('exhibitor_leads')
      .select('*, events(title, date, location)')
      .eq('car_plate', session.plate)
      .eq('phone', session.phone)
      .eq('status', 'aprovado')
      .order('created_at', { ascending: false })

    if (!leads || leads.length === 0) return null
    return leads

  } catch (e) {
    return null
  }
}
