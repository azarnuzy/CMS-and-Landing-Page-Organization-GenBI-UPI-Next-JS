'use client';

import React from 'react';
import { useRecoilState } from 'recoil';

import { ArticleCard } from '@/components/card/article';
import BaseLayout from '@/components/layouts/base';

import { eventsDetailDataState } from '@/recoils/events/atom';

const SimillarEventSection = () => {
  const [relatedPost] = useRecoilState(eventsDetailDataState);
  return (
    <div className='py-10'>
      <BaseLayout>
        <>
          {relatedPost?.event?.related_posts.length > 0 && (
            <h4 className='text-neutral-main mb-3'>
              Postingan <span className='text-warning-main'>Terkait</span>
            </h4>
          )}
          <div className='grid grid-cols-3 gap-6 justify-center'>
            {relatedPost &&
              relatedPost?.event?.related_posts
                .filter((_, i) => i !== 5)
                .map((item, index) => (
                  <div className='col-span-3 md:col-span-1' key={index}>
                    <ArticleCard
                      image={item?.image_cover?.file_url}
                      description={item?.content}
                      tags={[item?.type, item?.department_name]}
                      title={item?.title}
                      link={`/berita/${item?.id}/${item?.slug}`}
                    />
                  </div>
                ))}
          </div>
        </>
      </BaseLayout>
    </div>
  );
};

export default SimillarEventSection;
