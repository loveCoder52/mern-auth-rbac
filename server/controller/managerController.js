/**
 * MANAGER CONTROLLERS
 * Managers have limited permissions - can view and update users but not delete/manage roles
 */

import userModel from "../model/userModel.js";
import { getAllUsers, getUserWithPermissions } from "../services/userService.js";

// Get all users (limited view for managers)
export const getManagerUsersController = async (req, res) => {
    try {
        const { search } = req.query;

        const filters = {};
        if (search) filters.search = search;
        filters.organization = req.user?.organization || 'default';

        const users = await getAllUsers(filters);

        // Remove sensitive data for non-admin managers
        const safeUsers = users.map(user => {
            const { password, customPermissions, ...userData } = user.toObject();
            return userData;
        });

        res.json({
            success: true,
            total: users.length,
            users: safeUsers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user details (manager can view details)
export const getManagerUserDetailController = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await getUserWithPermissions(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Check if manager is from same organization
        if (user.organization !== (req.user?.organization || 'default')) {
            return res.status(403).json({
                success: false,
                message: "Cannot view users from other organizations"
            });
        }

        // Remove sensitive data
        const { password, customPermissions, ...safeUser } = user;

        res.json({
            success: true,
            user: safeUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update user information (manager can update basic info)
export const updateManagerUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email } = req.body;

        if (!name && !email) {
            return res.json({
                success: false,
                message: "At least one field is required to update"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Check organization access
        if (user.organization !== (req.user?.organization || 'default')) {
            return res.status(403).json({
                success: false,
                message: "Cannot update users from other organizations"
            });
        }

        // Update allowed fields only
        if (name) user.name = name;
        if (email) {
            const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.json({
                    success: false,
                    message: "Email already in use"
                });
            }
            user.email = email;
        }

        await user.save();

        res.json({
            success: true,
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get manager dashboard statistics
export const getManagerStatsController = async (req, res) => {
    try {
        const organization = req.user?.organization || 'default';
        const query = { organization, isActive: true };

        const totalUsers = await userModel.countDocuments(query);
        const adminCount = await userModel.countDocuments({ ...query, role: 'admin' });
        const managerCount = await userModel.countDocuments({ ...query, role: 'manager' });
        const userCount = await userModel.countDocuments({ ...query, role: 'user' });

        res.json({
            success: true,
            stats: {
                totalUsers,
                adminCount,
                managerCount,
                userCount
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
