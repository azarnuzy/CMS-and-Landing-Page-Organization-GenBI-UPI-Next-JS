'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { useRecoilState, useRecoilValue } from 'recoil';

import './index.css';

import { badgeColor } from '@/lib/utils/badge-color';
import { formatDate, splitAndJoinWithDash } from '@/lib/utils/general-function';
import { useAddVisitorPost, useGetDetailPost } from '@/hooks/posts/hook';

import GalleryComponent from '@/components/gallery';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { siteConfig } from '@/constant/config';
import CommentsSection from '@/modules/news/detail/comment-section';
import { totalCommentsSelector } from '@/recoils/comments/atom';
import { postDetailDataState } from '@/recoils/news/detail/atom';

const ContentSection = ({ id }: { id: number }) => {
  useAddVisitorPost({ id });
  const { data } = useGetDetailPost({ id });

  const totalComments = useRecoilValue(totalCommentsSelector);

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
              <p>{data?.data?.post?.visitors || 0}</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Image
                src='/svg/message-chat.svg'
                alt='message-chat'
                width={24}
                height={24}
              />
              <p>{totalComments || 0}</p>
            </div>
            <div className='flex gap-1.5 items-center text-neutral-main'>
              <Popover>
                <PopoverTrigger>
                  {' '}
                  <Image
                    src='/svg/share.svg'
                    alt='message-chat'
                    width={24}
                    height={24}
                  />
                </PopoverTrigger>
                <PopoverContent className='w-fit rounded-xl pt-2 flex gap-2 items-center'>
                  <WhatsappShareButton
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}`}
                    title={data?.data?.post?.title}
                    separator=' - '
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}`}
                    title={data?.data?.post?.title}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    title={data?.data?.post?.title}
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}`}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}`}
                    title={data?.data?.post?.title}
                    hashtags={data?.data?.post?.tags}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <h3>{data?.data?.post?.title}</h3>
        <div
          className='flex flex-col gap-2 content-dangerously'
          dangerouslySetInnerHTML={{ __html: data?.data?.post?.content || '' }}
        ></div>
        {data && <GalleryComponent images={images} />}
        {data && data?.data?.post?.attachments?.length > 0 && (
          <div>
            <h4>Attachments Files</h4>
            <ul className='list-disc'>
              {data?.data?.post?.attachments?.map((item, i) => (
                <li key={i}>
                  {' '}
                  <Link
                    target='_blank'
                    href={item.file_url}
                    className='underline text-blue-600'
                  >
                    {item.file_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
        <CommentsSection />
      </div>
    </div>
  );
};

export default ContentSection;
