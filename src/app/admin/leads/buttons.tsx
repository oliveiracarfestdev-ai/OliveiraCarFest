'use client'

import { useState } from 'react'
import { deleteContactMessage, deleteSponsorLead, resolveSponsorLead } from '@/app/actions/leads'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export function DeleteMessageButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteContactMessage(id)
    setIsDeleting(false)
  }

  return (
    <ConfirmDialog 
      title="Excluir Mensagem?" 
      description="Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita."
      onConfirm={handleDelete}
    >
      <button disabled={isDeleting} className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-red-500/10" title="Excluir">
        <span className="material-symbols-outlined text-[18px]">{isDeleting ? 'sync' : 'delete'}</span>
      </button>
    </ConfirmDialog>
  )
}

export function DeleteLeadButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteSponsorLead(id)
    setIsDeleting(false)
  }

  return (
    <ConfirmDialog 
      title="Excluir Lead?" 
      description="Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita."
      onConfirm={handleDelete}
    >
      <button disabled={isDeleting} className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-red-500/10" title="Excluir">
        <span className="material-symbols-outlined text-[18px]">{isDeleting ? 'sync' : 'delete'}</span>
      </button>
    </ConfirmDialog>
  )
}

export function ResolveLeadButton({ id }: { id: string }) {
  const [isResolving, setIsResolving] = useState(false)

  const handleResolve = async () => {
    setIsResolving(true)
    await resolveSponsorLead(id)
    setIsResolving(false)
  }

  return (
    <ConfirmDialog 
      title="Resolver Lead?" 
      description="Marcar este lead como resolvido/contatado?"
      onConfirm={handleResolve}
    >
      <button disabled={isResolving} className="text-green-400 hover:text-green-300 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-green-500/10" title="Marcar como Resolvido">
        <span className="material-symbols-outlined text-[18px]">{isResolving ? 'sync' : 'check_circle'}</span>
      </button>
    </ConfirmDialog>
  )
}
