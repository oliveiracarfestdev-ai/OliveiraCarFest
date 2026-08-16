'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createAlbum } from '@/app/actions/gallery'
import Link from 'next/link'

import imageCompression from 'browser-image-compression'

export default function NovoAlbumForm({ events }: { events: { id: string, title: string }[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const originalFormData = new FormData(e.currentTarget)
      
      const options = {
        maxSizeMB: 0.8, // 800KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      // 1. Comprimir Capa
      const coverFile = originalFormData.get('cover') as File
      if (coverFile && coverFile.size > 0) {
        const compressedCover = await imageCompression(coverFile, options)
        originalFormData.set('cover', compressedCover, compressedCover.name)
      }

      // 2. Comprimir Múltiplas Fotos
      const photosFiles = originalFormData.getAll('photos') as File[]
      originalFormData.delete('photos') // Remove originais
      for (const file of photosFiles) {
        if (file && file.size > 0) {
          const compressedPhoto = await imageCompression(file, options)
          originalFormData.append('photos', compressedPhoto, compressedPhoto.name)
        }
      }

      const result = await createAlbum(originalFormData)
      
      if (result?.error) {
        setError(result.error)
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erro ao processar e comprimir as imagens.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/admin/galerias" className="text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Novo Álbum</h1>
      </div>

      <div className="bg-card border border-border/50 p-6 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 font-sans text-sm p-3 bg-red-500/10 border border-red-500/20">{error}</div>}
          
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Título do Álbum</label>
            <input name="title" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Vincular a um Evento</label>
            <select name="event_id" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none">
              <option value="">Selecione um evento...</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Capa do Álbum (1 imagem)</label>
            <input name="cover" type="file" accept="image/*" required className="w-full bg-background border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Fotos (Múltiplas)</label>
            <input name="photos" type="file" accept="image/*" multiple className="w-full bg-background border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            <p className="text-xs text-muted-foreground font-sans">Selecione várias fotos de uma vez segurando Ctrl/Cmd.</p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold py-6 rounded-none clip-corner flex items-center justify-center gap-2">
            {isSubmitting ? 'Salvando...' : 'Salvar Álbum'}
            <span className="material-symbols-outlined text-lg">{isSubmitting ? 'sync' : 'save'}</span>
          </Button>
        </form>
      </div>
    </>
  )
}
