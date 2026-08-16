import { getPortalSession } from '@/app/actions/portal'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PrintButton } from './print-button'

export default async function TicketPage({ params }: { params: { id: string } }) {
  const leads = await getPortalSession()

  if (!leads || leads.length === 0) {
    redirect('/portal')
  }

  // Verificar se o ID da URL pertence aos leads deste usuário
  const targetLead = leads.find((l) => l.id === params.id)
  
  if (!targetLead) {
    redirect('/portal/dashboard')
  }

  const eventName = targetLead.events?.title || "Evento Oficial"
  const eventDate = targetLead.events?.date ? new Date(targetLead.events.date + 'T12:00:00').toLocaleDateString('pt-BR') : "Em breve"
  const eventLocation = targetLead.events?.location || "A definir"

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 print:p-0 print:bg-white">
      {/* Botão de Imprimir (Apenas visível na tela) */}
      <div className="fixed top-4 right-4 print:hidden flex gap-4">
        <a href="/portal/dashboard" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-bold uppercase tracking-wider">
          Voltar
        </a>
        <PrintButton />
      </div>

      {/* O TICKET (Estilo de Impressão) */}
      <div className="w-full max-w-2xl bg-white border-2 border-black rounded-xl overflow-hidden shadow-2xl print:shadow-none print:border-2 print:border-black relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-black print:bg-black"></div>
        
        <div className="p-10 mt-4">
          <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
            <div>
              <p className="font-sans text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Passaporte VIP</p>
              <h2 className="font-heading text-4xl font-black uppercase text-black">Oliveira Car Fest</h2>
              <p className="font-sans text-xl font-bold uppercase text-black mt-2 bg-gray-200 inline-block px-3 py-1">{eventName}</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Categoria</p>
              <p className="font-heading text-3xl font-black uppercase text-black">Expositor</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-sans text-xs uppercase text-gray-500 font-bold mb-1">Titular da Vaga</p>
              <p className="font-sans text-2xl font-bold uppercase text-black">{targetLead.owner_name}</p>
            </div>
            
            <div>
              <p className="font-sans text-xs uppercase text-gray-500 font-bold mb-1">Veículo Confirmado</p>
              <p className="font-sans text-2xl font-bold uppercase text-black">{targetLead.car_model} <span className="text-gray-500 text-lg font-normal">| {targetLead.car_year}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t-2 border-black border-dashed">
            <div className="col-span-1">
              <p className="font-sans text-xs uppercase text-gray-500 font-bold mb-1">Placa de Acesso</p>
              <div className="inline-block bg-white border-2 border-black px-4 py-2 mt-1">
                <p className="font-mono text-xl font-bold uppercase tracking-[0.3em] text-black">{targetLead.car_plate}</p>
              </div>
            </div>
            <div className="col-span-1">
              <p className="font-sans text-xs uppercase text-gray-500 font-bold mb-1">Data</p>
              <p className="font-sans text-lg font-bold text-black">{eventDate}</p>
            </div>
            <div className="col-span-1">
              <p className="font-sans text-xs uppercase text-gray-500 font-bold mb-1">Local</p>
              <p className="font-sans text-lg font-bold text-black">{eventLocation}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-black p-6 text-center">
          <p className="font-sans text-sm uppercase tracking-widest text-white font-bold flex items-center justify-center gap-2">
            Este passaporte é intransferível e obrigatório para a entrada do veículo.
          </p>
        </div>
      </div>

    </div>
  )
}
