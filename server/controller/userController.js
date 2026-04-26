import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { getUserWithPermissions } from "../services/userService.js";

/**
 * USER CONTROLLERS
 * Users can only manage their own profile
 */

// Get user's own profile with permissions
export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await getUserWithPermissions(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Remove password from response
        const { password, ...safeUser } = user;

        res.json({
            success: true,
            userData: safeUser
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get detailed user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        res.json({
            success: true,
            userData: user
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Update user's own profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email } = req.body;

        if (!name && !email) {
            return res.json({
                success: false,
                message: "At least one field is required"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Update allowed fields
        if (name) user.name = name;
        if (email) {
            // Check if email is already in use
            const existingUser = await userModel.findOne({ 
                email, 
                _id: { $ne: userId } 
            });
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
            message: "Profile updated successfully",
            user: user
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Change user's password
export const changePasswordController = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};