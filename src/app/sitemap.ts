import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://asspro.vexflip.fr';

  const routes = [
    '',
    '/a-propos',
    '/formations',
    '/partenaires',
    '/contact',
    '/mentions-legales',
    '/conditions-generales',
    '/plan-du-site',
    '/adhesion',
    '/recherche'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('formations') || route.includes('a-propos') ? 0.8 : 0.5,
  }));
}
