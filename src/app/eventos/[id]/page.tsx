import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: event } = await supabase.from('events').select('title, description').eq('id', id).single()
  
  if (!event) return { title: 'Evento não encontrado' }
  return { title: `${event.title} - Oliveira Car Fest`, description: event.description }
}

export default async function EventoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: event } = await supabase.from('events').select('*').eq('id', id).single()

  if (!event) {
    notFound()
  }

  const isNextEvent = event.is_next_event;
  const category = isNextEvent ? 'Próximo Encontro' : 'Encontro Passado';
  const categoryClass = isNextEvent ? 'bg-primary text-black' : 'bg-muted text-muted-foreground';

  // Format date
  const dateObj = new Date(event.date + 'T' + event.time);
  const dateString = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  
  // Format time (assuming time is string like "20:00:00")
  const timeString = event.time.substring(0, 5);

  const bannerUrl = event.banner_url 
    ? event.banner_url 
    : 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-24 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Breadcrumb & Navigation */}
          <Link href="/eventos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-sans text-sm uppercase font-bold tracking-widest">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Voltar para Eventos
          </Link>

          {/* Banner Section */}
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-muted mb-12 rounded-sm overflow-hidden border border-border/50 group">
            <Image 
              src={bannerUrl} 
              alt={event.title} 
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            
            {/* Tag no Banner */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span className={`inline-block font-sans text-xs uppercase px-3 py-1 tracking-widest font-bold mb-4 ${categoryClass}`}>
                {category}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl uppercase font-black text-white italic drop-shadow-lg">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Informações Principais */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl uppercase font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined">info</span>
                  Sobre o Evento
                </h2>
                <div className="prose prose-invert prose-orange max-w-none font-sans text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {event.description || 'Detalhes não informados pela organização do evento.'}
                </div>
              </div>
            </div>

            {/* Painel Lateral - Detalhes & Ações */}
            <div className="space-y-6">
              
              <div className="bg-card border border-border/50 p-6 rounded-sm space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1">calendar_month</span>
                  <div>
                    <p className="font-sans text-xs font-bold text-primary uppercase mb-1">Data</p>
                    <p className="font-sans text-xl text-foreground font-bold">{dateString}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1">schedule</span>
                  <div>
                    <p className="font-sans text-xs font-bold text-primary uppercase mb-1">Hora</p>
                    <p className="font-sans text-xl text-foreground font-bold">{timeString}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1">location_on</span>
                  <div>
                    <p className="font-sans text-xs font-bold text-primary uppercase mb-1">Local</p>
                    <p className="font-sans text-lg text-foreground leading-tight">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Link href="/expositores" className="w-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground font-sans text-sm uppercase py-5 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group rounded-none clip-corner font-bold tracking-widest block text-center">
                  <div className="flex items-center justify-center gap-2 w-full">
                    Inscrever meu Carro
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">directions_car</span>
                  </div>
                </Link>

                <Link href="/contato" className="w-full bg-transparent border border-primary/50 text-primary font-sans text-sm uppercase py-5 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group rounded-none font-bold tracking-widest block text-center">
                  Dúvidas? Fale Conosco
                </Link>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
