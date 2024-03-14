import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormAddNewsSection from '@/modules/admin/news/add/form-section';
import HeaderAddNewsSection from '@/modules/admin/news/add/header-section';

const AddNewsPage = () => {
  return (
    <WideBaseLayout>
      <>
        <HeaderAddNewsSection />
        <FormAddNewsSection />
      </>
    </WideBaseLayout>
  );
};

export default AddNewsPage;
