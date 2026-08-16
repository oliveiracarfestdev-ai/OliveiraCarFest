import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

/**
 * Cliente Supabase puramente estático/público.
 * NÃO LÊ COOKIES.
 * Use este cliente em Server Components de páginas públicas (Home, Galeria, Eventos, Patrocinadores)
 * para permitir que o Next.js gere o HTML estaticamente e aplique cache (ISR).
 */
export const supabasePublic = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
