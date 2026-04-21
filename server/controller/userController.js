import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
    try {

        // const {userId} = req.body;
        const userId = req.userId;   // get from middleware

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                role: user.role, // Include role in user data
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get user profile (same as above, can be used for user dashboard)
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