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

// Get all users
// GET /api/admin/users
adminRouter.get('/users', 
    authMiddleware, 
    roleMiddleware(['admin']), 
    permissionMiddleware(PERMISSIONS.MANAGE_USERS),
    getAllUsersController
);

// Get specific user details
// GET /api/admin/user/:userId
adminRouter.get('/user/:userId',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.VIEW_USERS),
    getUserDetailsController
);

// Delete a user
// DELETE /api/admin/user/:id
// ✅ No body needed — userId comes from URL param
adminRouter.delete('/user/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.DELETE_USERS),
    deleteUserController
);

// Update user role
// PUT /api/admin/user/:id/role
// ✅ userId from URL param, newRole from req.body
adminRouter.put('/user/:id/role',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.UPDATE_ROLES),
    updateUserRoleController
);

// Grant custom permissions to user
// POST /api/admin/user/:id/permissions
adminRouter.post('/user/:id/permissions',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.MANAGE_PERMISSIONS),
    grantPermissionController
);

// Get admin statistics
// GET /api/admin/stats
adminRouter.get('/stats',
    authMiddleware,
    roleMiddleware(['admin']),
    permissionMiddleware(PERMISSIONS.VIEW_ADMIN_DASHBOARD),
    getAdminStatsController
);

// Get available permissions (for UI reference)
// GET /api/admin/permissions
adminRouter.get('/permissions',
    authMiddleware,
    roleMiddleware(['admin']),
    getAvailablePermissionsController
);

export default adminRouter;

