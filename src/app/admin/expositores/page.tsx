import { createClient } from '@/lib/supabase/server'
import { UpdateStatusButton, DeleteExhibitorButton } from './buttons'
import { ExhibitorSearch } from '@/components/admin/ExhibitorSearch'
import Link from 'next/link'

export default async function ExpositoresAdmin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const limit = 12;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient()

  let query = supabase
    .from('exhibitor_leads')
    .select('*, events(title)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`owner_name.ilike.%${q}%,car_model.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,instagram.ilike.%${q}%`)
  }

  const { data: leads, count } = await query;
  
  const totalPages = count ? Math.ceil(count / limit) : 1;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-black uppercase text-foreground mb-2">Inscrições de Expositores</h1>
          <p className="text-muted-foreground font-sans text-sm">Gerencie os projetos enviados para avaliação.</p>
        </div>
        <ExhibitorSearch />
      </div>

      {!leads || leads.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-sm p-12 text-center text-muted-foreground">
          {q ? 'Nenhum expositor encontrado para essa busca.' : 'Nenhuma inscrição recebida ainda.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-card border border-border/50 rounded-sm overflow-hidden flex flex-col hover:border-border transition-colors">
              <div className="p-4 border-b border-border/50 flex justify-between items-start bg-black/20">
                <div>
                  <div className="text-xs text-muted-foreground">{new Date(lead.created_at || new Date()).toLocaleDateString('pt-BR')}</div>
                  <div className="text-sm font-bold text-primary mt-1 line-clamp-1" title={(lead as any).events?.title}>
                    {(lead as any).events?.title || 'Sem evento'}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                  lead.status === 'aprovado' ? 'bg-green-500/20 text-green-500' :
                  lead.status === 'rejeitado' ? 'bg-red-500/20 text-red-500' :
                  'bg-orange-500/20 text-orange-500'
                }`}>
                  {lead.status}
                </span>
              </div>
              
              <div className="p-4 flex-1 flex flex-col gap-4">
                {/* Piloto */}
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-widest mb-1">Piloto</div>
                  <div className="font-bold text-foreground text-lg leading-tight">{lead.owner_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{lead.instagram}</div>
                </div>

                {/* Veículo */}
                <div className="flex gap-4 items-start bg-white/5 p-3 rounded-sm">
                  {lead.car_photo_url && (
                    <a href={lead.car_photo_url} target="_blank" rel="noopener noreferrer" className="block w-20 h-20 rounded-sm overflow-hidden border border-border/50 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={lead.car_photo_url} alt="Carro" className="w-full h-full object-cover hover:scale-110 transition-transform" loading="lazy" decoding="async" />
                    </a>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-primary truncate" title={lead.car_model}>{lead.car_model}</div>
                    <div className="text-xs text-muted-foreground uppercase mt-1">{lead.car_plate} | {lead.car_year}</div>
                    <div className="text-xs text-muted-foreground mt-2 line-clamp-2" title={lead.modifications}>
                      {lead.modifications}
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-border/10">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-widest mb-1">Telefone</div>
                    <div className="text-xs truncate">{lead.phone}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-widest mb-1">E-mail</div>
                    <div className="text-xs truncate" title={lead.email}>{lead.email}</div>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="p-4 bg-black/40 border-t border-border/50 flex justify-between items-center gap-4">
                <UpdateStatusButton id={lead.id} currentStatus={lead.status} />
                <DeleteExhibitorButton id={lead.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <Link 
            href={`/admin/expositores?page=${Math.max(1, page - 1)}${q ? `&q=${q}` : ''}`}
            className={`px-4 py-2 border border-border/50 rounded-sm text-sm font-bold uppercase transition-colors ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-white/5'}`}
          >
            Anterior
          </Link>
          <span className="text-sm text-muted-foreground font-sans">
            Página {page} de {totalPages}
          </span>
          <Link 
            href={`/admin/expositores?page=${Math.min(totalPages, page + 1)}${q ? `&q=${q}` : ''}`}
            className={`px-4 py-2 border border-border/50 rounded-sm text-sm font-bold uppercase transition-colors ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-white/5'}`}
          >
            Próximo
          </Link>
        </div>
      )}
    </div>
  )
}
