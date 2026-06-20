import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import Unauthorized from "./pages/Unauthorized"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { ToastContainer } from 'react-toastify';
import About from '../src/pages/About.jsx';
import Services from '../src/pages/Services.jsx';
import Project from '../src/pages/Project.jsx';
import Contact from '../src/pages/Contact.jsx';
import ProductManagement from "../src/pages/ProductManagement.jsx";
import ProductList from "../src/pages/ProductList.jsx";
import EditProduct from "../src/pages/EditProduct.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"
import Quote from "./pages/Quote.jsx";

function App() {

  return (
    <>
      <ToastContainer />

      <ScrollToTop />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/project" element={<Project />} />
        <Route path="/quote" element={<Quote />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute requiredRoles={['user', 'manager', 'admin']}>
              <ProductList />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/products"
          element={
            <ProtectedRoute requiredRoles={['manager', 'admin']}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/products/:id/edit"
          element={
            <ProtectedRoute requiredRoles={['manager', 'admin']}>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />



      </Routes>
      <ScrollToTop />
      
    </>
  )
}

export default App
