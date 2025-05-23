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
  const pathname = usePathname();
  const [isMinimize] = useRecoilState(sidebarMinimizeState);
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
      <div className='relative flex overflow-x-hidden'>
        <Sidebar />
        <div
          className={`flex flex-col gap-4 w-full ${
            !isMinimize ? 'ml-[300px]' : 'ml-0'
          } transition-all ease-in-out duration-300 `}
        >
          <NavbarAdmin />
          <div className=''>{children}</div>
        </div>
      </div>
    );
  }
};

export default RootBaseLayout;
