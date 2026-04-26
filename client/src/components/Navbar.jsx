import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn, logout, userRole } = useContext(AppContext);

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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  const handleDashboardClick = () => {
    // Navigate to appropriate dashboard based on role
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userRole === 'manager') {
      navigate('/manager/dashboard');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className='w-full flex justify-between items-center py-4 px-10 absolute top-0 bg-gray-800 text-white'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='w-28 sm:w-32 cursor-pointer' />

      {userData ? 
      <div className='flex items-center gap-4'>
        {/* Dashboard Link - Role Based */}
        <button
          onClick={handleDashboardClick}
          className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
            userRole === 'admin'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : userRole === 'manager'
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {userRole === 'admin' ? '⚙️ Admin Panel' : userRole === 'manager' ? '👔 Manager Panel' : '📊 Dashboard'}
        </button>

        {/* User Profile Dropdown */}
        <div className='bg-white rounded-full w-9 h-9 text-center flex cursor-pointer items-center justify-center text-black relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-10'>
            <ul className='bg-gray-800 text-white rounded py-2 px-2 w-48 text-sm'>
              <li className='py-1 px-2 text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2'>
                {userData.name} ({userRole})
              </li>
              <li className='border-t border-gray-600 pt-2 py-1 px-2 text-gray-400 text-xs'>Profile</li>
              {!userData.isAccountVerified && (
                <li className='hover:bg-white hover:text-black py-1 px-2 cursor-pointer' onClick={sentVerificationOtp}>
                  Verify Email
                </li>
              )}
              <li className='border-t border-gray-600 pt-2 py-1 px-2 text-gray-400 text-xs'>Account</li>
              <li className='hover:bg-white hover:text-black py-1 px-2 cursor-pointer' onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div> : 
      <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon} alt="login" /></button>}

    </div>
  );
}

export default Navbar;
