'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'
import { submitContactForm } from '@/app/actions/contact'
import { toast } from 'sonner'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    const result = await submitContactForm(data)

    if (result.success) {
      toast.success('Transmissão enviada com sucesso. Aguarde nosso retorno.')
      reset()
    } else {
      toast.error(result.error || 'Erro ao enviar. Tente novamente.')
    }

    setIsSubmitting(false)
  }

  return (
    <form className="space-y-10 relative z-10" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="relative">
        <label className="font-sans text-xs text-muted-foreground uppercase absolute -top-5 left-0" htmlFor="name">Seu Nome</label>
        <input 
          className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
          id="name" 
          placeholder="Insira seu nome" 
          {...register('name')}
        />
        {errors.name && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.name.message}</span>}
      </div>

      <div className="relative pt-4">
        <label className="font-sans text-xs text-muted-foreground uppercase absolute top-0 left-0" htmlFor="email">E-mail de Contato</label>
        <input 
          className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none" 
          id="email" 
          placeholder="comms@dominio.com" 
          type="email" 
          {...register('email')}
        />
        {errors.email && <span className="text-red-500 text-xs absolute bottom-1 left-0">{errors.email.message}</span>}
      </div>

      <div className="relative pt-4">
        <label className="font-sans text-xs text-muted-foreground uppercase absolute top-0 left-0" htmlFor="subject">Classificação do Assunto</label>
        <select 
          className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none appearance-none cursor-pointer" 
          id="subject" 
          {...register('subject')}
        >
          <option className="bg-card text-foreground" value="geral">Consulta Geral</option>
          <option className="bg-card text-foreground" value="patrocinio">Parceria / Patrocínio</option>
          <option className="bg-card text-foreground" value="imprensa">Credenciamento de Imprensa</option>
          <option className="bg-card text-foreground" value="tecnico">Suporte Técnico</option>
        </select>
        <span className="material-symbols-outlined absolute right-0 top-6 text-primary pointer-events-none">arrow_drop_down</span>
      </div>

      <div className="relative pt-4">
        <label className="font-sans text-xs text-muted-foreground uppercase absolute top-0 left-0" htmlFor="message">Mensagem (Criptografada)</label>
        <textarea 
          className="w-full bg-transparent border-none border-b-2 border-border focus:border-primary py-3 px-0 text-foreground font-sans transition-colors outline-none resize-none" 
          id="message" 
          placeholder="Digite sua transmissão aqui..." 
          rows={5}
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
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </span>
        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
          {isSubmitting ? 'sync' : 'send'}
        </span>
      </Button>
    </form>
  )
}
