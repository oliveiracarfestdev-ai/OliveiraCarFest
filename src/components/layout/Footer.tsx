import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative bg-background pt-16 pb-8 border-t border-border mt-auto overflow-hidden">
      {/* Gradient superior sutil */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1: Navegação */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-2">Oliveira Car Fest</h3>
            <Link href="/eventos" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Nossos Eventos</Link>
            <Link href="/galeria" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Galeria de Fotos</Link>
            <Link href="/patrocinadores" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Patrocinadores</Link>
            <Link href="/contato" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Contato</Link>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-2">Conecte-se</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/oliveiracarfest/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@oliveira.car.fest?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.19c-.01 2.98-2.43 5.5-5.41 5.67-3.13.19-5.94-2.07-6.41-5.16-.48-3.19 1.63-6.2 4.81-6.85 1.14-.23 2.31-.22 3.46-.06V13.1c-1.45-.45-3.08-.43-4.43.3-1.65.88-2.67 2.68-2.45 4.56.24 2.15 1.89 3.97 4.02 4.3 2.16.33 4.37-.59 5.48-2.45.69-1.14 1.05-2.48 1.05-3.83V0h-4.22c.01.01.02.01.03.02z"/></svg>
              </a>
            </div>
            <p className="font-sans text-xs text-muted-foreground mt-4">Acompanhe bastidores, projetos inéditos e conteúdos exclusivos nas nossas redes.</p>
          </div>

          {/* Coluna 3: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-2">Newsletter</h3>
            <p className="font-sans text-xs text-muted-foreground">Fique por dentro das datas de inscrições e novos eventos antes de todo mundo.</p>
            <form className="flex mt-2">
              <input type="email" placeholder="Seu melhor e-mail" className="bg-background border border-border/50 px-4 py-2 text-sm w-full outline-none focus:border-primary" />
              <button type="button" className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>

          {/* Coluna 4: Legal & Auth */}
          <div className="flex flex-col gap-4 lg:items-end">
            <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-2">Legal</h3>
            <Link href="/portal" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Portal do Expositor</Link>
            <Link href="/admin" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">Área Restrita (Admin)</Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Oliveira Car Fest. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://coupletech.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              CoupleTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}