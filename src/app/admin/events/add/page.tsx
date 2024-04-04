import React from 'react';

import { WideBaseLayout } from '@/components/layouts/base';

import FormAddEventSection from '@/modules/admin/events/add/form-section';
import HeaderAddEventsSection from '@/modules/admin/events/add/header-section';

const AddEventPage = () => {
  return (
    <WideBaseLayout>
      <>
        <HeaderAddEventsSection />
        <FormAddEventSection />
      </>
    </WideBaseLayout>
  );
};

export default AddEventPage;
