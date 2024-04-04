import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FromEditEventSection from '@/modules/admin/events/edit/form-section';
import HeaderEditEventSection from '@/modules/admin/events/edit/header-section';

const EditEventPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WideBaseLayout>
      <>
        <HeaderEditEventSection id={id} />
        <FromEditEventSection id={Number(id)} />
      </>
    </WideBaseLayout>
  );
};

export default EditEventPage;
