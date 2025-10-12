export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      disallow: ['/dashboard', '/admin-login',]
    },
    sitemap: 'https://simplytalk.in/sitemap.xml',
  }
}