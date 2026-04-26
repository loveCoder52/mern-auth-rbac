# SaaS-Level Role-Based Access Control (RBAC) System

## 📋 Overview

This is a production-ready RBAC system with permission-based access control designed for SaaS applications. It features three roles (Admin, Manager, User) with granular permissions, scalable architecture, and best practices throughout.

---

## 🏗️ Architecture

### Backend Structure
```
server/
├── config/
│   ├── mongodb.js          # Database connection
│   ├── nodemailer.js       # Email service
│   ├── rolePermission.js   # ✨ Role & Permission configuration
│   └── emailTemplates.js   # Email templates
├── controller/
│   ├── authController.js   # Authentication logic
│   ├── userController.js   # User profile management
│   ├── adminController.js  # Admin operations
│   └── managerController.js # Manager operations
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── roleAuth.js              # Role validation
│   ├── permissionMiddleware.js  # Permission validation
│   └── userAuth.js              # Legacy (still compatible)
├── model/
│   └── userModel.js        # ✨ Enhanced user schema
├── routes/
│   ├── authRoutes.js       # Public auth endpoints
│   ├── userRoutes.js       # User endpoints
│   ├── adminRoutes.js      # Admin endpoints (protected)
│   ├── managerRoutes.js    # Manager endpoints (protected)
│   └── userAuth.js         # Legacy
├── services/
│   └── userService.js      # ✨ Business logic layer
├── utils/
│   └── errors.js           # ✨ Centralized error handling
└── server.js               # Main server file
```

### Frontend Structure
```
client/src/
├── components/
│   ├── ProtectedRoute.jsx  # ✨ Enhanced route protection
│   ├── Navbar.jsx          # ✨ Role-based navigation
│   └── Header.jsx
├── context/
│   └── AppContext.jsx      # ✨ Enhanced with permissions
├── pages/
│   ├── Login.jsx           # ✨ Role-based redirect
│   ├── UserDashboard.jsx   # User panel
│   ├── AdminDashboard.jsx  # Admin panel
│   ├── ManagerDashboard.jsx # ✨ New manager panel
│   ├── Unauthorized.jsx    # 403 error page
│   └── [other pages]
└── App.jsx                 # ✨ Updated routing
```

---

## 🔐 Authentication & Authorization Flow

### 1. **User Registration**
```
User fills form → Hash password → Create user with role='user' → 
Generate JWT with [id, role, permissions] → Send welcome email
```

### 2. **User Login**
```
Email + Password → Verify password → Fetch user with permissions → 
Generate JWT with [id, role, permissions] → 
Redirect based on role → Store in localStorage
```

### 3. **Protected Route Access**
```
Access protected route → Check JWT token → Verify role → 
Check permissions → Render component or redirect to /unauthorized
```

---

## 👥 Role & Permission System

### **Roles**

| Role | Description | Use Case |
|------|-----------|----------|
| **Admin** | Full system control | System administrators |
| **Manager** | Limited user management | Team leads, supervisors |
| **User** | Self-service access | Regular end-users |

### **Permissions Map**

#### Admin Permissions
- `manage_users` - Create, update, delete users
- `delete_users` - Delete user accounts
- `update_roles` - Change user roles
- `manage_permissions` - Grant/revoke permissions
- `view_admin_dashboard` - Access admin dashboard
- `view_activity_log` - View system activity
- `manage_activity_log` - Manage activity logs
- ... and all user/manager permissions

#### Manager Permissions
- `view_users` - View all users
- `update_users` - Modify user information
- `view_manager_dashboard` - Access manager dashboard
- `view_activity_log` - View activity logs
- ... and all user permissions

#### User Permissions
- `view_profile` - View own profile
- `update_profile` - Edit own profile
- `view_dashboard` - Access user dashboard

---

## 📡 API Endpoints

