import React from 'react';

import FormAddNewsSection from '@/modules/admin/news/add/form-section';
import HeaderAddNewsSection from '@/modules/admin/news/add/header-section';

const AddNewsPage = () => {
  return (
    <main>
      <HeaderAddNewsSection />
      <FormAddNewsSection />
    </main>
  );
};

export default AddNewsPage;
