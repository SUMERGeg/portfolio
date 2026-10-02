import type { APIRoute } from 'astro';
import { withBase } from '../data/urls';

export const GET: APIRoute = ({ site }) => {
  const publicRelease = import.meta.env.PUBLIC_ENABLE_INDEXING === 'true' && site;
  const body = publicRelease
    ? `User-agent: *\nAllow: ${withBase('/')}\nDisallow: ${withBase('/404.html')}\nSitemap: ${new URL(withBase('/sitemap.xml'), site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