### **Authentication** (`/api/auth`)
```
POST   /register              - Register new user
POST   /login                 - Login user
POST   /logout                - Logout (protected)
GET    /is-auth               - Check auth status (protected)
POST   /send-verify-otp       - Send verification OTP (protected)
POST   /verify-account        - Verify email (protected)
POST   /send-reset-otp        - Send password reset OTP
POST   /reset-password        - Reset password
```

### **User** (`/api/user`) - All Protected
```
GET    /data                  - Get user data with permissions
GET    /profile               - Get detailed profile
PUT    /profile               - Update profile
POST   /change-password       - Change password
```

### **Admin** (`/api/admin`) - Protected + Role Check + Permission Check
```
GET    /users                 - Get all users (manage_users)
GET    /user/:userId          - Get user details (view_users)
DELETE /user/:id              - Delete user (delete_users)
PUT    /user/:id/role         - Update user role (update_roles)
POST   /user/:id/permissions  - Grant permissions (manage_permissions)
GET    /stats                 - Dashboard statistics (view_admin_dashboard)
GET    /permissions           - Get available permissions
```

### **Manager** (`/api/manager`) - Protected + Role Check + Permission Check
```
GET    /users                 - Get all users (view_users)
GET    /user/:userId          - Get user details (view_users)
PUT    /user/:userId          - Update user info (update_users)
GET    /stats                 - Dashboard statistics (view_manager_dashboard)
```

---

## 🔑 JWT Token Structure

```javascript
{
  id: "user_id",
  role: "admin|manager|user",
  permissions: [
    "manage_users",
    "delete_users",
    "view_dashboard",
    ...
  ],
  iat: 1234567890,
  exp: 1234654290
}
```

---

## 🛡️ Security Features

✅ **Password Hashing** - bcryptjs with salt rounds  
✅ **JWT Authentication** - Secure token-based auth  
✅ **Role-Based Access Control** - Role validation middleware  
✅ **Permission-Based Access Control** - Granular permission checks  
✅ **Soft Deletes** - Deactivate instead of hard delete  
✅ **HTTP-only Cookies** - Prevent XSS attacks  
✅ **CORS Protection** - Restricted origins  
✅ **Input Validation** - Sanitized user inputs  
✅ **Error Handling** - Consistent error responses  
✅ **Activity Logging** - Track lastLogin timestamps  

---

## 🚀 Middleware Stack

### Authentication Chain
```
Request → authMiddleware (verify JWT) → 
roleMiddleware (check role) → 
permissionMiddleware (check permission) → 
Controller
```

### Example Usage
```javascript
// Route with multiple protections
router.delete('/user/:id',
  authMiddleware,              // Verify user is authenticated
  roleMiddleware(['admin']),   // Only admins
  permissionMiddleware('delete_users'),  // Must have permission
  deleteUserController         // Process request
);

// Manager can view users
router.get('/users',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),  // Either role
  permissionMiddleware('view_users'),
  getManagerUsersController
);
```

---

## 💾 Enhanced User Model

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: Enum ['admin', 'manager', 'user'],
  customPermissions: [String],    // Override role defaults
  organization: String,            // For multi-tenant support
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean,
  resetOtp: String,
  resetOtpExpireAt: Number,
  lastLogin: Date,                 // Activity tracking
  isActive: Boolean,               // Soft delete flag
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Frontend Implementation

### ProtectedRoute Component
```jsx
<ProtectedRoute 
  requiredRoles={['admin']}
  requiredPermissions={['delete_users']}
  requireAllPermissions={true}  // Requires ALL permissions
>
  <AdminDashboard />
</ProtectedRoute>
```

### Permission Helper Functions
```javascript
const { hasPermission, hasAnyPermission, hasAllPermissions } = useContext(AppContext);

// Check single permission
if (hasPermission('delete_users')) { /* show delete button */ }

// Check any permission
if (hasAnyPermission(['delete_users', 'update_users'])) { /* show buttons */ }

// Check all permissions
if (hasAllPermissions(['delete_users', 'update_users'])) { /* show both */ }
```

### Conditional UI Rendering
```jsx
{hasPermission('manage_users') && (
  <button>Manage Users</button>
)}

{userRole === 'admin' && (
  <div className='admin-section'>Admin Only Content</div>
)}
```

