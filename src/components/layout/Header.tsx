import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center mx-auto px-4 justify-between md:justify-start">
        <Link href="/" className="mr-8 flex items-center">
          <Image src="/logo.png" alt="Oliveira Car Fest" width={200} height={100} className="h-16 md:h-20 w-auto object-contain drop-shadow-xl" priority quality={100} />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/eventos" className="transition-colors hover:text-foreground/80 text-foreground/60">Eventos</Link>
          <Link href="/galeria" className="transition-colors hover:text-foreground/80 text-foreground/60">Galeria</Link>
          <Link href="/patrocinadores" className="transition-colors hover:text-foreground/80 text-foreground/60">Patrocinadores</Link>
          <Link href="/sobre" className="transition-colors hover:text-foreground/80 text-foreground/60">Sobre</Link>
          <Link href="/contato" className="transition-colors hover:text-foreground/80 text-foreground/60">Contato</Link>
          <Link href="/expositores" className="transition-colors hover:text-foreground/80 text-foreground/60 text-orange-400">Inscrever-se</Link>
          <Link href="/portal" className="transition-colors hover:text-primary text-primary font-bold">Portal</Link>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}