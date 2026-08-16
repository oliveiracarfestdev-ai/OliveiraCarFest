export default function Loading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh] pt-32">
      <div className="flex flex-col items-center gap-6 text-primary">
        <div className="animate-spin">
          <span className="material-symbols-outlined text-6xl">settings</span>
        </div>
        <p className="font-heading uppercase tracking-widest text-sm text-muted-foreground animate-pulse">
          Acessando banco de dados...
        </p>
      </div>
    </div>
  )
}
