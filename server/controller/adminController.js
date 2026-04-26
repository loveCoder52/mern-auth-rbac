import userModel from "../model/userModel.js";
import {
    getAllUsers,
    updateUserRole,
    updateUserPermissions,
    deleteUser,
    getUserStats,
    getUserWithPermissions
} from "../services/userService.js";
import { PERMISSIONS, ROLE_PERMISSIONS } from "../config/rolePermission.js";

/**
 * ADMIN CONTROLLERS
 * All endpoints require 'manage_users' permission
 */

// Get all users with filtering and search
export const getAllUsersController = async (req, res) => {
    try {
        const { role, search, organization } = req.query;

        const filters = {};
        if (role) filters.role = role;
        if (search) filters.search = search;
        filters.organization = organization || 'default';

        const users = await getAllUsers(filters);

        // Remove passwords from response
        const safeUsers = users.map(user => {
            const { password, ...userData } = user.toObject();
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

// Delete a user (soft delete)
export const deleteUserController = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({
                success: false,
                message: "User ID is required"
            });
        }

        // Prevent self-deletion
        if (userId === req.userId) {
            return res.json({
                success: false,
                message: "You cannot delete your own account"
            });
        }

        const user = await deleteUser(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: `User ${user.name} has been deleted`,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update user role
export const updateUserRoleController = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (!userId || !newRole) {
            return res.json({
                success: false,
                message: "User ID and new role are required"
            });
        }

        const validRoles = ['admin', 'manager', 'user'];
        if (!validRoles.includes(newRole)) {
            return res.json({
                success: false,
                message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
            });
        }

        // Prevent self-role change
        if (userId === req.userId) {
            return res.json({
                success: false,
                message: "You cannot change your own role"
            });
        }

        const user = await updateUserRole(userId, newRole);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: `User role updated to ${newRole}`,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Grant custom permissions to user
export const grantPermissionController = async (req, res) => {
    try {
        const { userId, permissions } = req.body;

        if (!userId || !Array.isArray(permissions)) {
            return res.json({
                success: false,
                message: "User ID and permissions array are required"
            });
        }

        // Validate all permissions exist
        const allValidPermissions = Object.values(PERMISSIONS);
        const invalidPerms = permissions.filter(p => !allValidPermissions.includes(p));

        if (invalidPerms.length > 0) {
            return res.json({
                success: false,
                message: `Invalid permissions: ${invalidPerms.join(', ')}`
            });
        }

        const user = await updateUserPermissions(userId, permissions);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User permissions updated",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get admin dashboard statistics
export const getAdminStatsController = async (req, res) => {
    try {
        const organization = req.query.organization || 'default';
        const stats = await getUserStats(organization);

        res.json({
            success: true,
            stats: stats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get available permissions (for UI reference)
export const getAvailablePermissionsController = async (req, res) => {
    try {
        res.json({
            success: true,
            permissions: PERMISSIONS,
            rolePermissions: ROLE_PERMISSIONS
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single user details (with permissions)
export const getUserDetailsController = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await getUserWithPermissions(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
