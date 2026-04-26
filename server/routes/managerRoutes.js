import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleAuth.js';
import permissionMiddleware from '../middleware/permissionMiddleware.js';
import { 
    getManagerUsersController,
    getManagerUserDetailController,
    updateManagerUserController,
    getManagerStatsController
} from '../controller/managerController.js';
import { PERMISSIONS } from '../config/rolePermission.js';

const managerRouter = express.Router();

// All manager routes require authentication and manager role
// Managers have view_users and update_users permissions but not delete

// Get all users (manager view)
managerRouter.get('/users',
    authMiddleware,
    roleMiddleware(['admin', 'manager']), // Admin can also use manager endpoints
    permissionMiddleware(PERMISSIONS.VIEW_USERS),
    getManagerUsersController
);

// Get specific user details
managerRouter.get('/user/:userId',
    authMiddleware,
    roleMiddleware(['admin', 'manager']),
    permissionMiddleware(PERMISSIONS.VIEW_USERS),
    getManagerUserDetailController
);

// Update user information (basic fields only)
managerRouter.put('/user/:userId',
    authMiddleware,
    roleMiddleware(['admin', 'manager']),
    permissionMiddleware(PERMISSIONS.UPDATE_USERS),
    updateManagerUserController
);

// Get manager dashboard statistics
managerRouter.get('/stats',
    authMiddleware,
    roleMiddleware(['admin', 'manager']),
    permissionMiddleware(PERMISSIONS.VIEW_MANAGER_DASHBOARD),
    getManagerStatsController
);

export default managerRouter;
