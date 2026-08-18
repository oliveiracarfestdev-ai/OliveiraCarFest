'use client'

import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { checkInExhibitor } from '@/app/actions/checkin'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  const handleScan = async (result: string) => {
    if (processing || !result) return
    
    setProcessing(true)
    setIsScanning(false) // Parar o scanner temporariamente
    
    try {
      toast.loading('Validando ingresso...', { id: 'checkin' })
      const res = await checkInExhibitor(result)
      
      if (res.error) {
        toast.error(res.error, { id: 'checkin', duration: 4000 })
      } else {
        toast.success(res.message, { id: 'checkin', duration: 4000 })
        router.refresh()
      }
    } catch (err) {
      toast.error('Erro de conexão ao validar o ingresso.', { id: 'checkin' })
    } finally {
      // Pequeno delay antes de permitir novo scan
      setTimeout(() => {
        setProcessing(false)
      }, 2000)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isScanning ? (
        <button
          onClick={() => setIsScanning(true)}
          disabled={processing}
          className="w-full aspect-video bg-card border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 rounded-sm flex flex-col items-center justify-center gap-4 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="material-symbols-outlined text-4xl text-primary">qr_code_scanner</span>
          <span className="font-sans uppercase font-bold text-sm tracking-widest text-primary">
            {processing ? 'Processando...' : 'Iniciar Leitor de QR Code'}
          </span>
        </button>
      ) : (
        <div className="relative rounded-sm overflow-hidden border-2 border-primary bg-black">
          <Scanner 
            onScan={(detectedCodes) => handleScan(detectedCodes[0].rawValue)} 
            onError={(error) => console.log(error?.message)}
            scanDelay={1000}
          />
          <button
            onClick={() => setIsScanning(false)}
            className="absolute top-2 right-2 w-10 h-10 bg-black/50 hover:bg-red-500/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}
    </div>
  )
}
