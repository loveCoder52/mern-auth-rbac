/**
 * User Service
 * Contains business logic for user-related operations
 */

import userModel from '../model/userModel.js';
import { ROLE_PERMISSIONS, getUserPermissions } from '../config/rolePermission.js';

// Get user with calculated permissions
export const getUserWithPermissions = async (userId) => {
    const user = await userModel.findById(userId).select('-password');
    if (!user) return null;

    const allPermissions = getUserPermissions(user.role, user.customPermissions);
    return {
        ...user.toObject(),
        permissions: allPermissions
    };
};

// Get all users (for admin/manager dashboard)
export const getAllUsers = async (filters = {}) => {
    const query = { isActive: true };

    if (filters.role) query.role = filters.role;
    if (filters.organization) query.organization = filters.organization;
    if (filters.search) {
        query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { email: { $regex: filters.search, $options: 'i' } }
        ];
    }

    const users = await userModel.find(query)
        .select('-password')
        .sort({ createdAt: -1 });

    return users;
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
    if (!['admin', 'manager', 'user'].includes(newRole)) {
        throw new Error('Invalid role');
    }

    const user = await userModel.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
    ).select('-password');

    return user;
};

// Update custom permissions for a user
export const updateUserPermissions = async (userId, customPermissions = []) => {
    const user = await userModel.findByIdAndUpdate(
        userId,
        { customPermissions },
        { new: true }
    ).select('-password');

    return user;
};

// Delete user (soft delete - set isActive to false)
export const deleteUser = async (userId) => {
    const user = await userModel.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
    );

    return user;
};

// Update last login
export const updateLastLogin = async (userId) => {
    await userModel.findByIdAndUpdate(
        userId,
        { lastLogin: new Date() }
    );
};

// Get user statistics for admin dashboard
export const getUserStats = async (organization = 'default') => {
    const query = { organization, isActive: true };

    const totalUsers = await userModel.countDocuments(query);
    const adminCount = await userModel.countDocuments({ ...query, role: 'admin' });
    const managerCount = await userModel.countDocuments({ ...query, role: 'manager' });
    const userCount = await userModel.countDocuments({ ...query, role: 'user' });

    return {
        totalUsers,
        adminCount,
        managerCount,
        userCount
    };
};
