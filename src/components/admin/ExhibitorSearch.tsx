'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function ExhibitorSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [term, setTerm] = useState(searchParams?.get('q') || '')

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    params.set('page', '1') // reset page on search
    
    startTransition(() => {
      router.push(`/admin/expositores?${params.toString()}`)
    })
  }, 300)

  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-muted-foreground text-xl">search</span>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-border/50 rounded-sm bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
        placeholder="Buscar por piloto, carro, email ou telefone..."
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          handleSearch(e.target.value)
        }}
      />
      {isPending && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}
