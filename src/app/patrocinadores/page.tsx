import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabasePublic } from "@/lib/supabase/public";
import Link from "next/link";
import { EmptyState } from '@/components/ui/empty-state';

export const revalidate = 60; // 1 minute cache

export default async function Patrocinadores() {
  const supabase = supabasePublic;
  const { data: sponsors, error } = await supabase.from('sponsors').select('*');

  return (
    <>
      <Header />
      <main className="flex-grow pt-[100px]">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5JcBALES3MqlEr2YtRvj_qVX1g4BPvqXrZ1Gjcoz84_lkj7vln6ALraJulBdUTfwwL7OGIQ0tLxy6BgjXXiDb6nqUGh3dfD6yAZ91TrJYBBULNKzJ-KcN713Me-5x2-80NvhHQdWL8jRhHHaxtL7_VLejsvbqVEsNfFYVJ4VNlKjSFen_Zyxf-WlfajuW63rWviJwPMAC0gUyg_FdIYILloJyYtVdvPYqxEFTfmOn0OTLrXd0x2afHg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h1 className="font-heading text-6xl md:text-8xl text-foreground uppercase mb-4 font-black">
              Seja um <br/><span className="text-primary italic">Parceiro</span>
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Alinhe sua marca com a excelência automotiva. Junte-se ao seleto grupo de patrocinadores do Oliveira Car Fest.
            </p>
          </div>
        </section>

        {/* Our Partners / Logos Grid */}
        <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl uppercase tracking-wider mb-2 font-bold">Nossos Parceiros</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-70">
            {sponsors?.map((sponsor) => (
              <Link 
                key={sponsor.id} 
                href={`/patrocinadores/${sponsor.id}`} 
                aria-label={`${sponsor.name} - Patrocinador Categoria ${sponsor.category}`}
                className="h-24 w-full bg-card/40 backdrop-blur-md border border-border/50 hover-glow flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer rounded-sm group relative"
              >
                {sponsor.logo_url ? (
                  <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-16 max-w-[80%] object-contain mb-2" />
                ) : (
                  <span className="font-heading text-2xl font-bold text-foreground tracking-widest px-4 text-center truncate w-full">{sponsor.name}</span>
                )}
                <span className="absolute bottom-2 text-[10px] text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">{sponsor.category}</span>
              </Link>
            ))}
            

            {(!sponsors || sponsors.length === 0) && (
              <div className="col-span-full w-full">
                <EmptyState 
                  icon="handshake" 
                  title="Seja o Primeiro" 
                  description="Ainda não temos parceiros listados. Esta é a sua chance de ter visibilidade máxima em nossos eventos." 
                  actionLabel="Manifestar Interesse"
                  actionHref="#manifestar-interesse"
                />
              </div>
            )}
          </div>
        </section>

        {/* Benefits & Form Bento Grid */}
        <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Benefits Area */}
            <div className="md:col-span-12 flex flex-col gap-6 text-center mb-12">
              <h3 className="font-heading text-3xl uppercase mb-2 font-bold">Por que se juntar a nós?</h3>
              <p className="font-sans text-base text-muted-foreground max-w-3xl mx-auto">Posicione sua marca em um palco internacional. Alcance entusiastas e colecionadores de alto poder aquisitivo através de nossa extensa cobertura midiática e presença digital.</p>
            </div>
            
            <div className="md:col-span-6 grid grid-cols-1 gap-6">
              <div className="bg-card/40 backdrop-blur-md border border-border/50 p-8 hover-glow rounded-sm h-full flex flex-col justify-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4 block">public</span>
                <h3 className="font-heading text-2xl uppercase mb-2 font-bold">Visibilidade Global</h3>
                <p className="font-sans text-sm text-muted-foreground">Exposição garantida para milhares de pessoas em nossos canais, cobertura de imprensa e presencialmente em cada evento da temporada.</p>
              </div>
            </div>
            
            <div className="md:col-span-6 grid grid-cols-1 gap-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="bg-card/40 backdrop-blur-md border border-border/50 p-6 hover-glow rounded-sm">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4 block">handshake</span>
                    <h3 className="font-sans text-sm font-bold uppercase mb-2">Networking de Elite</h3>
                    <p className="font-sans text-sm text-muted-foreground">Acesso aos eventos, conectando você com os demais empreendedores da região.</p>
                  </div>
                  <div className="bg-card/40 backdrop-blur-md border border-border/50 p-6 hover-glow rounded-sm">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4 block">workspace_premium</span>
                    <h3 className="font-sans text-sm font-bold uppercase mb-2">Acesso VIP</h3>
                    <p className="font-sans text-sm text-muted-foreground">Experiências premium garantidas para seus executivos e clientes mais importantes durante todo o evento.</p>
                  </div>
               </div>
            </div>

            {/* Contact CTA Area */}
            <div className="md:col-span-12 mt-12 text-center">
              <div className="bg-card/40 backdrop-blur-md border border-border/50 p-12 h-full relative overflow-hidden group rounded-sm flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                <h3 className="font-heading text-3xl uppercase mb-6 font-bold">Manifestar Interesse</h3>
                <p className="font-sans text-sm text-muted-foreground mb-8">Conheça nossos planos e opções de patrocínio.</p>
                
                <Link href="/seja-patrocinador" className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-sm uppercase px-12 py-6 flex items-center justify-center gap-2 rounded-none clip-corner group/btn">
                  Preencher Formulário Comercial
                  <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
                
                <a href="/media-kit.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" type="button" className="mt-4 font-sans text-sm uppercase tracking-wider py-6 px-12 flex items-center justify-center gap-2 rounded-none border-2 border-border hover:border-primary hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-lg">download</span>
                    <span>BAIXAR MEDIA KIT</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}