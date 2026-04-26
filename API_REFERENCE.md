# 📡 Complete API Reference Guide

## Overview
This guide documents all API endpoints for the SaaS RBAC system with request/response examples.

---

## 🔐 Authentication Routes (`/api/auth`)

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Public Access:** ✅ Yes

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "role": "user",
  "permissions": [
    "view_profile",
    "update_profile",
    "view_dashboard"
  ]
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 2. Login User
**Endpoint:** `POST /api/auth/login`

**Public Access:** ✅ Yes

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "role": "admin",
  "permissions": [
    "manage_users",
    "delete_users",
    "update_roles",
    "view_admin_dashboard",
    ...
  ]
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Note:** JWT stored in HTTP-only cookie named `token`

---

### 3. Logout User
**Endpoint:** `POST /api/auth/logout`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

---

### 4. Check Authentication
**Endpoint:** `GET /api/auth/is-auth`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```
No body required
```

**Response (Authenticated):**
```json
{
  "success": true,
  "userData": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "isAccountVerified": true,
    "permissions": [
      "manage_users",
      "delete_users",
      ...
    ]
  }
}
```

**Response (Not Authenticated):**
```json
{
  "success": false,
  "message": "User not authenticated"
}
```

---

### 5. Send Verification OTP
**Endpoint:** `POST /api/auth/send-verify-otp`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

---

### 6. Verify Account
**Endpoint:** `POST /api/auth/verify-account`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```json
{
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

### 7. Send Password Reset OTP
**Endpoint:** `POST /api/auth/send-reset-otp`

**Public Access:** ✅ Yes

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset OTP sent to email"
}
```

---

### 8. Reset Password
**Endpoint:** `POST /api/auth/reset-password`

**Public Access:** ✅ Yes

**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 👤 User Routes (`/api/user`)

### 1. Get User Data
**Endpoint:** `GET /api/user/data`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```
No body required
```

**Response:**
```json
{
  "success": true,
  "userData": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isAccountVerified": true,
    "permissions": [
      "view_profile",
      "update_profile",
      "view_dashboard"
    ]
  }
}
```

---

### 2. Get User Profile
**Endpoint:** `GET /api/user/profile`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```
No body required
```

**Response:**
```json
{
  "success": true,
  "userData": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isAccountVerified": true,
    "organization": "default",
    "lastLogin": "2024-04-26T10:30:00Z"
  }
}
```

---

### 3. Update User Profile
**Endpoint:** `PUT /api/user/profile`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "userData": {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user"
  }
}
```

---

### 4. Change Password
**Endpoint:** `POST /api/user/change-password`

**Protected:** ✅ Yes (authMiddleware)

**Request:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

## 👔 Manager Routes (`/api/manager`)

**Required Role:** manager OR admin  
**All routes require:** authMiddleware → roleMiddleware(['admin', 'manager'])

### 1. Get All Users
**Endpoint:** `GET /api/manager/users`

**Required Permission:** `view_users`

**Query Parameters:**
```
?search=name
?role=admin|manager|user
?page=1
?limit=10
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isAccountVerified": true,
      "organization": "default",
      "lastLogin": "2024-04-26T10:30:00Z"
    },
    {
      "_id": "user_id_2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "manager",
      "isAccountVerified": true,
      "organization": "default",
      "lastLogin": "2024-04-26T09:15:00Z"
    }
  ],
  "total": 25,
  "page": 1
}
```

---

### 2. Get User Details
**Endpoint:** `GET /api/manager/user/:userId`

**Required Permission:** `view_users`

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isAccountVerified": true,
    "organization": "default",
    "lastLogin": "2024-04-26T10:30:00Z",
    "isActive": true
  }
}
```

---

### 3. Update User Information
**Endpoint:** `PUT /api/manager/user/:userId`

**Required Permission:** `update_users`

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user"
  }
}
```

**Note:** Manager cannot change role or permissions

---

### 4. Get Manager Statistics
**Endpoint:** `GET /api/manager/stats`

**Required Permission:** `view_manager_dashboard`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 45,
    "regularUsers": 35,
    "managers": 8,
    "admins": 2,
    "verifiedUsers": 43,
    "unverifiedUsers": 2
  }
}
```

---

## 👨‍💼 Admin Routes (`/api/admin`)

**Required Role:** admin ONLY  
**All routes require:** authMiddleware → roleMiddleware(['admin'])

### 1. Get All Users
**Endpoint:** `GET /api/admin/users`

**Required Permission:** `manage_users`

**Query Parameters:**
```
?search=name
?role=admin|manager|user
?organization=org_id
?page=1
?limit=20
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "customPermissions": [],
      "organization": "default",
      "isAccountVerified": true,
      "lastLogin": "2024-04-26T10:30:00Z",
      "isActive": true,
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ],
  "total": 156,
  "page": 1
}
```

---

### 2. Get User Details
**Endpoint:** `GET /api/admin/user/:userId`

