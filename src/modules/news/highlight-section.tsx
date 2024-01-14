import React from 'react';

import BaseLayout from '@/components/layouts/base';
import { Badge } from '@/components/ui/badge';

const HiglightSection = () => {
  return (
    <div
      className='w-full h-full min-h-[40vh] pt-12 relative'
      style={{
        background:
          'radial-gradient(106.84% 43.83% at 8.16% 86.94%, #FFD99F 0%, #F9F9F9 75.08%)',
      }}
    >
      <div
        className='h-[577px] w-[577px] rounded-full absolute top-0 right-0 z-[1]'
        style={{
          background: 'rgba(189, 219, 240, 0.82)',
          filter: 'blur(100px)',
        }}
      ></div>
      <BaseLayout>
        <div className='grid grid-cols-2 gap-6 relative z-[2]'>
          <div
            className='col-span-2 md:col-span-1 rounded-3xl w-full px-6 py-4 flex flex-col justify-between h-[480px] border shadow-sm'
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #0A1E3C 100%), url('/images/peran-1.webp') center/cover no-repeat, lightgray 50%",
            }}
          >
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <Badge
                  variant='outline'
                  className='bg-warning-100 border border-warning-300 text-warning-600 '
                >
                  Press Release
                </Badge>
                <Badge variant='outline' className='bg-neutral-100'>
                  Education
                </Badge>
              </div>
              <p className='font-semibold text-neutral-100'>4 Desember, 2024</p>
            </div>
            <h2 className='text-balance text-white'>
              Lorem ipsum dolor sit amet consectetur.
            </h2>
          </div>
          <div className='col-span-2 md:col-span-1 flex flex-col justify-between'>
            {Array(4)
              .fill('_')
              .map((_, i) => (
                <div
                  className='bg-neutral-100 rounded-3xl p-4 flex flex-col gap-2.5'
                  key={i}
                >
                  <div className='flex justify-between items-center'>
                    <Badge variant='destructive'>Executive</Badge>
                    <p className='text-sm text-neutral-main'>
                      4 December, 2024
                    </p>
                  </div>
                  <h4>Lorem ipsum dolor sit amet.</h4>
                </div>
              ))}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HiglightSection;
