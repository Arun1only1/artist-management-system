import RegisterForm from '@/components/RegisterForm';
import React from 'react';

const AddUser = () => {
  return (
    <div className=''>
      <RegisterForm name='Add User' action='addUser' />
    </div>
  );
};

export default AddUser;
