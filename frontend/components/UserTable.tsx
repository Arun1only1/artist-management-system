'use client';

import { getUserList } from '@/lib/api-routes/user/user.routes';
import { getGenderLabel } from '@/utils/get.gender.label';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { IconButton, Pagination, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import DeleteUserDialog from './DeleteUserDialog';
import Loader from './Loader/Loader';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constant/route.constants';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_LIMIT,
} from '@/constant/general.constant';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  role: string;
  gender: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const UserTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { isPending, data, isError } = useQuery({
    queryKey: ['get-user-list', page],
    queryFn: () => getUserList({ page, limit: DEFAULT_LIMIT }),
  });

  const userList: UserType[] = data?.data?.userList?.result;
  const totalPages: number = data?.data?.userList?.totalPages;

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, pageNumber: number) => {
      setPage(pageNumber);
    },
    []
  );

  if (isPending) {
    return <Loader />;
  }

  if (isError || !userList) {
    return (
      <Typography variant='h6'>
        Error fetching users. Please try again later.
      </Typography>
    );
  }

  return (
    <div className='sm:w-full lg:w-4/5 flex flex-col justify-center items-center'>
      <TableContainer component={Paper}>
        <Typography
          variant='h6'
          component='div'
          sx={{ marginBottom: 2, ml: '1rem' }}
        >
          User List
        </Typography>
        <Table className='w-full'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                S.N.
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Name
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Email
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                DOB
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Gender
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Role
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Phone
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Address
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
                }}
              >
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
                  {`${item.firstName} ${item.lastName}`}
                </TableCell>
                <TableCell align='center'>{item.email}</TableCell>
                <TableCell align='center'>
                  {dayjs(item.dob).format(DEFAULT_DATE_FORMAT)}
                </TableCell>
                <TableCell align='center'>
                  {getGenderLabel(item.gender)}
                </TableCell>
                <TableCell align='center'>{item.role}</TableCell>
                <TableCell align='center'>{item.phone}</TableCell>
                <TableCell align='center'>{item.address}</TableCell>
                <TableCell align='center'>
                  <div className='flex justify-around items-center'>
                    <DeleteUserDialog userId={item.id} />
                    <Tooltip title='Edit User'>
                      <IconButton
                        color='success'
                        onClick={() =>
                          router.push(`${ROUTES.EDIT_USER}/${item.id}`)
                        }
                      >
                        <EditNoteOutlinedIcon />
                      </IconButton>
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
        onChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
