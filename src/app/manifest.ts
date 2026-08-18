import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oliveira Car Fest',
    short_name: 'Oliveira Car Fest',
    description: 'O maior encontro de carros rebaixados, clássicos e projetos exclusivos em Guarulhos/SP.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#FF6600',
    icons: [
      {
        src: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
