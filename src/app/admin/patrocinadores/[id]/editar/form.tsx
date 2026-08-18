'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateSponsor } from '@/app/actions/sponsors'
import Link from 'next/link'
import imageCompression from 'browser-image-compression'
import { useRouter } from 'next/navigation'

export default function EditSponsorForm({ sponsor }: { sponsor: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const originalFormData = new FormData(e.currentTarget)
      
      const logoFile = originalFormData.get('logo') as File
      if (logoFile && logoFile.size > 0) {
        const options = {
          maxSizeMB: 0.2, // 200KB
          maxWidthOrHeight: 800,
          useWebWorker: true,
        }
        const compressedLogo = await imageCompression(logoFile, options)
        originalFormData.set('logo', compressedLogo, compressedLogo.name)
      }

      const result = await updateSponsor(sponsor.id, originalFormData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        router.push('/admin/patrocinadores')
        router.refresh()
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erro ao processar a imagem do logo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/admin/patrocinadores" className="text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Editar Patrocinador</h1>
      </div>

      <div className="bg-card border border-border/50 p-6 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 font-sans text-sm p-3 bg-red-500/10 border border-red-500/20">{error}</div>}
          
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Nome da Empresa</label>
            <input name="name" defaultValue={sponsor.name} required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Categoria</label>
            <select name="category" defaultValue={sponsor.category} required className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none">
              <option value="ouro">Ouro</option>
              <option value="prata">Prata</option>
              <option value="bronze">Bronze</option>
              <option value="parceiro">Parceiro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Logo (Imagem)</label>
            {sponsor.logo_url && (
              <div className="mb-4 p-4 border border-border/50 bg-white/5 rounded-sm">
                <img src={sponsor.logo_url} alt="Logo atual" className="h-20 object-contain mb-3" />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="remove_logo" value="true" className="w-4 h-4 accent-red-500" />
                  <span className="font-sans text-sm text-red-400 hover:text-red-300 transition-colors">Excluir logo atual</span>
                </label>
              </div>
            )}
            <input name="logo" type="file" accept="image/*" className="w-full bg-background border border-border/50 p-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            <p className="text-xs text-muted-foreground mt-2">Deixe em branco para manter a imagem atual. Se enviar uma nova, a antiga será substituída automaticamente.</p>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase text-muted-foreground">Descrição / Detalhes</label>
            <textarea name="description" defaultValue={sponsor.description || ''} rows={4} placeholder="Informações sobre a empresa, produtos, serviços..." className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none resize-y" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Site (Opcional)</label>
              <input name="website_url" type="url" defaultValue={sponsor.website_url || ''} placeholder="https://" className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase text-muted-foreground">Instagram (Opcional)</label>
              <input name="instagram_url" type="url" defaultValue={sponsor.instagram_url || ''} placeholder="https://instagram.com/..." className="w-full bg-background border border-border/50 p-3 text-sm text-foreground focus:border-primary outline-none" />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase font-bold py-6 rounded-none clip-corner flex items-center justify-center gap-2">
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            <span className="material-symbols-outlined text-lg">{isSubmitting ? 'sync' : 'save'}</span>
          </Button>
        </form>
      </div>
    </>
  )
}
