import { createClient } from '@/lib/supabase/server'
import { QRScanner } from '@/components/admin/QRScanner'
import { ManualCheckInButton } from '@/components/admin/ManualCheckInButton'
import { ExhibitorSearch } from '@/components/admin/ExhibitorSearch'
import Link from 'next/link'

export default async function ValidacaoAdmin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const tab = typeof params.tab === 'string' ? params.tab : 'aguardando';
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const limit = 12;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient()

  // Buscar apenas leads APROVADOS
  let query = supabase
    .from('exhibitor_leads')
    .select('*, events(title)', { count: 'exact' })
    .eq('status', 'aprovado')
    .order(tab === 'validados' ? 'checked_in_at' : 'owner_name', { ascending: tab === 'validados' ? false : true })
    .range(from, to);

  if (tab === 'validados') {
    query = query.not('checked_in_at', 'is', null)
  } else {
    query = query.is('checked_in_at', null)
  }

  if (q) {
    query = query.or(`owner_name.ilike.%${q}%,car_model.ilike.%${q}%,car_plate.ilike.%${q}%,instagram.ilike.%${q}%`)
  }

  const { data: leads, count } = await query;
  
  const totalPages = count ? Math.ceil(count / limit) : 1;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="font-heading text-3xl font-black uppercase text-foreground mb-2">Validação de Acesso</h1>
        <p className="text-muted-foreground font-sans text-sm">Escaneie o QR Code ou procure na lista para liberar a entrada.</p>
      </div>

      {/* Leitor de QR Code */}
      <QRScanner />

      <div className="border-t border-border/50 pt-8 mt-8">
        <h2 className="font-heading text-2xl uppercase font-bold text-foreground mb-6">Lista de Presença</h2>
        
        {/* Controles de Filtro e Busca */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <Link 
              href={`/admin/validacao?tab=aguardando${q ? `&q=${q}` : ''}`}
              className={`px-4 py-2 border border-border/50 rounded-sm font-sans uppercase font-bold text-xs transition-colors ${tab === 'aguardando' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground hover:bg-white/5'}`}
            >
              Aguardando Entrada
            </Link>
            <Link 
              href={`/admin/validacao?tab=validados${q ? `&q=${q}` : ''}`}
              className={`px-4 py-2 border border-border/50 rounded-sm font-sans uppercase font-bold text-xs transition-colors ${tab === 'validados' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground hover:bg-white/5'}`}
            >
              Já Validados
            </Link>
          </div>
          <ExhibitorSearch />
        </div>

        {/* Lista */}
        {!leads || leads.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-sm p-12 text-center text-muted-foreground font-sans">
            {q ? 'Nenhum expositor encontrado para essa busca.' : `Nenhum expositor ${tab === 'validados' ? 'validado' : 'aguardando'}.`}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-card border border-border/50 rounded-sm overflow-hidden flex flex-col hover:border-border transition-colors">
                <div className="p-3 border-b border-border/50 flex justify-between items-center bg-black/20">
                  <div className="text-sm font-bold text-primary truncate" title={(lead as any).events?.title}>
                    {(lead as any).events?.title || 'Evento não especificado'}
                  </div>
                  {lead.checked_in_at && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">done_all</span>
                      {new Date(lead.checked_in_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex gap-4 items-center">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground text-lg leading-tight truncate">{lead.owner_name}</div>
                    <div className="font-bold text-primary truncate mt-1">{lead.car_model}</div>
                    <div className="text-xs text-muted-foreground uppercase mt-1 tracking-widest">{lead.car_plate} | {lead.car_year}</div>
                  </div>
                </div>

                <div className="p-3 bg-black/40 border-t border-border/50 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground truncate max-w-[120px]">{lead.instagram}</div>
                  {!lead.checked_in_at && (
                    <ManualCheckInButton id={lead.id} ownerName={lead.owner_name} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-6">
            <Link 
              href={`/admin/validacao?tab=${tab}&page=${Math.max(1, page - 1)}${q ? `&q=${q}` : ''}`}
              className={`px-4 py-2 border border-border/50 rounded-sm text-sm font-bold uppercase transition-colors ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-white/5'}`}
            >
              Anterior
            </Link>
            <span className="text-sm text-muted-foreground font-sans">
              Página {page} de {totalPages}
            </span>
            <Link 
              href={`/admin/validacao?tab=${tab}&page=${Math.min(totalPages, page + 1)}${q ? `&q=${q}` : ''}`}
              className={`px-4 py-2 border border-border/50 rounded-sm text-sm font-bold uppercase transition-colors ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-white/5'}`}
            >
              Próximo
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
