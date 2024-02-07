'use client';

import { usePathname } from 'next/navigation';
import React, { FC, Fragment, ReactNode } from 'react';

import Footer from '@/components/generals/footer';
import Navbar, { NavbarLogin } from '@/components/generals/navbar';

const pathnames = ['/acara', '/berita', '/gallery', '/tentang-genbi', '/'];

const RootBaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  let isAdmin = false;

  pathnames.map((path) => {
    if (pathname.includes(path)) {
      isAdmin = true;
    }
  });

  if (isAdmin) {
    return (
      <Fragment>
        <Navbar />
        {children}
        <Footer />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <NavbarLogin />
        {children}
      </Fragment>
    );
  }
};

export default RootBaseLayout;
