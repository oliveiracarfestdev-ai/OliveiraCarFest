'use client'

import { useState } from 'react'
import html2canvas from 'html2canvas'
import { QRCodeCanvas } from 'qrcode.react'

interface DownloadTicketButtonProps {
  lead: {
    id: string
    owner_name: string
    car_model: string
    car_year: string
    car_plate: string
    donation_choice?: string
    events?: {
      title?: string
      date?: string
      location?: string
    }
  }
}

export function DownloadTicketButton({ lead }: DownloadTicketButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const eventName = lead.events?.title || 'Evento Oficial'
  const eventDate = lead.events?.date
    ? new Date(lead.events.date + 'T12:00:00').toLocaleDateString('pt-BR')
    : 'Em breve'
  const eventLocation = lead.events?.location || 'A definir'

  const handleDownload = async () => {
    setIsGenerating(true)

    // Extrair valores antes do template para garantir interpolação
    const ownerName = lead.owner_name || 'N/A'
    const carModel = lead.car_model || 'N/A'
    const carYear = lead.car_year || 'N/A'
    const carPlate = lead.car_plate || 'N/A'
    const donationChoice = lead.donation_choice || ''
    const leadId = lead.id

    try {
      // 1. Criar div temporário com o ticket para impressão
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.left = '-9999px'
      container.style.top = '0'
      container.style.width = '700px'
      container.style.zIndex = '-1'

      const donationHTML = donationChoice ? `
            <div style="margin-bottom:30px;padding:16px;background:#f5f5f5;border:1px solid #ddd;border-radius:4px;">
              <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Acesso Solidário Obrigatório</p>
              <p style="font-size:16px;font-weight:700;text-transform:uppercase;color:#000;margin:0;">Trazer no dia: ${donationChoice}</p>
            </div>` : ''

      container.innerHTML = `
        <div id="temp-ticket" style="background:#fff;border:3px solid #000;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
          <div style="height:12px;background:#000;"></div>
          <div style="padding:40px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #000;padding-bottom:30px;margin-bottom:30px;">
              <div>
                <p style="font-size:12px;text-transform:uppercase;letter-spacing:3px;color:#888;font-weight:700;margin:0 0 4px 0;">Passaporte VIP</p>
                <h2 style="font-size:32px;font-weight:900;text-transform:uppercase;color:#000;margin:0;">Oliveira Car Fest</h2>
                <p style="font-size:18px;font-weight:700;text-transform:uppercase;color:#000;margin:10px 0 0 0;background:#eee;display:inline-block;padding:4px 12px;">${eventName}</p>
              </div>
              <div style="text-align:right;">
                <p style="font-size:12px;text-transform:uppercase;letter-spacing:3px;color:#888;font-weight:700;margin:0 0 4px 0;">Categoria</p>
                <p style="font-size:28px;font-weight:900;text-transform:uppercase;color:#000;margin:0;">Expositor</p>
                <div id="qr-placeholder" style="margin-top:10px;padding:8px;border:2px solid #000;display:inline-block;"></div>
              </div>
            </div>
            <div style="display:flex;gap:40px;margin-bottom:30px;">
              <div>
                <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Titular da Vaga</p>
                <p style="font-size:22px;font-weight:700;text-transform:uppercase;color:#000;margin:0;">${ownerName}</p>
              </div>
              <div>
                <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Veículo Confirmado</p>
                <p style="font-size:22px;font-weight:700;text-transform:uppercase;color:#000;margin:0;">${carModel} <span style="color:#888;font-size:16px;font-weight:400;">| ${carYear}</span></p>
              </div>
            </div>
            ${donationHTML}
            <div style="display:flex;gap:40px;padding-top:30px;border-top:3px dashed #000;">
              <div>
                <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Placa de Acesso</p>
                <div style="display:inline-block;background:#fff;border:2px solid #000;padding:8px 16px;margin-top:4px;">
                  <p id="plate-text" style="font-family:monospace;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:6px;color:#000;margin:0;">${carPlate}</p>
                </div>
              </div>
              <div>
                <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Data</p>
                <p style="font-size:16px;font-weight:700;color:#000;margin:0;">${eventDate}</p>
              </div>
              <div>
                <p style="font-size:11px;text-transform:uppercase;color:#888;font-weight:700;margin:0 0 4px 0;">Local</p>
                <p style="font-size:16px;font-weight:700;color:#000;margin:0;">${eventLocation}</p>
              </div>
            </div>
          </div>
          <div style="background:#000;padding:20px;text-align:center;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:3px;color:#fff;font-weight:700;margin:0;">Este passaporte é intransferível e obrigatório para a entrada do veículo.</p>
          </div>
        </div>
      `
      document.body.appendChild(container)

      // Garantir que a placa foi renderizada
      const plateEl = container.querySelector('#plate-text')
      if (plateEl) {
        plateEl.textContent = carPlate
      }

      // 2. Renderizar QR Code dentro do placeholder
      const qrPlaceholder = container.querySelector('#qr-placeholder')
      if (qrPlaceholder) {
        const qrCanvas = document.createElement('canvas')
        // Usamos a lib do React fora do React criando um canvas manual
        const qrContainer = document.createElement('div')
        qrPlaceholder.appendChild(qrContainer)
        
        // Importar e renderizar QR code manualmente via canvas
        const QRCode = await import('qrcode')
        await QRCode.toCanvas(qrCanvas, lead.id, { width: 80, margin: 0 })
        qrPlaceholder.innerHTML = ''
        qrPlaceholder.appendChild(qrCanvas)
      }

      // 3. Aguardar renderização
      await new Promise(resolve => setTimeout(resolve, 300))

      // 4. Capturar com html2canvas
      const ticketEl = container.querySelector('#temp-ticket') as HTMLElement
      const canvas = await html2canvas(ticketEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const imageData = canvas.toDataURL('image/png')

      // 5. Remover div temporário
      document.body.removeChild(container)

      // 6. Mostrar modal com a imagem gerada
      setGeneratedImage(imageData)

      // 7. Tentar download automático também
      try {
        const link = document.createElement('a')
        link.href = imageData
        link.download = `ticket-${lead.car_plate}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        // Se o download automático falhar, o modal já está aberto
      }

    } catch (error) {
      console.error('Erro ao gerar ticket:', error)
      alert('Não foi possível gerar a imagem do ticket. Tente novamente.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="font-sans text-[10px] uppercase tracking-widest bg-primary text-black px-3 py-1.5 rounded-sm font-bold flex items-center gap-1 hover:bg-primary/80 transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[14px]">
          {isGenerating ? 'hourglass_empty' : 'download'}
        </span>
        {isGenerating ? 'Gerando...' : 'Baixar Ticket'}
      </button>

      {generatedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-lg w-full text-center py-8">
            <h3 className="text-white font-bold text-xl mb-2 font-heading uppercase">
              Ingresso Gerado!
            </h3>
            <p className="text-gray-400 text-sm mb-6 font-sans">
              Se o download não iniciou automaticamente,{' '}
              <strong className="text-primary">
                pressione e segure a imagem abaixo
              </strong>{' '}
              e escolha &quot;Salvar Imagem&quot;.
            </p>

            <img
              src={generatedImage}
              alt="Ticket Gerado"
              className="max-w-full w-auto max-h-[55vh] mx-auto rounded-xl shadow-2xl border-2 border-primary"
            />

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={generatedImage}
                download={`ticket-${lead.car_plate}.png`}
                className="w-full px-6 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-md flex justify-center items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined">download</span>
                Baixar Imagem
              </a>
              <button
                onClick={() => setGeneratedImage(null)}
                className="w-full px-6 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-md text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
