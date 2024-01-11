'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
// import { Icons } from '@/components/icons';
import BaseLayout from '@/components/layouts/base';
import NextImage from '@/components/NextImage';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  return (
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
          <div className='flex gap-2 items-center'>
            <span className='px-4 py-2 text-neutral-100 text-lg font-semibold '>
              Berita
            </span>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tentang Kami</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid w-[400px]  p-4 md:w-[450px]'>
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
            <span className='px-4 py-2 text-neutral-100 text-lg font-semibold '>
              Kegiatan
            </span>
            <span className='px-4 py-2 text-neutral-100 text-lg font-semibold '>
              Galeri
            </span>
          </div>
          <Button variant='primary' size='base'>
            Masuk
          </Button>
        </div>
      </BaseLayout>
    </nav>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
export default Navbar;
