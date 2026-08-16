'use client'

import { useState } from 'react'
import { deleteContactMessage, deleteSponsorLead, resolveSponsorLead } from '@/app/actions/leads'

export function DeleteMessageButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      setIsDeleting(true)
      await deleteContactMessage(id)
      setIsDeleting(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting} className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50" title="Excluir">
      <span className="material-symbols-outlined text-lg">{isDeleting ? 'sync' : 'delete'}</span>
    </button>
  )
}

export function DeleteLeadButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      setIsDeleting(true)
      await deleteSponsorLead(id)
      setIsDeleting(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting} className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50" title="Excluir">
      <span className="material-symbols-outlined text-lg">{isDeleting ? 'sync' : 'delete'}</span>
    </button>
  )
}

export function ResolveLeadButton({ id }: { id: string }) {
  const [isResolving, setIsResolving] = useState(false)

  const handleResolve = async () => {
    if (confirm('Marcar este lead como resolvido/contatado?')) {
      setIsResolving(true)
      await resolveSponsorLead(id)
      setIsResolving(false)
    }
  }

  return (
    <button onClick={handleResolve} disabled={isResolving} className="text-green-400 hover:text-green-300 transition-colors disabled:opacity-50" title="Marcar como Resolvido">
      <span className="material-symbols-outlined text-lg">{isResolving ? 'sync' : 'check_circle'}</span>
    </button>
  )
}
