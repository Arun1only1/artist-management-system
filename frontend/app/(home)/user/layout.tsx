import type { Metadata } from 'next';

import '../../globals.css';
export const metadata: Metadata = {
  title: 'Artist Management',
  description: 'Artist management web application',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex  justify-center items-center  h-5/6'>{children}</div>
  );
}
