import React from 'react';

import ContenAppreciationsSection from '@/modules/admin/appreciations/content-section';
import HeaderAppreciationsSection from '@/modules/admin/appreciations/header-section';

const AppreciationsAdminPage = () => {
  return (
    <main>
      <HeaderAppreciationsSection />
      <ContenAppreciationsSection />
    </main>
  );
};

export default AppreciationsAdminPage;
