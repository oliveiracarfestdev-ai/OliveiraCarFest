'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFile } from '@/lib/supabase/storage'
import { z } from 'zod'
import { requireAdmin } from '@/lib/supabase/auth-guard'

const eventSchema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  date: z.string().min(10, 'Data inválida'),
  time: z.string().min(5, 'Hora inválida'),
  location: z.string().min(2, 'Local é obrigatório'),
  address_url: z.string().url('URL do Google Maps inválida').optional().or(z.literal('')),
  description: z.string().optional(),
  donation_items: z.string().optional(),
  category: z.string().optional().default('Encontro'),
  max_exhibitors: z.coerce.number().min(1, 'Vagas devem ser maior que 0').default(50),
  accepting_registrations: z.boolean().default(true),
})

export async function createEvent(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    location: formData.get('location') as string,
    address_url: formData.get('address_url') as string,
    description: formData.get('description') as string,
    donation_items: formData.get('donation_items') as string,
    category: formData.get('category') as string,
    max_exhibitors: formData.get('max_exhibitors'),
    accepting_registrations: formData.get('accepting_registrations') === 'true',
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
    address_url: parsed.data.address_url || '',
    donation_items: parsed.data.donation_items || null,
    category: parsed.data.category,
    max_exhibitors: parsed.data.max_exhibitors,
    accepting_registrations: parsed.data.accepting_registrations,
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

  // Buscar evento para pegar a URL da imagem
  const { data: event } = await supabase.from('events').select('banner_url').eq('id', id).single()

  const { error } = await supabase.from('events').delete().eq('id', id)
  
  if (error) {
    return { error: 'Erro ao deletar' }
  }

  // Deletar a imagem no storage se existir
  if (event?.banner_url) {
    try {
      const urlObj = new URL(event.banner_url)
      const pathParts = urlObj.pathname.split('/event-banners/')
      if (pathParts.length > 1) {
        await deleteFile('event-banners', pathParts[1])
      }
    } catch (e) {
      console.error('Erro ao deletar arquivo órfão:', e)
    }
  }
  
  revalidatePath('/admin/eventos')
  revalidatePath('/eventos')
  return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    location: formData.get('location') as string,
    address_url: formData.get('address_url') as string,
    description: formData.get('description') as string,
    donation_items: formData.get('donation_items') as string,
    category: formData.get('category') as string,
    max_exhibitors: formData.get('max_exhibitors'),
    accepting_registrations: formData.get('accepting_registrations') === 'true',
  }

  const parsed = eventSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const updateData: any = {
    title: parsed.data.title,
    date: parsed.data.date,
    time: parsed.data.time,
    location: parsed.data.location,
    address_url: parsed.data.address_url || '',
    description: parsed.data.description || '',
    donation_items: parsed.data.donation_items || null,
    category: parsed.data.category,
    max_exhibitors: parsed.data.max_exhibitors,
    accepting_registrations: parsed.data.accepting_registrations,
  }

  const bannerFile = formData.get('banner') as File
  if (bannerFile && bannerFile.size > 0) {
    try {
      const path = `events/${Date.now()}_${bannerFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      updateData.banner_url = await uploadFile('event-banners', bannerFile, path)
    } catch (e) {
      return { error: 'Erro ao fazer upload da nova imagem' }
    }
  }

  const { error } = await supabase.from('events').update(updateData).eq('id', id)

  if (error) {
    console.error('Erro interno ao atualizar evento no banco de dados')
    return { error: 'Erro ao atualizar no banco de dados' }
  }

  revalidatePath('/admin/eventos')
  revalidatePath('/eventos')
  revalidatePath(`/eventos/${id}`)
  redirect('/admin/eventos')
}
