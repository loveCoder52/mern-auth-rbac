import userModel from "../model/userModel.js";

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // Exclude password from response

        if (!users || users.length === 0) {
            return res.json({ success: false, message: "No users found!" });
        }

        res.json({
            success: true,
            users: users,
            totalUsers: users.length
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User ID is required!" });
        }

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        res.json({
            success: true,
            message: "User deleted successfully!"
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (!userId || !newRole) {
            return res.json({ success: false, message: "User ID and new role are required!" });
        }

        if (!['user', 'admin'].includes(newRole)) {
            return res.json({ success: false, message: "Invalid role. Must be 'user' or 'admin'." });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        res.json({
            success: true,
            message: `User role updated to ${newRole} successfully!`,
            user: user
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get admin dashboard statistics
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const adminCount = await userModel.countDocuments({ role: 'admin' });
        const userCount = await userModel.countDocuments({ role: 'user' });

        res.json({
            success: true,
            stats: {
                totalUsers,
                adminCount,
                userCount
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
