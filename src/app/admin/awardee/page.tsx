import React from 'react';

import ContentAwardeeSection from '@/modules/admin/awardee/content-section';
import HeaderAwardeetSection from '@/modules/admin/awardee/header-section';

const AwardeeAdminPage = () => {
  return (
    <div>
      <HeaderAwardeetSection />
      <ContentAwardeeSection />
    </div>
  );
};

export default AwardeeAdminPage;
