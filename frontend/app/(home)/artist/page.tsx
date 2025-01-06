import ArtistTable from '@/components/ArtistTable';
import React from 'react';

const ArtistList = () => {
  return (
    <div className='flex flex-col justify-start items-center gap-8 '>
      <ArtistTable />
    </div>
  );
};

export default ArtistList;
