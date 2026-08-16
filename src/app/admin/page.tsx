import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: eventsCount },
    { count: photosCount },
    { count: sponsorsCount },
    { count: leadsCount },
    { count: messagesCount }
  ] = await Promise.all([
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('photos').select('*', { count: 'exact', head: true }),
    supabase.from('sponsors').select('*', { count: 'exact', head: true }),
    supabase.from('sponsor_leads').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { name: 'Eventos', value: eventsCount || 0, icon: 'event', href: '/admin/eventos', color: 'text-primary' },
    { name: 'Fotos na Galeria', value: photosCount || 0, icon: 'collections', href: '/admin/galerias', color: 'text-blue-500' },
    { name: 'Patrocinadores', value: sponsorsCount || 0, icon: 'handshake', href: '/admin/patrocinadores', color: 'text-green-500' },
    { name: 'Interesses Comerciais', value: leadsCount || 0, icon: 'monitoring', href: '/admin/leads', color: 'text-purple-500' },
    { name: 'Mensagens Recebidas', value: messagesCount || 0, icon: 'mail', href: '/admin/leads', color: 'text-orange-500' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase font-bold mb-2">Visão Geral</h1>
        <p className="text-muted-foreground font-sans">Bem-vindo ao painel de controle do Oliveira Car Fest.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card border border-border/50 p-6 rounded-sm shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="font-sans text-sm uppercase text-muted-foreground font-bold tracking-wider mb-1">{stat.name}</p>
                <h3 className="font-heading text-4xl font-bold">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
            </div>
            
            <Link href={stat.href} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-sans uppercase font-bold transition-colors relative z-10">
              Gerenciar
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            {/* Background Decoration */}
            <span className={`material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-5 ${stat.color} group-hover:scale-110 transition-transform duration-500 pointer-events-none`}>
              {stat.icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}