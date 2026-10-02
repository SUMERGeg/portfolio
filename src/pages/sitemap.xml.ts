import type { APIRoute } from 'astro';
import { getProjects, projectHref } from '../data/projects';
import { withBase } from '../data/urls';

export const GET: APIRoute = async ({ site }) => {
  const publicRelease = import.meta.env.PUBLIC_ENABLE_INDEXING === 'true' && site;
  const projects = publicRelease ? await getProjects() : [];
  const paths = publicRelease
    ? ['/', '/work/', '/services/', '/about/', '/contact/'].map(withBase).concat(projects.map(projectHref))
    : [];
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
