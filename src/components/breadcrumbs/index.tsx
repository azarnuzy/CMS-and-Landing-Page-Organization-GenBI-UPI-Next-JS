import Link from 'next/link';
import { FC, Fragment, ReactElement } from 'react';
// import { TBreadCrumbProps } from './types';
import { MdChevronRight } from 'react-icons/md';
import { RiHome6Line } from 'react-icons/ri';

import { cn } from '@/lib/utils';

export type TCrumbItem = {
  link: string;
  name: string;
};

export type TBreadCrumbProps = {
  textColor?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  items: TCrumbItem[];
  className?: string;
};

export const BreadCrumb: FC<TBreadCrumbProps> = ({
  items,
  textColor = 'text-primary-500',
  bgColor = 'bg-light',
  style,
  className,
}): ReactElement => {
  return (
    <div
      className={cn(
        `place-content-start w-full text-xs md:text-sm py-4 !font-extrabold  ${bgColor}`,
        className
      )}
      aria-label='Breadcrumb'
      style={style}
    >
      <div className=' grid'>
        <ol className='flex w-full items-center gap-x-2 flex-wrap'>
          {items.map((crumb, index) => {
            const isLastItem = index === items.length - 1;
            if (!isLastItem) {
              return (
                <Fragment key={index}>
                  <Link
                    href={crumb.link}
                    key={index}
                    className={`inline-flex  font-[600] items-center ${textColor}`}
                    scroll={true}
                  >
                    {crumb.name.includes('Home') ? (
                      // <Image
                      //   src='/svg/home.svg'
                      //   width={16}
                      //   height={16}
                      //   alt='home'
                      // />
                      <RiHome6Line className={`text-lg ${textColor}`} />
                    ) : (
                      crumb.name
                    )}
                  </Link>
                  <MdChevronRight className={`text-xl ${textColor}`} />
                </Fragment>
              );
            } else {
              return (
                <Link key={index} href={crumb.link}>
                  <span className='text-primary-200 font-[600] cursor-pointer'>
                    {crumb.name}
                  </span>
                </Link>
              );
            }
          })}
        </ol>
      </div>
    </div>
  );
};
