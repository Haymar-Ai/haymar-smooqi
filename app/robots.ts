import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/onboarding', '/settings', '/profile', '/home', '/learn', '/word-games', '/achievements', '/leaderboard', '/reports', '/saved', '/invite', '/review', '/feedback', '/support', '/topics'],
      },
    ],
    sitemap: 'https://www.smooqi.com/sitemap.xml',
  }
}
