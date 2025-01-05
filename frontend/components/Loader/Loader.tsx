import React from 'react';
import './Loader.css'; // Create a separate CSS file for animations

const Loader = () => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-50 fade-in-out'
      aria-label='Loading'
    >
      <div className='flex flex-col items-center space-y-4'>
        {/* Outer rotating circle */}
        <div className='relative w-20 h-20 animate-spin-slow'>
          <div className='absolute inset-0 rounded-full border-4 border-orange-500 border-opacity-30'></div>
          <div className='absolute inset-0 rounded-full border-t-4 border-orange-500'></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
