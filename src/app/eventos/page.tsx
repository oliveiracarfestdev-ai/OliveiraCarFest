import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabasePublic } from "@/lib/supabase/public";
import { EventGrid } from "@/components/ui/event-grid";
export const revalidate = 60; // 1 minute cache

export default async function Eventos() {
  const supabase = supabasePublic;
  const { data: events, error } = await supabase.from('events').select('*').order('date', { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-24 px-4 md:px-16 w-full max-w-[1920px] mx-auto">
        <header className="mb-12 text-center md:text-left border-b border-border/30 pb-6">
          <div>
            <p className="font-sans text-sm text-primary tracking-[0.2em] uppercase mb-4 pl-1">Calendário</p>
            <h1 className="font-heading text-5xl md:text-7xl uppercase italic font-black">NOSSOS EVENTOS</h1>
          </div>
        </header>
        
        <EventGrid events={(events as any) || []} />
        <section className="mt-24 relative border border-border/30 bg-card overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-40" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCU7a84rcBSw2m_IzqybweOIjXW56l5zzXzJeaz0kfbzXayn0J8hSCu-WKolaQLrCDBMtWm-GvmmuPEOuNIM3v48Y5nLA8wUJx1Q7xhBTG9faGAn5WTl-LI3qHg2eqJ-GuKJvIRYWjq17wT_51PkClXBb68zg_-RdkZd_RlMoPID6e09_vlTZX6jpEh6YFgYnOVhTayWAwG4vLD1sX4kuM8wsWjj6IuMsoPYd4QxsVcAoiIEVCEAw76w')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-heading text-4xl uppercase italic mb-4 font-bold">Explore o Acervo</h3>
              <p className="font-sans text-lg text-muted-foreground mb-0">Reviva os melhores momentos dos nossos encontros. Confira os projetos exclusivos que já passaram pelo Oliveira Car Fest.</p>
            </div>
            <Link href="/galeria">
              <Button variant="outline" className="font-sans text-sm uppercase border-2 border-border hover:border-primary hover:text-primary transition-colors py-6 px-8 flex items-center gap-3 bg-background/50 backdrop-blur-sm whitespace-nowrap rounded-none">
                <span className="material-symbols-outlined">photo_library</span>
                Ver Galeria de Fotos
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}