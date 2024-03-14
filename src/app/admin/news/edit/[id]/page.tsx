import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormEditNewsSection from '@/modules/admin/news/edit/form-section';
import HeaderEditNewsSection from '@/modules/admin/news/edit/header-section';

const EditNewsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WideBaseLayout>
      <>
        <HeaderEditNewsSection id={id} />
        <FormEditNewsSection id={id} />
      </>
    </WideBaseLayout>
  );
};

export default EditNewsPage;
