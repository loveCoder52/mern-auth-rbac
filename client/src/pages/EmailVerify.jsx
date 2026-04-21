import React, { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

function EmailVerify() {

  axios.defaults.withCredentials = true;
  
  const { backendUrl, isLoggedIn, getUserData, userData } = useContext(AppContext);
  const navigate = useNavigate();
  
  const inputrefs = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
    if (e.target.value.length === 0 && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    pasteData.forEach((value, index) => {
      if (index < inputrefs.current.length) {
        inputrefs.current[index].value = value;
      }
    });
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
    const otpArray = inputrefs.current.map(e => e.value);
    const otp = otpArray.join('');
    console.log('Entered OTP:', otp);

    const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
    if (data.success) {
      toast.success('Email verified successfully!');
      getUserData();
      navigate('/');
    } else {
      toast.error(data.message || 'OTP verification failed. Please try again.');
    }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedIn, userData]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg text-sm w-96 text-center text-white' onPaste={handlePaste}>

        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-indigo-300 mb-6'>Please enter the OTP sent to your email address to verify your account.</p>

        <div className='flex justify-between mb-8'>
          {Array(6).fill(0).map((_, index) => {
            return <input type="text" maxLength="1" required className='w-12 h-12 text-center border border-gray-600 bg-slate-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
              ref={e => inputrefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
            />;
          })}
        </div>
        <button type="submit" className='bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
