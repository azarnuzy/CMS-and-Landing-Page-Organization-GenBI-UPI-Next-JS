import React from 'react';

import { badgeColor } from '@/lib/utils/badge-color';

const BadgeTag = ({ title, size }: { title: string; size: string }) => {
  const badgeSize = (paramSize: string) => {
    switch (paramSize) {
      case 'sm':
        return 'py-0.5 px-2';
      case 'md':
        return 'py-1 px-2.5';
      case 'lg':
        return 'py-1.5 px-4';
      default:
        return 'py-1 px-2.5';
    }
  };

  return (
    <div
      className={`${badgeSize(size)} ${badgeColor(
        title || 'lorem'
      )} rounded-full whitespace-nowrap border text-xs`}
    >
      {title || 'Lorem'}
    </div>
  );
};

export default BadgeTag;
