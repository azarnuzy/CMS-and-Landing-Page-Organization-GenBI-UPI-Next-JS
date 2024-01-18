import React from 'react';

import AcaraCard from '@/components/card/acara';
import BaseLayout from '@/components/layouts/base';

import { dataEvents } from '@/modules/acara/constant';

const SimillarEventSection = () => {
  return (
    <div className='py-10'>
      <BaseLayout>
        <>
          <h4 className='text-neutral-main mb-3'>
            Rekomendasi <span className='text-warning-main'>Acara Serupa</span>
          </h4>
          <div className='flex flex-wrap gap-6 justify-center'>
            {dataEvents
              .filter((_, index) => index < 4)
              .map((event, index) => (
                <AcaraCard
                  key={index}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  link={event.link}
                  status={event.status}
                />
              ))}
          </div>
        </>
      </BaseLayout>
    </div>
  );
};

export default SimillarEventSection;
