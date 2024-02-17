'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import './index.css';

import { badgeColor } from '@/lib/utils/badge-color';
import { formatDate, splitAndJoinWithDash } from '@/lib/utils/general-function';
import {
  useAddVisitorPost,
  useGetCommentPost,
  useGetDetailPost,
} from '@/hooks/posts/hook';

import GalleryComponent from '@/components/gallery';
import { Badge } from '@/components/ui/badge';

import { postDetailDataState } from '@/recoils/news/detail/atom';

const ContentSection = ({ id }: { id: number }) => {
  useAddVisitorPost({ id });
  const { data } = useGetDetailPost({ id });
  const { data: comments } = useGetCommentPost({ id });

  const [type, setType] = useState('Article');
  const [department, setDepartment] = useState('Marketing');
  const [images, setImages] = useState([
    {
      src: '/images/no-photo-available.png',
    },
  ]);
  const [, setDetailPost] = useRecoilState(postDetailDataState);

  useEffect(() => {
    if (data) {
      const tempImages = data.data.post.images
        .filter((item) => item.category === 'post_other_image')
        .map((item) => ({
          src: item.file_url,
        }));

      setType(data.data.post.type);
      setDepartment(data.data.post.department_name);
      setImages(tempImages);
      setDetailPost(data.data);
    }
  }, [data, setDetailPost]);

  return (
    <div className='md:col-span-4 col-span-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <div className='w-full h-[492px] rounded-2xl'>
            <Image
              src={
                data?.data?.post?.image_cover?.file_url ||
                '/images/no-photo-available.png'
              }
              alt='article'
              className='rounded-2xl object-cover object-center w-full h-full'
              width={0}
              height={0}
              sizes='60vw'
            />
          </div>
          <p className='text-end italic text-sm text-neutral-600'>
            {data?.data?.post?.image_cover?.caption ||
              'lorem ipsum dolor sit amet'}
          </p>
        </div>
        <div className='flex items-start sm:justify-between flex-col sm:flex-row gap-2'>
          <div className='flex gap-4 items-center'>
            <div
              className={`py-1.5 px-4 ${badgeColor(
                (splitAndJoinWithDash(type) as string) || ''
              )} rounded-full whitespace-nowrap border text-xs`}
            >
              {type}
            </div>
            <div
              className={`py-1.5 px-4 ${badgeColor(
                (splitAndJoinWithDash(department) as string) || ''
              )} rounded-full whitespace-nowrap border text-xs`}
            >
              {department}
            </div>
          </div>
          <div className='flex gap-4 items-center'></div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/calendar.svg'
                alt='calendar'
                width={24}
                height={24}
              />
              <p>
                {formatDate(
                  data?.data?.post?.created_at || '1970-10-10T05:20:22.754Z'
                )}
              </p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image src='/svg/eye.svg' alt='eye' width={24} height={24} />
              <p>{data?.data?.post?.visitors || 45}</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/message-chat.svg'
                alt='message-chat'
                width={24}
                height={24}
              />
              <p>{comments?.pagination?.totalRows || 0}</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/share.svg'
                alt='message-chat'
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
        <h3>{data?.data?.post?.title}</h3>
        <div
          className='flex flex-col gap-2 content-dangerously'
          dangerouslySetInnerHTML={{ __html: data?.data?.post?.content || '' }}
        ></div>
        {data && <GalleryComponent images={images} />}

        <div className='flex gap-2 items-center flex-wrap'>
          {data?.data?.post?.tags.map((item, i) => (
            <Badge
              variant='outline'
              key={i}
              className='text-neutral-600 py-2 px-4'
            >
              {item}
            </Badge>
          )) || ''}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
