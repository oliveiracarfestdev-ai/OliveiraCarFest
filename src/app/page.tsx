import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { supabasePublic } from "@/lib/supabase/public";
import { Countdown } from "@/components/ui/countdown";

export const revalidate = 60; // 1 minute cache

export default async function Home() {
  const supabase = supabasePublic;

  // Fetch the next upcoming event
  const today = new Date().toISOString().split('T')[0];
  const { data: nextEvent } = await supabase
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(1)
    .single();

  let formattedDate = "";
  let targetDateStr = "";

  if (nextEvent) {
    // Format date specifically for Brazil timezone to avoid shifting days
    const dateObj = new Date(nextEvent.date + 'T' + nextEvent.time);
    formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    targetDateStr = nextEvent.date + 'T' + nextEvent.time;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "Oliveira Car Fest",
    "description": "O maior encontro de carros rebaixados, clássicos e projetos exclusivos em Guarulhos/SP.",
    "url": "https://oliveiracarfest.com",
    "organizer": {
      "@type": "Organization",
      "name": "Oliveira Car Fest",
      "url": "https://oliveiracarfest.com"
    },
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-[80px]">
        {/* Hero Section */}
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="bg-cover bg-center w-full h-full object-cover" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsHAUm3jb1CUHtL7j1CMyxfol1603KyzuGkVQ5QwU5HOkJ25nzkuWyH61Kx_43Kg-ZvQhSxZ9L_GRUJFoQoX1JaQYpdAaI7xfJY8Yzi0UI5Ae9hrlOl8LKGnKShqHpO7M3PU8WSFAtaWm8FbDD23CYmglIfwm-DldXxypbbykhUvC1S8FyB9cjinKyIFKlhd2H_iI9DPzRTn0TatHFT6J28W8gsKybS8vgF9jQg19cKGZCvcTJDIwGtg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10"></div>
          </div>
          <div className="relative z-20 w-full px-4 md:px-16 text-center md:text-left flex flex-col md:items-start items-center max-w-7xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="glass-panel p-6 border-l-4 border-primary inline-block mb-12 bg-card/60 backdrop-blur-md">
                <span className="font-label-md text-sm uppercase text-primary tracking-widest">A Convergência de Engenharia e Estilo</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h1 className="font-heading text-6xl md:text-8xl text-foreground uppercase mb-6 leading-none font-black">
                PRECISÃO<br/>{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">ENCONTRA PAIXÃO</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 hidden md:block">
                A experiência automotiva definitiva. Exclusividade, performance e design convergem em eventos curados para os verdadeiros entusiastas e colecionadores.
              </p>
            </FadeIn>
            <FadeIn delay={0.7}>
              <Link href="/eventos" className="bg-primary text-primary-foreground font-sans uppercase tracking-wider px-8 py-8 hover:bg-primary/90 transition-all glow-hover flex items-center justify-center gap-2 group text-lg rounded-none h-14 font-medium">
                <span>EXPLORAR EVENTOS</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
              </Link>
            </FadeIn>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Deslize</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>
        
        {/* Next Event / Countdown */}
        {nextEvent && (
          <section className="py-24 px-4 md:px-16 bg-card border-y border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-primary/20 text-primary px-3 py-1 border border-primary/50 font-sans text-xs uppercase mb-6">
                  Próximo Evento Oficial
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-foreground uppercase mb-4 font-black">{nextEvent.title}</h2>
                <p className="font-sans text-base text-muted-foreground mb-6 line-clamp-3">
                  {nextEvent.description || "O ápice do automobilismo recebe a edição mais exclusiva do Oliveira Car Fest."}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground font-sans text-sm">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  <span>{nextEvent.location}</span>
                  <span className="text-muted-foreground mx-2">|</span>
                  <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                  <span>{formattedDate}</span>
                </div>
              </div>
              <div className="glass-panel p-12 border border-border flex flex-col items-center justify-center bg-background/60 backdrop-blur-lg">
                <span className="font-sans text-sm text-muted-foreground uppercase tracking-widest mb-6">Faltam</span>
                
                <Countdown targetDate={targetDateStr} />

                <Link href={`/eventos/${nextEvent.id}`} className="mt-8 w-full bg-transparent border border-border text-foreground font-sans uppercase py-6 hover:bg-card hover:text-primary transition-colors rounded-none flex items-center justify-center font-medium">
                  Solicitar Acesso / Detalhes
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Community Stats Grid */}
        <section className="py-24 px-4 md:px-16 my-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={0.1} direction="up" className="bg-card p-12 border border-border flex flex-col items-center text-center group transition-all">
                <span className="material-symbols-outlined text-primary text-5xl mb-6">directions_car</span>
                <span className="font-heading text-5xl font-bold text-foreground group-hover:text-primary transition-colors">2.5K+</span>
                <span className="font-sans text-sm uppercase text-muted-foreground tracking-widest mt-2">Carros Registrados</span>
              </FadeIn>
              <FadeIn delay={0.3} direction="up" className="bg-card p-12 border border-border flex flex-col items-center text-center group transition-all">
                <span className="material-symbols-outlined text-primary text-5xl mb-6">flag</span>
                <span className="font-heading text-5xl font-bold text-foreground group-hover:text-primary transition-colors">48</span>
                <span className="font-sans text-sm uppercase text-muted-foreground tracking-widest mt-2">Eventos Realizados</span>
              </FadeIn>
              <FadeIn delay={0.5} direction="up" className="bg-card p-12 border border-border flex flex-col items-center text-center group transition-all">
                <span className="material-symbols-outlined text-primary text-5xl mb-6">public</span>
                <span className="font-heading text-5xl font-bold text-foreground group-hover:text-primary transition-colors">150K</span>
                <span className="font-sans text-sm uppercase text-muted-foreground tracking-widest mt-2">Seguidores Globais</span>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
