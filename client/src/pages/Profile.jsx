import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, loading: authLoading, getUserData } = useContext(AppContext);

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [authLoading, isLoggedIn, navigate]);

  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/user/profile');
      if (data.success) {
        setProfile(data.userData);
        setName(data.userData.name || '');
        setEmail(data.userData.email || '');
      } else {
        toast.error(data.message || 'Failed to load profile.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load profile.');
    } finally {
      setLoadingProfile(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      fetchProfile();
    }
  }, [authLoading, isLoggedIn, fetchProfile]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (savingProfile) return;

    if (!name.trim() || !email.trim()) {
      toast.error('Name and email cannot be empty.');
      return;
    }

    setSavingProfile(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(backendUrl + '/api/user/profile', { name, email });
      if (data.success) {
        toast.success('Profile updated successfully!');
        fetchProfile();
        getUserData();
      } else {
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (changingPassword) return;

    if (!currentPassword || !newPassword) {
      toast.error('Both current and new password are required.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }

    setChangingPassword(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/user/change-password', {
        currentPassword,
        newPassword,
      });
      if (data.success) {
        toast.success('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        toast.error(data.message || 'Failed to change password.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (authLoading) {
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
      <div className='bg-gray-800 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-lg'>
        <div className='max-w-3xl mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-indigo-400'>My Profile</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300'
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className='max-w-3xl mx-auto px-6 py-12 space-y-8'
      >
        {/* Profile Info */}
        <div className='bg-gray-700 rounded-lg shadow-lg p-6'>
          <h3 className='text-xl font-bold mb-4 text-indigo-400'>Profile Information</h3>

          {loadingProfile ? (
            <div className='flex justify-center py-6'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-indigo-400' />
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className='space-y-4'>
              <div>
                <label className='text-gray-400 text-sm uppercase tracking-wide block mb-1'>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>
              <div>
                <label className='text-gray-400 text-sm uppercase tracking-wide block mb-1'>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>
              <div>
                <p className='text-gray-400 text-sm uppercase tracking-wide mb-1'>Account Status</p>
                <p className={`font-semibold ${profile?.isAccountVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {profile?.isAccountVerified ? '✓ Verified' : '⚠ Not Verified'}
                </p>
              </div>
              <button
                type="submit"
                disabled={savingProfile}
                className='px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition duration-300'
              >
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>

        {/* Change Password */}
        <div className='bg-gray-700 rounded-lg shadow-lg p-6'>
          <h3 className='text-xl font-bold mb-4 text-purple-400'>Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <div>
              <label className='text-gray-400 text-sm uppercase tracking-wide block mb-1'>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className='w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
            <div>
              <label className='text-gray-400 text-sm uppercase tracking-wide block mb-1'>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className='w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
            <button
              type="submit"
              disabled={changingPassword}
              className='px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition duration-300'
            >
              {changingPassword ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;