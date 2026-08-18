'use client'

import { checkInExhibitor } from '@/app/actions/checkin'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ManualCheckInButton({ id, ownerName }: { id: string, ownerName: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckIn = async () => {
    if (confirm(`Confirmar entrada manual de ${ownerName}?`)) {
      setLoading(true)
      try {
        const res = await checkInExhibitor(id)
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success(res.message)
          router.refresh()
        }
      } catch (err) {
        toast.error('Erro de conexão.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <button
      onClick={handleCheckIn}
      disabled={loading}
      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider text-[10px] rounded-sm transition-colors flex items-center gap-1 disabled:opacity-50"
    >
      <span className="material-symbols-outlined text-sm">check_circle</span>
      {loading ? 'Validando...' : 'Liberar Entrada'}
    </button>
  )
}
