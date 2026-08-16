'use server'

import { createClient } from '@/lib/supabase/server'
import { sponsorSchema, SponsorFormData } from '@/lib/validations/sponsor'
import { rateLimit } from '@/lib/rate-limit'

export async function submitSponsorLead(data: SponsorFormData) {
  const rateLimitResult = await rateLimit()
  if (!rateLimitResult.success) {
    return { success: false, error: rateLimitResult.error }
  }

  try {
    const validatedData = sponsorSchema.parse(data)
    const supabase = await createClient()

    const { error } = await supabase.from('sponsor_leads').insert({
      company: validatedData.company,
      contact_person: validatedData.contact_person,
      phone: validatedData.phone,
      email: validatedData.email,
      message: validatedData.message || '',
      status: 'pendente'
    })

    if (error) {
      console.error('Erro interno ao inserir lead de patrocinador')
      return { success: false, error: 'Ocorreu um erro ao enviar sua intenção. Tente novamente mais tarde.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Erro de validação ou erro interno no patrocínio')
    return { success: false, error: 'Erro de validação. Verifique os campos e tente novamente.' }
  }
}
