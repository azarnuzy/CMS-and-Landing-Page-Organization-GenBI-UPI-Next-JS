'use client';

import { User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { useRecoilState } from 'recoil';

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
  const [isMinimize] = useRecoilState(sidebarMinimizeState);
  return (
    <div
      className={`${
        isMinimize ? 'w-[calc(100vw-100px)]' : 'w-[calc(100vw-300px)]'
      }  py-[15px] px-9 flex justify-between gap-4 items-center border-b border-b-neutral-200 shadow-sm transition-all transform duration-300 ease-in-out`}
    >
      <div className=''></div>
      <div className='flex justify-end gap-4'>
        <Badge className='bg-error-300 hover:bg-error-400 border-error-400 py-1 px-4 text-sm'>
          Marketing
        </Badge>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className='cursor-pointer'>
              <Avatar className='w-10 h-10'>
                <AvatarImage src='/images/avatar.jpeg' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <div className='p-4 flex flex-col bg-primary-main'>
                <p className='font-semibold text-neutral-100'>
                  Nadira Arevia Hermawan
                </p>
                <p className=' text-neutral-100 text-sm'>@nadiraarevia</p>
              </div>
              <div className='py-2 px-4 flex flex-col'>
                <div className='flex gap-2 items-center py-2'>
                  <User className='w-4 h-4 text-primary-900' />{' '}
                  <p className='text-primary-900'>Profile</p>
                </div>
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
  );
};

export default NavbarAdmin;
