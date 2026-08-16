import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabasePublic } from "@/lib/supabase/public";
export const revalidate = 60; // 1 minute cache

export default async function Eventos() {
  const supabase = supabasePublic;
  const { data: events, error } = await supabase.from('events').select('*').order('date', { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-24 px-4 md:px-16 w-full max-w-[1920px] mx-auto">
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border/30 pb-12 relative">
          <div>
            <p className="font-sans text-sm text-primary tracking-[0.2em] uppercase mb-4 pl-1">Circuito 2026</p>
            <h1 className="font-heading text-5xl md:text-7xl uppercase italic font-black">EVENTOS GLOBAIS</h1>
          </div>
          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
            <button className="font-sans text-sm uppercase px-4 py-2 border-b-2 border-primary text-primary whitespace-nowrap transition-colors">
              Todos
            </button>
            <button className="font-sans text-sm uppercase px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap transition-colors">
              Corrida
            </button>
            <button className="font-sans text-sm uppercase px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap transition-colors">
              Encontro
            </button>
            <button className="font-sans text-sm uppercase px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap transition-colors">
              Exposição
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 relative z-10">
          {events?.map((event) => {
            // Lógica simples para inferir categoria baseada no título
            let category = "Evento";
            let categoryClass = "bg-primary text-primary-foreground";
            if (event.title.toLowerCase().includes("night") || event.title.toLowerCase().includes("corrida")) {
              category = "Corrida";
              categoryClass = "bg-primary text-primary-foreground";
            } else if (event.title.toLowerCase().includes("expo") || event.title.toLowerCase().includes("exposição")) {
              category = "Exposição";
              categoryClass = "border border-primary text-primary bg-background/50";
            } else {
              category = "Encontro";
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
                      {category}
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
          
          {!events || events.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-border/50">
              <p className="text-muted-foreground">Nenhum evento encontrado no banco de dados.</p>
            </div>
          )}
        </section>

        <section className="mt-24 relative border border-border/30 bg-card overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-40" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCU7a84rcBSw2m_IzqybweOIjXW56l5zzXzJeaz0kfbzXayn0J8hSCu-WKolaQLrCDBMtWm-GvmmuPEOuNIM3v48Y5nLA8wUJx1Q7xhBTG9faGAn5WTl-LI3qHg2eqJ-GuKJvIRYWjq17wT_51PkClXBb68zg_-RdkZd_RlMoPID6e09_vlTZX6jpEh6YFgYnOVhTayWAwG4vLD1sX4kuM8wsWjj6IuMsoPYd4QxsVcAoiIEVCEAw76w')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-heading text-4xl uppercase italic mb-4 font-bold">Explore o Acervo</h3>
              <p className="font-sans text-lg text-muted-foreground mb-0">Mergulhe no legado da engenharia de alta performance. Reviva a velocidade, precisão e atmosferas exclusivas de nossos eventos globais anteriores.</p>
            </div>
            <Button variant="outline" className="font-sans text-sm uppercase border-2 border-border hover:border-primary hover:text-primary transition-colors py-6 px-8 flex items-center gap-3 bg-background/50 backdrop-blur-sm whitespace-nowrap rounded-none">
              <span className="material-symbols-outlined">history</span>
              Carregar Eventos Anteriores
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}