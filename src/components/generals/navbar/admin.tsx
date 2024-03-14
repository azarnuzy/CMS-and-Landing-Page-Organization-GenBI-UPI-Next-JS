'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { useRecoilState } from 'recoil';

import { useGetWhoAmI } from '@/hooks/auth/hook';

import { WideBaseLayout } from '@/components/layouts/base';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { sidebarMinimizeState } from '@/recoils/sidebar/atom';

const NavbarAdmin = () => {
  const [, setIsMinimize] = useRecoilState(sidebarMinimizeState);
  const { data } = useGetWhoAmI();
  return (
    <div className='w-full py-[15px] border-b border-b-neutral-200 shadow-sm transition-all transform duration-300 ease-in-out'>
      <WideBaseLayout>
        <div className=' flex justify-between gap-4 items-center'>
          <button
            type='button'
            onClick={() => setIsMinimize(false)}
            className=''
          >
            <BiMenu className='text-neutral-800 text-3xl' />
          </button>

          <div className='flex justify-end gap-4'>
            <Badge className='bg-error-300 hover:bg-error-400 border-error-400 py-1 px-4 text-sm'>
              {data?.data?.awardee?.department || 'Admin'}
            </Badge>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className='cursor-pointer'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage
                      src={
                        data?.data?.awardee?.photo?.file_url ||
                        '/images/profile-no-photo.png'
                      }
                      className='bg-white'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <div className='p-4 flex flex-col bg-primary-main'>
                    <p className='font-semibold text-neutral-100'>
                      {data?.data?.awardee?.name || 'Admin'}
                    </p>
                    <p className=' text-neutral-100 text-sm'>
                      {data?.data?.username || '@admin123'}
                    </p>
                  </div>
                  <div className='py-2 px-4 flex flex-col'>
                    <Link href='/' className='flex gap-2 items-center py-2'>
                      <Home className='w-4 h-4 text-primary-900' />{' '}
                      <p className='text-primary-900'>Home</p>
                    </Link>
                    <div
                      className='flex gap-2 items-center py-2 cursor-pointer'
                      onClick={() => {
                        signOut({ callbackUrl: '/login' });
                      }}
                    >
                      <LuLogOut className='w-4 h-4 text-primary-900' />{' '}
                      <p className='text-primary-900'>Keluar</p>
                    </div>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </WideBaseLayout>
    </div>
  );
};

export default NavbarAdmin;
