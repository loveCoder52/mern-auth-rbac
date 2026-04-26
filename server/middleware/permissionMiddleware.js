/**
 * Permission Authorization Middleware
 * Checks if user has required permissions
 * 
 * Usage: permissionMiddleware(['delete_users'])
 *        permissionMiddleware('delete_users', 'matchAll') // Requires all permissions
 *        permissionMiddleware(['delete_users', 'manage_users'], 'matchAny') // Requires at least one
 */

import { AuthorizationError } from '../utils/errors.js';

export const permissionMiddleware = (requiredPermissions, matchType = 'matchAny') => {
    return (req, res, next) => {
        try {
            if (!req.userPermissions || req.userPermissions.length === 0) {
                throw new AuthorizationError('User has no permissions');
            }

            // Normalize requiredPermissions to array
            const permissions = Array.isArray(requiredPermissions)
                ? requiredPermissions
                : [requiredPermissions];

            let hasAccess = false;

            if (matchType === 'matchAll') {
                // User must have ALL required permissions
                hasAccess = permissions.every(permission =>
                    req.userPermissions.includes(permission)
                );
            } else {
                // User must have AT LEAST ONE required permission (default)
                hasAccess = permissions.some(permission =>
                    req.userPermissions.includes(permission)
                );
            }

            if (!hasAccess) {
                throw new AuthorizationError(
                    `Access denied. Required permission(s): ${permissions.join(', ')}`
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

export default permissionMiddleware;
