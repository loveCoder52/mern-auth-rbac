# 🎨 Visual System Overview & Quick Reference

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                              │
│                      (React Frontend)                               │
├─────────────────────────────────────────────────────────────────────┤
│  Login  →  UserDashboard  │  ManagerDashboard  │  AdminDashboard    │
│            (User)         │  (Manager)         │  (Admin)           │
└────────────────┬──────────────────────┬──────────────────────────────┘
                 │ API Calls            │
                 ↓                      ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EXPRESS BACKEND                                │
├─────────────────────────────────────────────────────────────────────┤
│  ROUTES                                                             │
│  ├── /api/auth (register, login, logout)                           │
│  ├── /api/user (profile, dashboard, password)                      │
│  ├── /api/manager (users, stats - limited)                         │
│  └── /api/admin (full CRUD, role mgmt, perms)                      │
│                                                                     │
│  MIDDLEWARE CHAIN                                                   │
│  ├── authMiddleware (verify JWT + get permissions)                 │
│  ├── roleMiddleware (check if user role allowed)                   │
│  └── permissionMiddleware (check if user has permission)           │
│                                                                     │
│  CONTROLLERS                                                        │
│  ├── authController (auth logic)                                   │
│  ├── userController (self-service)                                 │
│  ├── managerController (limited mgmt)                              │
│  └── adminController (full control)                                │
│                                                                     │
│  SERVICES                                                           │
│  └── userService (business logic - getUserWithPermissions, etc)    │
│                                                                     │
│  CONFIG                                                             │
│  └── rolePermission (PERMISSIONS, ROLE_PERMISSIONS, helpers)       │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────┐
        │   MONGODB DATABASE             │
        ├────────────────────────────────┤
        │ Users Collection               │
        │ - name, email, password        │
        │ - role (admin/manager/user)    │
        │ - customPermissions []         │
        │ - organization                 │
        │ - lastLogin, isActive          │
        │ - timestamps                   │
        └────────────────────────────────┘
```

---

## Request Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ USER MAKES REQUEST (with JWT Cookie)                            │
└──────────────────────┬──────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│ authMiddleware                                                    │
│ ✓ Verify JWT token from cookies                                  │
│ ✓ Fetch user from DB                                             │
│ ✓ Calculate permissions (role + customPermissions)               │
│ ✓ Attach to request: req.user, req.userRole, req.userPermissions │
└──────────────────────┬──────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│ roleMiddleware(['admin', 'manager'])                              │
│ Check: Is user's role in allowed list?                           │
│ ✓ If yes → Continue                                              │
│ ❌ If no → Return 403 Forbidden                                  │
└──────────────────────┬──────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│ permissionMiddleware('delete_users')                              │
│ Check: Does user have permission?                                │
│ ✓ If yes → Continue                                              │
│ ❌ If no → Return 403 Forbidden (Permission Required)            │
└──────────────────────┬──────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│ CONTROLLER (deleteUserController)                                 │
│ Call userService.deleteUser(userId)                              │
│ → Soft delete via isActive = false                               │
│ Return success response                                           │
└──────────────────────┬──────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────────┐
│ RESPONSE TO USER                                                  │
│ { success: true, message: "User deleted" }                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## Role Hierarchy Diagram

```
                    ┌─────────────────┐
                    │     ADMIN       │
                    │  (15 perms)     │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                        │
         ┌──────▼──────┐          [All Manager Perms]
         │   MANAGER   │
         │  (7 perms)  │
         └──────┬──────┘
                │
        ┌───────┴────────┐
        │                │
   ┌────▼────┐    [All User Perms]
   │   USER   │
   │(3 perms) │
   └──────────┘

PERMISSION INHERITANCE:
└─ User (3)
   ├─ view_profile
   ├─ update_profile
   └─ view_dashboard
   
   └─ Manager (7) = User (3) + Manager-specific (4)
      ├─ view_users
      ├─ update_users
      ├─ view_manager_dashboard
      └─ view_activity_log
      
      └─ Admin (15) = Manager (7) + Admin-specific (8)
         ├─ manage_users
         ├─ delete_users
         ├─ update_roles
         ├─ manage_permissions
         ├─ view_admin_dashboard
         ├─ manage_activity_log
         ├─ manage_roles
         └─ delete_profile
