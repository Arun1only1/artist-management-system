'use client';
import UserTable from '@/components/UserTable';
import ROUTES from '@/constant/route.constants';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center gap-8 '>
      <Button
        variant='contained'
        color='success'
        onClick={() => {
          router.push(ROUTES.ADD_USER);
        }}
      >
        Add User
      </Button>

      <UserTable />
    </div>
  );
};

export default Dashboard;
