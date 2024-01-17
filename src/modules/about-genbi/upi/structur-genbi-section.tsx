import React from 'react';

import AwardeeCard from '@/components/card/member';
import BaseLayout from '@/components/layouts/base';

const data = [
  {
    name: 'Wilda Riva',
    position: 'Administration Officer',
    instagram: '/',
    linkedin: '/',
    img: '/images/secretary.png',
  },
  {
    name: 'Ilham Fachry',
    position: 'Chief Executive Officer',
    instagram: '/',
    linkedin: '/',
    img: '/images/ceo.png',
  },
  {
    name: 'Zulfa Haura',
    position: 'Finance Officer',
    instagram: '/',
    linkedin: '/',
    img: '/images/finance.png',
  },
];

const StructureGenbiSection = () => {
  return (
    <div className='py-10'>
      <BaseLayout>
        <div className='flex flex-col gap-9'>
          <h1 className='text-neutral-main text-center'>Executive</h1>
          <div className='w-full  flex justify-center'>
            <div className='grid grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 w-fit justify-center'>
              {data.map((item, i) => (
                <div
                  key={i}
                  className='col-span-3 sm:col-span-1 w-full sm:w-fit flex justify-center '
                >
                  <AwardeeCard
                    name={item.name}
                    position={item.position}
                    instagram={item.instagram}
                    linkedin={item.linkedin}
                    img={item.img}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default StructureGenbiSection;
