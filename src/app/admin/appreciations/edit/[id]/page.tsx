import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormEditAppreciationSection from '@/modules/admin/appreciations/edit/form-section';
import HeaderPutAppreciationSection from '@/modules/admin/appreciations/edit/header-section';

const EditAppreciationsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WideBaseLayout>
      <>
        <HeaderPutAppreciationSection id={id} />
        <FormEditAppreciationSection />
      </>
    </WideBaseLayout>
  );
};

export default EditAppreciationsPage;
