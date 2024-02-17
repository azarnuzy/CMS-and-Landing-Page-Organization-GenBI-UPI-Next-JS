import React from 'react';

import logger from '@/lib/logger';

import HeaderDepartmentSection from '@/modules/about-genbi/upi/department/header-department-section';
import MemberSection from '@/modules/about-genbi/upi/department/member-section';

const DepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  logger(id);
  return (
    <main className='overflow-hidden'>
      <HeaderDepartmentSection id={id} />
      <MemberSection />
    </main>
  );
};

export default DepartmentPage;
