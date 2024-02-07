'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { BiSolidBookAlt } from 'react-icons/bi';
import { FaCalendarCheck, FaLayerGroup, FaRegUser } from 'react-icons/fa6';
import { HiMiniUsers } from 'react-icons/hi2';
import { LuFileCheck } from 'react-icons/lu';
import { RiHome6Fill } from 'react-icons/ri';

const Sidebar: FC = () => {
  return (
    <div className='w-[300px] min-h-screen py-10 bg-primary-main relative'>
      <div className='fixed top-0 left-0 h-screen bg-primary-main overflow-y-auto pb-10 pt-10 w-[300px]'>
        <div className='pl-[35px] pb-[10px] flex gap-4 items-center'>
          <Image
            alt='Logo BI'
            src='/images/logo-bi.png'
            width={36}
            height={36}
          />
          <Image
            alt='Logo BI'
            src='/images/logo-genbi.png'
            width={36}
            height={36}
          />
          <p className='text-xl font-bold text-white'>GenBI UPI</p>
        </div>
        <div className='flex gap-2 flex-col w-full'>
          {dataSideBar.map((item, i) => (
            <div className='flex flex-col ' key={i}>
              <p className='text-sm text-white pl-[35px] py-2 max-w-[190px]'>
                {item.title}
              </p>
              {item.children.map((child, index) => (
                <div className='relative w-full' key={index}>
                  <Link
                    href={child.link}
                    className='duration-300 ease-in-out hover:bg-primary-700 w-full flex gap-[10px]  py-2 pl-[35px] '
                  >
                    {child.icon}
                    <p className='text-medium text-white  max-w-[190px]'>
                      {child.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const dataSideBar = [
  {
    title: '',
    children: [
      {
        title: 'Dashboard',
        link: '/admin',
        icon: <RiHome6Fill className='w-6 h-6  text-white' />,
      },
      {
        title: 'Scholarship Registration',
        link: '/admin',
        icon: <LuFileCheck className='w-6 h-6  text-white' />,
      },
    ],
  },
  {
    title: 'Manage',
    children: [
      {
        title: 'Awardee',
        link: '/admin',
        icon: <HiMiniUsers className='w-6 h-6  text-white' />,
      },
      {
        title: 'News',
        link: '/admin',
        icon: <BiSolidBookAlt className='w-6 h-6  text-white' />,
      },
      {
        title: 'Event',
        link: '/admin',
        icon: <FaCalendarCheck className='w-6 h-6  text-white' />,
      },
      {
        title: 'Role',
        link: '/admin',
        icon: <FaRegUser className='w-6 h-6  text-white' />,
      },
      {
        title: 'Department',
        link: '/admin',
        icon: <FaLayerGroup className='w-6 h-6  text-white' />,
      },
    ],
  },
];
