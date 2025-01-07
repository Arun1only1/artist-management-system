'use client';
import { DEFAULT_LIMIT } from '@/constant/general.constant';
import { getSongList } from '@/lib/api-routes/song/song.routes';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Loader from './Loader/Loader';
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { SongProps } from './SongTable';

const ArtistSongs = () => {
  const [page, setPage] = useState(1);
  const params = useParams();

  const artistId = params?.id;

  const { data, isPending } = useQuery({
    queryKey: ['artist-song-list'],
    queryFn: async () => {
      return await getSongList({
        page: 1,
        limit: DEFAULT_LIMIT,
        artistId: artistId as string,
      });
    },
  });

  const songList: SongProps[] = data?.data?.songList?.result;
  const totalPage = data?.data?.totalPage;

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className='w-screen  lg:w-4/5 flex flex-col justify-center items-center '>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3 }}
        className='overflow-x-auto w-full'
      >
        <Typography
          variant='h6'
          component='div'
          sx={{ marginBottom: 2, ml: '1rem' }}
        >
          Song List
        </Typography>
        <Table className='w-full min-w-[600px]'>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                S.N.
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Title
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Album Name
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Genre
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songList?.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f1f1f1' },
                }}
              >
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.title}
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.albumName}
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.genre}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        count={totalPage}
        color='secondary'
        className='my-12'
        onChange={(_, pageNumber) => {
          setPage(pageNumber);
        }}
      />
    </div>
  );
};

export default ArtistSongs;
