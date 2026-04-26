# 🚀 SaaS-Level Role-Based & Permission-Based Access Control System

<div align="center">

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**A complete, production-grade RBAC/PBAC system for MERN applications**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-Based Authentication** - Secure token with permissions
- **Three-Role Hierarchy** - Admin, Manager, User (easily extensible)
- **Granular Permissions** - 15+ permission types for fine-grained control
- **Custom Permission Overrides** - Grant extra permissions beyond roles
- **Multi-Tenant Ready** - Organization field for data isolation
- **Activity Logging** - Track last login and timestamps

### 🛡️ Security
- **Password Hashing** - bcryptjs with salt rounds
- **HTTP-Only Cookies** - Prevent XSS attacks
- **CORS Protection** - Restricted to frontend origin
- **Centralized Error Handling** - Consistent error responses
- **Soft Deletes** - Deactivate instead of hard delete
- **Request Validation** - Input sanitization

### 🎨 Frontend Integration
- **Protected Routes** - Role and permission checking
- **Permission Helper Functions** - `hasPermission()`, `hasAnyPermission()`, `hasAllPermissions()`
- **Context API Management** - Centralized auth state
- **localStorage Persistence** - Offline capability
- **Three Dashboards** - User, Manager, Admin with role-appropriate features
- **Role-Based Navigation** - Smart navbar with conditional rendering

### 🏗️ Architecture
- **Service Layer** - Business logic separation
- **Middleware Chain** - Stackable auth → role → permission
- **Configuration-Driven** - Centralized permission definitions
- **MVC Pattern** - Clean separation of concerns
- **Database Indexing** - Optimized queries
- **Error Classes** - Standardized error handling

### 📈 Scalability
- **Multi-Tenant Support** - Organization field for scale
- **Extensible Permissions** - Add new permissions easily
- **Service-Based Architecture** - Testable code
- **Prepared for Growth** - Audit logs, refresh tokens, 2FA ready

---

## 🏗️ Architecture Overview

### Three-Layer Middleware Protection
```
Request with JWT
    ↓
authMiddleware (Verify token, fetch user with permissions)
    ↓
roleMiddleware (Check user role is allowed)
    ↓
permissionMiddleware (Check user has required permission)
    ↓
Controller (Process request)
```

### Three-Role Hierarchy
```
Admin (15 permissions)
├── All Manager Permissions
├── All User Permissions
└── + Sensitive operations (delete, role changes)

Manager (7 permissions)
├── All User Permissions
├── + View/update users
└── + View activity logs

User (3 permissions)
├── View own profile
├── Update own profile
└── View personal dashboard
```

### System Architecture
```
Frontend (React)
    ↓ API Calls
Backend (Express)
    ├── Routes (authRoutes, userRoutes, adminRoutes, managerRoutes)
    ├── Middleware (authMiddleware, roleMiddleware, permissionMiddleware)
    ├── Controllers (authController, userController, adminController, managerController)
    ├── Services (userService - business logic)
    ├── Models (userModel - database schema)
    └── Config (rolePermission - permission definitions)
    ↓
Database (MongoDB)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd server
npm install

# Create .env file
echo "PORT=4000" > .env
echo "JWT_SECRET=your_secret_key_here" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
echo "SENDER_EMAIL=your_email@gmail.com" >> .env
echo "MONGODB_URL=mongodb://localhost:27017/rbac" >> .env
echo "NODE_ENV=development" >> .env

npm run server
# Backend runs on http://localhost:4000
```

### Frontend Setup
```bash
cd client
npm install

# Create .env.local file
echo "VITE_BACKEND_URL=http://localhost:4000" > .env.local

npm run dev
# Frontend runs on http://localhost:5173
```

### Test the System
1. Register a new user → Redirects to `/dashboard` (user role)
2. Promote user to admin via MongoDB:
   ```bash
   db.users.updateOne(
     { email: "user@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Re-login → Redirects to `/admin/dashboard`
4. Test permission-based actions → Admin can delete/manage, user cannot

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) | **START HERE** - Navigation guide |
| [QUICK_START.md](QUICK_START.md) | Setup & testing workflows |
| [RBAC_DOCUMENTATION.md](RBAC_DOCUMENTATION.md) | Complete system guide |
| [API_REFERENCE.md](API_REFERENCE.md) | All endpoints with examples |
| [PERMISSION_MATRIX.md](PERMISSION_MATRIX.md) | Permission reference |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Production deployment |

---

## 📡 API Endpoints

### Public Routes
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/send-reset-otp    - Request password reset
POST   /api/auth/reset-password    - Reset password
```

