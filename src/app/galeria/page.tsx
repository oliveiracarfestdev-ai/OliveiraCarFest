import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabasePublic } from "@/lib/supabase/public";
import { GalleryGrid } from "@/components/ui/gallery-grid";

export const revalidate = 60; // 1 minute cache

export default async function Galeria() {
  const supabase = supabasePublic;
  
  // Buscar fotos com o título do álbum
  const { data: photos } = await supabase
    .from('photos')
    .select(`
      id,
      image_url,
      album_id,
      albums (
        title
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-[100px] pb-24 px-4 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Header Section */}
        <section className="mb-12 pt-12 text-center md:text-left">
          <h1 className="font-heading text-5xl md:text-7xl font-black text-foreground uppercase mb-4">
            CULTURA <span className="text-primary">NOTURNA</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl">
            Um olhar cru e sem filtros sobre a cultura automotiva underground. Momentos de alta octanagem capturados na meia-noite urbana, apresentando as máquinas que dominam as ruas quando a cidade dorme.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-12 flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
          <button className="border-b-2 border-primary text-primary font-sans text-sm uppercase pb-1 px-2 font-bold transition-all">Todos</button>
          <button className="border-b-2 border-transparent text-muted-foreground hover:text-primary hover:border-primary/30 font-sans text-sm uppercase pb-1 px-2 transition-all">Rebaixados</button>
          <button className="border-b-2 border-transparent text-muted-foreground hover:text-primary hover:border-primary/30 font-sans text-sm uppercase pb-1 px-2 transition-all">Performance</button>
          <button className="border-b-2 border-transparent text-muted-foreground hover:text-primary hover:border-primary/30 font-sans text-sm uppercase pb-1 px-2 transition-all">Clássicos</button>
        </section>

        {/* Masonry Grid (Client Component) */}
        <GalleryGrid photos={(photos as any) || []} />
      </main>
      <Footer />
    </>
  );
}