import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ExhibitorForm } from "@/components/forms/exhibitor-form";

import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Área do Expositor",
  description: "Inscreva seu projeto exclusivo no Oliveira Car Fest.",
};

export default async function ExpositoresPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data: events } = await supabase
    .from('events')
    .select('id, title, date, location, donation_items, max_exhibitors')
    .gte('date', today)
    .order('date', { ascending: true });

  const eventIds = events?.map(e => e.id) || [];
  
  let approvedCounts: Record<string, number> = {};
  if (eventIds.length > 0) {
    const { data: approvedLeads } = await supabase
      .from('exhibitor_leads')
      .select('event_id')
      .in('event_id', eventIds)
      .eq('status', 'aprovado');
      
    approvedLeads?.forEach(lead => {
      if (lead.event_id) {
        approvedCounts[lead.event_id] = (approvedCounts[lead.event_id] || 0) + 1;
      }
    });
  }

  const eventsWithCapacity = events?.map(event => {
    const approvedCount = approvedCounts[event.id] || 0;
    const max = event.max_exhibitors || 50;
    const available = Math.max(0, max - approvedCount);
    return {
      ...event,
      available_spots: available
    }
  }) || [];

  return (
    <>
      <Header />
      <main className="flex-grow min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        {/* Background elements */}
        <div className="absolute inset-0 bg-background z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] z-0"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-primary/10 border border-primary/20 p-4 rounded-full mb-8 animate-pulse">
            <span className="material-symbols-outlined text-primary text-4xl">garage</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl uppercase font-black text-foreground mb-6">
            Área do Expositor
          </h1>
          
          <p className="font-sans text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            A curadoria para os próximos eventos do Oliveira Car Fest exige padrão e qualidade. Inscreva seu carro abaixo para passar pela avaliação técnica de nossa equipe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-background/80 p-6 border border-border/30">
              <span className="material-symbols-outlined text-primary mb-4">verified</span>
              <h3 className="font-sans uppercase text-sm font-bold text-foreground mb-2">Projetos Exclusivos</h3>
              <p className="text-xs text-muted-foreground">Avaliação rigorosa de qualidade, estilo e modificações.</p>
            </div>
            <div className="bg-background/80 p-6 border border-border/30">
              <span className="material-symbols-outlined text-primary mb-4">diamond</span>
              <h3 className="font-sans uppercase text-sm font-bold text-foreground mb-2">Vagas Limitadas</h3>
              <p className="text-xs text-muted-foreground">Espaço premium reduzido para garantir o destaque.</p>
            </div>
            <div className="bg-background/80 p-6 border border-border/30">
              <span className="material-symbols-outlined text-primary mb-4">photo_camera</span>
              <h3 className="font-sans uppercase text-sm font-bold text-foreground mb-2">Mídia Oficial</h3>
              <p className="text-xs text-muted-foreground">Todos os aprovados recebem cobertura fotográfica.</p>
            </div>
          </div>
          
          <div className="glass-panel p-8 md:p-12 border border-border/50 bg-card/50 backdrop-blur-md relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <h2 className="font-sans text-2xl text-primary font-bold uppercase tracking-widest mb-8">
              Formulário de Inscrição
            </h2>
            
            <ExhibitorForm events={eventsWithCapacity} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
