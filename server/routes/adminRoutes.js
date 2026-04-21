import express from 'express';
import userAuth from '../middleware/userAuth.js';
import roleAuth from '../middleware/roleAuth.js';
import { getAllUsers, deleteUser, updateUserRole, getAdminStats } from '../controller/adminController.js';

const adminRouter = express.Router();

// All admin routes require authentication and admin role
adminRouter.get('/users', userAuth, roleAuth('admin'), getAllUsers);
adminRouter.delete('/delete-user', userAuth, roleAuth('admin'), deleteUser);
adminRouter.put('/update-role', userAuth, roleAuth('admin'), updateUserRole);
adminRouter.get('/stats', userAuth, roleAuth('admin'), getAdminStats);

export default adminRouter;
