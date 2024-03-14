import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import EditAwardeeFormSection from '@/modules/admin/awardee/edit/form-section';
import EditAwardeeHeaderSection from '@/modules/admin/awardee/edit/header-section';

const EditAwardeePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WideBaseLayout>
      <>
        <EditAwardeeHeaderSection id={id} />
        <EditAwardeeFormSection id={id} />
      </>
    </WideBaseLayout>
  );
};

export default EditAwardeePage;
