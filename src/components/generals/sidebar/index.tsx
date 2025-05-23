'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { BiMenu, BiSolidBookAlt } from 'react-icons/bi';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaAward, FaLayerGroup } from 'react-icons/fa6';
import { GoOrganization } from 'react-icons/go';
import { HiMiniUsers } from 'react-icons/hi2';
import { MdEvent } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import './index.css';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { sidebarMinimizeState } from '@/recoils/sidebar/atom';

const Sidebar: FC = () => {
  // const [isMinimize, setIsMinimize] = useState(false);
  const [isMinimize, setIsMinimize] = useRecoilState(sidebarMinimizeState);

  return (
    <>
      <div
        className={`z-20 fixed top-0  ${
          isMinimize
            ? '-translate-x-[300px] w-[300px]'
            : 'translate-x-0 w-[300px]'
        }  min-h-full  bg-primary-main  transition-all transform duration-300 ease-in-out`}
      >
        <div
          className={`fixed top-0  h-screen bg-primary-main overflow-y-hidden pb-10 pt-4 ${
            isMinimize
              ? '-translate-x-[300px] w-[300px]'
              : 'translate-x-0 w-[300px]'
          }  transition-all transform duration-300 ease-in-out`}
        >
          <div
            className={` ${
              isMinimize ? 'pl-6' : 'pl-[35px] pr-4'
            } pb-[10px] flex gap-4 items-center justify-between`}
          >
            {!isMinimize ? (
              <Link href='/' className='flex gap-4 items-center'>
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
                <p className='text-xl font-bold text-white hidden xl:block'>
                  GenBI UPI
                </p>
              </Link>
            ) : (
              <></>
            )}

            <button type='button' onClick={() => setIsMinimize(!isMinimize)}>
              {isMinimize ? (
                <BiMenu className='text-neutral-100 text-3xl' />
              ) : (
                <BiMenuAltRight className='text-neutral-100 text-3xl' />
              )}
            </button>
          </div>
          <div className='flex gap-2 flex-col w-full pt-4'>
            {dataSideBar.map((item, i) => (
              <div className='flex flex-col ' key={i}>
                {isMinimize ? (
                  ''
                ) : (
                  <p
                    className={`text-sm text-white ${
                      isMinimize ? 'pl-6' : 'pl-[35px]'
                    } py-2 max-w-[190px]`}
                  >
                    {item.title}
                  </p>
                )}

                {item.children.map((child, index) => (
                  <div className='w-full item-sidebar' key={index}>
                    {isMinimize ? (
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger>
                            <Link
                              href={child.link}
                              className={`duration-300 ease-in-out hover:bg-primary-700 w-full flex gap-[10px]  py-2 ${
                                isMinimize ? 'pl-6' : 'pl-[35px]'
                              }  `}
                            >
                              {child.icon}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent
                            side='top'
                            className='text-wrap max-w-[75px]'
                          >
                            <p className='text-xs'>{child.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Link
                        href={child.link}
                        className='duration-300 ease-in-out hover:bg-primary-700 w-full flex gap-[10px]  py-2 pl-[35px] '
                      >
                        {child.icon}

                        <p className='text-medium text-white  max-w-[190px]'>
                          {child.title}
                        </p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const dataSideBar = [
  {
    title: '',
    children: [
      // {
      //   title: 'Dashboard',
      //   link: '/admin',
      //   icon: <RiHome6Fill className='w-6 h-6  text-white' />,
      // },
      // {
      //   title: 'Scholarship Registration',
      //   link: '/admin',
      //   icon: <LuFileCheck className='w-6 h-6  text-white' />,
      // },
    ],
  },
  {
    title: 'Manage',
    children: [
      {
        title: 'Awardee',
        link: '/admin/awardee',
        icon: <HiMiniUsers className='w-6 h-6  text-white' />,
      },
      {
        title: 'News',
        link: '/admin/news',
        icon: <BiSolidBookAlt className='w-6 h-6  text-white' />,
      },
      {
        title: 'Events',
        link: '/admin/events',
        icon: <MdEvent className='w-6 h-6  text-white' />,
      },
      {
        title: 'Appreciations',
        link: '/admin/appreciations',
        icon: <FaAward className='w-6 h-6  text-white' />,
      },
      {
        title: 'Managements',
        link: '/admin/managements',
        icon: <GoOrganization className='w-6 h-6  text-white' />,
      },
      {
        title: 'Department',
        link: '/admin/department',
        icon: <FaLayerGroup className='w-6 h-6  text-white' />,
      },
    ],
  },
];
