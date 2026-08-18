'use client'

import { useState } from 'react'
import { updateSettings } from '@/app/actions/settings'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateSettings(formData)
      
      if (result?.error) {
        setError(result.error)
      } else {
        toast.success('Configurações salvas com sucesso!')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar configurações.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 font-sans text-sm p-3 bg-red-500/10 border border-red-500/20">{error}</div>}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-sans text-xs uppercase text-muted-foreground">Quantidade de Carros Exclusivos</label>
          <input 
            name="exclusive_cars_count"
            type="number"
            min="0"
            defaultValue={initialSettings?.exclusive_cars_count || 0}
            required 
            className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-sans text-xs uppercase text-muted-foreground">Quantidade de Parceiros Oficiais</label>
          <input 
            name="official_partners_count"
            type="number"
            min="0"
            defaultValue={initialSettings?.official_partners_count || 0}
            required 
            className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold py-6 rounded-none clip-corner flex items-center justify-center gap-2">
        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        <span className="material-symbols-outlined text-lg">{isSubmitting ? 'sync' : 'save'}</span>
      </Button>
    </form>
  )
}
