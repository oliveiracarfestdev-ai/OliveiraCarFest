import { PortalSidebar } from '@/components/portal/PortalSidebar'

export const metadata = {
  title: 'Portal do Expositor - Oliveira Car Fest',
  description: 'Acesse seus ingressos e informações de exposição.',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
