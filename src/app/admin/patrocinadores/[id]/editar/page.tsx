import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditSponsorForm from './form'

export default async function EditarPatrocinadorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: sponsor } = await supabase.from('sponsors').select('*').eq('id', id).single()

  if (!sponsor) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <EditSponsorForm sponsor={sponsor} />
    </div>
  )
}
