import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import ContentDetailEventSection from '@/modules/admin/events/detail/content-section';
import HeaderDetailEventSection from '@/modules/admin/events/detail/header-section';

const DetailAwardeeManagementPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  return (
    <WideBaseLayout>
      <>
        <HeaderDetailEventSection id={id} />
        <ContentDetailEventSection id={Number(id)} />
      </>
    </WideBaseLayout>
  );
};

export default DetailAwardeeManagementPage;