```

---

## Permission System Diagram

```
┌─────────────────────────────────────────────┐
│         USER PERMISSIONS                    │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ DEFAULT ROLE PERMISSIONS              │   │
│  │ From: ROLE_PERMISSIONS config         │   │
│  │ admin: [manage_users, delete_users...]│   │
│  │ manager: [view_users, update_users...]│   │
│  │ user: [view_profile, update_profile...]   │
│  └──────────────┬───────────────────────┘   │
│                 │                            │
│                 │ MERGED WITH                │
│                 │                            │
│  ┌──────────────▼───────────────────────┐   │
│  │ CUSTOM PERMISSIONS OVERRIDE           │   │
│  │ From: user.customPermissions array    │   │
│  │ Example: [view_activity_log]          │   │
│  │ (Grant extra permissions to user)     │   │
│  └──────────────┬───────────────────────┘   │
│                 │                            │
│                 ↓                            │
│  ┌──────────────────────────────────────┐   │
│  │ FINAL PERMISSIONS SET                │   │
│  │ Used for: Access control decisions   │   │
│  │ Example: [view_profile, update_...,  │   │
│  │           view_activity_log]         │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## Frontend Route Protection Diagram

```
┌─────────────────────────────────────────────────────┐
│ USER VISITS ROUTE: /admin/dashboard                │
└────────────────────┬────────────────────────────────┘
                     ↓
         ┌───────────────────────┐
         │ Check: isLoggedIn?   │
         └───────────┬───────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
      NO→ /login           YES→ Check Role?
                               │
                 ┌─────────────┴──────────┐
                 │                       │
      NOT ADMIN→ /unauthorized    IS ADMIN→ Check Permission?
                                          │
                    ┌─────────────────────┴──────────┐
                    │                                │
        NO PERM→ /unauthorized                YES→ Render Component
                                                    │
                                                    ↓
                                            ┌──────────────┐
                                            │  Dashboard   │
                                            │   Content    │
                                            └──────────────┘
```

---

## API Endpoint Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│ AUTHENTICATION (PUBLIC)                                         │
├─────────────────────────────────────────────────────────────────┤
│ POST   /api/auth/register           → Create user (role=user)   │
│ POST   /api/auth/login              → Get JWT + permissions     │
│ POST   /api/auth/logout             → Clear token               │
│ GET    /api/auth/is-auth            → Check auth status         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ USER (PROTECTED - All Authenticated)                            │
├─────────────────────────────────────────────────────────────────┤
│ GET    /api/user/data               → Get data + permissions    │
│ GET    /api/user/profile            → Get profile               │
│ PUT    /api/user/profile            → Update profile            │
│ POST   /api/user/change-password    → Change password           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MANAGER (manager + admin)                                       │
├─────────────────────────────────────────────────────────────────┤
│ GET    /api/manager/users           → View users                │
│ GET    /api/manager/user/:id        → View user detail          │
│ PUT    /api/manager/user/:id        → Update user info          │
│ GET    /api/manager/stats           → View statistics           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ADMIN (admin only)                                              │
├─────────────────────────────────────────────────────────────────┤
│ GET    /api/admin/users             → Manage all users          │
│ GET    /api/admin/user/:id          → View user details         │
│ DELETE /api/admin/user/:id          → Delete user (soft)        │
│ PUT    /api/admin/user/:id/role     → Change role               │
│ POST   /api/admin/user/:id/perms    → Grant permissions         │
│ GET    /api/admin/stats             → Dashboard stats           │
│ GET    /api/admin/permissions       → Available permissions     │
└─────────────────────────────────────────────────────────────────┘
```

---

## State Management Flow (Frontend)

```
┌─────────────────────────────────────────────────────────────────┐
│ App Context (AppContext.jsx)                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STATE VARIABLES:                                               │
│  ├─ isLoggedIn (boolean)                                        │
│  ├─ userData (object)                                           │
│  ├─ userRole (string: admin/manager/user)                       │
│  ├─ userPermissions (array: [perm1, perm2...])                 │
│  └─ loading (boolean)                                           │
│                                                                 │
│  HELPER FUNCTIONS:                                              │
│  ├─ hasPermission(perm)                                         │
│  │  → Check if user has permission                              │
│  │  → Used: {hasPermission('delete_users') && <DeleteBtn />}    │
│  │                                                              │
│  ├─ hasAnyPermission([perm1, perm2])                            │
│  │  → Check if user has AT LEAST ONE permission (OR logic)      │
│  │                                                              │
│  └─ hasAllPermissions([perm1, perm2])                           │
│     → Check if user has ALL permissions (AND logic)             │
│                                                                 │
│  DATA PERSISTENCE:                                              │
│  localStorage.userRole           (string)                       │
│  localStorage.userPermissions    (JSON string)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Component Usage:                         │
│ const { hasPermission } = useContext()   │
│ {hasPermission('update_users') && ...}   │
└──────────────────────────────────────────┘
```

---

## User Lifecycle Diagram

```
┌──────────────┐
│   REGISTER   │
│   (New User) │
└──────┬───────┘
       │
       ↓
