import React from 'react';

interface Member {
  name?: string;
  position?: string;
  instagram?: string;
  linkedin?: string;
}

const member = ({ name, position, instagram, linkedin }: Member) => {
  return (
    <div className='w-[232px] h-[250px] relative rounded-[14px]'>
      {name}
      {position}
      {instagram}
      {linkedin}{' '}
    </div>
  );
};

export default member;
