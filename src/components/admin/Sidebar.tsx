'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Eventos', href: '/admin/eventos', icon: 'event' },
  { name: 'Galerias', href: '/admin/galerias', icon: 'collections' },
  { name: 'Patrocinadores', href: '/admin/patrocinadores', icon: 'handshake' },
  { name: 'Expositores', href: '/admin/expositores', icon: 'garage' },
  { name: 'Leads e Contatos', href: '/admin/leads', icon: 'mail' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border/50 h-screen hidden md:flex flex-col sticky top-0">
      <div className="p-6 border-b border-border/50">
        <Link href="/admin">
          <h1 className="font-heading text-2xl uppercase font-black tracking-widest text-foreground hover:text-primary transition-colors cursor-pointer">
            ADMIN<span className="text-primary italic font-light">PANEL</span>
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="font-sans text-xs uppercase text-muted-foreground font-bold tracking-widest mb-4 pl-3">Menu Principal</div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-sm transition-colors group cursor-pointer ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent'}`}>
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span className="font-sans text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Link href="/">
          <div className="flex items-center justify-center gap-2 px-3 py-3 text-muted-foreground hover:text-primary transition-colors text-xs font-sans uppercase tracking-widest group">
            <span className="material-symbols-outlined text-base">public</span>
            Ver Site
            <span className="material-symbols-outlined text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
          </div>
        </Link>
      </div>
    </aside>
  )
}
