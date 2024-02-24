import { Metadata } from 'next';
import React from 'react';

import { getDetailPost } from '@/hooks/posts/request';

import BaseLayout from '@/components/layouts/base';

import ContentSection from '@/modules/news/detail/content-section';
import SideContentSection from '@/modules/news/detail/side-content-section';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await getDetailPost(Number(params.id));
    const data = response;
    if (!data) {
      return {
        title: '404 Not Found',
        description: 'Halaman tidak ditemukan',
      };
    }

    return {
      title: data.data.post.title,
      description: data.data.post.content_preview,
      openGraph: {
        images: data.data.post.image_cover.file_url,
        title: data.data.post.title,
      },
      twitter: {
        card: 'summary_large_image',
        images: [data.data.post.image_cover.file_url],
        title: data.data.post.title,
      },
      keywords: data.data.post.tags,
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'Halaman tidak ditemukan',
    };
  }
}

const DetailNewsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <main>
      <BaseLayout>
        <div className='py-9 grid grid-cols-6 gap-14'>
          <ContentSection id={Number(id)} />
          <SideContentSection />
        </div>
      </BaseLayout>
    </main>
  );
};

export default DetailNewsPage;
