import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import ContenAppreciationsSection from '@/modules/admin/appreciations/content-section';
import HeaderAppreciationsSection from '@/modules/admin/appreciations/header-section';

const AppreciationsAdminPage = () => {
  return (
    <main>
      <WideBaseLayout>
        <>
          <HeaderAppreciationsSection />
          <ContenAppreciationsSection />
        </>
      </WideBaseLayout>
    </main>
  );
};

export default AppreciationsAdminPage;
