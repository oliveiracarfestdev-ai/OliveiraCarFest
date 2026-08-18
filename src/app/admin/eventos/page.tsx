import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteEventButton } from './delete-button'

export default async function EventosAdmin() {
  const supabase = await createClient()
  const { data: events, error } = await supabase.from('events').select('*').order('date', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Gerenciar Eventos</h1>
        <Link href="/admin/eventos/novo" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold rounded-none clip-corner flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Novo Evento
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/40 border-b border-border/50 text-muted-foreground font-sans">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Local</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              {events?.map((event) => (
                <tr key={event.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{event.title}</td>
                  <td className="px-6 py-4">{new Date(event.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/eventos/${event.id}/editar`} className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-sm hover:bg-primary/10">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteEventButton id={event.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {!events || events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Nenhum evento cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
