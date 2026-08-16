'use client'

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
    >
      <span className="material-symbols-outlined">print</span>
      Imprimir / Salvar PDF
    </button>
  )
}
