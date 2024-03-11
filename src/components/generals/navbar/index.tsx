'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';

import { useGetWhoAmI } from '@/hooks/auth/hook';

import Button from '@/components/buttons/Button';
import BaseLayout from '@/components/layouts/base';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const { data } = useGetWhoAmI();

  return (
    <>
      <div
        className='h-[63px] w-full relative -z-10 bg-primary-600'
        style={{
          background:
            'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
        }}
      ></div>
      <nav className='w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center bg-primary-800'>
        <BaseLayout>
          <div className='flex justify-between items-center'>
            <Link href='/' className='flex items-center gap-4'>
              <Image
                alt='Logo BI'
                src='/images/logo-bi.png'
                width={36}
                height={36}
              />
              <Image
                alt='Logo GenBI'
                src='/images/logo-genbi.png'
                width={38}
                height={38}
              />
              <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
                GenBI UPI
              </h5>
            </Link>
            {/* Menu Navigation Tablet, Laptop, and Desktop */}
            <div className='hidden sm:flex sm:gap-2 md:gap-4 lg:gap-6 items-center'>
              <Link
                href='/'
                className=' py-2 text-neutral-100 text-lg font-semibold '
              >
                Home
              </Link>
              <Link
                href='/berita'
                className=' py-2 text-neutral-100 text-lg font-semibold '
              >
                News
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className='grid w-[350px] sm:w-[380px]  p-4 md:w-[400px]'>
                        <Link
                          href='/tentang-genbi'
                          className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'
                        >
                          <span className='text-neutral-main text-lg font-semibold'>
                            01
                          </span>
                          <div>
                            <h4>Generasi Baru Indonesia</h4>
                            <p className='text-sm'>
                              Kenali lebih jauh tentang Generasi Baru Indonesia
                            </p>
                          </div>
                        </Link>
                        <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                          <span className='text-neutral-main text-lg font-semibold'>
                            02
                          </span>
                          <div>
                            <h4>GenBI UPI</h4>
                            <div className='border-l  border-neutral-main px-3 py-1.5 flex flex-col gap-2'>
                              <Link
                                href='/tentang-genbi/upi'
                                className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'
                              >
                                Struktur Organisasi GenBI UPI
                              </Link>{' '}
                              <Link
                                href='/tentang-genbi/upi/bangga'
                                className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'
                              >
                                GenBI Bangga
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href='/acara'
                className=' py-2 text-neutral-100 text-lg font-semibold '
              >
                Event
              </Link>
              <Link
                href='/gallery'
                className=' py-2 text-neutral-100 text-lg font-semibold '
              >
                Gallery
              </Link>
            </div>
            {data ? (
              <div className='sm:flex justify-end gap-4 hidden '>
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
                        <Link
                          href='/admin'
                          className='flex gap-2 items-center py-2'
                        >
                          <MdOutlineDashboard className='w-4 h-4 text-primary-900' />{' '}
                          <p className='text-primary-900'>Admin Dashboard</p>
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
            ) : (
              <Link href='/login'>
                <Button variant='light' size='base' className='hidden sm:block'>
                  Login
                </Button>
              </Link>
            )}

            {/* Menu Mobile Button */}
            <button onClick={() => setOpen(!open)} className='block sm:hidden'>
              <IoMenu className=' text-white text-3xl' />
            </button>
            {/* Menu Navigation Mobile */}
            <NavbarMobileMenu open={open} setOpen={setOpen} />
          </div>
        </BaseLayout>
      </nav>
    </>
  );
};

const NavbarMobileMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`${
        open ? 'top-0' : '-top-[100vh]'
      } py-4 absolute md:hidden transition-all ease-in-out duration-300  shadow-md border-b-2 w-full bg-primary-800 z-50 left-0`}
    >
      <BaseLayout>
        <>
          <div className='flex justify-between items-center'>
            <Link
              onClick={handleClose}
              href='/'
              className='flex items-center gap-4'
            >
              <Image
                alt='Logo BI'
                src='/images/logo-bi.png'
                width={36}
                height={36}
              />
              <Image
                alt='Logo GenBI'
                src='/images/logo-genbi.png'
                width={38}
                height={38}
              />
              <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
                GenBI UPI
              </h5>
            </Link>
            <button onClick={() => setOpen(!open)}>
              <IoMenu className=' text-white text-3xl' />
            </button>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <Link
              onClick={handleClose}
              href='/berita'
              className=' py-2 text-neutral-100 text-lg font-semibold '
            >
              News
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid w-[300px] '>
                      <Link
                        onClick={handleClose}
                        href='/tentang-genbi'
                        className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'
                      >
                        <span className='text-neutral-main text-lg font-semibold'>
                          01
                        </span>
                        <div>
                          <h4>Generasi Baru Indonesia</h4>
                          <p className='text-sm'>
                            Kenali lebih jauh tentang Generasi Baru Indonesia
                          </p>
                        </div>
                      </Link>
                      <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                        <span className='text-neutral-main text-lg font-semibold'>
                          02
                        </span>
                        <div>
                          <h4>GenBI UPI</h4>
                          <div className='border-l  border-neutral-main px-3 py-1.5 flex flex-col gap-2'>
                            <Link
                              onClick={handleClose}
                              href='/tentang-genbi/upi'
                              className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'
                            >
                              Struktur Organisasi GenBI UPI
                            </Link>{' '}
                            <Link
                              onClick={handleClose}
                              href='/tentang-genbi/upi/bangga'
                              className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'
                            >
                              GenBI Bangga
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              onClick={handleClose}
              href='/acara'
              className=' py-2 text-neutral-100 text-lg font-semibold '
            >
              Event
            </Link>
            <Link
              onClick={handleClose}
              href='/gallery'
              className=' py-2 text-neutral-100 text-lg font-semibold '
            >
              Gallery
            </Link>
            <Link href='/login'>
              <Button variant='light' size='base' className='hidden sm:block'>
                Login
              </Button>
            </Link>
          </div>
        </>
      </BaseLayout>
    </div>
  );
};

export default Navbar;

export const NavbarLogin = () => (
  <>
    <div
      className='h-[63px] w-full relative -z-10 bg-primary-600'
      style={{
        background:
          'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
      }}
    ></div>
    <nav className='w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center bg-primary-800'>
      <BaseLayout>
        <div className='flex justify-between items-center'>
          <Link href='/' className='flex items-center gap-4'>
            <Image
              alt='Logo BI'
              src='/images/logo-bi.png'
              width={36}
              height={36}
            />
            <Image
              alt='Logo GenBI'
              src='/images/logo-genbi.png'
              width={38}
              height={38}
            />
            <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
              GenBI UPI
            </h5>
          </Link>
        </div>
      </BaseLayout>
    </nav>
  </>
);
