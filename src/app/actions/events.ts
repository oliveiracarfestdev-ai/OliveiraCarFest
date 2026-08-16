'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'

const eventSchema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  date: z.string().min(10, 'Data inválida'),
  time: z.string().min(5, 'Hora inválida'),
  location: z.string().min(2, 'Local é obrigatório'),
  description: z.string().optional(),
  donation_items: z.string().optional(),
})

export async function createEvent(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    donation_items: formData.get('donation_items') as string,
  }

  const parsed = eventSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  let banner_url = ''
  const bannerFile = formData.get('banner') as File
  if (bannerFile && bannerFile.size > 0) {
    try {
      const path = `events/${Date.now()}_${bannerFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      banner_url = await uploadFile('event-banners', bannerFile, path)
    } catch (e) {
      return { error: 'Erro ao fazer upload da imagem' }
    }
  }

  const { error } = await supabase.from('events').insert({
    title: parsed.data.title,
    date: parsed.data.date,
    time: parsed.data.time,
    location: parsed.data.location,
    description: parsed.data.description || '',
    banner_url,
    address_url: '#', // placeholder
    donation_items: parsed.data.donation_items || null,
  })

  if (error) {
    console.error('Erro interno ao salvar evento no banco de dados')
    return { error: 'Erro ao salvar no banco de dados' }
  }

  revalidatePath('/admin/eventos')
  revalidatePath('/eventos')
  redirect('/admin/eventos')
}

export async function deleteEvent(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  
  if (error) {
    return { error: 'Erro ao deletar' }
  }
  
  revalidatePath('/admin/eventos')
  revalidatePath('/eventos')
  return { success: true }
}
