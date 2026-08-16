import { createClient } from '@/lib/supabase/server'
import { UpdateStatusButton, DeleteExhibitorButton } from './buttons'

export default async function ExpositoresAdmin() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('exhibitor_leads')
    .select('*, events(title)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-black uppercase text-foreground mb-2">Inscrições de Expositores</h1>
        <p className="text-muted-foreground font-sans text-sm">Gerencie os projetos enviados para avaliação.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Data / Evento</th>
                <th className="px-6 py-4">Piloto</th>
                <th className="px-6 py-4">Veículo</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {!leads || leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Nenhuma inscrição recebida ainda.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div>{new Date(lead.created_at || new Date()).toLocaleDateString('pt-BR')}</div>
                      <div className="text-xs text-primary font-bold mt-1">{(lead as any).events?.title || 'Sem evento'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{lead.owner_name}</div>
                      <div className="text-xs text-muted-foreground">{lead.instagram}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        {lead.car_photo_url && (
                          <a href={lead.car_photo_url} target="_blank" rel="noopener noreferrer" className="block w-16 h-16 rounded-sm overflow-hidden border border-border/50 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={lead.car_photo_url} alt="Carro" className="w-full h-full object-cover hover:scale-110 transition-transform" loading="lazy" decoding="async" />
                          </a>
                        )}
                        <div>
                          <div className="font-bold text-primary">{lead.car_model}</div>
                          <div className="text-xs text-muted-foreground uppercase">{lead.car_plate} | {lead.car_year}</div>
                          <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]" title={lead.modifications}>
                            Mods: {lead.modifications}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">{lead.phone}</div>
                      <div className="text-xs">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-sm text-xs font-bold uppercase ${
                        lead.status === 'aprovado' ? 'bg-green-500/20 text-green-500' :
                        lead.status === 'rejeitado' ? 'bg-red-500/20 text-red-500' :
                        'bg-orange-500/20 text-orange-500'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-y-2">
                      <UpdateStatusButton id={lead.id} currentStatus={lead.status} />
                      <div className="flex justify-end mt-2">
                        <DeleteExhibitorButton id={lead.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
