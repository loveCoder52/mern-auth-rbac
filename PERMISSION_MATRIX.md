# 📊 Permission Matrix Reference

## Role-Based Permissions Overview

### Admin Role
Complete system control with all permissions

```
✅ MANAGE_USERS              - manage_users
✅ VIEW_USERS                - view_users  
✅ UPDATE_USERS              - update_users
✅ DELETE_USERS              - delete_users
✅ UPDATE_ROLES              - update_roles
✅ VIEW_PROFILE              - view_profile
✅ UPDATE_PROFILE            - update_profile
✅ DELETE_PROFILE            - delete_profile
✅ VIEW_DASHBOARD            - view_dashboard
✅ VIEW_ADMIN_DASHBOARD      - view_admin_dashboard
✅ VIEW_ACTIVITY_LOG         - view_activity_log
✅ MANAGE_ACTIVITY_LOG       - manage_activity_log
✅ MANAGE_ROLES              - manage_roles
✅ MANAGE_PERMISSIONS        - manage_permissions
```

**Typical Users**: System administrators, IT leads, Super admins

---

### Manager Role
Limited administrative control over users and resources

```
✅ VIEW_USERS                - view_users
✅ UPDATE_USERS              - update_users
✅ VIEW_PROFILE              - view_profile
✅ UPDATE_PROFILE            - update_profile
✅ VIEW_DASHBOARD            - view_dashboard
✅ VIEW_MANAGER_DASHBOARD    - view_manager_dashboard
✅ VIEW_ACTIVITY_LOG         - view_activity_log

❌ DELETE_USERS              - delete_users
❌ DELETE_PROFILE            - delete_profile
❌ UPDATE_ROLES              - update_roles
❌ MANAGE_ROLES              - manage_roles
❌ MANAGE_PERMISSIONS        - manage_permissions
❌ VIEW_ADMIN_DASHBOARD      - view_admin_dashboard
❌ MANAGE_ACTIVITY_LOG       - manage_activity_log
```

**Typical Users**: Team leads, Department managers, Supervisors

---

### User Role
Self-service access to personal profile and dashboard

```
✅ VIEW_PROFILE              - view_profile
✅ UPDATE_PROFILE            - update_profile
✅ VIEW_DASHBOARD            - view_dashboard

❌ MANAGE_USERS              - manage_users
❌ VIEW_USERS                - view_users
❌ UPDATE_USERS              - update_users
❌ DELETE_USERS              - delete_users
❌ UPDATE_ROLES              - update_roles
❌ DELETE_PROFILE            - delete_profile
❌ VIEW_ADMIN_DASHBOARD      - view_admin_dashboard
❌ VIEW_MANAGER_DASHBOARD    - view_manager_dashboard
❌ VIEW_ACTIVITY_LOG         - view_activity_log
❌ MANAGE_ACTIVITY_LOG       - manage_activity_log
❌ MANAGE_ROLES              - manage_roles
❌ MANAGE_PERMISSIONS        - manage_permissions
```

**Typical Users**: End-users, Regular employees, Customers

---

## API Access Matrix

### /api/user Routes (All Authenticated Users)
| Endpoint | User | Manager | Admin | Permission |
|----------|------|---------|-------|------------|
| GET /data | ✅ | ✅ | ✅ | None (self) |
| GET /profile | ✅ | ✅ | ✅ | None (self) |
| PUT /profile | ✅ | ✅ | ✅ | update_profile |
| POST /change-password | ✅ | ✅ | ✅ | None (self) |

### /api/manager Routes (Manager + Admin)
| Endpoint | User | Manager | Admin | Permission |
|----------|------|---------|-------|------------|
| GET /users | ❌ | ✅ | ✅ | view_users |
| GET /user/:id | ❌ | ✅ | ✅ | view_users |
| PUT /user/:id | ❌ | ✅ | ✅ | update_users |
| GET /stats | ❌ | ✅ | ✅ | view_manager_dashboard |

### /api/admin Routes (Admin Only)
| Endpoint | User | Manager | Admin | Permission |
|----------|------|---------|-------|------------|
| GET /users | ❌ | ❌ | ✅ | manage_users |
| GET /user/:id | ❌ | ❌ | ✅ | view_users |
| DELETE /user/:id | ❌ | ❌ | ✅ | delete_users |
| PUT /user/:id/role | ❌ | ❌ | ✅ | update_roles |
| POST /user/:id/permissions | ❌ | ❌ | ✅ | manage_permissions |
| GET /stats | ❌ | ❌ | ✅ | view_admin_dashboard |
| GET /permissions | ❌ | ❌ | ✅ | None |

---

## Permission Categories

### User Management
```
MANAGE_USERS         - Full control over user accounts
VIEW_USERS           - List and view user information
UPDATE_USERS         - Modify user information (name, email, etc)
DELETE_USERS         - Remove user accounts (soft delete)
UPDATE_ROLES         - Change user roles (admin/manager/user)
```

### Profile Management
```
VIEW_PROFILE         - Access own/others' profile
UPDATE_PROFILE       - Edit profile information
DELETE_PROFILE       - Remove profile (hard delete)
```

### Dashboard Access
```
VIEW_DASHBOARD       - User dashboard
VIEW_ADMIN_DASHBOARD - Admin dashboard
VIEW_MANAGER_DASHBOARD - Manager dashboard
```

### Activity & Compliance
```
VIEW_ACTIVITY_LOG    - View system activity
MANAGE_ACTIVITY_LOG  - Edit/delete activity logs
```

### System Administration
```
MANAGE_ROLES         - Create/edit role definitions
MANAGE_PERMISSIONS   - Create/edit permissions
```

---

