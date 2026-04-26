/**
 * Role-based Permissions Configuration
 * Defines default permissions for each role
 * Can be overridden per user using customPermissions field
 */

export const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user'
};

// Define all available permissions
export const PERMISSIONS = {
    // User Management
    MANAGE_USERS: 'manage_users',
    VIEW_USERS: 'view_users',
    UPDATE_USERS: 'update_users',
    DELETE_USERS: 'delete_users',
    UPDATE_ROLES: 'update_roles',

    // Profile Management
    VIEW_PROFILE: 'view_profile',
    UPDATE_PROFILE: 'update_profile',
    DELETE_PROFILE: 'delete_profile',

    // Dashboard Access
    VIEW_DASHBOARD: 'view_dashboard',
    VIEW_ADMIN_DASHBOARD: 'view_admin_dashboard',
    VIEW_MANAGER_DASHBOARD: 'view_manager_dashboard',

    // Activity & Logs
    VIEW_ACTIVITY_LOG: 'view_activity_log',
    MANAGE_ACTIVITY_LOG: 'manage_activity_log',

    // System Administration
    MANAGE_ROLES: 'manage_roles',
    MANAGE_PERMISSIONS: 'manage_permissions'
};

// Role-based permission mapping (defaults)
export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.UPDATE_USERS,
        PERMISSIONS.DELETE_USERS,
        PERMISSIONS.UPDATE_ROLES,
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_ADMIN_DASHBOARD,
        PERMISSIONS.VIEW_ACTIVITY_LOG,
        PERMISSIONS.MANAGE_ACTIVITY_LOG,
        PERMISSIONS.MANAGE_ROLES,
        PERMISSIONS.MANAGE_PERMISSIONS
    ],
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.UPDATE_USERS,
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_MANAGER_DASHBOARD,
        PERMISSIONS.VIEW_ACTIVITY_LOG
    ],
    [ROLES.USER]: [
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.VIEW_DASHBOARD
    ]
};

/**
 * Get all permissions for a user
 * Merges role-based permissions with custom permissions
 * @param {string} role - User's role
 * @param {array} customPermissions - Custom permissions array
 * @returns {array} Combined permissions
 */
export const getUserPermissions = (role, customPermissions = []) => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    // Remove duplicates and merge custom permissions
    return [...new Set([...rolePermissions, ...customPermissions])];
};

/**
 * Check if a user has a specific permission
 * @param {array} userPermissions - Array of user permissions
 * @param {string} requiredPermission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (userPermissions, requiredPermission) => {
    return userPermissions.includes(requiredPermission);
};

/**
 * Check if a user has any of the required permissions
 * @param {array} userPermissions - Array of user permissions
 * @param {array} requiredPermissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAnyPermission = (userPermissions, requiredPermissions) => {
    return requiredPermissions.some(permission =>
        userPermissions.includes(permission)
    );
};

/**
 * Check if a user has all required permissions
 * @param {array} userPermissions - Array of user permissions
 * @param {array} requiredPermissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
    return requiredPermissions.every(permission =>
        userPermissions.includes(permission)
    );
};
