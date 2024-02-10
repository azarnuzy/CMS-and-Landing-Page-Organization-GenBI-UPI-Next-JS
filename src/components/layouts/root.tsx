'use client';

import { usePathname } from 'next/navigation';
import React, { FC, Fragment, ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import Footer from '@/components/generals/footer';
import Navbar, { NavbarLogin } from '@/components/generals/navbar';
import NavbarAdmin from '@/components/generals/navbar/admin';
import Sidebar from '@/components/generals/sidebar';

import { sidebarMinimizeState } from '@/recoils/sidebar/atom';

const pathnames = ['/acara', '/berita', '/gallery', '/tentang-genbi'];

const RootBaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMinimize] = useRecoilState(sidebarMinimizeState);
  const pathname = usePathname();

  let pageType = 'user';

  pathnames.map((path) => {
    if (pathname.includes(path)) {
      pageType = 'user';
    }
  });

  if (pathname === '/') {
    pageType = 'user';
  }

  if (pathname.includes('/login')) {
    pageType = 'login';
  }

  if (pathname.includes('/admin')) {
    pageType = 'admin';
  }

  if (pageType === 'user') {
    return (
      <Fragment>
        <Navbar />
        {children}
        <Footer />
      </Fragment>
    );
  } else if (pageType === 'login') {
    return (
      <Fragment>
        <NavbarLogin />
        {children}
      </Fragment>
    );
  } else {
    return (
      <div className='flex overflow-x-hidden'>
        <Sidebar />
        <div
          className={`flex flex-col gap-4 ${
            isMinimize
              ? 'w-[calc(100vw-100px)] ml-[75px]'
              : 'w-[calc(100vw-300px)] ml-[300px]'
          }`}
        >
          <NavbarAdmin />
          <div className='px-2 sm:px-10'>{children}</div>
        </div>
      </div>
    );
  }
};

export default RootBaseLayout;
