import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteAlbumButton } from './delete-button'

export default async function GaleriasAdmin() {
  const supabase = await createClient()
  const { data: albums } = await supabase.from('albums').select('*, events(title)').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Gerenciar Galerias</h1>
        <Link href="/admin/galerias/novo" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold rounded-none clip-corner flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Novo Álbum
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/40 border-b border-border/50 text-muted-foreground font-sans">
              <tr>
                <th className="px-6 py-4">Título do Álbum</th>
                <th className="px-6 py-4">Evento Vinculado</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              {albums?.map((album) => (
                <tr key={album.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{album.title}</td>
                  <td className="px-6 py-4">{album.events?.title || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <DeleteAlbumButton id={album.id} />
                  </td>
                </tr>
              ))}
              {!albums || albums.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">Nenhum álbum cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
