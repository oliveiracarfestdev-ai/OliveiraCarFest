'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'
import { rateLimit } from '@/lib/rate-limit'
import { sanitizeHtml } from '@/lib/sanitize'

const exhibitorSchema = z.object({
  event_id: z.string().min(1, 'Selecione um evento'),
  owner_name: z.string().min(2, 'Nome é obrigatório').transform(sanitizeHtml),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'WhatsApp é obrigatório'),
  car_plate: z.string().min(7, 'Placa é obrigatória (ex: ABC1234)').transform(sanitizeHtml),
  car_model: z.string().min(2, 'Modelo do carro é obrigatório').transform(sanitizeHtml),
  car_year: z.string().min(4, 'Ano é obrigatório').transform(sanitizeHtml),
  modifications: z.string().min(5, 'Descreva as modificações (mínimo 5 caracteres)').transform(sanitizeHtml),
  instagram: z.string().min(2, 'Instagram é obrigatório (@)').transform(sanitizeHtml),
  donation_choice: z.string().optional().transform(v => v ? sanitizeHtml(v) : null),
})

export async function createExhibitorLead(formData: FormData) {
  const rateLimitResult = await rateLimit()
  if (!rateLimitResult.success) {
    return { error: rateLimitResult.error }
  }

  const data = Object.fromEntries(formData.entries())
  
  const validated = exhibitorSchema.safeParse(data)
  
  if (!validated.success) {
    return { 
      error: 'Por favor, preencha todos os campos corretamente.',
      details: validated.error.flatten().fieldErrors 
    }
  }

  const supabase = await createClient()

  // PREVENIR INSCRIÇÃO DUPLICADA
  const { data: existingLead } = await supabase
    .from('exhibitor_leads')
    .select('id')
    .eq('event_id', validated.data.event_id)
    .eq('car_plate', validated.data.car_plate)
    .single()

  if (existingLead) {
    return { error: 'Este veículo (placa) já possui uma inscrição para este evento.' }
  }

  let car_photo_url = null
  const photoFile = formData.get('car_photo') as File
  if (photoFile && photoFile.size > 0) {
    try {
      const path = `photos/${Date.now()}_${photoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      car_photo_url = await uploadFile('exhibitor-cars', photoFile, path)
    } catch (e: any) {
      console.error('Upload Error:', e)
      return { error: e.message || 'Erro ao fazer upload da imagem do carro. Tente novamente.' }
    }
  }

  const { error } = await supabase
    .from('exhibitor_leads')
    .insert([{ ...validated.data, car_photo_url }])

  if (error) {
    console.error('Erro interno ao inserir lead de expositor')
    return { error: 'Ocorreu um erro ao enviar sua inscrição. Tente novamente.' }
  }

  return { success: true }
}

export async function updateExhibitorStatus(id: string, status: 'aprovado' | 'rejeitado' | 'pendente') {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('exhibitor_leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    return { error: 'Erro ao atualizar status.' }
  }

  revalidatePath('/admin/expositores')
  return { success: true }
}

export async function deleteExhibitorLead(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('exhibitor_leads')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: 'Erro ao excluir inscrição.' }
  }

  revalidatePath('/admin/expositores')
  return { success: true }
}
