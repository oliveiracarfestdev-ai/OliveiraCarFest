import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteSponsorButton } from './delete-button'

export default async function PatrocinadoresAdmin() {
  const supabase = await createClient()
  const { data: sponsors } = await supabase.from('sponsors').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Gerenciar Patrocinadores</h1>
        <Link href="/admin/patrocinadores/novo" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold rounded-none clip-corner flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Novo Patrocinador
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/40 border-b border-border/50 text-muted-foreground font-sans">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Site</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              {sponsors?.map((sponsor) => (
                <tr key={sponsor.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{sponsor.name}</td>
                  <td className="px-6 py-4"><span className="uppercase text-xs tracking-widest">{sponsor.category}</span></td>
                  <td className="px-6 py-4">
                    {sponsor.website_url ? (
                      <a href={sponsor.website_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">Link</a>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/patrocinadores/${sponsor.id}/editar`} className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-sm hover:bg-primary/10">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteSponsorButton id={sponsor.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {!sponsors || sponsors.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Nenhum patrocinador cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
