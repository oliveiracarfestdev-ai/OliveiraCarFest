import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditEventForm from './form'

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: event } = await supabase.from('events').select('*').eq('id', id).single()

  if (!event) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <EditEventForm event={event} />
    </div>
  )
}
