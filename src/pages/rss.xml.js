import { getCollection } from 'astro:content';
import { SITE } from '../data/site.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const all = (await getCollection('articles', ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate - a.data.pubDate);
  const items = all.map((a) => `    <item>
      <title>${esc(a.data.title)}</title>
      <link>${SITE.url}/articles/${a.id}/</link>
      <guid>${SITE.url}/articles/${a.id}/</guid>
      <pubDate>${a.data.pubDate.toUTCString()}</pubDate>
      <description>${esc(a.data.description)}</description>
    </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}/</link>
    <description>${esc(SITE.description)}</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
