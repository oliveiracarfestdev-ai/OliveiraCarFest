import { createClient } from '@/lib/supabase/server'
import { DeleteMessageButton, DeleteLeadButton, ResolveLeadButton } from './buttons'

export default async function LeadsAdmin() {
  const supabase = await createClient()

  const { data: messages } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  const { data: leads } = await supabase.from('sponsor_leads').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground mb-6">Leads de Patrocinadores</h1>
        <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-black/40 border-b border-border/50 text-muted-foreground font-sans">
                <tr>
                  <th className="px-6 py-4">Empresa / Contato</th>
                  <th className="px-6 py-4">Telefone / E-mail</th>
                  <th className="px-6 py-4 w-1/3">Mensagem</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="font-sans">
                {leads?.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{lead.company}</div>
                      <div className="text-xs text-muted-foreground">{lead.contact_person}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{lead.phone || '-'}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-xs italic opacity-80">{lead.message}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs uppercase font-bold tracking-widest ${lead.status === 'resolvido' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {lead.status !== 'resolvido' && <ResolveLeadButton id={lead.id} />}
                      <DeleteLeadButton id={lead.id} />
                    </td>
                  </tr>
                ))}
                {!leads || leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Nenhum interesse comercial recebido.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground mb-6">Mensagens de Contato</h1>
        <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-black/40 border-b border-border/50 text-muted-foreground font-sans">
                <tr>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Telefone / E-mail</th>
                  <th className="px-6 py-4 w-1/2">Mensagem</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="font-sans">
                {messages?.map((msg) => (
                  <tr key={msg.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">{msg.name}</td>
                    <td className="px-6 py-4">
                      <div>{msg.whatsapp || '-'}</div>
                      <div className="text-xs text-muted-foreground">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 text-xs italic opacity-80">{msg.message}</td>
                    <td className="px-6 py-4 text-right">
                      <DeleteMessageButton id={msg.id} />
                    </td>
                  </tr>
                ))}
                {!messages || messages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Nenhuma mensagem recebida.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
