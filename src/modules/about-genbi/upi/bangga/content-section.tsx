'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { useGetAppreciations } from '@/hooks/appreciations/hook';

import BanggaCard from '@/components/card/bangga';
import BaseLayout from '@/components/layouts/base';
import Pagination from '@/components/pagination';

import { appreciationsDataState } from '@/recoils/appreciations/atom';

const ContentGenBIBanggaSection = () => {
  const searchParams = useSearchParams();
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data, refetch } = useGetAppreciations({
    sort: 'created_at',
    type: 'desc',
    limit: 6,
    page: Number(searchParams.get('page')) || 1,
  });

  const [dataAppreciations, setDataAppreciations] = useRecoilState(
    appreciationsDataState
  );

  const handlePageChange = async (page: number) => {
    await refetch();

    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    router.replace(`/tentang-genbi/upi/bangga?page=${page}`, { scroll: false });
  };

  useEffect(() => {
    if (data) {
      setDataAppreciations(data?.data);
    }
  }, [data, setDataAppreciations]);

  return (
    <BaseLayout>
      <>
        <div className='py-10 grid grid-cols-3 justify-center gap-10'>
          {dataAppreciations &&
            dataAppreciations?.map((item, i) => (
              <div key={i} className='col-span-3 md:col-span-1'>
                <BanggaCard
                  description={item?.caption}
                  title={item?.title}
                  image={item?.cover?.file_url}
                  link={item?.instagram_url}
                />
              </div>
            ))}
        </div>
        <Pagination
          currentPage={Number(data?.pagination?.currentPage) || 1}
          totalPages={Number(data?.pagination?.totalPages) || 1}
          onPageChange={handlePageChange}
        />
      </>
    </BaseLayout>
  );
};

export default ContentGenBIBanggaSection;
