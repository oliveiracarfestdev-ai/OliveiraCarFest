'use client'

import { useState } from 'react'
import { deleteAlbum } from '@/app/actions/gallery'

export function DeleteAlbumButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este álbum? Todas as fotos dentro dele serão apagadas.')) {
      setIsDeleting(true)
      await deleteAlbum(id)
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
      title="Excluir Álbum"
    >
      <span className="material-symbols-outlined text-lg">{isDeleting ? 'sync' : 'delete'}</span>
    </button>
  )
}
