import { createClient } from './server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const isAdmin = user.user_metadata?.is_admin === true || user.app_metadata?.role === 'admin'
  
  if (!isAdmin) {
    // Redireciona caso não tenha a flag de admin
    redirect('/login?error=unauthorized')
  }
}
