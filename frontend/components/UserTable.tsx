'use client';

import { getUserList } from '@/lib/api-routes/user.routes';
import { getGenderLabel } from '@/utils/get.gender.label';
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
import dayjs from 'dayjs';
import { useState } from 'react';
import DeleteUserDialog from './DeleteUserDialog';
import Loader from './Loader';
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
  // page
  const [page, setPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ['get-user-list', page],
    queryFn: () => getUserList({ page, limit: 2 }),
  });

  const userList: UserType[] = data?.data?.userList?.result;
  const totalPages: number = data?.data?.userList?.totalPages;

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className='sm:w-full  lg:w-4/5 flex flex-col justify-center items-center'>
      <TableContainer component={Paper}>
        <Typography
          variant='h6'
          component='div'
          sx={{ marginBottom: 2, ml: '1rem' }}
        >
          User List
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>S.N.</TableCell>
              <TableCell align='center'> Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>DOB</TableCell>
              <TableCell align='center'>Gender</TableCell>
              <TableCell align='center'>Role</TableCell>
              <TableCell align='center'>Phone</TableCell>

              <TableCell align='center'>Address</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell
                  align='center'
                  sx={{ textTransform: 'capitalize' }}
                >{`${item.firstName} ${item.lastName}`}</TableCell>
                <TableCell align='center'>{item.email}</TableCell>
                <TableCell align='center'>
                  {dayjs(item.dob).format('YYYY-DD-MM')}
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

                    <Tooltip title='Edit'>
                      <EditNoteOutlinedIcon className='text-green-500 cursor-pointer' />
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

export default UserTable;
