import React from 'react';

import logger from '@/lib/logger';

import { WideBaseLayout } from '@/components/layouts/base';

const EditManagementsPage = ({ params }: { params: { id: string } }) => {
  // const { id } = params;
  logger(params);

  return (
    <WideBaseLayout>
      <></>
    </WideBaseLayout>
  );
};

export default EditManagementsPage;
