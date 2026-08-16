'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#090a0a', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #333', borderRadius: '8px', maxWidth: '500px' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#ff6600' }}>Erro Crítico de Sistema</h2>
          <p style={{ color: '#888' }}>
            Ocorreu uma falha fatal de comunicação. Por favor, tente recarregar a página ou retorne mais tarde.
          </p>
          <button 
            onClick={() => reset()}
            style={{ marginTop: '1rem', padding: '10px 20px', backgroundColor: '#ff6600', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Recarregar Sistema
          </button>
        </div>
      </body>
    </html>
  )
}
