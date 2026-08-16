'use client'

import { useState } from 'react'
import { updateExhibitorStatus, deleteExhibitorLead } from '@/app/actions/exhibitors'

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
    if (confirm('Tem certeza que deseja excluir esta inscrição permanentemente?')) {
      setIsDeleting(true)
      await deleteExhibitorLead(id)
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-400 p-2 transition-colors disabled:opacity-50"
      title="Excluir Inscrição"
    >
      <span className="material-symbols-outlined">{isDeleting ? 'hourglass_empty' : 'delete'}</span>
    </button>
  )
}
