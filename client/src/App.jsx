import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import Unauthorized from "./pages/Unauthorized"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from 'react-toastify';
import About from '../src/pages/About.jsx';
import Services from '../src/pages/Services.jsx';
import Project from '../src/pages/Project.jsx';
import Contact from '../src/pages/Contact.jsx';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/project" element={<Project />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Routes - Protected */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['user', 'manager', 'admin']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Manager Routes - Protected */}
        <Route 
          path="/manager/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['manager', 'admin']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes - Protected */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
