'use client';
import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64`}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <h2 className='text-lg font-semibold'>Sidebar</h2>
          <button
            onClick={toggleSidebar}
            className='text-gray-400 hover:text-white'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
          </button>
        </div>
        <nav className='p-4'>
          <ul>
            <li className='mb-2'>
              <Link href='/'>Home</Link>
            </li>
            <li className='mb-2'>
              <Link href='/about'>About</Link>
            </li>
            <li className='mb-2'>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 min-h-screen bg-gray-100'>
        <header className='flex items-center justify-between p-4 bg-gray-800 text-white'>
          <button
            onClick={toggleSidebar}
            className='text-gray-400 hover:text-white lg:hidden'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          </button>
          <h1 className='text-lg font-semibold'>My App</h1>
        </header>
        <main className='p-4'>{/* Your main content goes here */}</main>
      </div>
    </div>
  );
};

export default Sidebar;
