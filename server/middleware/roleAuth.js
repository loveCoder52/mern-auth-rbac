/**
 * Role Authorization Middleware
 * Checks if user has one of the required roles
 * 
 * Usage: roleMiddleware(['admin', 'manager'])
 */

import { AuthorizationError } from '../utils/errors.js';

export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            if (!req.userRole) {
                throw new AuthorizationError('User role not found');
            }

            if (!allowedRoles.includes(req.userRole)) {
                throw new AuthorizationError(
                    `Access denied. Required roles: ${allowedRoles.join(', ')}`
                );
            }

            next();
        } catch (error) {
            return res.status(error.statusCode || 403).json({
                success: false,
                message: error.message
            });
        }
    };
};

export default roleMiddleware;

