import { Metadata } from 'next';
import React from 'react';

import { getDepartmentByIdRequest } from '@/hooks/departments/request';

import HeaderDepartmentSection from '@/modules/about-genbi/upi/department/header-department-section';
import MemberSection from '@/modules/about-genbi/upi/department/member-section';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await getDepartmentByIdRequest(Number(params.id));
    const data = response;

    if (!data) {
      return {
        title: '404 Not Found',
        description: 'Halaman tidak ditemukan',
      };
    }

    return {
      title: `${data.data.department.name} Department `,
      description: data.data.department.description,
      openGraph: {
        images: data.data.department.cover.file_url,
        title: `${data.data.department.name} Department`,
      },
      twitter: {
        card: 'summary_large_image',
        images: [data.data.department.cover.file_url],
        title: `${data.data.department.name} Department `,
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
