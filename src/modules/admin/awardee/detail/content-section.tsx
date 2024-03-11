'use client';

import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { GrDocument } from 'react-icons/gr';
import { useRecoilState } from 'recoil';

import { formatDate } from '@/lib/utils/general-function';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { awardeesDataDetailState } from '@/recoils/admin/awardees/atom';

const ContentDetailAwardeeAdminSection = () => {
  const [dataDetail] = useRecoilState(awardeesDataDetailState);

  const [ip, setIp] = useState<
    {
      semester: number;
      ip: number;
      ipk: number;
    }[]
  >([
    {
      semester: 0,
      ip: 0,
      ipk: 0,
    },
  ]);

  useEffect(() => {
    if (dataDetail) {
      setIp(() => {
        const ip = Array(8)
          .fill(0)
          .map((item, i: number) => {
            return {
              semester: i + 1,
              ip:
                Number(dataDetail[`ip${i + 1}` as keyof typeof dataDetail]) ||
                0,
              ipk:
                Number(dataDetail[`ipk${i + 1}` as keyof typeof dataDetail]) ||
                0,
            };
          });

        return ip;
      });
    }
  }, [dataDetail]);

  return (
    <div className='py-5 border rounded-3xl w-full mt-10 mb-5 px-5'>
      <h4 className='text-neutral-600'>General Data</h4>
      <div className='flex flex-col lg:flex-row justify-between'>
        {dataDetail?.name.length > 0 && (
          <table border={0}>
            <tbody>
              <tr>
                <td className='min-w-36 font-semibold'>Name</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.name || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Birth Date</td>
                <td className='min-w-3'>: </td>
                <td>{formatDate(dataDetail?.birth_date?.toString()) || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Member Since</td>
                <td className='min-w-3'>: </td>
                <td>
                  {formatDate(dataDetail?.member_since?.toString()) || '-'}
                </td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Total Scholarship</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.scholarship || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>NIM</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.nim || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Year</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.year || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Study Program</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.study_program || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold'>Faculty</td>
                <td className='min-w-3'>: </td>
                <td>{dataDetail?.faculty || '-'}</td>
              </tr>
              <tr>
                <td className='min-w-36 font-semibold align-top'>
                  Managements
                </td>
                <td className='min-w-3 align-top'>: </td>
                <td className=''>
                  <div>
                    {dataDetail?.managements?.map((item, i) => (
                      <div className=' flex flex-col list-disc' key={i}>
                        <span className='font-semibold'>{item.management}</span>
                        <div className='flex gap-4 items-center'>
                          <td className='min-w-36 font-medium'>Department</td>
                          <td className='min-w-3'>: </td>
                          <td>{item.department || '-'}</td>
                        </div>
                        <div className='flex gap-4 items-center'>
                          <td className='min-w-36 font-medium'>Division</td>
                          <td className='min-w-3'>: </td>
                          <td>{item.division || '-'}</td>
                        </div>
                        <div className='flex gap-4 items-center'>
                          <td className='min-w-36 font-semibold'>Position</td>
                          <td className='min-w-3'>: </td>
                          <td>{item.position || '-'}</td>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>

              <tr>
                <td className='min-w-36 font-semibold'>Transcript</td>
              </tr>
              {dataDetail?.transcript?.file_url && (
                <tr className='mt-4'>
                  <td className='min-w-36 font-medium'></td>
                  <td className='min-w-3'> </td>
                  <td>
                    <Link
                      className='min-w-80 font-semibold p-4 border border-primary-main rounded-xl  flex gap-2'
                      target='_blank'
                      href={dataDetail?.transcript?.file_url || '#'}
                    >
                      <GrDocument className='text-primary-main text-2xl' />
                      <span>{dataDetail?.transcript?.file_name}</span>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className='flex flex-col gap-4 items-center '>
          <div className=''></div>
          <div className='shadow-md  w-[232px] h-[250px] relative rounded-[14px] p-6   overflow-hidden'>
            <Image
              src='/svg/ellipse-blue.svg'
              width={0}
              height={0}
              alt='ellipse'
              className='absolute z-0 bottom-0 -left-10 w-[300px] h-[300px]'
              sizes='40vw'
            />
            <Image
              src='/svg/ellipse-red.svg'
              width={0}
              height={0}
              alt='ellipse'
              className='absolute top-0 -right-10 w-[300px] h-[300px] z-0'
              sizes='40vw'
            />
            <Image
              src={
                dataDetail?.photo?.file_url || '/images/profile-no-photo.png'
              }
              className='w-[232px] h-[248px] absolute right-0 top-0  z-[2] '
              alt='profile'
              width={0}
              height={0}
              sizes='50vw'
            />
          </div>

          <div className='flex gap-2 items-center'>
            <Link
              target='_blank'
              href={`https://www.instagram.com/${dataDetail?.instagram_username}`}
              className='bg-primary-main text-neutral-100 p-2 rounded-full'
            >
              <Instagram size={18} />
            </Link>
            <Link
              target='_blank'
              href={`https://www.linkedin.com/in/${dataDetail?.linkedin_username}`}
              className='bg-primary-main text-neutral-100 p-2 rounded-full'
            >
              <BsLinkedin size={18} />
            </Link>
            <Link
              target='_blank'
              href={`https://wa.me/${dataDetail?.telp}`}
              className='bg-primary-main text-neutral-100 p-2 rounded-full'
            >
              <BsWhatsapp size={18} />
            </Link>
          </div>
        </div>
      </div>
      <h4 className='text-neutral-600 my-5'>GPA Data</h4>
      <Table className='border-b'>
        <TableHeader className='bg-neutral-50 '>
          <TableRow className=''>
            <TableHead className='text-neutral-500'>Semester</TableHead>
            <TableHead className='text-neutral-500'>IP</TableHead>
            <TableHead className='text-neutral-500 '>IPK</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ip.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.semester}</TableCell>
                <TableCell>{item.ip}</TableCell>
                <TableCell>{item.ipk}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentDetailAwardeeAdminSection;
