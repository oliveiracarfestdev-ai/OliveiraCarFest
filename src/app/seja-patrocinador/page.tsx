import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SponsorForm } from "@/components/forms/sponsor-form";

export default function SejaPatrocinador() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[80px] bg-background">
        
        {/* Hero Section */}
        <section className="relative w-full py-24 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-30 grayscale" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2w8yG4r6Q9LpZ7B4A5Q9uW2Y6E6h2zR4I9F3K7aD5U6wM1H8L7C5V4N3bZ9gJ2R8X6T1yP4L9M6D3V1K8H5Q4Z2W1I3F9E7V4O6D3')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 md:px-16 max-w-5xl mx-auto">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-primary mb-6 border border-primary/30 px-4 py-1 bg-background/50 backdrop-blur-sm">
              Parcerias Estratégicas
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-foreground mb-6 uppercase">
              SEJA UM <span className="text-primary italic">PATROCINADOR</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Associe sua marca à comunidade automotiva mais engajada da região. Alcance milhares de entusiastas em nossos eventos premium.
            </p>
          </div>
        </section>

        {/* Benefits & Form Section */}
        <section className="py-12 px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Benefits */}
          <div className="md:col-span-5 space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-foreground">Por que patrocinar?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">Visibilidade de Marca</h3>
                    <p className="font-sans text-muted-foreground">Sua marca em banners, credenciais, palcos e comunicações digitais atingindo um público altamente segmentado.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">handshake</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">Networking B2B</h3>
                    <p className="font-sans text-muted-foreground">Acesso VIP a áreas exclusivas para conectar-se com outros empresários, oficinas e influenciadores do setor.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">storefront</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">Estandes e Ativação</h3>
                    <p className="font-sans text-muted-foreground">Espaço físico para demonstrar produtos, realizar vendas diretas e interagir presencialmente com os participantes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/50 p-8 border-l-2 border-primary">
              <h3 className="font-heading text-xl uppercase font-bold text-primary mb-2">Nossos Números</h3>
              <ul className="space-y-2 font-sans text-foreground">
                <li className="flex justify-between border-b border-border/50 pb-2"><span>Público Médio por Evento</span> <strong>5.000+</strong></li>
                <li className="flex justify-between border-b border-border/50 pb-2 pt-2"><span>Carros Expostos</span> <strong>500+</strong></li>
                <li className="flex justify-between pt-2"><span>Alcance Digital</span> <strong>100k+ impressões</strong></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7">
            <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-foreground">Solicitar Proposta</h2>
            <p className="font-sans text-muted-foreground mb-8">
              Preencha os dados abaixo e nosso time comercial enviará o mídia kit com as cotas de patrocínio disponíveis para as próximas edições.
            </p>
            <SponsorForm />
          </div>
          
        </section>

      </main>
      <Footer />
    </>
  );
}