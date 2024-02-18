'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { useGetAllEvent, useGetSearchEvent } from '@/hooks/events/hook';

import BadgeTag from '@/components/badge';
import AcaraCard from '@/components/card/acara';
import BaseLayout from '@/components/layouts/base';
import Pagination from '@/components/pagination';

import { dataFilterEvent } from '@/modules/acara/constant';
import { eventsDataState } from '@/recoils/events/atom';
const ContentEventSection = () => {
  const searchParams = useSearchParams();
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data, refetch } = useGetAllEvent({
    sort: 'created_at',
    type: 'desc',
    limit: 9,
    page: Number(searchParams.get('page')) || 1,
    filter: searchParams.get('filter') || '',
  });

  const { data: dataSearchEvent, refetch: refetchSearchEvent } =
    useGetSearchEvent({
      keyword: searchParams.get('search') || '',
    });

  const [dataEvent, setDataEvent] = useRecoilState(eventsDataState);

  const [inputSearch, setInputSearch] = useState('');
  const [dataStatus, setDataStatus] = useState('data');

  const handlePageChange = async (page: number) => {
    if (dataStatus === 'search') {
      await refetchSearchEvent();
    } else if (dataStatus === 'data') {
      await refetch();
    }

    let filter = '';
    let search = '';
    if (searchParams.get('filter')) {
      filter = `&filter=${searchParams.get('filter')}`;
    }

    if (searchParams.get('search')) {
      search = `&search=${searchParams.get('search')}`;
    }

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/acara?page=${page}${filter}${search}`, { scroll: false });
  };

  const handleFilterChange = async (filter: string) => {
    setDataStatus('data');
    await refetch();
    let tempFilter = '';

    if (filter.length > 0) {
      tempFilter = `&filter=${filter}`;
    }
    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/acara?page=1${tempFilter}`, { scroll: false });
  };

  const handleKeyDownSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setDataStatus('search');
      await refetchSearchEvent();
      if (parentRef.current) {
        parentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      router.replace(`/acara?search=${inputSearch}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (data && dataStatus === 'data') {
      setDataEvent(data?.data);
    }

    if (dataSearchEvent && dataStatus === 'search') {
      setDataEvent(dataSearchEvent?.data);
    }
  }, [data, dataSearchEvent, dataStatus, setDataEvent]);

  return (
    <div
      ref={parentRef}
      className='relative w-full min-h-[40vh] py-10 bg-neutral-100'
    >
      <Image
        width={0}
        height={0}
        src='/svg/news-bg.svg'
        alt='news-bg'
        className='absolute -top-52 sm:-top-72 w-full h-[400px] z-[1]'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='flex flex-col relative gap-6 z-[2]'>
          <h1 className='text-center'>
            Daftar Acara <span className='text-primary-main'>GenBI UPI</span>
          </h1>
          <div className='rounded-full border border-neutral-300 py-4 px-6 flex gap-2'>
            <label
              className=' rounded-full  flex items-center justify-center'
              htmlFor='search'
            >
              <IoSearch className='text-neutral-main text-xl' />
            </label>
            <input
              type='text'
              id='search'
              placeholder='Cari Acara GenBI UPI dan Tekan Enter'
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={handleKeyDownSearch}
              className='w-full bg-transparent outline-none'
            />
          </div>
          <div className='flex overflow-x-auto flex-nowrap items-center gap-4 pb-2   scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded'>
            {dataFilterEvent.map((item, i) => (
              <div
                className='cursor-pointer'
                onClick={() => {
                  handleFilterChange(item.value);
                }}
                key={i}
              >
                <BadgeTag
                  size='lg'
                  title={item.title}
                  className='cursor-pointer'
                />
              </div>
            ))}
          </div>
          <div className=' grid grid-cols-3 justify-start gap-10'>
            {data &&
              dataEvent.map((item, i) => (
                <div key={i} className='col-span-3 md:col-span-1'>
                  <AcaraCard
                    key={i}
                    description={item?.description}
                    image={item?.thumbnail?.file_url}
                    link={`/acara/${item?.id}`}
                    status={item?.status}
                    title={item?.title}
                  />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={
              dataStatus === 'data'
                ? Number(data?.pagination?.currentPage)
                : Number(dataSearchEvent?.pagination?.currentPage) || 1
            }
            totalPages={
              dataStatus === 'search'
                ? Number(dataSearchEvent?.pagination?.totalPages)
                : Number(data?.pagination?.totalPages) || 1
            }
            onPageChange={handlePageChange}
          />
        </div>
      </BaseLayout>
    </div>
  );
};

export default ContentEventSection;
