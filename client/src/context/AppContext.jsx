import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const AppContext = createContext();

export { AppContext };

export const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [userPermissions, setUserPermissions] = useState(
    JSON.parse(localStorage.getItem('userPermissions')) || []
  );
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if(data.success){
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserPermissions([]);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userPermissions');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserPermissions([]);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userPermissions');
    } finally {
      setLoading(false);
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if(data.success) {
        setUserData(data.userData);
        // Store role and permissions in state and localStorage for persistence
        if (data.userData.role) {
          setUserRole(data.userData.role);
          localStorage.setItem('userRole', data.userData.role);
        }
        if (data.userData.permissions) {
          setUserPermissions(data.userData.permissions);
          localStorage.setItem('userPermissions', JSON.stringify(data.userData.permissions));
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const hasPermission = (permission) => {
    return userPermissions && userPermissions.includes(permission);
  }

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => 
      userPermissions && userPermissions.includes(permission)
    );
  }

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => 
      userPermissions && userPermissions.includes(permission)
    );
  }

  const logout = async () => {
    try {
      await axios.post(backendUrl + "/api/auth/logout");
      setIsLoggedIn(false);
      setUserData(null);
      setUserRole(null);
      setUserPermissions([]);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userPermissions');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    userRole,
    setUserRole,
    userPermissions,
    setUserPermissions,
    getUserData,
    logout,
    loading,
    // Permission helper functions
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};