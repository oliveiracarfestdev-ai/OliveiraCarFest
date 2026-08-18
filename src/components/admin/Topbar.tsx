'use client'

import { signOut } from '@/app/actions/auth'
import { MobileAdminMenu } from './MobileAdminMenu'

export function Topbar() {
  return (
    <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <MobileAdminMenu />
        <span className="font-sans text-sm font-medium text-muted-foreground hidden md:block">Oliveira Car Fest - Sistema de Gestão</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors font-sans text-sm"
        >
          <span className="hidden md:inline">Sair</span>
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  )
}
