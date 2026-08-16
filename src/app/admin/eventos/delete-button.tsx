'use client'

import { useState } from 'react'
import { deleteEvent } from '@/app/actions/events'

export function DeleteEventButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      setIsDeleting(true)
      await deleteEvent(id)
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
      title="Excluir Evento"
    >
      <span className="material-symbols-outlined text-lg">{isDeleting ? 'sync' : 'delete'}</span>
    </button>
  )
}
