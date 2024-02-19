'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoMenu } from 'react-icons/io5';

import Button from '@/components/buttons/Button';
import BaseLayout from '@/components/layouts/base';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

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
            <Link href='/login'>
              <Button variant='light' size='base' className='hidden sm:block'>
                Login
              </Button>
            </Link>
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
            <Button variant='light' size='base' className='w-fit'>
              Login
            </Button>
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
