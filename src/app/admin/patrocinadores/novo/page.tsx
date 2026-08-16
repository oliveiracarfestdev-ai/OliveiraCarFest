'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createSponsor } from '@/app/actions/sponsors'
import Link from 'next/link'

export default function NovoPatrocinadorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await createSponsor(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/patrocinadores" className="text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Novo Patrocinador</h1>
      </div>

      <div className="bg-card border border-border/50 p-6 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 font-sans text-sm p-3 bg-red-500/10 border border-red-500/20">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Nome da Empresa</label>
              <input name="name" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Categoria</label>
              <select name="category" required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none">
                <option value="ouro">Ouro</option>
                <option value="prata">Prata</option>
                <option value="bronze">Bronze</option>
                <option value="parceiro">Parceiro Institucional</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Logomarca</label>
            <input name="logo" type="file" accept="image/*" className="w-full bg-background border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Website (URL)</label>
              <input name="website_url" type="url" placeholder="https://" className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Instagram (URL)</label>
              <input name="instagram_url" type="url" placeholder="https://instagram.com/..." className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold py-6 rounded-none clip-corner flex items-center justify-center gap-2">
            {isSubmitting ? 'Salvando...' : 'Salvar Patrocinador'}
            <span className="material-symbols-outlined text-lg">{isSubmitting ? 'sync' : 'save'}</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
