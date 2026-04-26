import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

// Protected routes
authRouter.post('/logout', authMiddleware, logout);
authRouter.post('/send-verify-otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-account', authMiddleware, verifyEmail);
authRouter.get('/is-auth', authMiddleware, isAuthenticated);

export default authRouter;