### User Routes (Protected)
```
GET    /api/user/data              - Get user data with permissions
GET    /api/user/profile           - Get profile details
PUT    /api/user/profile           - Update profile
POST   /api/user/change-password   - Change password
```

### Manager Routes (Manager + Admin)
```
GET    /api/manager/users          - View all users (permission: view_users)
GET    /api/manager/user/:id       - View user detail (permission: view_users)
PUT    /api/manager/user/:id       - Update user (permission: update_users)
GET    /api/manager/stats          - View statistics (permission: view_manager_dashboard)
```

### Admin Routes (Admin Only)
```
GET    /api/admin/users            - Manage all users (permission: manage_users)
GET    /api/admin/user/:id         - View user (permission: view_users)
DELETE /api/admin/user/:id         - Delete user (permission: delete_users)
PUT    /api/admin/user/:id/role    - Change role (permission: update_roles)
POST   /api/admin/user/:id/permissions - Grant permissions (permission: manage_permissions)
GET    /api/admin/stats            - Dashboard stats (permission: view_admin_dashboard)
GET    /api/admin/permissions      - Available permissions reference
```

**Full API Reference:** See [API_REFERENCE.md](API_REFERENCE.md)

---

## 🔐 Roles & Permissions

### Admin Role
✅ Complete system control  
- manage_users, delete_users, update_roles
- manage_permissions, manage_roles, manage_activity_log
- view_admin_dashboard, view_activity_log
- ... and all user/manager permissions

### Manager Role
✅ Limited administrative control  
- view_users, update_users
- view_manager_dashboard, view_activity_log
- ... and all user permissions

### User Role
✅ Self-service access  
- view_profile, update_profile, view_dashboard

**Custom permissions can override role defaults for special cases!**

Full matrix: See [PERMISSION_MATRIX.md](PERMISSION_MATRIX.md)

---

## 🎯 Frontend Usage

### Protect Routes with Roles
```jsx
<ProtectedRoute requiredRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

### Protect Routes with Permissions
```jsx
<ProtectedRoute requiredPermissions={['delete_users']}>
  <DeleteUserButton />
</ProtectedRoute>
```

### Check Permissions in Components
```jsx
const { hasPermission } = useContext(AppContext);

if (hasPermission('update_users')) {
  return <EditButton />;
}
```

### Combine Role & Permission Checks
```jsx
<ProtectedRoute 
  requiredRoles={['admin', 'manager']}
  requiredPermissions={['view_users']}
  requireAllPermissions={true}
>
  <Dashboard />
</ProtectedRoute>
```

---

## 📊 Key Files

### Backend
- **`server.js`** - Main entry point
- **`config/rolePermission.js`** - Permission definitions
- **`services/userService.js`** - Business logic
- **`middleware/`** - authMiddleware, roleMiddleware, permissionMiddleware
- **`routes/`** - authRoutes, userRoutes, adminRoutes, managerRoutes
- **`model/userModel.js`** - Enhanced user schema

### Frontend
- **`context/AppContext.jsx`** - State management with permissions
- **`components/ProtectedRoute.jsx`** - Role & permission protection
- **`pages/AdminDashboard.jsx`** - Admin dashboard
- **`pages/ManagerDashboard.jsx`** - Manager dashboard
- **`pages/UserDashboard.jsx`** - User dashboard

---

## 🧪 Testing

### Test User Registration & Login
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Test Admin Operations
```bash
curl -X GET http://localhost:4000/api/admin/users \
  -b cookies.txt
```

### Test Manager Operations
```bash
curl -X GET http://localhost:4000/api/manager/users \
  -b cookies.txt
```

**Full testing guide:** See [QUICK_START.md](QUICK_START.md)

---

## 🚀 Deployment

### Pre-Deployment Checklist
- [ ] Create `.env` with strong JWT_SECRET
- [ ] Configure MongoDB with authentication
- [ ] Enable HTTPS/SSL
- [ ] Set `secure: true` for cookies
- [ ] Configure CORS to specific origins
- [ ] Test all permission scenarios
- [ ] Setup monitoring and logging
- [ ] Create database backups

### Deploy
```bash
# Backend (choose your platform)
# Heroku: git push heroku main
# AWS: Deploy to EC2 / Elastic Beanstalk
# GCP: Deploy to Cloud Run / App Engine

