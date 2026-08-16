'use client'

import { useState } from 'react'
import { deleteSponsor } from '@/app/actions/sponsors'

export function DeleteSponsorButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este patrocinador?')) {
      setIsDeleting(true)
      await deleteSponsor(id)
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
      title="Excluir Patrocinador"
    >
      <span className="material-symbols-outlined text-lg">{isDeleting ? 'sync' : 'delete'}</span>
    </button>
  )
}
