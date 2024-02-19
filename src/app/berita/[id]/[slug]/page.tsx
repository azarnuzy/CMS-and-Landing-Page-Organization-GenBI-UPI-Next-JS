import { Metadata } from 'next';
import React from 'react';

import { apiConfig } from '@/lib/api';

import BaseLayout from '@/components/layouts/base';

import ContentSection from '@/modules/news/detail/content-section';
import SideContentSection from '@/modules/news/detail/side-content-section';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/v1/events/${params.id}`);
    const data = await response.json();

    if (!response) {
      return {
        title: '404 Not Found',
        description: 'Halaman tidak ditemukan',
      };
    }

    return {
      title: data.data.event.title,
      openGraph: {
        images: data.data.event.thumbnail.file_url,
        title: data.data.event.title,
      },
      twitter: {
        card: 'summary_large_image',
        images: [data.data.event.thumbnail.file_url],
        title: data.data.event.title,
      },
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
