import type { Metadata } from "next";
import { Montserrat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Oliveira Car Fest | Portal Automotivo Premium",
    template: "%s | Oliveira Car Fest",
  },
  description: "O maior encontro de carros rebaixados, clássicos e projetos exclusivos em Guarulhos/SP.",
  keywords: ["carros rebaixados", "carros clássicos", "eventos automotivos", "Guarulhos", "Oliveira Car Fest", "exposição de carros", "tuning"],
  authors: [{ name: "CoupleTech", url: "https://coupletech.vercel.app/" }],
  creator: "CoupleTech",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://oliveiracarfest.com",
    title: "Oliveira Car Fest | Portal Automotivo Premium",
    description: "O maior encontro de carros rebaixados, clássicos e projetos exclusivos em Guarulhos/SP.",
    siteName: "Oliveira Car Fest",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn2Bsa4nrjybGRMTGb02coDCQLP2mISkei7zLm3-LLE5oOWxbM14_C6CCnbj1NWgp7DwarCXNY0229PpsYcv_lXMi-1mAo6vtINNfB0v-JyJroi_Rm2FthYVw6ny66VZnM0Se7pwjxX_3nDMHiJP_VgPncQ8tJPPS41kArLhhdtX4Q9CAZ4omJsSJ-EW0XssDiqC5LywZ9mz9N0S5NbG3763AhLiMAre_59VJfHp38_pbjWx6YaDuvyw",
        width: 1200,
        height: 630,
        alt: "Oliveira Car Fest Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliveira Car Fest | Portal Automotivo Premium",
    description: "O maior encontro de carros rebaixados, clássicos e projetos exclusivos em Guarulhos/SP.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDn2Bsa4nrjybGRMTGb02coDCQLP2mISkei7zLm3-LLE5oOWxbM14_C6CCnbj1NWgp7DwarCXNY0229PpsYcv_lXMi-1mAo6vtINNfB0v-JyJroi_Rm2FthYVw6ny66VZnM0Se7pwjxX_3nDMHiJP_VgPncQ8tJPPS41kArLhhdtX4Q9CAZ4omJsSJ-EW0XssDiqC5LywZ9mz9N0S5NbG3763AhLiMAre_59VJfHp38_pbjWx6YaDuvyw"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${hanken.variable} dark antialiased h-full`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {pixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster theme="dark" position="bottom-right" />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