---

## 🧪 Testing Scenarios

### Scenario 1: User Registration
1. Register with new email → User role assigned
2. Check localStorage → userRole = "user"
3. Access `/dashboard` → Shows user dashboard
4. Try `/admin/dashboard` → Redirects to /unauthorized
5. Try `/manager/dashboard` → Redirects to /unauthorized

### Scenario 2: Admin Promotion
1. Register user → User role
2. **Backend**: Update user role to "admin"
3. Re-login → JWT now includes admin permissions
4. Access `/admin/dashboard` → Shows admin dashboard
5. Can delete users, change roles, view stats

### Scenario 3: Manager Functions
1. Create manager account → Manager role
2. Access `/manager/dashboard` → Shows manager dashboard
3. Can view and edit users → No delete/role change
4. Try deleting user → API returns 403 Forbidden
5. Try granting permissions → API returns 403 Forbidden

### Scenario 4: Permission Override
1. Create custom permission for user
2. Grant permission via `/api/admin/user/:id/permissions`
3. User now has extra permission even though role is "user"
4. Can access protected resource specific to that permission

---

## 🔧 Configuration

### Environment Variables (.env)
```
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key_here
SENDER_EMAIL=your_email@gmail.com
NODE_ENV=development
MONGODB_URL=mongodb://...
```

### Role Permission Config (config/rolePermission.js)
```javascript
// Easy to modify and extend
export const ROLE_PERMISSIONS = {
  admin: [/* list of permissions */],
  manager: [/* list of permissions */],
  user: [/* list of permissions */]
};
```

---

## 📈 Scalability Features

✅ **Multi-Tenant Ready** - Organization field for data isolation  
✅ **Service Layer** - Business logic separation  
✅ **Permission Override** - Fine-grained control beyond roles  
✅ **Activity Tracking** - lastLogin, timestamps for analytics  
✅ **Soft Deletes** - Data retention and compliance  
✅ **Centralized Error Handling** - Consistent responses  
✅ **Modular Middleware** - Easy to extend and combine  
✅ **Database Indexing** - Optimized queries  

---

## 🚀 Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set secure `JWT_SECRET`
- [ ] Configure `FRONTEND_URL` for CORS
- [ ] Set `secure: true` for cookies (production)
- [ ] Use HTTPS only
- [ ] Set up CSRF protection
- [ ] Enable rate limiting on sensitive routes
- [ ] Configure MongoDB connection string
- [ ] Set up logging/monitoring
- [ ] Test with production data

---

## 📚 Additional Resources

- **JWT Standard**: [jwt.io](https://jwt.io)
- **OWASP Best Practices**: [owasp.org](https://owasp.org)
- **MongoDB Best Practices**: [MongoDB Docs](https://docs.mongodb.com)
- **Express Security**: [Express Security Guide](https://expressjs.com/en/advanced/best-practice-security.html)

---

## 🎓 Learning Points

### Backend
- JWT token structure and validation
- Role-based middleware chains
- Permission-based access control
- Service layer architecture
- Centralized error handling
- MongoDB indexing

### Frontend
- Context API for state management
- Protected routes with multiple conditions
- Permission-based UI rendering
- localStorage for persistence
- Role-based redirection

---

## 🐛 Troubleshooting

### Issue: "Token Expired"
→ Re-login to get new token with extended expiry

### Issue: "Access Denied" on valid action
→ Check user permissions: `GET /api/admin/permissions`

### Issue: User role not updating
→ Ensure admin making change has `update_roles` permission

### Issue: Frontend not reflecting role change
→ Clear localStorage and re-login to refresh permissions

---

## 📝 Notes

This system is production-ready but can be further enhanced with:
- Refresh token rotation
- Rate limiting
- Two-factor authentication (2FA)
- OAuth2 integration
- Audit logs with detailed history
- Permission expiration dates
- Role-based data filtering

✨ **Built with scalability, security, and maintainability in mind!** ✨
