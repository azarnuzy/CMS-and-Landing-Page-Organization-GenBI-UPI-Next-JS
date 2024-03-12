import React, { FC, ReactElement } from 'react';
type TBaseLayout = {
  children: ReactElement;
};
const BaseLayout: FC<TBaseLayout> = ({ children }): ReactElement => {
  return (
    <div className='w-full px-5 sm:px-6 md:px-8 lg:px-16'>
      <div className='max-w-[1440px] mx-auto'>
        <>{children}</>
      </div>
    </div>
  );
};

export const WideBaseLayout: FC<TBaseLayout> = ({ children }): ReactElement => {
  return (
    <div className='w-full px-5 sm:px-6 md:px-8 lg:px-16'>
      <div className='max-w-[1920px] mx-auto'>
        <>{children}</>
      </div>
    </div>
  );
};

export default BaseLayout;
