import { getPortalSession, logoutPortal } from '@/app/actions/portal'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { DownloadTicketButton } from './download-ticket-button'

export const dynamic = 'force-dynamic'

export default async function PortalDashboard() {
  const leads = await getPortalSession()

  if (!leads || leads.length === 0) {
    redirect('/portal')
  }

  const primaryLead = leads[0] // Para pegar o nome do dono, que será o mesmo

  return (
    <main className="flex-grow min-h-screen relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-background z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
          <div className="flex justify-between items-start mb-6 md:mb-12">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl uppercase font-black text-foreground leading-tight">
                Bem-vindo, <br className="md:hidden" /><span className="text-primary">{primaryLead.owner_name}</span>
              </h1>
              <p className="font-sans text-muted-foreground mt-2 text-sm md:text-base">
                Você possui <strong className="text-green-500 uppercase tracking-widest">{leads.length}</strong> projeto(s) aprovado(s).
              </p>
            </div>
            
            <form action={logoutPortal} className="shrink-0 ml-4">
              <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-red-400 p-2 h-auto">
                <span className="material-symbols-outlined text-2xl">logout</span>
                <span className="sr-only md:not-sr-only md:ml-2 font-bold uppercase tracking-widest text-xs">Sair</span>
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* O TICKET VIRTUAL - LISTAGEM */}
            <div className="space-y-6">
              {leads.map((lead: any) => {
                const eventName = lead.events?.title || "Evento Oficial"
                const eventDate = lead.events?.date ? new Date(lead.events.date + 'T12:00:00').toLocaleDateString('pt-BR') : "Em breve"
                const eventLocation = lead.events?.location || "A definir"

                return (
                  <div key={lead.id} className="bg-card border-2 border-primary/30 rounded-lg overflow-hidden shadow-2xl relative group hover:border-primary transition-colors duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-orange-400 to-primary"></div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="font-sans text-xs uppercase tracking-widest text-primary font-bold mb-1">Passaporte VIP • {eventName}</p>
                          <h2 className="font-heading text-3xl font-black uppercase text-foreground">Expositor</h2>
                        </div>
                        <span className="material-symbols-outlined text-5xl text-primary opacity-20">verified</span>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="font-sans text-xs uppercase text-muted-foreground font-bold">Veículo Confirmado</p>
                          <p className="font-sans text-xl font-bold uppercase text-foreground">{lead.car_model} <span className="text-muted-foreground text-sm font-normal">| {lead.car_year}</span></p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="font-sans text-xs uppercase text-muted-foreground font-bold">Placa de Acesso</p>
                            <div className="inline-block bg-background border border-border/50 px-4 py-2 rounded-sm mt-1">
                              <p className="font-mono text-xl font-bold uppercase tracking-[0.3em]">{lead.car_plate}</p>
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-sm">
                            <QRCodeSVG value={lead.id} size={64} level="L" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                          <div>
                            <p className="font-sans text-xs uppercase text-muted-foreground font-bold">Data (Prevista)</p>
                            <p className="font-sans font-bold text-foreground">{eventDate}</p>
                          </div>
                          <div>
                            <p className="font-sans text-xs uppercase text-muted-foreground font-bold">Local</p>
                            <p className="font-sans font-bold text-foreground">{eventLocation}</p>
                          </div>
                          {lead.donation_choice && (
                            <div className="col-span-2 pt-2 border-t border-border/10 mt-2">
                              <p className="font-sans text-xs uppercase text-muted-foreground font-bold flex items-center gap-1 mb-1">
                                <span className="material-symbols-outlined text-[14px]">volunteer_activism</span> Acesso Solidário
                              </p>
                              <p className="font-sans font-bold text-primary bg-primary/10 inline-block px-3 py-1 rounded-sm border border-primary/20">
                                {lead.donation_choice}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 border-t border-primary/20 p-4 flex justify-between items-center">
                      <p className="font-sans text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                        Apresente na entrada
                      </p>
                      <DownloadTicketButton lead={lead} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* INSTRUÇÕES E INFORMAÇÕES */}
            <div className="space-y-6">
              <div className="glass-panel p-6 border border-border/50 bg-background/50">
                <h3 className="font-sans text-lg uppercase font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">campaign</span>
                  Próximos Passos
                </h3>
                <ul className="space-y-4 font-sans text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                    A data oficial e os horários de entrada dos carros expositores serão divulgados no Instagram oficial.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                    Mantenha a estética do carro aprovada nas fotos. Alterações drásticas no visual devem ser comunicadas à organização.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                    A equipe de mídia do evento tem autorização para fotografar seu carro durante a exposição.
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-6 border border-border/50 bg-background/50">
                <h3 className="font-sans text-lg uppercase font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                  Dúvidas?
                </h3>
                <p className="font-sans text-sm text-muted-foreground mb-4">
                  Nossa equipe de curadoria está disponível para esclarecer qualquer dúvida sobre sua exposição.
                </p>
                <Link href="/contato" className="inline-flex items-center gap-2 text-primary hover:underline font-bold text-sm">
                  <span className="material-symbols-outlined text-base">mail</span>
                  Falar com a Curadoria
                </Link>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