# Frontend (choose your platform)
# Vercel: git push (auto-deploys)
# Netlify: Build & deploy
# AWS S3 + CloudFront: Upload static files
```

**Full deployment guide:** See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## ✅ Production Ready

This system includes:
- ✅ Complete error handling
- ✅ Security best practices
- ✅ Multi-tenant support
- ✅ Database indexing
- ✅ Activity logging
- ✅ Soft deletes
- ✅ Clean code architecture
- ✅ Comprehensive documentation
- ✅ Test scenarios
- ✅ Deployment guides

---

## 📈 Scalability Features

### Already Implemented
- Multi-tenant organization field
- Service layer for testability
- Middleware composition
- Permission override system
- Database optimization

### Ready to Add
- Refresh token rotation
- Two-factor authentication (2FA)
- Activity audit trail
- Rate limiting
- Advanced permission inheritance
- API versioning

---

## 🔗 Relationships

```
User → Role → Default Permissions → 
       Custom Permissions Override →
       Final Permissions Set →
       Access Control Checks
```

---

## 🌟 Highlights

🎯 **Production Grade** - Ready for real-world use  
🔐 **Secure** - JWT, bcrypt, CORS, HTTP-only cookies  
📈 **Scalable** - Multi-tenant, service layer, extensible  
📚 **Well-Documented** - 7 comprehensive guides  
🏗️ **Clean Architecture** - MVC pattern, separation of concerns  
⚡ **Performant** - Database indexing, optimized queries  
🧪 **Testable** - Service layer, clear contracts  
🚀 **Ready to Deploy** - Deployment checklist included  

---

## 📞 Support

### Documentation
1. **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Start here for navigation
2. **[RBAC_DOCUMENTATION.md](RBAC_DOCUMENTATION.md)** - Complete system guide
3. **[API_REFERENCE.md](API_REFERENCE.md)** - API endpoints

### Common Issues
- **"Token expired"** → Re-login to refresh
- **"Permission denied"** → Check user role and permissions
- **CORS error** → Verify FRONTEND_URL in .env
- **Database connection** → Check MongoDB is running
- **API not responding** → Check backend is running on port 4000

### Troubleshooting
See [QUICK_START.md](QUICK_START.md#troubleshooting) for common solutions

---

## 🎓 Learning Path

### For Developers (New to RBAC)
1. Read [QUICK_START.md](QUICK_START.md) - 15 minutes
2. Setup locally - 20 minutes
3. Run tests - 20 minutes
4. Read [RBAC_DOCUMENTATION.md](RBAC_DOCUMENTATION.md) - 30 minutes
5. Review code - 30 minutes
6. Try modifications - Ongoing

### For Team Leads
1. Read [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Overview
2. Review [PERMISSION_MATRIX.md](PERMISSION_MATRIX.md) - What's available
3. Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Readiness

### For DevOps
1. Read [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Complete guide
2. Setup infrastructure - Following checklist
3. Deploy - Following procedures
4. Monitor - Setup alerts

---

## 🎉 What You Get

### Backend
- ✅ 3 role-based controllers
- ✅ 4 route files with proper middleware
- ✅ Service layer with business logic
- ✅ Centralized error handling
- ✅ Permission configuration system
- ✅ Enhanced user model with timestamps

### Frontend
- ✅ 3 role-specific dashboards
- ✅ Enhanced ProtectedRoute component
- ✅ Permission helper functions
- ✅ Context with permission management
- ✅ Role-based navigation
- ✅ localStorage persistence

### Documentation
- ✅ 7 comprehensive guides
- ✅ API reference with examples
- ✅ Permission matrix
- ✅ Deployment checklist
- ✅ Implementation summary
- ✅ Troubleshooting guide

### Testing
- ✅ Test workflows
- ✅ cURL examples
- ✅ Test matrix
- ✅ Common scenarios

---

## 📝 Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0 | April 2024 | ✅ Production Ready |

---

## 🚀 Next Steps

1. **Read** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
2. **Setup** using [QUICK_START.md](QUICK_START.md)
3. **Test** the system with provided workflows
4. **Deploy** following [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
5. **Maintain** and grow your system

---

<div align="center">

**🎉 Welcome to your production-grade RBAC system! 🎉**

Built with ❤️ for SaaS applications

---

[Back to Top](#-saas-level-role-based--permission-based-access-control-system)

</div>
