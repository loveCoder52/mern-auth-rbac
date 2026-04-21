import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData, getUserProfile } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/profile', userAuth, getUserProfile); // User profile endpoint

export default userRouter;