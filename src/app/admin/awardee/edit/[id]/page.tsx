import React from 'react';

import EditAwardeeFormSection from '@/modules/admin/awardee/edit/form-section';
import EditAwardeeHeaderSection from '@/modules/admin/awardee/edit/header-section';

const EditAwardeePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <main>
      <EditAwardeeHeaderSection id={id} />
      <EditAwardeeFormSection id={id} />
    </main>
  );
};

export default EditAwardeePage;
