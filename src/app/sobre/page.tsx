import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Sobre() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 grayscale" 
              style={{ backgroundImage: "url('/fundo_home.jpg')" }}
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
                  Tudo começou com uma lembrança.
                </p>
                <p>
                  Percebemos que a cultura automotiva já não era a mesma de anos atrás. Quando éramos crianças, os carros tinham um lugar especial na nossa comunidade. Os eventos reuniam famílias, amigos e apaixonados, e era comum ver crianças parando para admirar um carro diferente, conhecer novos modelos e simplesmente viver aquele momento.
                </p>
                <p>
                  Hoje, sentimos que essa experiência estava se perdendo.
                </p>
                <p>
                  As crianças do nosso bairro já não tinham as mesmas oportunidades que tivemos há cerca de 20 anos. E foi justamente dessa percepção que surgiu a vontade de fazer algo diferente: trazer novamente para a comunidade um evento que celebrasse os carros, reunisse as pessoas e criasse momentos que pudessem ser lembrados por muitos anos.
                </p>
                <p>
                  A ideia nasceu de uma conversa entre os organizadores, enquanto relembrávamos os eventos da nossa infância e as histórias que ficaram marcadas na memória. Entre tantas lembranças, uma delas se destacou: a chegada de uma Ferrari vermelha ao nosso bairro. Para nós, aquilo era muito mais do que apenas um carro. Era um acontecimento. Era a oportunidade de parar, admirar, conversar e compartilhar aquela experiência com outras pessoas.
                </p>
                <p>
                  Foi desse sentimento que nasceu o Oliveira Car Fest.
                </p>
                <p>
                  Um evento feito para todos: para quem entende de carros, para quem simplesmente admira, para as famílias, para as crianças e para toda a comunidade.
                </p>
                <p>
                  Mais do que reunir veículos, queremos reunir pessoas, resgatar a cultura automotiva e criar novas memórias. E, ao mesmo tempo, movimentar o nosso bairro, valorizar os comerciantes locais e mostrar que um evento automotivo pode ser também um grande encontro da comunidade.
                </p>
                <p>
                  Porque, no fim, não são apenas os carros que fazem uma história.
                </p>
                <p>
                  São as pessoas, os momentos e as memórias que ficam.
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
                <div className="font-sans text-base text-muted-foreground space-y-4">
                  <p>Valorizar e fortalecer a cultura automotiva, reunindo apaixonados por carros, famílias e toda a comunidade em um evento seguro, organizado e acolhedor.</p>
                  <p>Nossa missão é proporcionar um dia de lazer, diversão e experiências para todas as idades, criando momentos que aproximem as pessoas e despertem novas gerações para a paixão pelos automóveis.</p>
                  <p>Mais do que celebrar carros, queremos promover união, respeito, solidariedade e convivência, contribuindo para uma comunidade mais próxima e participativa, além de valorizar os comerciantes e negócios locais.</p>
                  <p>O Oliveira Car Fest existe para celebrar carros, conectar pessoas e criar memórias que ficam.</p>
                </div>
              </div>
              {/* Vision */}
              <div className="flex-1 bg-background/40 backdrop-blur-md border border-border/50 p-8 hover-glow transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-gray-400 text-3xl">visibility</span>
                  <h3 className="font-heading text-2xl uppercase font-bold text-foreground">VISÃO</h3>
                </div>
                <div className="font-sans text-base text-muted-foreground space-y-4">
                  <p>Tornar o Oliveira Car Fest um dos principais eventos automotivos da região, reconhecido não apenas pela qualidade dos carros e pela paixão pelo automobilismo, mas também pela excelência em sua organização, segurança e acolhimento.</p>
                  <p>Queremos construir um evento que cresça junto com a comunidade, reunindo cada vez mais apaixonados por carros, famílias, amigos e novos entusiastas, criando uma experiência capaz de conectar diferentes gerações.</p>
                  <p>Nossa visão é fazer do Oliveira Car Fest uma tradição na região, um evento aguardado por todos e lembrado não apenas pelos carros que estiveram presentes, mas pelos momentos, amizades e experiências vividas.</p>
                  <p>Ser referência em eventos automotivos, unindo paixão, comunidade e família em um encontro que todos queiram viver novamente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}