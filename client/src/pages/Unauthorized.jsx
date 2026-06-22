import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-red-500 mb-4'>403</h1>
        <h2 className='text-3xl font-bold mb-4'>Access Denied</h2>
        <p className='text-gray-400 text-lg mb-8'>
          You don&apos;t have permission to access this resource.
          <br />
          Please contact an administrator if you believe this is a mistake.
        </p>
        
        <div className='flex gap-4'>
          <button
            onClick={() => navigate('/dashboard')}
            className='px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300'
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition duration-300'
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;