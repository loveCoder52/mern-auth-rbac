import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  const sentVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');

        if(data.success){
          navigate('/email-verify');
          toast.success(data.message || 'OTP sent to your email. Please verify.') ;
        } else {
          toast.error(data.message || 'Failed to send OTP. Please try again.');
        }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedIn(false);
      setUserData(null);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='w-full flex justify-between items-center py-4 px-10 absolute top-0 bg-gray-800 text-white'>

      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />

      {userData ? 
      <div className='bg-white rounded-full w-9 h-9 text-center flex cursor-pointer items-center justify-center text-black relative group'>
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-10'>
          <ul className='bg-gray-800 text-white rounded py-2 px-2 w-40 text-sm'>
            {!userData.isAccountVerified && <li  className='hover:bg-white hover:text-black py-1 px-2 cursor-pointer pr-10' onClick={sentVerificationOtp}>Verify Email</li>}
            
            <li  className='hover:bg-white hover:text-black py-1 px-2 cursor-pointer pr-10' onClick={logout}>Logout</li>
          </ul>
        </div>
      </div> : 
      <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon} alt="login" /></button>}


    </div>
  );
}

export default Navbar;
