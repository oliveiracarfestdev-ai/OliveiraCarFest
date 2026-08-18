'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Validação', href: '/admin/validacao', icon: 'qr_code_scanner' },
  { name: 'Eventos', href: '/admin/eventos', icon: 'event' },
  { name: 'Galerias', href: '/admin/galerias', icon: 'collections' },
  { name: 'Patrocinadores', href: '/admin/patrocinadores', icon: 'handshake' },
  { name: 'Expositores', href: '/admin/expositores', icon: 'garage' },
  { name: 'Leads e Contatos', href: '/admin/leads', icon: 'mail' },
  { name: 'Configurações', href: '/admin/configuracoes', icon: 'settings' },
]

export function MobileAdminMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu} 
        className="text-foreground p-2 flex items-center justify-center focus:outline-none"
      >
        <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-md border-r border-border/40 p-4 flex flex-col gap-2 shadow-2xl z-50 overflow-y-auto"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} onClick={toggleMenu}>
                  <div className={`flex items-center gap-3 px-4 py-4 rounded-sm transition-colors group cursor-pointer ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent'}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-sans text-lg font-medium">{item.name}</span>
                  </div>
                </Link>
              )
            })}
            <div className="mt-auto border-t border-border/50 pt-4">
              <Link href="/" onClick={toggleMenu}>
                <div className="flex items-center gap-3 px-4 py-4 text-muted-foreground hover:text-primary transition-colors font-sans text-lg">
                  <span className="material-symbols-outlined text-xl">public</span>
                  Ver Site
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
