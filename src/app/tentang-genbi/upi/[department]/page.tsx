import React from 'react';

import HeaderDepartmentSection from '@/modules/about-genbi/upi/department/header-department-section';
import MemberSection from '@/modules/about-genbi/upi/department/member-section';

const DepartmentPage = () => {
  return (
    <main className='overflow-hidden'>
      <HeaderDepartmentSection />
      <MemberSection />
    </main>
  );
};

export default DepartmentPage;
