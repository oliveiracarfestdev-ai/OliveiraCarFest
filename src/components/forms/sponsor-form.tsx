'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { sponsorSchema, SponsorFormData } from '@/lib/validations/sponsor'
import { submitSponsorLead } from '@/app/actions/sponsor'

export function SponsorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
  })

  const onSubmit = async (data: SponsorFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    const result = await submitSponsorLead(data)

    if (result.success) {
      setSubmitStatus({ success: true, message: 'Interesse enviado com sucesso. Nossa equipe entrará em contato!' })
      reset()
    } else {
      setSubmitStatus({ success: false, message: result.error || 'Erro ao enviar. Tente novamente.' })
    }

    setIsSubmitting(false)
  }

  return (
    <form className="space-y-8 relative z-10 bg-card p-12 border border-border/50 backdrop-blur-sm" onSubmit={handleSubmit(onSubmit)}>
      {submitStatus && (
        <div className={`p-4 rounded-sm font-sans text-sm mb-6 ${submitStatus.success ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="company">Empresa</label>
          <input 
            className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
            id="company" 
            placeholder="Nome da empresa" 
            {...register('company')}
          />
          {errors.company && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.company.message}</span>}
        </div>

        <div className="relative">
          <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="contact_person">Pessoa Responsável</label>
          <input 
            className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
            id="contact_person" 
            placeholder="Seu nome" 
            {...register('contact_person')}
          />
          {errors.contact_person && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.contact_person.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="relative">
          <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="email">E-mail</label>
          <input 
            className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
            id="email" 
            type="email"
            placeholder="contato@empresa.com" 
            {...register('email')}
          />
          {errors.email && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.email.message}</span>}
        </div>

        <div className="relative">
          <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="phone">Telefone / WhatsApp</label>
          <input 
            className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
            id="phone" 
            placeholder="(11) 99999-9999" 
            {...register('phone')}
          />
          {errors.phone && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="relative pt-4">
        <label className="font-sans text-xs text-muted-foreground uppercase absolute top-0 left-0" htmlFor="message">Mensagem / Interesse</label>
        <textarea 
          className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none resize-none" 
          id="message" 
          placeholder="Como gostaria de participar?" 
          rows={4}
          {...register('message')}
        ></textarea>
        {errors.message && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.message.message}</span>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-8 px-6 flex items-center justify-center gap-3 group mt-8 bg-gradient-to-br from-primary to-orange-600 rounded-none clip-corner text-background hover:brightness-110 disabled:opacity-70"
      >
        <span className="font-sans text-sm uppercase font-bold tracking-widest group-hover:scale-105 transition-transform">
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
        </span>
        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
          {isSubmitting ? 'sync' : 'arrow_forward'}
        </span>
      </Button>
    </form>
  )
}
