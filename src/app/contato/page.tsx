import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/contact-form";

export default function Contato() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-0 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-0 relative bg-background">
        {/* Abstract Tech Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle at 15% 50%, rgba(255, 102, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(255, 102, 0, 0.05) 0%, transparent 50%)" }}
        ></div>
        
        {/* Left Column: Info & Map */}
        <section className="bg-card p-12 md:p-24 border-r-0 md:border-r border-border/30 flex flex-col justify-between h-full relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <div className="z-10">
            <h1 className="font-heading text-6xl md:text-8xl font-black text-foreground uppercase mb-16 relative inline-block">
              Contato
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary"></span>
            </h1>
            <div className="space-y-12 mb-20">
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">location_on</span>
                <div>
                  <p className="font-sans text-xs font-bold text-primary uppercase mb-1">Endereço</p>
                  <p className="font-sans text-lg text-foreground">Avenida Doutor Almiro Leal da Costa</p>
                </div>
              </div>
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">mail</span>
                <div>
                  <p className="font-sans text-xs font-bold text-primary uppercase mb-1">E-mail</p>
                  <a className="font-sans text-lg text-foreground hover:text-primary transition-colors" href="mailto:oliveiracarfest@gmail.com">oliveiracarfest@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">phone_android</span>
                <div>
                  <p className="font-sans text-xs font-bold text-primary uppercase mb-1">WhatsApp</p>
                  <a className="font-sans text-lg text-foreground hover:text-primary transition-colors" href="https://wa.me/5511911682162" target="_blank" rel="noopener noreferrer">(11) 91168-2162</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="relative w-full h-64 border border-border/50 overflow-hidden group-hover:border-primary/50 transition-colors duration-500 rounded-sm">
            <iframe 
              src="https://maps.google.com/maps?q=Avenida%20Doutor%20Almiro%20Leal%20da%20Costa&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
          <div className="mt-12 flex gap-6 z-10">
            <a className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm flex items-center gap-2" href="https://www.instagram.com/oliveiracarfest/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm flex items-center gap-2" href="https://www.tiktok.com/@oliveira.car.fest?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </section>

        {/* Right Column: Form */}
        <section className="bg-background p-12 md:p-24 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[100px] rounded-full"></div>
          <h2 className="font-heading text-3xl font-bold text-primary uppercase mb-16 flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl">satellite_alt</span>
            Enviar uma Mensagem
          </h2>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}