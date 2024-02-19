import { Metadata } from 'next';
import React from 'react';

import { apiConfig } from '@/lib/api';

import HeaderDetailAcaraSection from '@/modules/acara/detail/header-section';
import SimillarEventSection from '@/modules/acara/detail/simillar-event-section';

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
        title: data.data.event.thumbnail.alt,
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

const AcaraDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <main>
      <HeaderDetailAcaraSection id={id} />
      <SimillarEventSection />
    </main>
  );
};

export default AcaraDetailPage;