**Required Permission:** `view_users`

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "customPermissions": [],
    "permissions": [
      "view_profile",
      "update_profile",
      "view_dashboard"
    ],
    "organization": "default",
    "isAccountVerified": true,
    "lastLogin": "2024-04-26T10:30:00Z",
    "isActive": true
  }
}
```

---

### 3. Delete User
**Endpoint:** `DELETE /api/admin/user/:id`

**Required Permission:** `delete_users`

**Request:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Note:** Performs soft delete (sets isActive to false), admin cannot delete themselves

---

### 4. Update User Role
**Endpoint:** `PUT /api/admin/user/:id/role`

**Required Permission:** `update_roles`

**Request:**
```json
{
  "role": "manager"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role updated successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager"
  }
}
```

**Allowed Roles:** admin | manager | user

---

### 5. Grant Custom Permissions
**Endpoint:** `POST /api/admin/user/:id/permissions`

**Required Permission:** `manage_permissions`

**Request:**
```json
{
  "permissions": [
    "view_activity_log",
    "manage_activity_log",
    "delete_users"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Permissions granted successfully",
  "user": {
    "_id": "user_id",
    "role": "user",
    "customPermissions": [
      "view_activity_log",
      "manage_activity_log",
      "delete_users"
    ]
  }
}
```

---

### 6. Get Admin Statistics
**Endpoint:** `GET /api/admin/stats`

**Required Permission:** `view_admin_dashboard`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 156,
    "totalAdmins": 5,
    "totalManagers": 20,
    "totalRegularUsers": 131,
    "verifiedUsers": 152,
    "unverifiedUsers": 4,
    "activeUsers": 140,
    "inactiveUsers": 16,
    "organizations": 3,
    "lastWeekNewUsers": 12,
    "lastMonthActiveUsers": 130
  }
}
```

---

### 7. Get Available Permissions
**Endpoint:** `GET /api/admin/permissions`

**Required Role:** admin (no specific permission)

**Response:**
```json
{
  "success": true,
  "permissions": {
    "MANAGE_USERS": "manage_users",
    "VIEW_USERS": "view_users",
    "UPDATE_USERS": "update_users",
    "DELETE_USERS": "delete_users",
    "UPDATE_ROLES": "update_roles",
    "VIEW_PROFILE": "view_profile",
    "UPDATE_PROFILE": "update_profile",
    "DELETE_PROFILE": "delete_profile",
    "VIEW_DASHBOARD": "view_dashboard",
    "VIEW_ADMIN_DASHBOARD": "view_admin_dashboard",
    "VIEW_MANAGER_DASHBOARD": "view_manager_dashboard",
    "VIEW_ACTIVITY_LOG": "view_activity_log",
    "MANAGE_ACTIVITY_LOG": "manage_activity_log",
    "MANAGE_ROLES": "manage_roles",
    "MANAGE_PERMISSIONS": "manage_permissions"
  },
  "rolePermissions": {
    "admin": [
      "manage_users",
      "delete_users",
      ...
    ],
    "manager": [
      "view_users",
      "update_users",
      ...
    ],
    "user": [
      "view_profile",
      "update_profile",
      "view_dashboard"
    ]
  }
}
```

---

## 🛡️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed: Email is required"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Please login first"
}
```

### 403 - Forbidden (Insufficient Permissions)
```json
{
  "success": false,
  "message": "Access denied. Required permission(s): delete_users"
}
```

### 403 - Forbidden (Wrong Role)
```json
{
  "success": false,
  "message": "Access denied. Required role(s): admin"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 409 - Conflict
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "An unexpected error occurred"
}
```

---

## 🔄 Authentication Flow

1. **Register** → New user created with role='user'
2. **Login** → JWT generated with role + permissions
3. **Access Route** → JWT verified, role checked, permission checked
4. **Unauthorized** → 403 returned with missing requirement
5. **Logout** → JWT cookie cleared

---

## 📝 Request Headers

### Required Headers for Protected Routes
```
Authorization: Bearer {token}
(or Cookie: token={jwt_token})

Content-Type: application/json
```

### Optional Headers
```
X-Organization-ID: org_123
(for multi-tenant filtering)
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Protected Route with Cookie
```bash
curl -X GET http://localhost:4000/api/admin/users \
  -b cookies.txt
```

### Protected Route with Bearer Token
```bash
curl -X GET http://localhost:4000/api/admin/users \
  -H "Authorization: Bearer {jwt_token}"
```

---

## 📊 Status Code Summary

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful request |
| 201 | Created | New resource created |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | No valid token |
| 403 | Forbidden | Insufficient permissions/role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email/data |
| 500 | Server Error | Unexpected error |

---

## 🔐 Permission Codes

```
MANAGE_USERS         - manage_users
VIEW_USERS           - view_users
UPDATE_USERS         - update_users
DELETE_USERS         - delete_users
UPDATE_ROLES         - update_roles
VIEW_PROFILE         - view_profile
UPDATE_PROFILE       - update_profile
DELETE_PROFILE       - delete_profile
VIEW_DASHBOARD       - view_dashboard
VIEW_ADMIN_DASHBOARD - view_admin_dashboard
VIEW_MANAGER_DASHBOARD - view_manager_dashboard
VIEW_ACTIVITY_LOG    - view_activity_log
MANAGE_ACTIVITY_LOG  - manage_activity_log
MANAGE_ROLES         - manage_roles
MANAGE_PERMISSIONS   - manage_permissions
```

---

Generated: April 2024  
Version: 1.0
