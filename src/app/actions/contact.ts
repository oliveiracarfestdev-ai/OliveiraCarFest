'use server'

import { createClient } from '@/lib/supabase/server'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'
import { rateLimit } from '@/lib/rate-limit'

export async function submitContactForm(data: ContactFormData) {
  const rateLimitResult = await rateLimit()
  if (!rateLimitResult.success) {
    return { success: false, error: rateLimitResult.error }
  }

  try {
    const validatedData = contactSchema.parse(data)
    const supabase = await createClient()

    const { error } = await supabase.from('contact_messages').insert({
      name: validatedData.name,
      email: validatedData.email,
      message: `[Assunto: ${validatedData.subject || 'geral'}]\n\n${validatedData.message}`,
    })

    if (error) {
      console.error('Erro interno ao inserir mensagem de contato no banco')
      return { success: false, error: 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Erro de validação ou erro interno no contato')
    return { success: false, error: 'Erro de validação. Verifique os campos e tente novamente.' }
  }
}
