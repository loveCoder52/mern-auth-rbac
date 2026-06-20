import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading, logout, backendUrl, hasPermission } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Wait for auth state to finish resolving before redirecting,
    // otherwise a logged-in manager gets bounced to /login on every refresh.
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        fetchUsers();
        fetchStats();
      }
    }
  }, [isLoading, isLoggedIn, navigate]);

  // Fetch users from manager endpoint
  const fetchUsers = async () => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/manager/users');
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || 'Failed to fetch users.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch manager statistics
  const fetchStats = async () => {
    setStatsError(false);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/manager/stats');
      if (data.success) {
        setStats(data.stats);
      } else {
        setStatsError(true);
      }
    } catch (error) {
      setStatsError(true);
      console.error('Failed to fetch stats:', error);
    }
  };

  // Update user information
  const handleUpdateUser = async (userId) => {
    const name = editFormData.name?.trim();
    const email = editFormData.email?.trim();

    if (!name || !email) {
      toast.error('Name and email cannot be empty.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSaving(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(
        `${backendUrl}/api/manager/user/${userId}`,
        { name, email }
      );
      if (data.success) {
        toast.success('User updated successfully!');
        setEditingUserId(null);
        setEditFormData({});
        fetchUsers();
      } else {
        toast.error(data.message || 'Failed to update user.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ name: user.name, email: user.email });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({});
  };

  const handleEditKeyDown = (e, userId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdateUser(userId);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-purple-400' />
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
          <h1 className='text-2xl font-bold text-purple-400'>👔 Manager Dashboard</h1>
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
        <motion.div variants={fadeUp} className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-4xl font-bold mb-2'>
            Welcome Manager, {userData?.name || 'Manager'}!
          </h2>
          <p className='text-purple-100 text-lg'>You have limited control over user management</p>
        </motion.div>

        {/* Statistics Cards */}
        {statsError ? (
          <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6 mb-12 text-center'>
            <p className='text-gray-300 mb-3'>Couldn't load statistics.</p>
            <button
              onClick={fetchStats}
              className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition duration-300'
            >
              Retry
            </button>
          </motion.div>
        ) : stats && (
          <motion.div variants={fadeUp} className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
            <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6'>
              <p className='text-blue-200 text-sm uppercase tracking-wide mb-2'>Total Users</p>
              <p className='text-4xl font-bold text-white'>{stats.totalUsers}</p>
            </div>
            <div className='bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg p-6'>
              <p className='text-green-200 text-sm uppercase tracking-wide mb-2'>Regular Users</p>
              <p className='text-4xl font-bold text-white'>{stats.userCount}</p>
            </div>
            <div className='bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg p-6'>
              <p className='text-purple-200 text-sm uppercase tracking-wide mb-2'>Managers</p>
              <p className='text-4xl font-bold text-white'>{stats.managerCount}</p>
            </div>
            <div className='bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg p-6'>
              <p className='text-red-200 text-sm uppercase tracking-wide mb-2'>Admins</p>
              <p className='text-4xl font-bold text-white'>{stats.adminCount}</p>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div variants={fadeUp} className='bg-gray-700 rounded-lg shadow-lg p-6'>
          <h3 className='text-2xl font-bold mb-6 text-purple-400'>User Management (View & Edit Only)</h3>

          {loading ? (
            <div className='flex justify-center py-8'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-400' />
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
                    <th className='px-4 py-3 font-semibold text-gray-300'>Role</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Status</th>
                    <th className='px-4 py-3 font-semibold text-gray-300'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className='border-b border-gray-600 hover:bg-gray-600 transition duration-200'>
                      {editingUserId === user._id ? (
                        <>
                          <td className='px-4 py-3'>
                            <input
                              type='text'
                              value={editFormData.name}
                              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                              onKeyDown={(e) => handleEditKeyDown(e, user._id)}
                              autoFocus
                              className='px-2 py-1 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-400'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <input
                              type='email'
                              value={editFormData.email}
                              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                              onKeyDown={(e) => handleEditKeyDown(e, user._id)}
                              className='px-2 py-1 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-400'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin'
                                ? 'bg-red-600 text-red-100'
                                : user.role === 'manager'
                                  ? 'bg-purple-600 text-purple-100'
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
                                onClick={() => handleUpdateUser(user._id)}
                                disabled={saving}
                                className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition duration-300 disabled:opacity-50'
                              >
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={saving}
                                className='px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold transition duration-300 disabled:opacity-50'
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className='px-4 py-3'>{user.name}</td>
                          <td className='px-4 py-3'>{user.email}</td>
                          <td className='px-4 py-3'>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin'
                                ? 'bg-red-600 text-red-100'
                                : user.role === 'manager'
                                  ? 'bg-purple-600 text-purple-100'
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
                            {hasPermission('update_users') ? (
                              <button
                                onClick={() => startEdit(user)}
                                className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition duration-300'
                              >
                                Edit
                              </button>
                            ) : (
                              <span className='text-gray-500 text-sm'>—</span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div variants={fadeUp} className='mt-8 bg-purple-900 bg-opacity-30 border border-purple-500 border-opacity-50 rounded-lg p-6'>
          <p className='text-purple-200'>
            <strong>Manager Permissions:</strong> As a manager, you can view all users and update basic information.
            You cannot delete users or change roles. For advanced operations, contact your administrator.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className='mt-8 bg-gray-700 rounded-lg p-6'>
          <Link className='text-lg font-bold text-purple-400 hover:text-purple-300 transition-colors' to="/manager/products">
            Manage Products →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;