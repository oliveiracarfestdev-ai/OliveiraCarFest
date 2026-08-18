import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: sponsor } = await supabase.from('sponsors').select('name, description').eq('id', id).single()
  
  if (!sponsor) return { title: 'Patrocinador não encontrado' }
  return { title: `${sponsor.name} - Parceiro Oficial Oliveira Car Fest`, description: sponsor.description }
}

export default async function PatrocinadorDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  // Buscar Patrocinador
  const { data: sponsor } = await supabase.from('sponsors').select('*').eq('id', id).single()

  if (!sponsor) {
    notFound()
  }

  const categoryColor = 
    sponsor.category === 'ouro' ? 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10' :
    sponsor.category === 'prata' ? 'text-gray-300 border-gray-300/50 bg-gray-300/10' :
    sponsor.category === 'bronze' ? 'text-orange-400 border-orange-400/50 bg-orange-400/10' :
    'text-primary border-primary/50 bg-primary/10';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <Link href="/patrocinadores" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-sans text-sm uppercase font-bold tracking-widest">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Voltar para Parceiros
          </Link>

          <div className="bg-card border border-border/50 p-8 md:p-16 relative overflow-hidden text-center flex flex-col items-center">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 bg-background border border-border/50 rounded-sm p-4 flex items-center justify-center">
              {sponsor.logo_url ? (
                <Image 
                  src={sponsor.logo_url} 
                  alt={sponsor.name} 
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <span className="material-symbols-outlined text-6xl text-muted-foreground">business</span>
              )}
            </div>

            <span className={`inline-block font-sans text-xs uppercase px-4 py-1 tracking-widest font-bold mb-6 border ${categoryColor}`}>
              Patrocinador {sponsor.category}
            </span>

            <h1 className="font-heading text-4xl md:text-6xl uppercase font-black text-foreground mb-8">
              {sponsor.name}
            </h1>

            <div className="prose prose-invert prose-orange max-w-2xl font-sans text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-12">
              {sponsor.description || 'Nenhuma descrição fornecida.'}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              {sponsor.website_url && (
                <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-black font-sans text-sm uppercase px-6 py-4 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 font-black tracking-widest shadow-[0_0_20px_rgba(255,102,0,0.2)]">
                  Visitar Site
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
              
              {sponsor.instagram_url && (
                <a href={sponsor.instagram_url} target="_blank" rel="noopener noreferrer" className="w-full bg-transparent border border-border text-foreground font-sans text-sm uppercase px-6 py-4 hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 font-bold tracking-widest">
                  Instagram
                  <span className="material-symbols-outlined text-sm">alternate_email</span>
                </a>
              )}
            </div>

          </div>
          
        </div>
      </main>
      <Footer />
    </>
  )
}
