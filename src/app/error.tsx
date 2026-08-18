'use client'
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled App Error:', error)
  }, [error])
 
  return (
    <>
      <Header />
      <main className="flex-grow min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="max-w-2xl text-center space-y-6 bg-card p-12 border border-border/50 rounded-sm">
          <span className="material-symbols-outlined text-primary text-6xl opacity-80 mb-4 block">warning</span>
          <h2 className="font-heading text-4xl uppercase font-black text-foreground">Sistemas Indisponíveis</h2>
          <p className="font-sans text-lg text-muted-foreground">
            Encontramos uma anomalia em nossos servidores, provavelmente devido à alta carga ou instabilidade no banco de dados. 
            Nossa equipe de engenharia já foi notificada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => reset()}
              className="bg-primary text-black font-bold uppercase tracking-wider px-8 py-6 rounded-none hover:bg-primary/90"
            >
              Tentar Novamente
            </Button>
            <Link 
              href="/"
              className="px-8 py-6 border border-border text-foreground font-bold uppercase tracking-wider rounded-none hover:bg-card transition-colors flex items-center justify-center"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
