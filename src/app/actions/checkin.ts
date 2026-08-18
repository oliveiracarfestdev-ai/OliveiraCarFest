'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/auth-guard'
import { revalidatePath } from 'next/cache'

export async function checkInExhibitor(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  // Find the exhibitor lead
  const { data: lead, error: fetchError } = await supabase
    .from('exhibitor_leads')
    .select('id, status, checked_in_at, owner_name')
    .eq('id', id)
    .single()

  if (fetchError || !lead) {
    return { error: 'Expositor não encontrado.' }
  }

  if (lead.status !== 'aprovado') {
    return { error: `Expositor encontrado, mas o status é "${lead.status}". Apenas aprovados podem entrar.` }
  }

  if (lead.checked_in_at) {
    return { error: `O expositor ${lead.owner_name} já realizou o check-in anteriormente.` }
  }

  const { error: updateError } = await supabase
    .from('exhibitor_leads')
    .update({ checked_in_at: new Date().toISOString() })
    .eq('id', id)

  if (updateError) {
    return { error: 'Erro ao registrar check-in.' }
  }

  revalidatePath('/admin/validacao')
  return { success: true, message: `Check-in de ${lead.owner_name} realizado com sucesso!` }
}
