'use client'

import { useState } from 'react'
import { createExhibitorLead } from '@/app/actions/exhibitors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import imageCompression from 'browser-image-compression'

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  donation_items?: string | null;
}

export function ExhibitorForm({ events }: { events: EventData[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<string>('')

  const selectedEvent = events.find(e => e.id === selectedEventId)
  const donationOptions = selectedEvent?.donation_items ? selectedEvent.donation_items.split(',').map(i => i.trim()).filter(Boolean) : []

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Guardar a referência do formulário antes de qualquer await
    const formElement = event.currentTarget
    
    setIsSubmitting(true)
    setMessage(null)

    try {
      const originalFormData = new FormData(formElement)
      
      const photoFile = originalFormData.get('car_photo') as File
      if (photoFile && photoFile.size > 0) {
        const options = {
          maxSizeMB: 1, // Max 1MB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        const compressedPhoto = await imageCompression(photoFile, options)
        originalFormData.set('car_photo', compressedPhoto, compressedPhoto.name)
      }

      const result = await createExhibitorLead(originalFormData)

      if (result?.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result?.success) {
        setMessage({ type: 'success', text: 'Inscrição enviada com sucesso! Aguarde nosso contato via WhatsApp ou E-mail para confirmação da vaga.' })
        formElement.reset()
      }
    } catch (e: any) {
      console.error(e)
      setMessage({ type: 'error', text: 'Erro ao processar a imagem do carro.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="event_id" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Selecione o Evento</label>
        <select 
          id="event_id" 
          name="event_id" 
          required 
          className="w-full bg-background/50 border border-border/50 p-3 text-sm text-foreground focus:border-primary focus:outline-none h-12"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">Escolha um evento...</option>
          {events.map((evt) => {
            const d = new Date(evt.date + 'T12:00:00').toLocaleDateString('pt-BR');
            return (
              <option key={evt.id} value={evt.id}>
                {evt.title} - {d} ({evt.location})
              </option>
            )
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
        <div className="space-y-2">
          <label htmlFor="owner_name" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Nome do Piloto</label>
          <Input id="owner_name" name="owner_name" placeholder="Seu nome completo" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="instagram" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Instagram</label>
          <Input id="instagram" name="instagram" placeholder="@seuperfil" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">E-mail</label>
          <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">WhatsApp</label>
          <Input id="phone" name="phone" placeholder="(11) 90000-0000" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/30">
        <div className="space-y-2">
          <label htmlFor="car_plate" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Placa do Veículo</label>
          <Input id="car_plate" name="car_plate" placeholder="Ex: ABC1234" required className="bg-background/50 border-border/50 focus:border-primary uppercase" />
        </div>

        <div className="space-y-2">
          <label htmlFor="car_model" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Modelo do Carro</label>
          <Input id="car_model" name="car_model" placeholder="Ex: VW Jetta" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="car_year" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Ano</label>
          <Input id="car_year" name="car_year" placeholder="Ex: 2014" required className="bg-background/50 border-border/50 focus:border-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="car_photo" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Foto do Veículo (Obrigatório)</label>
        <input 
          id="car_photo" 
          name="car_photo" 
          type="file" 
          accept="image/*" 
          required 
          className="w-full bg-background/50 border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:border-primary focus:outline-none" 
        />
        <p className="text-xs text-muted-foreground font-sans mt-1">Essa foto será usada na avaliação e também como material de divulgação nas redes sociais se aprovado.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="modifications" className="text-sm font-sans uppercase font-bold tracking-widest text-primary">Modificações (Suspensão, Rodas, Motor, etc.)</label>
        <Textarea 
          id="modifications" 
          name="modifications" 
          placeholder="Descreva o que seu projeto tem de único..." 
          required 
          className="bg-background/50 border-border/50 focus:border-primary min-h-[120px]" 
        />
      </div>

      {donationOptions.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border/30">
          <label className="text-sm font-sans uppercase font-bold tracking-widest text-primary">
            Acesso Solidário Obrigatório
          </label>
          <p className="text-xs text-muted-foreground font-sans mb-2">
            Este evento exige uma doação. Por favor, marque qual item você levará no dia:
          </p>
          <div className="flex flex-col space-y-2">
            {donationOptions.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 bg-background/30 border border-border/50 p-3 cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="donation_choice" value={option} required className="text-primary focus:ring-primary h-4 w-4" />
                <span className="font-sans text-sm text-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {message && (
        <div className={`p-4 rounded-sm border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
          <p className="font-sans text-sm font-medium">{message.text}</p>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-sans uppercase tracking-wider py-6 hover:bg-primary/90 transition-all glow-hover"
      >
        {isSubmitting ? 'Enviando...' : 'Submeter Projeto para Avaliação'}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center pt-4">
        *A inscrição não garante a vaga. Nossa curadoria entrará em contato para os próximos passos caso seu projeto seja selecionado.
      </p>
    </form>
  )
}
