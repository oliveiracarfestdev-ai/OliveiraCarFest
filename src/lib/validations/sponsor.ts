import { z } from 'zod'
import { sanitizeHtml } from '../sanitize'

export const sponsorSchema = z.object({
  company: z.string().min(2, 'O nome da empresa é obrigatório.').transform(sanitizeHtml),
  contact_person: z.string().min(2, 'O nome do responsável é obrigatório.').transform(sanitizeHtml),
  phone: z.string().min(10, 'Telefone inválido.'),
  email: z.string().email('E-mail inválido.'),
  message: z.string().transform((val) => sanitizeHtml(val || '')),
})

export type SponsorFormData = z.infer<typeof sponsorSchema>
