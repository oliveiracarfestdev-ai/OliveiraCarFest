'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/galeria', label: 'Galeria' },
    { href: '/patrocinadores', label: 'Patrocinadores' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
    { href: '/expositores', label: 'Inscrever-se (Expositor)' },
    { href: '/portal', label: 'Acesso Portal' },
  ]

  return (
    <div className="md:hidden ml-auto">
      <button 
        onClick={toggleMenu} 
        className="text-foreground p-2 flex items-center justify-center focus:outline-none"
        aria-label="Abrir Menu"
      >
        <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-14 left-0 w-full bg-background border-b border-border/40 p-6 flex flex-col gap-6 shadow-2xl z-50"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={toggleMenu}
                className="text-2xl font-heading font-black uppercase text-foreground hover:text-primary transition-colors tracking-widest border-b border-border/20 pb-4"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
