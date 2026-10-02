import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './urls';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function projectHref(project: Project): string {
  return withBase(`/work/${project.data.slug}/`);
}
