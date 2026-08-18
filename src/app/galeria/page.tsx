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
        title,
        category
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
            GALERIA <span className="text-primary">OFICIAL</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl">
            O acervo oficial do Oliveira Car Fest. Confira as coberturas fotográficas dos nossos encontros e os projetos em destaque.
          </p>
        </section>

        {/* Masonry Grid (Client Component) com Filtros Embutidos */}

        {/* Masonry Grid (Client Component) */}
        <GalleryGrid photos={(photos as any) || []} />
      </main>
      <Footer />
    </>
  );
}