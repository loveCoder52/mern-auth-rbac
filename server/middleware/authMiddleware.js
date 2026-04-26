/**
 * Authentication Middleware
 * Verifies JWT token and extracts user information
 */

import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../utils/errors.js';
import { getUserWithPermissions } from '../services/userService.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new AuthenticationError('No token provided. Please login.');
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            throw new AuthenticationError('Invalid token');
        }

        // Fetch user with permissions
        const user = await getUserWithPermissions(decoded.id);

        if (!user || !user.isActive) {
            throw new AuthenticationError('User not found or account is inactive');
        }

        // Attach user data to request
        req.userId = decoded.id;
        req.user = user;
        req.userRole = user.role;
        req.userPermissions = user.permissions;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            });
        }

        return res.status(401).json({
            success: false,
            message: error.message || 'Authentication failed'
        });
    }
};

export default authMiddleware;
