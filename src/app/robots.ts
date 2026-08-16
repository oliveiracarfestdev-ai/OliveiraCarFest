import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login/', '/portal/'],
    },
    sitemap: 'https://oliveiracarfest.com/sitemap.xml',
  }
}
