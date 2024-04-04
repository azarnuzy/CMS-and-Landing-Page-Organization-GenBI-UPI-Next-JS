import React, { Suspense } from 'react';

import { WideBaseLayout } from '@/components/layouts/base';
import { LoadingSpinner } from '@/components/loading-spinner';

import ContentEventManagementSection from '@/modules/admin/events/content-section';
import HeaderEventsSection from '@/modules/admin/events/header-section';

const EventsManagementPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <WideBaseLayout>
          <>
            <HeaderEventsSection />
            <ContentEventManagementSection />
          </>
        </WideBaseLayout>
      </main>
    </Suspense>
  );
};

export default EventsManagementPage;
