import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPassword() {

  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpValue = inputrefs.current.map(ref => ref?.value || '').join('');
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp: otpValue, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  }
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      {/* email input form */}
      {!isEmailVerified && !isOtpSent && (<form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg text-sm w-96 text-center text-white'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-indigo-300 mb-6'>Enter your registered email address</p>

        <div className='flex items-center justify-around p-4'>
          <img src={assets.mail_icon} alt="" className='pr-4' />
            <input
              aria-label="Business contact input"
              placeholder="Enter your business email"
              class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <button
          type="submit"
          class="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span class="absolute bottom-0 left-0 h-full -ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-auto h-full opacity-100 object-stretch"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
              ></path>
            </svg>
          </span>
          <span class="absolute top-0 right-0 w-12 h-full -mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="object-cover w-full h-full"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
              ></path>
            </svg>
          </span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
          ></span>
          <span class="relative text-base font-semibold">Submit !</span>
        </button>
      </form>)}

      

      {/* otp reset form */}
      {isOtpSent && (
        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg text-sm w-96 text-center text-white mt-8' onPaste={handlePaste}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
          <p className='text-indigo-300 mb-6'>Please enter the OTP sent to your email address and your new password.</p>

          <div className='flex justify-between mb-8'>
            {Array(6).fill(0).map((_, index) => {
              return <input type="text" maxLength="1" required className='w-12 h-12 text-center border border-gray-600 bg-slate-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
                ref={e => inputrefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
              />;
            })}
          </div>
          <input
            type="password"
            placeholder="Enter new password"
            className='w-full px-4 py-2 mb-4 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className='bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Reset Password
          </button>
        </form>
      )}



    </div>
  );
}

export default ResetPassword;

