import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import ReduxToolkitProvider from '@/providers/ReduxToolkitProvider';

import CustomSnackbar from '@/components/CustomSnackbar';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Artist Management',
  description: 'Artist management web application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxToolkitProvider>
          <ReactQueryClientProvider>
            <CustomSnackbar />
            {children}
          </ReactQueryClientProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}
