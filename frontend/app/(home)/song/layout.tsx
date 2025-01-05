import type { Metadata } from 'next';

import '../../globals.css';

export const metadata: Metadata = {
  title: 'Song List',
  description: 'Artist management web application',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=' '>{children}</div>;
}
