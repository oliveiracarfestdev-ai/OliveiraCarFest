'use client'

import { useState } from 'react'
import { updateExhibitorStatus, deleteExhibitorLead } from '@/app/actions/exhibitors'

import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export function UpdateStatusButton({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (newStatus: 'aprovado' | 'rejeitado' | 'pendente') => {
    setIsUpdating(true)
    await updateExhibitorStatus(id, newStatus)
    setIsUpdating(false)
  }

  return (
    <div className="flex gap-2">
      {currentStatus !== 'aprovado' && (
        <button 
          onClick={() => handleUpdate('aprovado')}
          disabled={isUpdating}
          className="bg-green-500/20 text-green-500 hover:bg-green-500/30 px-3 py-1 rounded-sm text-xs font-bold uppercase transition-colors"
        >
          Aprovar
        </button>
      )}
      {currentStatus !== 'rejeitado' && (
        <button 
          onClick={() => handleUpdate('rejeitado')}
          disabled={isUpdating}
          className="bg-red-500/20 text-red-500 hover:bg-red-500/30 px-3 py-1 rounded-sm text-xs font-bold uppercase transition-colors"
        >
          Rejeitar
        </button>
      )}
      {currentStatus !== 'pendente' && (
        <button 
          onClick={() => handleUpdate('pendente')}
          disabled={isUpdating}
          className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 px-3 py-1 rounded-sm text-xs font-bold uppercase transition-colors"
        >
          Pender
        </button>
      )}
    </div>
  )
}

export function DeleteExhibitorButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteExhibitorLead(id)
    setIsDeleting(false)
  }

  return (
    <ConfirmDialog 
      title="Excluir Inscrição?" 
      description="Tem certeza que deseja excluir esta inscrição permanentemente? Esta ação não pode ser desfeita."
      onConfirm={handleDelete}
    >
      <button 
        disabled={isDeleting}
        className="text-red-500 hover:text-red-400 p-2 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-red-500/10"
        title="Excluir Inscrição"
      >
        <span className="material-symbols-outlined text-[18px]">{isDeleting ? 'hourglass_empty' : 'delete'}</span>
      </button>
    </ConfirmDialog>
  )
}
