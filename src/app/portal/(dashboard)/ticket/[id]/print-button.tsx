'use client'

import { useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { useSearchParams } from 'next/navigation'

export function PrintButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const searchParams = useSearchParams()
  const autoDownload = searchParams.get('download') === 'true'

  const handleDownload = async () => {
    const element = document.getElementById('ticket-container')
    if (!element) return

    setIsGenerating(true)
    try {
      // Small delay to ensure any fonts/images are fully loaded before capturing
      await new Promise(resolve => setTimeout(resolve, 500))

      const canvas = await html2canvas(element, {
        scale: 2, // High quality
        useCORS: true,
        backgroundColor: '#ffffff'
      })

      const data = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      
      if (typeof link.download === 'string') {
        link.href = data
        link.download = `ticket-expositor.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        window.open(data)
      }

      // Se foi download automático, podemos tentar fechar a aba após o download
      if (autoDownload) {
        setTimeout(() => {
          window.close()
        }, 1000)
      }
    } catch (error) {
      console.error('Error generating ticket image:', error)
      alert('Não foi possível gerar a imagem do ticket.')
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (autoDownload) {
      handleDownload()
    }
  }, [autoDownload])

  return (
    <button 
      onClick={handleDownload}
      disabled={isGenerating}
      className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-50"
    >
      <span className="material-symbols-outlined">{isGenerating ? 'hourglass_empty' : 'download'}</span>
      {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
    </button>
  )
}
