import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import permissionMiddleware from '../middleware/permissionMiddleware.js';
import { 
    getUserData, 
    getUserProfile, 
    updateUserProfile,
    changePasswordController 
} from '../controller/userController.js';

const userRouter = express.Router();

// All user routes are protected
// Get user data (includes permissions)
userRouter.get('/data', authMiddleware, getUserData);

// Get detailed profile
userRouter.get('/profile', authMiddleware, getUserProfile);

// Update own profile (users can update their own profile)
userRouter.put('/profile', authMiddleware, updateUserProfile);

// Change password (users can change their own password)
userRouter.post('/change-password', authMiddleware, changePasswordController);

export default userRouter;