import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleAuth.js';
import permissionMiddleware from '../middleware/permissionMiddleware.js';
import { 
    getAllUsersController, 
    deleteUserController, 
    updateUserRoleController,
    grantPermissionController,
    getAdminStatsController,
    getAvailablePermissionsController,
    getUserDetailsController
} from '../controller/adminController.js';
import { PERMISSIONS } from '../config/rolePermission.js';

const adminRouter = express.Router();

// All admin routes require authentication and admin role
// Optional: also check for manage_users permission for extra security

// Get all users
adminRouter.get('/users', 
    authMiddleware, 
    roleMiddleware(['admin']), 
    permissionMiddleware(PERMISSIONS.MANAGE_USERS),
    getAllUsersController
);

// Get specific user details
adminRouter.get('/user/:userId',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.VIEW_USERS),
    getUserDetailsController
);

// Delete a user
adminRouter.delete('/user/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.DELETE_USERS),
    deleteUserController
);

// Update user role
adminRouter.put('/user/:id/role',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.UPDATE_ROLES),
    updateUserRoleController
);

// Grant custom permissions to user
adminRouter.post('/user/:id/permissions',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.MANAGE_PERMISSIONS),
    grantPermissionController
);

// Get admin statistics
adminRouter.get('/stats',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.VIEW_ADMIN_DASHBOARD),
    getAdminStatsController
);

// Get available permissions (for UI reference)
adminRouter.get('/permissions',
    authMiddleware,
    roleMiddleware(['admin']),
    getAvailablePermissionsController
);

export default adminRouter;

