import RegisterForm from '@/components/RegisterForm';
import React from 'react';

const AddUser = () => {
  return (
    <div className='div-center my-12'>
      <RegisterForm name='Add User' action='addUser' />
    </div>
  );
};

export default AddUser;
