import { createClient } from '@/lib/supabase/server'
import NovoAlbumForm from './form'

export default async function NovoAlbumPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select('id, title').order('date', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <NovoAlbumForm events={events || []} />
    </div>
  )
}
