import React from 'react';

import FormEditNewsSection from '@/modules/admin/news/edit/form-section';
import HeaderEditNewsSection from '@/modules/admin/news/edit/header-section';

const EditNewsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <main>
      <HeaderEditNewsSection id={id} />
      <FormEditNewsSection id={id} />
    </main>
  );
};

export default EditNewsPage;
