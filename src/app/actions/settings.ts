'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/auth-guard'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single()
    
  if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
    console.error('Erro ao buscar configurações:', error)
    return { exclusive_cars_count: 0, official_partners_count: 0 }
  }
  
  return data || { exclusive_cars_count: 0, official_partners_count: 0 }
}

export async function updateSettings(formData: FormData) {
  await requireAdmin()
  
  const exclusiveCars = parseInt(formData.get('exclusive_cars_count') as string) || 0
  const officialPartners = parseInt(formData.get('official_partners_count') as string) || 0
  
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('site_settings')
    .update({
      exclusive_cars_count: exclusiveCars,
      official_partners_count: officialPartners,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)
    
  if (error) {
    return { error: 'Erro ao atualizar as configurações. ' + error.message }
  }
  
  revalidatePath('/')
  revalidatePath('/admin/configuracoes')
  
  return { success: true }
}
