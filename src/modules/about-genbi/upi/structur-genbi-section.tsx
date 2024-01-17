import React from 'react';

import DepartmentCard from '@/components/card/department';
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

const departmentData = [
  {
    name: 'Marketing',
    link: '/tentang-genbi/upi/marketing',
    img: '/images/marketing.png',
  },
  {
    name: 'Economic',
    link: '/tentang-genbi/upi/economic',
    img: '/images/economic.png',
  },
  {
    name: 'Healthcare',
    link: '/tentang-genbi/upi/healthcare',
    img: '/images/healthcare.png',
  },
  {
    name: 'Public Relation',
    link: '/tentang-genbi/upi/public-relation',
    img: '/images/pr.png',
  },
  {
    name: 'Human Resources',
    link: '/tentang-genbi/upi/human-resources',
    img: '/images/hr.png',
  },
  {
    name: 'Education',
    link: '/tentang-genbi/upi/education',
    img: '/images/education.png',
  },
  {
    name: 'Social & Environment',
    link: '/tentang-genbi/upi/social-environment',
    img: '/images/socen.png',
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
          <h1 className='text-neutral-main text-center'>Department</h1>
          <div className='w-full flex justify-center'>
            <div className='flex flex-wrap justify-center gap-8'>
              {departmentData.map((item, i) => (
                <div key={i} className=' w-full sm:w-fit  flex justify-center'>
                  <DepartmentCard
                    name={item.name}
                    link={item.link}
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
