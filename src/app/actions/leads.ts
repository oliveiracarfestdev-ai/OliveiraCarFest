'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/supabase/auth-guard'

export async function deleteContactMessage(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  await supabase.from('contact_messages').delete().eq('id', id)
  revalidatePath('/admin/leads')
}

export async function deleteSponsorLead(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  await supabase.from('sponsor_leads').delete().eq('id', id)
  revalidatePath('/admin/leads')
}

export async function resolveSponsorLead(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  await supabase.from('sponsor_leads').update({ status: 'resolvido' }).eq('id', id)
  revalidatePath('/admin/leads')
}
