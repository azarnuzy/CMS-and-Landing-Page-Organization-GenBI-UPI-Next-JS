'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
  const router = useRouter();

  router.push('/admin/awardee');
  return <div>DashboardPage</div>;
};

export default DashboardPage;