## Custom Permission Scenarios

### Scenario 1: Promote User to Temporary Manager
```javascript
// Grant manager permissions to regular user
await updateUserPermissions(userId, [
  'view_users',
  'update_users',
  'view_manager_dashboard'
])
// User keeps role='user' but has manager permissions
// Useful for covering shifts or temporary assignments
```

### Scenario 2: Restrict Admin
```javascript
// Remove sensitive permissions from admin
// Create "audit admin" with limited permissions
await updateUserPermissions(adminId, [
  'view_users',
  'view_dashboard',
  'view_activity_log'
  // Cannot delete, cannot manage permissions
])
```

### Scenario 3: Emergency Access
```javascript
// Grant temporarily elevated permissions
await updateUserPermissions(managerId, [
  'manage_users',      // Usually restricted
  'delete_users'       // Usually restricted
  // Until emergency is resolved, then remove
])
```

### Scenario 4: Contractor Access
```javascript
// Limited external access
await updateUserPermissions(contractorId, [
  'view_users',        // Can see team
  'view_profile',      // Can see own profile
  'update_profile'     // Can update own info
  // Cannot access dashboards or perform admin actions
])
```

---

## Frontend Permission Usage

### Show Button Based on Permission
```jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ManageUsersBtn() {
  const { hasPermission } = useContext(AppContext);
  
  if (!hasPermission('manage_users')) {
    return null;  // Hide button
  }
  
  return <button>Manage Users</button>;
}
```

### Show Section Based on Role
```jsx
export default function Dashboard() {
  const { userRole } = useContext(AppContext);
  
  return (
    <div>
      {/* Available to all authenticated users */}
      <UserSection />
      
      {/* Manager dashboard */}
      {['manager', 'admin'].includes(userRole) && (
        <ManagerSection />
      )}
      
      {/* Admin only */}
      {userRole === 'admin' && (
        <AdminSection />
      )}
    </div>
  );
}
```

### Check Multiple Permissions
```jsx
export default function AdvancedTools() {
  const { hasAllPermissions, hasAnyPermission } = useContext(AppContext);
  
  // Requires BOTH permissions
  if (hasAllPermissions(['delete_users', 'manage_roles'])) {
    return <FullControlPanel />;
  }
  
  // Requires AT LEAST ONE
  if (hasAnyPermission(['delete_users', 'manage_permissions'])) {
    return <LimitedControlPanel />;
  }
  
  return <ReadOnlyView />;
}
```

---

## Permission Inheritance Hierarchy

```
Admin
├── All Manager Permissions
├── All User Permissions
├── + Manage Users
├── + Delete Users
├── + Update Roles
├── + Manage Permissions
└── + Manage Roles

Manager
├── All User Permissions
├── + View Users
├── + Update Users
├── + View Activity Log
└── + View Manager Dashboard

User
├── View Profile
├── Update Profile
└── View Dashboard
```

---

## Real-World Role Examples

### Software Company Hierarchy
```
CEO / CTO (Admin)
  ├── Can do everything
  
Engineering Manager (Manager)
  ├── View all developers
  ├── Assign tasks
  ├── Cannot delete or demote
  
Developer (User)
  ├── View own profile
  ├── Update own info
  ├── Cannot see other developers
  
HR Manager (Manager)
  ├── View all employees
  ├── Update employee info
  ├── Cannot delete or access code
  
Contractor (User + Custom Perms)
  ├── View_users (can see team)
  ├── Cannot access dashboards
```

### SaaS Platform Structure
```
Platform Admin (Admin)
  ├── All permissions
  
Customer Admin (Admin - limited to org)
  ├── Manage users in their organization
  ├── Update roles within org
  ├── View activity within org
  
Customer Manager (Manager - limited to org)
  ├── View and update team members
  ├── Cannot manage roles or delete
  
Customer User (User)
  ├── Update own profile
  ├── View own dashboard
  ├── Cannot access others' data
```

---

## Permission Change Log

### Track permission changes (for audit trail)
```javascript
// Log when permission is granted
console.log(`Admin granted ${permission} to ${userId}`);

// Log when role changes
console.log(`${adminId} changed ${userId} role from ${oldRole} to ${newRole}`);

// Log when custom permissions updated
console.log(`Admin updated permissions for ${userId}: ${newPermissions}`);
```

---

## Best Practices

✅ **Do**
- Use specific permissions, not just roles
- Grant minimum necessary permissions (principle of least privilege)
- Review permissions regularly
- Log all permission changes
- Use custom permissions for exceptions, not the norm
- Combine role + permission checks for sensitive operations

❌ **Don't**
- Grant admin to everyone
- Use custom permissions as primary access control
- Forget to remove permissions when role changes
- Store permissions only in JWT (refresh from DB)
- Allow users to manage their own permissions
- Use permissions for business logic (use roles for that)

---

## Testing Permission Combinations

```javascript
// Test 1: User with no special permissions
user1 = { role: 'user', customPermissions: [] }
// Can: view profile, update profile
// Cannot: view users, delete users, access admin

// Test 2: Manager with elevated permissions
manager1 = { role: 'manager', customPermissions: ['delete_users'] }
// Can: view users, update users, delete users (granted)
// Cannot: manage roles, manage permissions

// Test 3: Admin with restricted permissions
admin1 = { role: 'admin', customPermissions: [] }
// Can: everything (role defaults)

// Test 4: Admin with limited scope
admin2 = { 
  role: 'admin', 
  customPermissions: ['view_only'],
  organization: 'customer-1' // Multi-tenant
}
// Can: view all actions but limited to org-1
```

---

**Generated: 2024**  
**Version: 1.0 - Production Ready**
