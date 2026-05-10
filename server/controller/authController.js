import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";
import { getUserPermissions } from "../config/rolePermission.js";
import { updateLastLogin } from "../services/userService.js";

export const register = async (req, res) => { // this is for user registration
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing details" })
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        // Calculate permissions based on role
        const permissions = getUserPermissions(user.role, user.customPermissions);

        // Include role and permissions in JWT token
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            permissions: permissions
        }, process.env.JWT_SECRET, { expiresIn: '7d' })
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,
        //     maxAge: 7*24*60*60*1000
        // });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ✅ strict → lax
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // sending wellcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "wellcome to Q2",
            text: `Wellcome to Q2 website. Your account has been created with email id ${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, role: user.role, permissions: permissions });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password is required!" })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password." });
        }

        // Calculate permissions based on role
        const permissions = getUserPermissions(user.role, user.customPermissions);

        // Update last login time
        await updateLastLogin(user._id);

        // Include role and permissions in JWT token for RBAC
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            permissions: permissions
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.json({ success: true, role: user.role, permissions: permissions });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        })

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// send verification OTP to user's email
export const sendVerifyOtp = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: true, message: "Account already verified!" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: "Verification OTP sent on your email." });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// verify the email using otp
export const verifyEmail = async (req, res) => {

    const { otp } = req.body;
    const userId = req.userId;

    if (!otp) {
        return res.json({ success: false, message: "OTP is required." });
    }

    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired!" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({
            success: true,
            message: "Email verified successfully."
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get permissions from token (which has them decoded by middleware)
        const permissions = req.userPermissions || getUserPermissions(req.userRole, user.customPermissions);

        // Return user data with permissions
        return res.json({
            success: true,
            user: {
                id: req.userId,
                name: user.name,
                email: user.email,
                role: req.userRole,
                permissions: permissions
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//send password reset otp
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "E-mail is required" });
    }

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: "OTP send to your email" })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//reset user password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "E-mail, OTP, and new Password is required" });
    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password has been reset successfully." });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}