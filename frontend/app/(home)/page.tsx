'use client';
import UserTable from '@/components/UserTable';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 '>
      <Button
        variant='contained'
        color='success'
        onClick={() => {
          redirect('/add-user');
        }}
      >
        Add User
      </Button>

      <UserTable />
    </div>
  );
};

export default Dashboard;