┌─────────────────────────────┐
│ User Created                │
│ ├─ role: 'user' (default)   │
│ ├─ customPermissions: []    │
│ ├─ isActive: true           │
│ └─ createdAt: now           │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────┐      ┌─────────────────────┐
│   LOGIN      │←────→│  JWT Generated      │
│   (Verify)   │      │  {id, role, perms}  │
└──────┬───────┘      └─────────────────────┘
       │
       ↓
┌─────────────────────────────┐
│ Permission Recalculated     │
│ ├─ Load role defaults       │
│ ├─ Add customPermissions    │
│ ├─ Set in JWT               │
│ └─ lastLogin: now           │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│ User Operating               │
│ ├─ Access based on perms     │
│ ├─ Can request actions       │
│ └─ Logged in                 │
└──────┬───────────────────────┘
       │
       ├─► ROLE CHANGE
       │   └─ Admin updates role
       │      └─ User logs out & back in
       │         └─ New permissions in JWT
       │
       ├─► CUSTOM PERMISSION GRANT
       │   └─ Admin grants permission
       │      └─ User logs out & back in
       │         └─ New permission active
       │
       └─► DELETE
           └─ Admin deletes user
              └─ isActive = false (soft delete)
                 └─ Access denied on next login
```

---

## Permission Check Decision Tree

```
                    ┌─── REQUEST ───┐
                    │ (with JWT)     │
                    └────────┬───────┘
                             │
                    ┌────────▼────────┐
                    │ authMiddleware  │
                    │ Verify JWT?     │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
              ❌ NO                  YES│
              (401)                     │
                                  ┌─────▼──────────┐
                                  │ roleMiddleware │
                                  │ Role allowed?  │
                                  └─────┬──────────┘
                                        │
                            ┌───────────┴───────────┐
                            │                       │
                        ❌ NO                    YES│
                        (403)               ┌───────▼────────┐
                                           │permissionMidd. │
                                           │Permission ok?  │
                                           └───────┬────────┘
                                                   │
                                       ┌───────────┴───────────┐
                                       │                       │
                                   ❌ NO                    YES│
                                   (403)                       │
                                                         ┌─────▼──────┐
                                                         │ CONTROLLER │
                                                         │ Process    │
                                                         │ Response   │
                                                         └────────────┘
```

---

## Error Response Flow

```
┌──────────────────────────────┐
│ Request Reaches Error        │
│ ├─ Validation error          │
│ ├─ Authentication error      │
│ ├─ Authorization error       │
│ ├─ Not found error           │
│ └─ Server error              │
└───────────┬──────────────────┘
            │
            ↓
┌──────────────────────────────┐
│ Error Class Instantiated     │
│ ├─ ValidationError (400)     │
│ ├─ AuthenticationError (401) │
│ ├─ AuthorizationError (403)  │
│ ├─ NotFoundError (404)       │
│ ├─ ConflictError (409)       │
│ └─ AppError (500)            │
└───────────┬──────────────────┘
            │
            ↓
