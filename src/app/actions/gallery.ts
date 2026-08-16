'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'

const gallerySchema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  event_id: z.string().uuid('Selecione um evento válido'),
})

export async function createAlbum(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    event_id: formData.get('event_id') as string,
  }

  const parsed = gallerySchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  let cover_url = ''
  const coverFile = formData.get('cover') as File
  if (coverFile && coverFile.size > 0) {
    try {
      const path = `albums/${Date.now()}_${coverFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      cover_url = await uploadFile('gallery-images', coverFile, path)
    } catch (e) {
      return { error: 'Erro ao fazer upload da capa' }
    }
  }

  // Insere o album
  const { data: albumData, error } = await supabase.from('albums').insert({
    ...parsed.data,
    cover_url,
  }).select('id').single()

  if (error) {
    return { error: 'Erro ao salvar o álbum no banco' }
  }

  // Upload das fotos múltiplas
  const photosFiles = formData.getAll('photos') as File[]
  for (const photo of photosFiles) {
    if (photo && photo.size > 0) {
      try {
        const path = `photos/${albumData.id}/${Date.now()}_${photo.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
        const photoUrl = await uploadFile('gallery-images', photo, path)
        await supabase.from('photos').insert({
          album_id: albumData.id,
          image_url: photoUrl
        })
      } catch (e) {
        console.error('Erro interno ao subir foto para o storage')
      }
    }
  }

  revalidatePath('/admin/galerias')
  revalidatePath('/galeria')
  redirect('/admin/galerias')
}

export async function deleteAlbum(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('albums').delete().eq('id', id)
  
  if (error) {
    return { error: 'Erro ao deletar' }
  }
  
  revalidatePath('/admin/galerias')
  revalidatePath('/galeria')
  return { success: true }
}
