import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

import BaseLayout from '@/components/layouts/base';
const links = [
  {
    name: 'Press Release',
    href: '/',
  },
  {
    name: 'Artikel',
    href: '/',
  },
  {
    name: 'Tentang GenBI',
    href: '/',
  },
  {
    name: 'Tentang GenBI UPI',
    href: '/',
  },
  {
    name: 'Acara',
    href: '/',
  },
  {
    name: 'Galeri',
    href: '/',
  },
];

const socialMedia = [
  {
    name: 'Instagram',
    href: '/',
    icons: (
      <FaInstagram className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
  {
    name: 'Linkedin',
    href: '/',
    icons: (
      <FaLinkedin className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
  {
    name: 'Tiktok',
    href: '/',
    icons: (
      <FaTiktok className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
  {
    name: 'Twitter',
    href: '/',
    icons: (
      <FaTwitter className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
  {
    name: 'Email',
    href: '/',
    icons: (
      <IoMdMail className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
  {
    name: 'Phone',
    href: '/',
    icons: (
      <FaPhone className='text-white w-[46px] h-[46px] p-[10px] rounded-full bg-primary-600' />
    ),
  },
];

const Footer = () => {
  return (
    <>
      <div className='bg-[#021D47] w-full min-h-[20vh] relative overflow-hidden py-5'>
        <Image
          src='/svg/line-pattern-footer.svg'
          width={0}
          height={0}
          className='w-full h-full object-cover absolute z-0 -bottom-4 left-0'
          alt='line-pattern'
        />
        <BaseLayout>
          <div className='grid grid-cols-4 gap-y-8 relative z-[1]'>
            <div className='flex gap-4  items-start  col-span-4 md:col-span-2 lg:col-span-1'>
              <Image
                src='/images/logo-bi.png'
                width={36}
                height={36}
                alt='logo-bi'
              />
              <Image
                src='/images/logo-genbi.png'
                width={36}
                height={36}
                alt='logo-genbi'
              />
              <h4 className='text-neutral-100'>GenBI UPI</h4>
            </div>
            <div className='flex flex-col gap-2 col-span-4 md:col-span-2 lg:col-span-1'>
              {links.map((link, index) => (
                <Link
                  className='text-lg text-neutral-100'
                  href={link.href}
                  key={index}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className='flex flex-col gap-2 col-span-4 md:col-span-2 lg:col-span-1 text-neutral-100'>
              <p>
                {' '}
                <strong>Bandung, Indonesia</strong>
              </p>
              <p>
                Jl. Dr. Setiabudi No.229, Isola, Kec. Sukasari, Kota Bandung,
                Jawa Barat 40154
              </p>
            </div>
            <div className='flex gap-4 items-start col-span-4 md:col-span-2 lg:col-span-1'>
              {socialMedia.map((social, index) => (
                <Link href={social.href} key={index}>
                  {social.icons}
                </Link>
              ))}
            </div>
          </div>
        </BaseLayout>
      </div>
      <div className='py-4 w-full bg-primary-900 text-neutral-100'>
        <BaseLayout>
          <p className='text-center '>
            © {new Date().getFullYear()} GenBI UPI. All rights reserved.
          </p>
        </BaseLayout>
      </div>
    </>
  );
};

export default Footer;