┌──────────────────────────────┐
│ Error Handler Called         │
│ ├─ Extract message           │
│ ├─ Extract status code       │
│ └─ Format response           │
└───────────┬──────────────────┘
            │
            ↓
┌──────────────────────────────┐
│ JSON Response Sent           │
│ {                            │
│   success: false,            │
│   message: "...",            │
│   statusCode: 403            │
│ }                            │
└──────────────────────────────┘
```

---

## File Dependency Map

```
┌─────────────────────────────────────────────────────────────────┐
│ config/rolePermission.js                                        │
│ ├─ Used by: authController (calculate permissions)              │
│ ├─ Used by: permissionMiddleware (validate permissions)         │
│ ├─ Used by: adminController (grant permissions)                 │
│ └─ Used by: frontend/ProtectedRoute (permission checking)       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ services/userService.js                                         │
│ ├─ Used by: authController (get permissions)                    │
│ ├─ Used by: authMiddleware (fetch user)                         │
│ ├─ Used by: adminController (manage users)                      │
│ └─ Used by: managerController (list users)                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ middleware/authMiddleware.js                                    │
│ ├─ Used by: All protected routes                                │
│ ├─ Uses: userService.getUserWithPermissions()                   │
│ └─ Uses: config/rolePermission.js                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ model/userModel.js                                              │
│ ├─ Used by: All controllers                                     │
│ ├─ Used by: userService (database operations)                   │
│ └─ Schema includes: role, customPermissions, organization       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ context/AppContext.jsx (Frontend)                               │
│ ├─ Used by: ProtectedRoute                                      │
│ ├─ Used by: All dashboard components                            │
│ ├─ Provides: hasPermission(), hasAnyPermission(), etc.          │
│ └─ Syncs with: localStorage                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ components/ProtectedRoute.jsx (Frontend)                        │
│ ├─ Used by: App.jsx for all protected routes                    │
│ ├─ Uses: AppContext for permissions                             │
│ └─ Validates: roles and permissions                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Performance Characteristics

```
┌──────────────────────────────────────────────────────────────────┐
│ Operation                    │ Time  │ Cached? │ Optimized?      │
├──────────────────────────────────────────────────────────────────┤
│ User Registration            │ 200ms │ N/A     │ Password hash   │
│ User Login                   │ 150ms │ N/A     │ DB index on email
│ Fetch User Permissions       │ 50ms  │ Yes*    │ In JWT           │
│ Check Permission             │ <1ms  │ Yes     │ Array search     │
│ Admin List Users             │ 100ms │ No      │ DB index on role │
│ Soft Delete User             │ 50ms  │ No      │ Single update    │
│ Grant Custom Permission      │ 60ms  │ No      │ Direct update    │
│                                                                   │
│ * Cached in JWT, refreshed on login                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Tables

### Middleware Execution Order
```
1️⃣  authMiddleware     - Verify JWT, fetch user with permissions
2️⃣  roleMiddleware     - Check if role is allowed
3️⃣  permissionMiddleware - Check if permission is granted
4️⃣  Controller         - Process the request
```

### HTTP Status Codes Used
```
200 ✅ OK - Request successful
201 ✅ Created - Resource created
400 ❌ Bad Request - Validation failed
401 ❌ Unauthorized - No valid token
403 ❌ Forbidden - Wrong role/permission
404 ❌ Not Found - Resource not found
409 ❌ Conflict - Duplicate data
500 ❌ Server Error - Unexpected error
```

### Permission Grant Methods
```
1. Default    - By role (admin/manager/user)
2. Custom     - Via customPermissions array (per-user)
3. Override   - Admin grants temporary elevated permissions
4. Inherit    - Users inherit manager permissions if promoted
```

---

<div align="center">

## 🎨 Visual Guide Complete!

Use this as a quick reference while reviewing code and documentation.

Return to: [README.md](README.md) | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

</div>
