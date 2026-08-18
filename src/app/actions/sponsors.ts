'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'

const sponsorSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  category: z.enum(['ouro', 'prata', 'bronze', 'parceiro']),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
  instagram_url: z.string().url('URL inválida').optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
})

export async function createSponsor(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category'),
    website_url: formData.get('website_url') as string,
    instagram_url: formData.get('instagram_url') as string,
    description: formData.get('description') as string,
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
    description: parsed.data.description || '',
    logo_url,
  })

  if (error) {
    return { error: 'Erro ao salvar no banco de dados' }
  }

  revalidatePath('/admin/patrocinadores')
  revalidatePath('/patrocinadores')
  return { success: true }
}

export async function deleteSponsor(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  // Buscar para pegar a URL do logo
  const { data: sponsor } = await supabase.from('sponsors').select('logo_url').eq('id', id).single()

  const { error } = await supabase.from('sponsors').delete().eq('id', id)
  
  if (error) {
    return { error: 'Erro ao deletar' }
  }

  if (sponsor?.logo_url) {
    try {
      const urlObj = new URL(sponsor.logo_url)
      const pathParts = urlObj.pathname.split('/sponsor-logos/')
      if (pathParts.length > 1) {
        await deleteFile('sponsor-logos', pathParts[1])
      }
    } catch (e) {
      console.error('Erro ao deletar arquivo órfão:', e)
    }
  }
  
  revalidatePath('/admin/patrocinadores')
  revalidatePath('/patrocinadores')
  return { success: true }
}

export async function updateSponsor(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category'),
    website_url: formData.get('website_url') as string,
    instagram_url: formData.get('instagram_url') as string,
    description: formData.get('description') as string,
  }

  const parsed = sponsorSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const updateData: any = {
    name: parsed.data.name,
    category: parsed.data.category,
    website_url: parsed.data.website_url || '',
    instagram_url: parsed.data.instagram_url || '',
    description: parsed.data.description || '',
  }

  // Buscar o patrocinador atual para caso precise deletar a logo antiga
  const { data: currentSponsor } = await supabase.from('sponsors').select('logo_url').eq('id', id).single()
  const removeLogo = formData.get('remove_logo') === 'true'
  const logoFile = formData.get('logo') as File
  
  const shouldDeleteOldLogo = (removeLogo || (logoFile && logoFile.size > 0)) && currentSponsor?.logo_url

  if (shouldDeleteOldLogo) {
    try {
      const urlObj = new URL(currentSponsor.logo_url)
      const pathParts = urlObj.pathname.split('/sponsor-logos/')
      if (pathParts.length > 1) {
        await deleteFile('sponsor-logos', pathParts[1])
      }
    } catch (e) {
      console.error('Erro ao deletar arquivo antigo:', e)
    }
  }

  if (removeLogo) {
    updateData.logo_url = ''
  }

  if (logoFile && logoFile.size > 0) {
    try {
      const path = `sponsors/${Date.now()}_${logoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      updateData.logo_url = await uploadFile('sponsor-logos', logoFile, path)
    } catch (e) {
      return { error: 'Erro ao fazer upload da nova logo' }
    }
  }

  const { error } = await supabase.from('sponsors').update(updateData).eq('id', id)

  if (error) {
    return { error: 'Erro ao atualizar no banco de dados' }
  }

  revalidatePath('/admin/patrocinadores')
  revalidatePath('/patrocinadores')
  return { success: true }
}
