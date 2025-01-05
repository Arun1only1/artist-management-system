'use client';

import ROUTES from '@/constant/route.constants';
import { getSongList } from '@/lib/api-routes/song/song.routes';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { Pagination, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteSongDialog from './DeleteSongDialog';
import Loader from './Loader/Loader';

export interface SongProps {
  id: string;
  title: string;
  albumName: string;
  genre: string;
}

const SongTable = ({ artistId }: { artistId?: string }) => {
  // router
  const router = useRouter();
  // page
  const [page, setPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ['get-song-list', page],
    queryFn: () => {
      return getSongList({ page, limit: 10, artistId });
    },
    // TODO:error handle
  });

  console.log(data);
  const songList: SongProps[] = data?.data?.songList?.result;
  const totalPages: number = data?.data?.songList?.totalPages;

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
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songList.map((item, index) => (
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
                <TableCell align='center'>
                  <div className='flex justify-center items-center'>
                    <DeleteSongDialog songId={item.id} />
                    <Tooltip title='Edit'>
                      <EditNoteOutlinedIcon
                        className='text-green-500 cursor-pointer'
                        onClick={() => {
                          router.push(`${ROUTES.EDIT_USER}/${item.id}`);
                        }}
                      />
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        count={totalPages}
        color='secondary'
        className='my-12'
        onChange={(_, pageNumber) => {
          setPage(pageNumber);
        }}
      />
    </div>
  );
};

export default SongTable;
