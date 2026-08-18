'use client'

import { useState } from 'react'
import { deleteSponsor } from '@/app/actions/sponsors'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export function DeleteSponsorButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteSponsor(id)
    setIsDeleting(false)
  }

  return (
    <ConfirmDialog 
      title="Excluir Patrocinador?" 
      description="Tem certeza que deseja excluir este patrocinador? Esta ação não pode ser desfeita."
      onConfirm={handleDelete}
    >
      <button 
        disabled={isDeleting}
        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 flex items-center justify-center w-8 h-8 rounded-sm hover:bg-red-500/10"
        title="Excluir Patrocinador"
      >
        <span className="material-symbols-outlined text-[18px]">{isDeleting ? 'sync' : 'delete'}</span>
      </button>
    </ConfirmDialog>
  )
}
