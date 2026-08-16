import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Sobre() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-[80px]">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 grayscale" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn2Bsa4nrjybGRMTGb02coDCQLP2mISkei7zLm3-LLE5oOWxbM14_C6CCnbj1NWgp7DwarCXNY0229PpsYcv_lXMi-1mAo6vtINNfB0v-JyJroi_Rm2FthYVw6ny66VZnM0Se7pwjxX_3nDMHiJP_VgPncQ8tJPPS41kArLhhdtX4Q9CAZ4omJsSJ-EW0XssDiqC5LywZ9mz9N0S5NbG3763AhLiMAre_59VJfHp38_pbjWx6YaDuvyw')" }}
            ></div>
            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center px-4 md:px-16 max-w-5xl mx-auto">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-primary mb-6 border border-primary/30 px-4 py-1 bg-background/50 backdrop-blur-sm">
              Nossa Essência
            </span>
            <h1 className="font-heading text-5xl md:text-8xl font-black text-foreground mb-6 uppercase">A CULTURA DA <br/><span className="text-primary italic">PERFORMANCE</span></h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Não somos apenas um evento. Somos uma plataforma para a obsessão automotiva. Onde a engenharia de precisão encontra a estética pura.
            </p>
          </div>
        </section>

        {/* Manifesto / Story Section (Bento Grid) */}
        <section className="py-24 px-4 md:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Story Block */}
            <div className="md:col-span-8 bg-card border border-border p-12 hover-glow transition-shadow duration-500 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
              <h2 className="font-heading text-4xl md:text-6xl uppercase font-black text-foreground mb-12">A ORIGEM DA VELOCIDADE</h2>
              <div className="space-y-6 font-sans text-lg text-muted-foreground relative z-10">
                <p>
                  Nascido nas ruas noturnas e forjado nas pistas de alta performance, o Oliveira Car Fest começou como um encontro clandestino para puristas que exigiam mais do que a indústria oferecia. Nossa história não é escrita com tinta, mas com borracha queimada e metal fundido.
                </p>
                <p>
                  Em menos de uma década, transformamos uma paixão marginal em um ecossistema global. Nossa missão é cristalina: unir os entusiastas mais dedicados sob uma única bandeira de excelência automotiva.
                </p>
              </div>
            </div>
            {/* Mission/Vision Blocks */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* Mission */}
              <div className="flex-1 bg-card/50 p-8 border-l-4 border-primary hover:bg-card transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">flag</span>
                  <h3 className="font-heading text-2xl uppercase font-bold text-foreground">MISSÃO</h3>
                </div>
                <p className="font-sans text-base text-muted-foreground">
                  Unir a comunidade automotiva através de experiências imersivas, celebrando a arte e a engenharia dos motores.
                </p>
              </div>
              {/* Vision */}
              <div className="flex-1 bg-background/40 backdrop-blur-md border border-border/50 p-8 hover-glow transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-gray-400 text-3xl">visibility</span>
                  <h3 className="font-heading text-2xl uppercase font-bold text-foreground">VISÃO</h3>
                </div>
                <p className="font-sans text-base text-muted-foreground">
                  Estabelecer o padrão ouro global para eventos de cultura automotiva de alto rendimento.
                </p>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}