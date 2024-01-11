'use client';

import React from 'react';
import { IoMenu } from 'react-icons/io5';

import Button from '@/components/buttons/Button';
import BaseLayout from '@/components/layouts/base';
import NextImage from '@/components/NextImage';
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
        className='h-[63px] w-full relative -z-10'
        style={{
          background:
            'linear-gradient(101deg, #041C3F 3.31%, #11418B 39.48%, #11418B 98.43%)',
        }}
      ></div>
      <nav
        className='w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center backdrop-blur-xl'
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          // backdropFilter: 'blur(25px)',
        }}
      >
        <BaseLayout>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <NextImage
                alt='Logo BI'
                src='/images/logo-bi.png'
                width={36}
                height={36}
              />
              <NextImage
                alt='Logo GenBI'
                src='/images/logo-genbi.png'
                width={38}
                height={38}
              />
              <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
                GenBI UPI
              </h5>
            </div>
            {/* Menu Navigation Tablet, Laptop, and Desktop */}
            <div className='hidden sm:flex sm:gap-2 lg:gap-6 items-center'>
              <span className=' py-2 text-neutral-100 text-lg font-semibold '>
                Berita
              </span>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Tentang Kami</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className='grid w-[350px] sm:w-[400px]  p-4 md:w-[450px]'>
                        <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                          <span className='text-neutral-main text-lg font-semibold'>
                            01
                          </span>
                          <div>
                            <h4>Generasi Baru Indonesia</h4>
                            <p className='text-sm'>
                              Kenali lebih jauh tentang Generasi Baru Indonesia
                            </p>
                          </div>
                        </div>
                        <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                          <span className='text-neutral-main text-lg font-semibold'>
                            02
                          </span>
                          <div>
                            <h4>GenBI UPI</h4>
                            <div className='border-l  border-neutral-main px-3 py-1.5 flex flex-col gap-2'>
                              <p className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'>
                                Struktur Organisasi GenBI UPI
                              </p>{' '}
                              <p className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'>
                                GenBI Bangga
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <span className=' py-2 text-neutral-100 text-lg font-semibold '>
                Kegiatan
              </span>
              <span className=' py-2 text-neutral-100 text-lg font-semibold '>
                Galeri
              </span>
            </div>
            <Button variant='primary' size='base' className='hidden sm:block'>
              Masuk
            </Button>
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
}) => (
  <div
    className={`${
      open ? 'top-0' : '-top-[100vh]'
    } py-4 absolute md:hidden transition-all ease-in-out duration-300  shadow-md border-b-2 w-full bg-primary-main z-50 left-0`}
  >
    <BaseLayout>
      <>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <NextImage
              alt='Logo BI'
              src='/images/logo-bi.png'
              width={36}
              height={36}
            />
            <NextImage
              alt='Logo GenBI'
              src='/images/logo-genbi.png'
              width={38}
              height={38}
            />
            <h5 className='text-2xl text-neutral-100 font-bold tracking-wider'>
              GenBI UPI
            </h5>
          </div>
          <button onClick={() => setOpen(!open)}>
            <IoMenu className=' text-white text-3xl' />
          </button>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <span className=' py-2 text-neutral-100 text-lg font-semibold '>
            Berita
          </span>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tentang Kami</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='grid w-[300px] '>
                    <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                      <span className='text-neutral-main text-lg font-semibold'>
                        01
                      </span>
                      <div>
                        <h4>Generasi Baru Indonesia</h4>
                        <p className='text-sm'>
                          Kenali lebih jauh tentang Generasi Baru Indonesia
                        </p>
                      </div>
                    </div>
                    <div className='rounded-2xl hover:bg-blue-100 transition-colors duration-300 ease-in-out p-4 flex gap-4 items-start'>
                      <span className='text-neutral-main text-lg font-semibold'>
                        02
                      </span>
                      <div>
                        <h4>GenBI UPI</h4>
                        <div className='border-l  border-neutral-main px-3 py-1.5 flex flex-col gap-2'>
                          <p className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'>
                            Struktur Organisasi GenBI UPI
                          </p>{' '}
                          <p className='text-sm hover:text-primary-main hover:font-bold transition-all duration-300 ease-in-out'>
                            GenBI Bangga
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <span className=' py-2 text-neutral-100 text-lg font-semibold '>
            Kegiatan
          </span>
          <span className=' py-2 text-neutral-100 text-lg font-semibold '>
            Galeri
          </span>
          <Button variant='light' size='base' className='w-fit'>
            Masuk
          </Button>
        </div>
      </>
    </BaseLayout>
  </div>
);

export default Navbar;
