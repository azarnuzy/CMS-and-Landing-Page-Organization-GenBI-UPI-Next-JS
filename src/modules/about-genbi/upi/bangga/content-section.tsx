import React from 'react';

import BanggaCard from '@/components/card/bangga';
import BaseLayout from '@/components/layouts/base';

const ContentGenBIBanggaSection = () => {
  return (
    <BaseLayout>
      <div className='py-10 flex flex-wrap justify-center gap-10'>
        {Array(6)
          .fill('_')
          .map((_, i) => (
            <BanggaCard
              key={i}
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, minus!...'
              title='Lorem ipsum dolor sit amet consectetur.'
              image='/images/bangga-bg.png'
              link='https://linkedin.com'
            />
          ))}
      </div>
    </BaseLayout>
  );
};

export default ContentGenBIBanggaSection;
