'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'

const sponsorSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  category: z.enum(['ouro', 'prata', 'bronze', 'parceiro']),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
  instagram_url: z.string().url('URL inválida').optional().or(z.literal('')),
})

export async function createSponsor(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category'),
    website_url: formData.get('website_url') as string,
    instagram_url: formData.get('instagram_url') as string,
  }

  const parsed = sponsorSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  let logo_url = ''
  const logoFile = formData.get('logo') as File
  if (logoFile && logoFile.size > 0) {
    try {
      const path = `sponsors/${Date.now()}_${logoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      logo_url = await uploadFile('sponsor-logos', logoFile, path)
    } catch (e) {
      return { error: 'Erro ao fazer upload do logo' }
    }
  }

  const { error } = await supabase.from('sponsors').insert({
    name: parsed.data.name,
    category: parsed.data.category,
    website_url: parsed.data.website_url || '',
    instagram_url: parsed.data.instagram_url || '',
    description: '',
    logo_url,
  })

  if (error) {
    console.error(error)
    return { error: 'Erro ao salvar no banco de dados' }
  }

  revalidatePath('/admin/patrocinadores')
  revalidatePath('/patrocinadores')
  redirect('/admin/patrocinadores')
}

export async function deleteSponsor(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('sponsors').delete().eq('id', id)
  
  if (error) {
    return { error: 'Erro ao deletar' }
  }
  
  revalidatePath('/admin/patrocinadores')
  revalidatePath('/patrocinadores')
  return { success: true }
}
