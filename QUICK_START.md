# 🚀 Quick Start Guide - SaaS RBAC System

## ⚙️ Backend Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
Create `.env` file:
```
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_ultra_secret_key_12345
SENDER_EMAIL=your_email@gmail.com
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/rbac
```

### 3. Start Backend
```bash
npm run server
# Backend runs on http://localhost:4000
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure .env
Create `.env.local`:
```
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 Testing Workflows

### Test 1: User Registration & Login

#### Step 1: Register New User
1. Go to `http://localhost:5173/login`
2. Click "Sign Up"
3. Fill form:
   - Name: `John Doe`
   - Email: `user@example.com`
   - Password: `password123`
4. Click "Sign Up"
5. Auto-redirect to `/dashboard` (user role)

#### Step 2: Check localStorage
Open Browser DevTools → Application → localStorage
```
userRole: "user"
userPermissions: ["view_profile", "update_profile", "view_dashboard"]
```

#### Step 3: Verify User Dashboard
- See profile info
- Cannot access `/admin/dashboard` → Redirect to `/unauthorized`
- Cannot access `/manager/dashboard` → Redirect to `/unauthorized`

---

### Test 2: Manager Role

#### Step 1: Promote User to Manager (Backend)
```bash
# Via MongoDB or API call
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "manager" } }
)
```

#### Step 2: Re-login
1. Logout from user dashboard
2. Login again with same credentials
3. JWT now includes manager permissions
4. Redirect to `/manager/dashboard`

#### Step 3: Test Manager Permissions
- ✅ View all users
- ✅ Edit user information (name, email)
- ❌ Cannot delete users
- ❌ Cannot change user roles
- ❌ Cannot access admin dashboard

---

### Test 3: Admin Role

#### Step 1: Create Admin Account
1. Register new account:
   - Email: `admin@example.com`
   - Password: `admin123`

#### Step 2: Promote to Admin (Backend)
```bash
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

#### Step 3: Re-login & Test Admin Permissions
1. Logout → Login with admin credentials
2. Redirect to `/admin/dashboard`
3. ✅ View all users with full details
4. ✅ Delete users
5. ✅ Change user roles
6. ✅ Grant custom permissions
7. ✅ View statistics

---

### Test 4: Permission-Based Actions

#### Test 4a: Delete User (Requires 'delete_users' Permission)
```bash
# Admin tries to delete user
curl -X DELETE http://localhost:4000/api/admin/user/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID"}'

# Response: 200 - Success
# Manager tries: Response: 403 - Access Denied
```

#### Test 4b: Grant Custom Permissions (Requires 'manage_permissions')
```bash
# Admin grants permission to user
curl -X POST http://localhost:4000/api/admin/user/USER_ID/permissions \
  -H "Content-Type: application/json" \
  -d '{
    "permissions": ["view_activity_log", "manage_activity_log"]
  }'

# User now has extra permissions beyond their role
```

---

### Test 5: Frontend Permission Checks

#### In Component:
```jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Component() {
  const { hasPermission, userRole } = useContext(AppContext);

  return (
    <div>
      {hasPermission('delete_users') && (
        <button>Delete User</button>
      )}
      
      {userRole === 'admin' && (
        <div>Admin Only Section</div>
      )}
    </div>
  );
}
```

---

## 📊 Test Matrix

| Action | User | Manager | Admin |
|--------|------|---------|-------|
| View Own Profile | ✅ | ✅ | ✅ |
| Update Own Profile | ✅ | ✅ | ✅ |
| View All Users | ❌ | ✅ | ✅ |
| Edit User Info | ❌ | ✅ | ✅ |
| Delete Users | ❌ | ❌ | ✅ |
| Change Roles | ❌ | ❌ | ✅ |
| Grant Permissions | ❌ | ❌ | ✅ |
| View Admin Dashboard | ❌ | ❌ | ✅ |
| View Manager Dashboard | ❌ | ✅ | ✅ |
| View User Dashboard | ✅ | ✅ | ✅ |

---

## 🔍 API Testing with cURL

### Register User
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

### Get Admin Users
```bash
curl -X GET http://localhost:4000/api/admin/users \
  -b cookies.txt
```

### Get Manager Users
```bash
curl -X GET http://localhost:4000/api/manager/users \
  -b cookies.txt
```

### Get User Profile
```bash
curl -X GET http://localhost:4000/api/user/profile \
  -b cookies.txt
```

---

## 🎯 Common Issues & Solutions

### Issue 1: "Token has expired"
**Solution**: Re-login to get fresh token
```bash
# Check token in cookies
# Clear cookies and login again
```

### Issue 2: "Access denied" on admin action
**Solution**: Verify user is admin with permission
```bash
# Check role: GET /api/auth/is-auth
# Should return role: "admin"
# Check permissions include required action
```

### Issue 3: Frontend shows "Loading" indefinitely
**Solution**: Check backend is running and token is valid
```bash
# Make sure http://localhost:4000 is accessible
# Check VITE_BACKEND_URL in .env.local
# Verify JWT_SECRET matches
```

### Issue 4: CORS error
**Solution**: Verify FRONTEND_URL in backend .env
```
FRONTEND_URL=http://localhost:5173
```
And ensure CORS middleware is enabled in server.js

---

## 📱 API Response Examples

### Successful Login with Admin Role
```json
{
  "success": true,
  "role": "admin",
  "permissions": [
    "manage_users",
    "delete_users",
    "update_roles",
    "view_dashboard",
    "manage_permissions",
    "view_admin_dashboard",
    ...
  ]
}
```

### Permission Denied Error
```json
{
  "success": false,
  "message": "Access denied. Required permission(s): delete_users"
}
```

### User Data Response
```json
{
  "success": true,
  "userData": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "permissions": [
      "manage_users",
      "delete_users",
      ...
    ],
    "isAccountVerified": true,
    "organization": "default",
    "lastLogin": "2024-04-26T10:30:00Z",
    "isActive": true
  }
}
```

---

## 🛠️ Development Tips

### 1. Debug Mode
Enable console logs in browser DevTools:
```javascript
// In browser console
localStorage.getItem('userRole')        // Check role
localStorage.getItem('userPermissions') // Check permissions
```

### 2. Clear Cache & Cookies
```bash
# In browser
# DevTools → Application → Clear all
# Or manual: Delete localStorage, cookies, cache
```

### 3. MongoDB Query Examples
```javascript
// Get admin users
db.users.find({ role: "admin" })

// Promote user to admin
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

// Grant custom permission
db.users.updateOne(
  { email: "user@example.com" },
  { $push: { customPermissions: "view_activity_log" } }
)

// Get all managers
db.users.find({ role: "manager" })

// Soft delete user
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { isActive: false } }
)
```

---

## ✅ Final Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] User redirects to correct dashboard
- [ ] localStorage has role and permissions
- [ ] Can access protected routes based on role
- [ ] Cannot access unauthorized routes
- [ ] Admin can manage users
- [ ] Manager has limited access
- [ ] Permission-based UI works
- [ ] Logout clears data

---

## 🎓 Next Steps

1. **Add 2FA** - Two-factor authentication
2. **Activity Log** - Log all admin actions
3. **Audit Trail** - Track who changed what and when
4. **Refresh Tokens** - Better security
5. **Rate Limiting** - Prevent abuse
6. **Email Notifications** - Notify on role/permission changes
7. **Role Templates** - Pre-defined role combinations
8. **API Documentation** - Swagger/OpenAPI

---

**🎉 Your SaaS-level RBAC system is ready to use!**
