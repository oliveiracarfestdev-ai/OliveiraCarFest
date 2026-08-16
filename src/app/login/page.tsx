'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 grayscale mix-blend-luminosity">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5JcBALES3MqlEr2YtRvj_qVX1g4BPvqXrZ1Gjcoz84_lkj7vln6ALraJulBdUTfwwL7OGIQ0tLxy6BgjXXiDb6nqUGh3dfD6yAZ91TrJYBBULNKzJ-KcN713Me-5x2-80NvhHQdWL8jRhHHaxtL7_VLejsvbqVEsNfFYVJ4VNlKjSFen_Zyxf-WlfajuW63rWviJwPMAC0gUyg_FdIYILloJyYtVdvPYqxEFTfmOn0OTLrXd0x2afHg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <h1 className="font-heading text-4xl uppercase font-black tracking-widest text-foreground hover:text-primary transition-colors cursor-pointer text-center">
              OLIVEIRA<br /><span className="text-primary italic font-light">CARFEST</span>
            </h1>
          </Link>
          <div className="h-1 w-12 bg-primary mt-6"></div>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border/50 p-8 shadow-2xl rounded-sm clip-corner-sm">
          <h2 className="font-heading text-2xl uppercase mb-6 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
            Acesso Restrito
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-sans rounded-sm">
                {error}
              </div>
            )}
            
            <div className="relative">
              <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="email">Identificação</label>
              <input 
                className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
                id="email" 
                name="email"
                placeholder="admin@oliveiracarfest.com" 
                type="email"
                required 
              />
            </div>
            
            <div className="relative pt-4">
              <label className="font-sans text-xs text-muted-foreground uppercase absolute top-0 left-0" htmlFor="password">Chave de Acesso</label>
              <input 
                className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
                id="password" 
                name="password"
                placeholder="••••••••" 
                type="password"
                required 
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full py-6 flex items-center justify-center gap-3 group mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none clip-corner transition-all disabled:opacity-70"
            >
              <span className="font-sans text-sm uppercase font-bold tracking-widest">
                {isPending ? 'Autenticando...' : 'Entrar no Sistema'}
              </span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                {isPending ? 'sync' : 'login'}
              </span>
            </Button>
          </form>
        </div>
        <p className="text-center mt-6 font-sans text-xs text-muted-foreground">
          Acesso exclusivo para staff e organizadores.
        </p>
      </div>
    </main>
  )
}
