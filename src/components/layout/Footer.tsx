export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center text-sm text-muted-foreground text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Oliveira Car Fest. Todos os direitos reservados.</p>
        <div className="flex gap-6 items-center">
          <a href="https://www.instagram.com/oliveiracarfest/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">Instagram</a>
          <a href="https://www.tiktok.com/@oliveira.car.fest?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">TikTok</a>
        </div>
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
    </footer>
  );
}