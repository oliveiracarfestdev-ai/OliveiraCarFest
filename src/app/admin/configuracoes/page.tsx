import { getSettings } from '@/app/actions/settings'
import { SettingsForm } from './form'

export default async function ConfiguracoesPage() {
  const settings = await getSettings()
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl uppercase font-bold text-foreground">Configurações do Site</h1>
        <p className="text-muted-foreground text-sm font-sans">
          Ajuste as métricas manuais que são exibidas na página inicial.
        </p>
      </div>

      <div className="bg-card border border-border/50 p-6 rounded-sm">
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  )
}
