'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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

import './index.css';

import { badgeColor } from '@/lib/utils/badge-color';
import { formatDate, splitAndJoinWithDash } from '@/lib/utils/general-function';

import GalleryComponent from '@/components/gallery';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { siteConfig } from '@/constant/config';
import CommentsSection from '@/modules/news/detail/comment-section';

import {
  TDataCommentPostResponse,
  TDataGetDetailPostResponse,
} from '@/types/posts';

const ContentSection = ({
  data,
  dataComments,
}: {
  data: TDataGetDetailPostResponse;
  dataComments: TDataCommentPostResponse;
}) => {
  // const totalComments = useRecoilValue(totalCommentsSelector);
  const commentsData = dataComments.data;
  let totalComments = commentsData.length;

  // Iterate over comments and add the number of replies for each comment
  commentsData.forEach((comment) => {
    totalComments += comment.replies.length;
  });

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
                (splitAndJoinWithDash(
                  data?.data?.post?.type || ''
                ) as string) || ''
              )} rounded-full whitespace-nowrap border text-xs`}
            >
              {data?.data?.post?.type || ''}
            </div>
            <div
              className={`py-1.5 px-4 ${badgeColor(
                (splitAndJoinWithDash(
                  data?.data?.post?.department_name || ''
                ) as string) || ''
              )} rounded-full whitespace-nowrap border text-xs`}
            >
              {data?.data?.post?.department_name}
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
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}/${data?.data?.post?.slug}`}
                    title={data?.data?.post?.title}
                    separator=' - '
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}/${data?.data?.post?.slug}`}
                    title={data?.data?.post?.title}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    title={data?.data?.post?.title}
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}/${data?.data?.post?.slug}`}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    url={`https://${siteConfig.url}/berita/${data?.data?.post?.id}/${data?.data?.post?.slug}`}
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
        {data && <GalleryComponent data={data.data.post.images} />}
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
              #{item}
            </Badge>
          )) || ''}
        </div>
        <CommentsSection data={dataComments} />
      </div>
    </div>
  );
};

export default ContentSection;
