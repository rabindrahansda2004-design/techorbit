import { getCollection } from 'astro:content';

export async function GET() {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  const list = all.map((a) => ({
    title: a.data.title,
    description: a.data.description,
    category: a.data.category,
    url: `/articles/${a.id}/`,
  }));
  return new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json' } });
}
