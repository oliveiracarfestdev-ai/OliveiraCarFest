import Link from 'next/link'
import { logoutPortal } from '@/app/actions/portal'
import { Button } from '@/components/ui/button'

export function PortalSidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border/50 h-screen hidden md:flex flex-col sticky top-0 print:hidden">
      <div className="p-6 border-b border-border/50">
        <Link href="/">
          <h1 className="font-heading text-2xl uppercase font-black tracking-widest text-foreground hover:text-primary transition-colors cursor-pointer">
            OCF<span className="text-primary italic font-light">PORTAL</span>
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="font-sans text-xs uppercase text-muted-foreground font-bold tracking-widest mb-4 pl-3">Meu Espaço</div>
        
        <Link href="/portal/dashboard">
          <div className="flex items-center gap-3 px-3 py-3 rounded-sm transition-colors group cursor-pointer bg-primary/10 text-primary border-l-2 border-primary">
            <span className="material-symbols-outlined text-lg">garage</span>
            <span className="font-sans text-sm font-medium">Meus Veículos</span>
          </div>
        </Link>
      </nav>

      <div className="p-4 border-t border-border/50">
        <form action={logoutPortal} className="w-full">
          <Button type="submit" variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-white/5">
            <span className="material-symbols-outlined mr-2">logout</span>
            Sair do Portal
          </Button>
        </form>
      </div>
    </aside>
  )
}
