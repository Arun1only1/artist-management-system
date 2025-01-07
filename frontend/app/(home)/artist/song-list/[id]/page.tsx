import ArtistSongs from '@/components/ArtistSongs';
import React from 'react';

const ArtistSongList = () => {
  return (
    <div className='flex flex-col justify-start items-center mt-15 '>
      <ArtistSongs />
    </div>
  );
};

export default ArtistSongList;
