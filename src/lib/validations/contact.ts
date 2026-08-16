import { z } from 'zod'
import { sanitizeHtml } from '../sanitize'

export const contactSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres.').transform(sanitizeHtml),
  email: z.string().email('E-mail inválido.'),
  subject: z.string().transform(sanitizeHtml),
  message: z.string().min(10, 'A mensagem deve ter no mínimo 10 caracteres.').transform(sanitizeHtml),
})

export type ContactFormData = z.infer<typeof contactSchema>
