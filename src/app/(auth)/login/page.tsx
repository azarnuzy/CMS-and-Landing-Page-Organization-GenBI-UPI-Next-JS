import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';

import LoginSection from '@/modules/login/login-section';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Halaman login untuk anggota GenBI UPI. Login untuk mengakses dashboard admin.',
};

const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main>
        <LoginSection />
      </main>
    </Suspense>
  );
};

export default LoginPage;
