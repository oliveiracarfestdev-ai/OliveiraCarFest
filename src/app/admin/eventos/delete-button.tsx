'use client'

import { useState } from 'react'
import { deleteEvent } from '@/app/actions/events'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export function DeleteEventButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteEvent(id)
    setIsDeleting(false)
  }

  return (
    <ConfirmDialog 
      title="Excluir Evento?" 
      description="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita e todas as galerias e leads vinculados podem ser afetados."
      onConfirm={handleDelete}
    >
      <button 
        disabled={isDeleting}
        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-red-500/10"
        title="Excluir Evento"
      >
        <span className="material-symbols-outlined text-[18px]">{isDeleting ? 'sync' : 'delete'}</span>
      </button>
    </ConfirmDialog>
  )
}
