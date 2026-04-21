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
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); // Store role in state and localStorage

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if(data.success){
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem('userRole');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserRole(null);
      localStorage.removeItem('userRole');
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if(data.success) {
        setUserData(data.userData);
        // Store role in state and localStorage for persistence
        if (data.userData.role) {
          setUserRole(data.userData.role);
          localStorage.setItem('userRole', data.userData.role);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      await axios.post(backendUrl + "/api/auth/logout");
      setIsLoggedIn(false);
      setUserData(null);
      setUserRole(null);
      localStorage.removeItem('userRole');
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
    getUserData,
    logout

  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};