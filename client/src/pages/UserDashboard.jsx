import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn, loading, logout } = useContext(AppContext);

  useEffect(() => {
    // Wait for auth state to finish resolving before redirecting,
    // otherwise a logged-in user gets bounced to /login on every refresh.
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [loading, isLoggedIn, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Auth state still resolving — show a neutral loading screen instead of
  // briefly redirecting a valid, logged-in user to /login.
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-indigo-400' />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      {/* Header */}
      <div className='bg-gray-800 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-lg'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-indigo-400'>User Dashboard</h1>

          <div>
            <button
              className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300 mx-1'
              onClick={() => navigate('/')}
            >Home</button>
            <button
              onClick={handleLogout}
              className='px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300 mx-1'
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className='max-w-6xl mx-auto px-6 py-12'
      >
        {/* Welcome Card */}
        <motion.div
          variants={fadeUp}
          className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8'
        >
          <h2 className='text-4xl font-bold mb-2'>
            Welcome, {userData?.name || 'User'}!
          </h2>
          <p className='text-indigo-100 text-lg'>You are logged in as a <span className='font-semibold uppercase'>{userData?.role || 'user'}</span></p>
        </motion.div>

        {/* Profile Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6'>
            <h3 className='text-2xl font-bold mb-4 text-indigo-400'>Profile Information</h3>
            <div className='space-y-4'>
              <div>
                <p className='text-gray-400 text-sm uppercase tracking-wide'>Name</p>
                <p className='text-white text-lg font-semibold'>{userData?.name || 'N/A'}</p>
              </div>
              <div>
                <p className='text-gray-400 text-sm uppercase tracking-wide'>Email</p>
                <p className='text-white text-lg font-semibold'>{userData?.email || 'N/A'}</p>
              </div>
              <div>
                <p className='text-gray-400 text-sm uppercase tracking-wide'>Role</p>
                <p className='text-indigo-300 text-lg font-semibold uppercase'>{userData?.role || 'N/A'}</p>
              </div>
              <div>
                <p className='text-gray-400 text-sm uppercase tracking-wide'>Account Status</p>
                <p className={`text-lg font-semibold ${userData?.isAccountVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {userData?.isAccountVerified ? '✓ Verified' : '⚠ Not Verified'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6'>
            <h3 className='text-2xl font-bold mb-4 text-indigo-400'>Quick Actions</h3>
            <div className='space-y-3'>
              <button
                onClick={() => navigate('/profile')}
                className='w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300'
              >
                View Profile
              </button>
              <button
                onClick={() => navigate('/profile')}
                className='w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300'
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/profile')}
                className='w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300'
              >
                Account Settings
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6 mb-8'>
          <h3 className='text-2xl font-bold mb-6 text-indigo-400'>Available Features</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-gray-800 p-4 rounded-lg text-center'>
              <p className='text-2xl mb-2'>👤</p>
              <h4 className='text-lg font-semibold mb-2'>View Profile</h4>
              <p className='text-gray-300 text-sm'>Access and manage your profile information</p>
            </div>
            <div className='bg-gray-800 p-4 rounded-lg text-center'>
              <p className='text-2xl mb-2'>🔐</p>
              <h4 className='text-lg font-semibold mb-2'>Security</h4>
              <p className='text-gray-300 text-sm'>Manage your password and security settings</p>
            </div>
            <div className='bg-gray-800 p-4 rounded-lg text-center'>
              <p className='text-2xl mb-2'>⚙️</p>
              <h4 className='text-lg font-semibold mb-2'>Settings</h4>
              <p className='text-gray-300 text-sm'>Customize your account preferences</p>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div variants={fadeUp} className='bg-blue-900 bg-opacity-30 border border-blue-500 border-opacity-50 rounded-lg p-6'>
          <p className='text-blue-200'>
            <strong>Note:</strong> This is a standard user dashboard. You can view your profile information and manage your account settings. Contact an administrator if you need elevated permissions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;