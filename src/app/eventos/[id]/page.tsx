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
  
  // Buscar Evento
  const { data: event } = await supabase.from('events').select('*').eq('id', id).single()

  if (!event) {
    notFound()
  }

  // Buscar Expositores Aprovados
  const { data: exhibitors } = await supabase
    .from('exhibitor_leads')
    .select('id, owner_name, car_model, car_year, car_photo_url')
    .eq('event_id', id)
    .eq('status', 'aprovado')
    .order('created_at', { ascending: true })

  // Buscar Álbuns/Fotos do evento
  const { data: albums } = await supabase
    .from('albums')
    .select('id, title, photos(id, image_url)')
    .eq('event_id', id)

  const isNextEvent = event.is_next_event;
  const category = isNextEvent ? 'Próximo Encontro' : 'Encontro Passado';
  const categoryClass = isNextEvent ? 'bg-primary text-black' : 'bg-muted text-muted-foreground';

  const dateObj = new Date(event.date + 'T' + event.time);
  const dateString = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeString = event.time.substring(0, 5);
  const bannerUrl = event.banner_url || 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop';
  
  // Extrai todas as fotos do evento para a galeria
  const allPhotos = albums?.flatMap(album => album.photos) || [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-24 relative overflow-hidden">
        
        {/* Fullscreen Hero Banner */}
        <section className="relative w-full h-[80vh] flex items-end pb-16 justify-center overflow-hidden border-b border-border/50">
          <Image 
            src={bannerUrl} 
            alt={event.title} 
            fill
            priority
            className="object-cover opacity-60 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10"></div>
          
          <div className="container mx-auto px-4 lg:px-16 relative z-20 w-full flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-3xl">
              <Link href="/eventos" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-6 font-sans text-xs uppercase font-bold tracking-widest bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Voltar
              </Link>
              <br/>
              <span className={`inline-block font-sans text-xs uppercase px-3 py-1 tracking-widest font-bold mb-4 ${categoryClass}`}>
                {event.category || category}
              </span>
              <h1 className="font-heading text-6xl md:text-8xl uppercase font-black text-white italic drop-shadow-2xl">
                {event.title}
              </h1>
              <div className="flex items-center gap-6 mt-6 text-white/80 font-sans text-sm md:text-base tracking-wider uppercase font-bold">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">calendar_month</span> {dateString}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> {event.location}</span>
              </div>
            </div>
            
            {isNextEvent && (
              event.accepting_registrations !== false ? (
                <Link href="/expositores" className="bg-primary text-black font-sans text-sm uppercase px-8 py-4 hover:bg-white transition-all duration-300 flex items-center gap-2 group font-black tracking-widest shadow-[0_0_30px_rgba(255,102,0,0.4)]">
                  Inscrever Veículo
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              ) : (
                <div className="bg-red-500/80 text-white font-sans text-sm uppercase px-8 py-4 flex items-center gap-2 font-black tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-not-allowed">
                  Inscrições Encerradas
                  <span className="material-symbols-outlined">block</span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 lg:px-16 mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Descrição, Cronograma, Galeria */}
            <div className="lg:col-span-8 space-y-16">
              
              <section>
                <h2 className="font-heading text-3xl uppercase font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-primary text-4xl">/</span> Sobre o Evento
                </h2>
                <div className="prose prose-invert prose-orange max-w-none font-sans text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {event.description || 'Detalhes não informados pela organização do evento.'}
                </div>
              </section>

              {/* Galeria do Evento */}
              {allPhotos.length > 0 && (
                <section>
                  <h2 className="font-heading text-3xl uppercase font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="text-primary text-4xl">/</span> Registros
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allPhotos.slice(0, 6).map((photo) => (
                      <div key={photo.id} className="relative aspect-square border border-border/50 group overflow-hidden bg-card">
                        <Image 
                          src={photo.image_url} 
                          alt="Foto do Evento" 
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                  {allPhotos.length > 6 && (
                    <div className="mt-6 text-center">
                      <Link href="/galeria" className="text-primary hover:text-white transition-colors font-sans uppercase font-bold tracking-widest text-sm flex items-center justify-center gap-2">
                        Ver Galeria Completa <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                  )}
                </section>
              )}

              {/* Expositores Confirmados */}
              <section>
                <h2 className="font-heading text-3xl uppercase font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-primary text-4xl">/</span> Expositores
                </h2>
                {exhibitors && exhibitors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {exhibitors.map((exhibitor) => (
                      <div key={exhibitor.id} className="bg-card border border-border/50 overflow-hidden group">
                        <div className="relative aspect-video bg-muted border-b border-border/50 overflow-hidden">
                          {exhibitor.car_photo_url ? (
                            <Image 
                              src={exhibitor.car_photo_url} 
                              alt={`${exhibitor.car_model} de ${exhibitor.owner_name}`} 
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-4xl text-muted-foreground">directions_car</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="font-heading text-lg font-bold uppercase truncate">{exhibitor.car_model}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="font-sans text-xs text-muted-foreground uppercase">{exhibitor.owner_name}</p>
                            <span className="font-sans text-xs bg-primary/10 text-primary px-2 py-0.5 font-bold">{exhibitor.car_year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-border/50 text-center bg-card/50">
                    <span className="material-symbols-outlined text-4xl text-muted-foreground mb-2">time_auto</span>
                    <p className="font-sans text-muted-foreground">Ainda não há expositores confirmados para este evento.</p>
                  </div>
                )}
              </section>

            </div>

            {/* Right Column: Info & Mapa */}
            <div className="lg:col-span-4 space-y-8">
              
              <div className="bg-card border border-border/50 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none"></div>
                <h3 className="font-heading text-2xl uppercase font-bold mb-8">Informações</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
                    <div>
                      <p className="font-sans text-xs font-bold text-muted-foreground uppercase mb-1">Data</p>
                      <p className="font-sans text-lg text-foreground font-bold">{dateString}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                    <div>
                      <p className="font-sans text-xs font-bold text-muted-foreground uppercase mb-1">Abertura dos Portões</p>
                      <p className="font-sans text-lg text-foreground font-bold">{timeString}</p>
                    </div>
                  </div>

                  {event.donation_items && (
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary text-2xl">volunteer_activism</span>
                      <div>
                        <p className="font-sans text-xs font-bold text-muted-foreground uppercase mb-1">Entrada Solidária</p>
                        <p className="font-sans text-sm text-foreground">{event.donation_items.split(',').join(' ou ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mapa Embed */}
              <div className="bg-card border border-border/50 p-4">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <p className="font-sans text-sm font-bold uppercase">{event.location}</p>
                </div>
                <div className="relative w-full h-64 border border-border/50 bg-muted overflow-hidden">
                  <iframe 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
                {event.address_url && (
                  <a href={event.address_url} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-muted hover:bg-white text-foreground hover:text-black font-sans text-xs uppercase py-3 transition-colors flex items-center justify-center gap-2 font-bold tracking-widest border border-border/50">
                    Abrir no Google Maps <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                )}
              </div>

              <div className="bg-primary/10 border border-primary/20 p-6 text-center">
                <span className="material-symbols-outlined text-3xl text-primary mb-2">support_agent</span>
                <h4 className="font-sans font-bold uppercase mb-2">Dúvidas?</h4>
                <p className="font-sans text-xs text-muted-foreground mb-4">Nossa equipe de curadoria está pronta para ajudar.</p>
                <Link href="/contato" className="text-primary hover:underline font-sans text-sm font-bold uppercase tracking-widest">Falar Conosco</Link>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
