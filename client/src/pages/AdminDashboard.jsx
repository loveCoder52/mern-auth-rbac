import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn, loading: authLoading, logout, backendUrl } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [statsError, setStatsError] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(null);

  // Fetch all users from backend
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/admin/users');
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || 'Failed to fetch users.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoadingUsers(false);
    }
  }, [backendUrl]);

  // Fetch admin statistics
  const fetchStats = useCallback(async () => {
    setStatsError(false);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/admin/stats');
      if (data.success) {
        setStats(data.stats);
      } else {
        setStatsError(true);
      }
    } catch (error) {
      setStatsError(true);
      console.error('Failed to fetch stats:', error);
    }
  }, [backendUrl]);

  useEffect(() => {
    // Wait for auth state to finish resolving before redirecting,
    // otherwise a logged-in admin gets bounced to /login on every refresh.
    if (!authLoading) {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        fetchUsers();
        fetchStats();
      }
    }
  }, [authLoading, isLoggedIn, navigate, fetchUsers, fetchStats]);

  // Delete user function
  const handleDeleteUser = async (userId, userName) => {
    if (userId === userData?._id) {
      toast.error("You cannot delete your own account!");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(
          backendUrl + `/api/admin/user/${userId}`
        );
        if (data.success) {
          toast.success('User deleted successfully!');
          fetchUsers();
          fetchStats();
        } else {
          toast.error(data.message || 'Failed to delete user.');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user. Please try again.');
      }
    }
  };

  // Update user role
  const handleUpdateRole = async (userId, newRole) => {
    setUpdatingRole(userId);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(
        backendUrl + `/api/admin/user/${userId}/role`,
        { newRole }
      );
      if (data.success) {
        toast.success(`User role updated to ${newRole}!`);
        fetchUsers();
        fetchStats();
      } else {
        toast.error(data.message || 'Failed to update role.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role. Please try again.');
    } finally {
      setUpdatingRole(null);
    }
  };

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

  if (authLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-red-400' />
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
        <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-red-400'>⚙️ Admin Dashboard</h1>

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
        className='max-w-7xl mx-auto px-6 py-12'
      >
        {/* Welcome Card */}
        <motion.div variants={fadeUp} className='bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-4xl font-bold mb-2'>
            Welcome Admin, {userData?.name || 'Admin'}!
          </h2>
          <p className='text-red-100 text-lg'>You have full control over the system</p>
        </motion.div>

        {/* Statistics Cards */}
        {statsError ? (
          <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6 mb-12 text-center'>
            <p className='text-gray-300 mb-3'>Couldn&apos;t load statistics.</p>
            <button
              onClick={fetchStats}
              className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition duration-300'
            >
              Retry
            </button>
          </motion.div>
        ) : stats && (
          <motion.div variants={fadeUp} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6'>
              <p className='text-blue-200 text-sm uppercase tracking-wide mb-2'>Total Users</p>
              <p className='text-4xl font-bold text-white'>{stats.totalUsers}</p>
            </div>
            <div className='bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg p-6'>
              <p className='text-green-200 text-sm uppercase tracking-wide mb-2'>Regular Users</p>
              <p className='text-4xl font-bold text-white'>{stats.userCount}</p>
            </div>
            <div className='bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg p-6'>
              <p className='text-red-200 text-sm uppercase tracking-wide mb-2'>Admin Users</p>
              <p className='text-4xl font-bold text-white'>{stats.adminCount}</p>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6'>
          <h3 className='text-2xl font-bold mb-6 text-red-400'>User Management</h3>

          {loadingUsers ? (
            <div className='flex justify-center py-8'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-red-400' />
            </div>
          ) : users.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-300'>No users found</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='border-b border-gray-600'>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Name</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Email</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Current Role</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Status</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className='border-b border-gray-600 hover:bg-gray-600 transition duration-200'>
                      <td className='px-4 py-3'>{user.name}</td>
                      <td className='px-4 py-3'>{user.email}</td>
                      <td className='px-4 py-3'>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin'
                          ? 'bg-red-600 text-red-100'
                          : 'bg-blue-600 text-blue-100'
                          }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.isAccountVerified
                          ? 'bg-green-600 text-green-100'
                          : 'bg-yellow-600 text-yellow-100'
                          }`}>
                          {user.isAccountVerified ? '✓ Verified' : '⚠ Unverified'}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleUpdateRole(
                              user._id,
                              user.role === 'admin' ? 'user' : 'admin'
                            )}
                            disabled={updatingRole === user._id}
                            aria-label={user.role === 'admin' ? `Demote ${user.name} to user` : `Promote ${user.name} to admin`}
                            className='px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition duration-300 disabled:opacity-50'
                          >
                            {updatingRole === user._id ? 'Updating...' : (user.role === 'admin' ? 'Demote' : 'Promote')}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            disabled={userData?._id === user._id}
                            aria-label={`Delete ${user.name}`}
                            className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Stats Info */}
        <motion.div variants={fadeUp} className='mt-8 bg-gray-700 rounded-lg p-6'>
          <h3 className='text-lg font-bold mb-4 text-red-400'>Admin Tools Overview</h3>
          <ul className='space-y-2 text-gray-300'>
            <li>✓ View all registered users in the system</li>
            <li>✓ Promote users to admin role or demote admins to user role</li>
            <li>✓ Delete user accounts as needed</li>
            <li>✓ View user verification status</li>
            <li>✓ Access real-time statistics and analytics</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className='mt-8 bg-gray-700 rounded-lg p-6'>
          <Link className='text-lg font-bold text-red-400 hover:text-red-300 transition-colors' to="/admin/products">
            Manage Products →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;