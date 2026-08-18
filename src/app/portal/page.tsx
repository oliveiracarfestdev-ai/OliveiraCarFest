'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { loginToPortal } from '@/app/actions/portal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function PortalLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await loginToPortal(formData)

    if (result?.error) {
      setError(result.error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="flex-grow min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-background z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-primary/10 border border-primary/20 p-4 rounded-full mb-8">
            <span className="material-symbols-outlined text-primary text-4xl">vpn_key</span>
          </div>
          
          <h1 className="font-heading text-4xl uppercase font-black text-foreground mb-2">
            Acesso Expositor
          </h1>
          <p className="font-sans text-muted-foreground text-sm mb-8">
            Entre com a Placa e o WhatsApp cadastrados para ver o status da sua inscrição ou acessar seu credencial.
          </p>
          
          <div className="glass-panel p-8 border border-border/50 bg-card/50 backdrop-blur-md relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="car_plate" className="text-xs font-sans uppercase font-bold tracking-widest text-primary">Placa do Veículo</label>
                <Input 
                  id="car_plate" 
                  name="car_plate" 
                  placeholder="ABC1234" 
                  required 
                  className="bg-background/50 border-border/50 focus:border-primary uppercase font-bold tracking-widest text-lg py-6" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-sans uppercase font-bold tracking-widest text-primary">WhatsApp</label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="(11) 90000-0000" 
                  required 
                  className="bg-background/50 border-border/50 focus:border-primary font-bold tracking-widest text-lg py-6" 
                />
              </div>

              {error && (
                <div className="p-4 rounded-sm bg-red-500/10 border border-red-500/50 text-red-400 text-center">
                  <p className="font-sans text-sm font-medium">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-sans uppercase tracking-wider py-6 hover:bg-primary/90 transition-all glow-hover font-bold"
              >
                {isSubmitting ? 'Verificando...' : 'Acessar Portal'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/30 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não inscreveu seu projeto? <br/>
                <Link href="/expositores" className="text-primary hover:underline font-bold mt-2 inline-block">Submeta agora</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
