import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import ContentDetailAwardeeAdminSection from '@/modules/admin/awardee/detail/content-section';
import HeaderDetailAwardeeAdminSection from '@/modules/admin/awardee/detail/header-section';

const DetailAwardeeManagementPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  return (
    <WideBaseLayout>
      <>
        <HeaderDetailAwardeeAdminSection id={id} />
        <ContentDetailAwardeeAdminSection />
      </>
    </WideBaseLayout>
  );
};

export default DetailAwardeeManagementPage;
