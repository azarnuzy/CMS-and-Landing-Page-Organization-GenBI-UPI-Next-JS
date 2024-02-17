import { MetadataRoute } from 'next';

import { getAllEvents } from '@/hooks/events/request';
import { getAllPost } from '@/hooks/posts/request';

import { siteConfig } from '@/constant/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getAllPost({
    limit: 1000,
    page: 1,
    sort: 'created_at',
    type: 'desc',
  });

  const responseEvent = await getAllEvents({
    limit: 1000,
    page: 1,
    sort: 'created_at',
    type: 'desc',
  });

  const posts = response?.data;
  const events = responseEvent?.data;

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/berita/${post.id}`,
    lastModified: post.updated_at,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteConfig.url}/acara/${event.id}`,
    lastModified: event.updated_at,
  }));

  return [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteConfig.url}/tentang-genbi`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteConfig.url}/tentang-genbi/upi`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteConfig.url}/tentang-genbi/upi`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteConfig.url}/login`,
      lastModified: new Date().toISOString(),
    },
    ...postEntries,
    ...eventEntries,
  ];
}
