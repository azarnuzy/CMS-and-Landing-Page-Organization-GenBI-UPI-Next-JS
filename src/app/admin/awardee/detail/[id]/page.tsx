import React from 'react';

import ContentDetailAwardeeAdminSection from '@/modules/admin/awardee/detail/content-section';
import HeaderDetailAwardeeAdminSection from '@/modules/admin/awardee/detail/header-section';

const DetailAwardeeManagementPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  return (
    <main>
      <HeaderDetailAwardeeAdminSection id={id} />
      <ContentDetailAwardeeAdminSection />
    </main>
  );
};

export default DetailAwardeeManagementPage;
