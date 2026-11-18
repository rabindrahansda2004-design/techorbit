import { getCollection } from 'astro:content';
import { SITE } from '../data/site.js';
import { categories } from '../data/categories.js';

export async function GET() {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  const urls = [
    { loc: '/' }, { loc: '/about/' }, { loc: '/contact/' }, { loc: '/privacy/' }, { loc: '/terms/' }, { loc: '/editorial-policy/' }, { loc: '/affiliate-disclosure/' },
    ...categories.map((c) => ({ loc: `/category/${c.slug}/` })),
    ...all.map((a) => ({ loc: `/articles/${a.id}/`, lastmod: (a.data.updatedDate ?? a.data.pubDate).toISOString().slice(0, 10) })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
