import { Metadata } from 'next';
import React from 'react';

import LoginSection from '@/modules/login/login-section';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Halaman login untuk anggota GenBI UPI. Login untuk mengakses fitur-fitur yang hanya bisa diakses oleh anggota GenBI UPI.',
};

const LoginPage = () => {
  return (
    <main>
      <LoginSection />
    </main>
  );
};

export default LoginPage;
