'use client'

import { useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { useSearchParams } from 'next/navigation'

export function PrintButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  
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
      setGeneratedImage(data) // Show the fallback overlay

      // Attempt automatic download
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
    <>
      <button 
        onClick={handleDownload}
        disabled={isGenerating}
        className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-50"
      >
        <span className="material-symbols-outlined">{isGenerating ? 'hourglass_empty' : 'download'}</span>
        {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
      </button>

      {generatedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h3 className="text-white font-bold text-xl mb-2 font-heading uppercase">Ingresso Gerado!</h3>
            <p className="text-gray-400 text-sm mb-6 font-sans">
              Se o download não iniciou automaticamente, <strong className="text-primary">pressione e segure a imagem abaixo</strong> e escolha "Salvar Imagem".
            </p>
            
            <img 
              src={generatedImage} 
              alt="Ticket Gerado" 
              className="max-w-full w-auto max-h-[60vh] mx-auto rounded-xl shadow-2xl border-2 border-primary" 
            />
            
            <div className="flex flex-col gap-3 mt-8">
              <a 
                href={generatedImage} 
                download="ticket-expositor.png" 
                className="w-full px-6 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-md flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Tentar Baixar Novamente
              </a>
              <button 
                onClick={() => setGeneratedImage(null)} 
                className="w-full px-6 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

