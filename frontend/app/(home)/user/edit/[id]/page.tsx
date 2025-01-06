import { Metadata } from 'next';

import EditUserForm from '@/components/EditUserForm';

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Artist management edit user page',
};

// edit user
const EditUser = () => <EditUserForm />;

export default EditUser;
