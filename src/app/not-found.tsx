import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-[80px] flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4 max-w-2xl mx-auto space-y-6">
          <div className="font-heading text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
            404
          </div>
          <h1 className="font-heading text-4xl uppercase text-foreground">Pista Errada!</h1>
          <p className="font-sans text-muted-foreground text-lg">
            Parece que você derrapou e saiu da rota. A página que você está procurando não existe ou foi removida do nosso grid.
          </p>
          <div className="pt-8">
            <Link 
              href="/" 
              className="bg-primary text-primary-foreground font-sans uppercase tracking-wider px-8 py-4 hover:bg-primary/90 transition-all glow-hover inline-flex items-center gap-2 rounded-none font-bold"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Voltar para o Grid de Largada
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
