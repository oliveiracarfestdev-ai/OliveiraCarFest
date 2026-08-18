'use client'

import { useState } from 'react'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  banner_url: string
  category: string
}

import { EmptyState } from '@/components/ui/empty-state'

export function EventGrid({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState('Todos')

  const filteredEvents = filter === 'Todos' 
    ? events 
    : events.filter(event => event.category === filter)

  return (
    <>
      <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
        {['Todos', 'Encontro', 'Exposição'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-sans text-sm uppercase px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
              filter === cat 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-24 relative z-10 w-full">
        {filteredEvents.map((event) => {
          let categoryClass = "bg-primary text-primary-foreground";
          if (event.category === "Exposição") {
            categoryClass = "border border-primary text-primary bg-background/50";
          } else {
            categoryClass = "bg-foreground text-background";
          }

          const eventDate = new Date(event.date + 'T' + event.time);
          const dateString = eventDate.toLocaleDateString('pt-BR', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace(/ DE /g, ' ');

          return (
            <article key={event.id} className="group relative bg-card border border-border/50 min-h-[500px] flex flex-col justify-end overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-0 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal" 
                style={{ backgroundImage: `url('${event.banner_url}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
              <div className="relative z-20 p-6 flex flex-col gap-3 border-t border-border/30 bg-background/80 backdrop-blur-md">
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-block font-sans text-xs uppercase px-2 py-1 tracking-widest font-bold ${categoryClass}`}>
                    {event.category || 'Encontro'}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    <span className="font-sans text-xs">{dateString}</span>
                  </div>
                </div>
                <h2 className="font-heading text-2xl uppercase italic font-bold text-foreground">{event.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <span className="material-symbols-outlined text-primary text-base">location_on</span>
                  <span className="font-sans text-base">{event.location}</span>
                </div>
                <Link href={`/eventos/${event.id}`} className="w-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground font-sans text-sm uppercase py-6 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group/btn rounded-none clip-corner">
                  Detalhes
                  <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </article>
          );
        })}
        
        {filteredEvents.length === 0 && (
          <div className="col-span-full">
            <EmptyState 
              icon="calendar_month" 
              title="Nenhum Evento Encontrado" 
              description="Ainda não temos eventos programados para esta categoria. Fique de olho nas nossas redes sociais." 
            />
          </div>
        )}
      </section>
    </>
  )
}
