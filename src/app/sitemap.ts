import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = 'https://oliveiracarfest.com'

  // Rotas estáticas
  const routes = [
    '',
    '/sobre',
    '/eventos',
    '/galeria',
    '/patrocinadores',
    '/contato',
    '/seja-patrocinador',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rotas dinâmicas
  const { data: events } = await supabase.from('events').select('id, created_at')
  
  const eventRoutes = (events || []).map((event) => ({
    url: `${baseUrl}/eventos/${event.id}`,
    lastModified: event.created_at ? new Date(event.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...routes, ...eventRoutes]
}
