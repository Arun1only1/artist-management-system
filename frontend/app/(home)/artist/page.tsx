'use client';
import ArtistTable from '@/components/ArtistTable';
import ROUTES from '@/constant/route.constants';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const ArtistList = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-start items-center gap-8 '>
      <Button
        color='success'
        variant='contained'
        onClick={() => {
          router.push(ROUTES.ADD_ARTIST);
        }}
      >
        Add Artist
      </Button>
      <ArtistTable />
    </div>
  );
};

export default ArtistList;
