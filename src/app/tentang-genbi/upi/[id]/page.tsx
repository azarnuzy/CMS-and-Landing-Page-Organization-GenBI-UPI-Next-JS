import { Metadata } from 'next';
import React from 'react';

import { apiConfig } from '@/lib/api';

import HeaderDepartmentSection from '@/modules/about-genbi/upi/department/header-department-section';
import MemberSection from '@/modules/about-genbi/upi/department/member-section';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/v1/departments/${params.id}`
    );
    const data = await response.json();

    if (!response) {
      return {
        title: '404 Not Found',
        description: 'Halaman tidak ditemukan',
      };
    }

    return {
      title: `Department ${data.data.departments.name}`,
      description: data.data.departments.description,
      openGraph: {
        images: data.data.departments.cover.file_url,
        title: data.data.departments.cover.alt,
      },
      twitter: {
        card: 'summary_large_image',
        images: [data.data.departments.cover.file_url],
        title: `Department ${data.data.departments.name}`,
      },
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'Halaman tidak ditemukan',
    };
  }
}

const DepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main className='overflow-hidden'>
      <HeaderDepartmentSection id={id} />
      <MemberSection />
    </main>
  );
};

export default DepartmentPage;
