'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createEvent } from '@/app/actions/events'
import Link from 'next/link'

import imageCompression from 'browser-image-compression'

export default function NovoEventoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const originalFormData = new FormData(e.currentTarget)
      
      const bannerFile = originalFormData.get('banner') as File
      if (bannerFile && bannerFile.size > 0) {
        const options = {
          maxSizeMB: 0.5, // 500KB para banners
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        const compressedBanner = await imageCompression(bannerFile, options)
        originalFormData.set('banner', compressedBanner, compressedBanner.name)
      }

      const result = await createEvent(originalFormData)
      
      if (result?.error) {
        setError(result.error)
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erro ao processar a imagem do banner.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/eventos" className="text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Novo Evento</h1>
      </div>

      <div className="bg-card border border-border/50 p-6 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 font-sans text-sm p-3 bg-red-500/10 border border-red-500/20">{error}</div>}
          
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Título do Evento</label>
            <input name="title" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Data</label>
              <input name="date" type="date" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none [color-scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Hora</label>
              <input name="time" type="time" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none [color-scheme:dark]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Local / Cidade</label>
              <input name="location" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Link do Google Maps (Opcional)</label>
              <input name="address_url" type="url" placeholder="https://maps.google.com/..." className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Categoria</label>
              <select name="category" defaultValue="Encontro" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none">
                <option value="Encontro">Encontro</option>
                <option value="Exposição">Exposição</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Banner (Imagem)</label>
              <input name="banner" type="file" accept="image/*" required className="w-full bg-background border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Vagas Disponíveis</label>
              <input name="max_exhibitors" type="number" min="1" defaultValue="50" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
            <div className="space-y-2 flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer mt-6">
                <input type="checkbox" name="accepting_registrations" value="true" defaultChecked className="w-5 h-5 accent-primary" />
                <span className="font-sans text-sm text-foreground">Aceitando Inscrições</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Acesso Solidário / Doações (Opcional)</label>
            <input name="donation_items" placeholder="Ex: 1kg de Alimento, Brinquedo Novo" className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            <p className="text-xs text-muted-foreground font-sans">Separe os itens por vírgula. Se preenchido, os expositores terão que escolher uma opção.</p>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Descrição (Opcional)</label>
            <textarea name="description" rows={4} className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none resize-none"></textarea>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold py-6 rounded-none clip-corner flex items-center justify-center gap-2">
            {isSubmitting ? 'Salvando...' : 'Salvar Evento'}
            <span className="material-symbols-outlined text-lg">{isSubmitting ? 'sync' : 'save'}</span>
          </Button>
        </form>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="bg-card border border-border/50 p-8 rounded-sm flex flex-col items-center max-w-sm text-center shadow-2xl">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-2">Processando...</h3>
            <p className="font-sans text-sm text-muted-foreground">
              Comprimindo imagem e salvando os dados do evento. Por favor, não feche esta página.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
