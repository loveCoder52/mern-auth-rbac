import React from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Header() {

  const {userData} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center justify-center text-center text-gray-800 gap-4 py-10'>

      <img src={assets.header_img} alt="header-img" className='w-36 h-36 rounded-full mb-6' />

      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData?.name || 'Developer'}! <img src={assets.hand_wave} alt="" className='w-8 aspect-square' /></h1>

      <h2 className='text-5xl  font-semibold'>Welcome to our app!</h2>

      <p className='text-gray-600'>We're excited to have you here!</p>

      <button className='hover:bg-gray-100 border border-gray-500 font-bold py-2 px-8 rounded-full transition-all cursor-pointer'>Get Started</button>

    </div>
  );
}

export default Header;
