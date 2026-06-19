import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";


const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn, logout, backendUrl, hasPermission } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchUsers();
      fetchStats();
    }
  }, [isLoggedIn, navigate]);

  // Fetch users from manager endpoint
  const fetchUsers = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/manager/users');
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch manager statistics
  const fetchStats = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/manager/stats');
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  // Update user information
  const handleUpdateUser = async (userId) => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(
        `${backendUrl}/api/manager/user/${userId}`,
        editFormData
      );
      if (data.success) {
        toast.success('User updated successfully!');
        setEditingUserId(null);
        setEditFormData({});
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update user: ' + error.message);
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
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Welcome Card */}
        <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-4xl font-bold mb-2'>
            Welcome Manager, {userData?.name || 'Manager'}!
          </h2>
          <p className='text-purple-100 text-lg'>You have limited control over user management</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
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
          </div>
        )}

        {/* Users Table */}
        <div className='bg-gray-700 rounded-lg shadow-lg p-6'>
          <h3 className='text-2xl font-bold mb-6 text-purple-400'>User Management (View & Edit Only)</h3>

          {loading ? (
            <div className='text-center py-8'>
              <p className='text-gray-300'>Loading users...</p>
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
                              className='px-2 py-1 bg-gray-600 text-white rounded'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <input
                              type='email'
                              value={editFormData.email}
                              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                              className='px-2 py-1 bg-gray-600 text-white rounded'
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
                                className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition duration-300'
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className='px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold transition duration-300'
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
                            {hasPermission('update_users') && (
                              <button
                                onClick={() => startEdit(user)}
                                className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition duration-300'
                              >
                                Edit
                              </button>
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
        </div>

        {/* Info Box */}
        <div className='mt-8 bg-purple-900 bg-opacity-30 border border-purple-500 border-opacity-50 rounded-lg p-6'>
          <p className='text-purple-200'>
            <strong>Manager Permissions:</strong> As a manager, you can view all users and update basic information.
            You cannot delete users or change roles. For advanced operations, contact your administrator.
          </p>
        </div>

          <div className='mt-8 bg-gray-700 rounded-lg p-6'>
          <Link className='text-lg font-bold mb-4 text-red-400' to="/manager/products">
            Manage Products
          </Link>
          </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
