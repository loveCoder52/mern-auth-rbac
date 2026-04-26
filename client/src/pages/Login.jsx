import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, setUserRole, getUserData } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRedirect = (role) => {
    // Redirect based on user role
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'manager') {
      navigate('/manager/dashboard');
    } else {
      navigate('/dashboard');
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      axios.defaults.withCredentials = true;

      if(state === 'Sign Up') {
        const {data}  = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if(data.success){
          setIsLoggedIn(true);
          if (data.role) {
            setUserRole(data.role);
            localStorage.setItem('userRole', data.role);
          }
          toast.success('Account created successfully!');
          // Small delay to allow context to update
          setTimeout(() => handleRedirect(data.role || 'user'), 500);
        }else{
          toast.error(data.message || 'Signup failed. Please try again.');
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if(data.success){
          toast.success('Login successful!');
          setIsLoggedIn(true);
          if (data.role) {
            setUserRole(data.role);
            localStorage.setItem('userRole', data.role);
          }
          // Redirect based on role
          setTimeout(() => handleRedirect(data.role || 'user'), 500);
        } else {
          toast.error(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='w-full sm:w-96 bg-gray-800 bg-opacity-90 text-white rounded-lg p-8 flex flex-col items-center gap-3'>
        <h2 className='text-3xl font-semibold text-center text-white mb-3'>{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>
        <p className='text-gray-400 text-center text-sm mb-6'>{state === 'Sign Up' ? 'Sign up to get started' : 'Login to access your account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full border border-gray-500 rounded-full px-6 py-2'>
              <img src={assets.person_icon} alt="User" />
              <input onChange={e => setName(e.target.value)} value={name}
              className='outline-none bg-transparent' 
              type="text" 
              placeholder='Enter your name' 
              required />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full border border-gray-500 rounded-full px-6 py-2'>
            <img src={assets.mail_icon} alt="User" />
            <input 
            onChange={e => setEmail(e.target.value)} value={email}
            className='outline-none bg-transparent' 
            type="email" 
            placeholder='Enter your email' 
            required />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full border border-gray-500 rounded-full px-6 py-2'>
            <img src={assets.lock_icon} alt="User" />
            <input 
            onChange={e => setPassword(e.target.value)} value={password}
            className='outline-none bg-transparent' 
            type="password" 
            placeholder='Enter your password' 
            required />
          </div>

          <p className='text-gray-400 text-sm mb-6'>Forgot your password? 
          <a
          onClick={()=>navigate('/reset-password')}
          className='text-blue-500 hover:underline'>{' '}Reset it</a></p>

          <button className='w-full bg-linear-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-full transition duration-300 font-medium' >{state}</button>
        </form>

        <p className='text-gray-400 text-sm'>
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className='text-blue-500 hover:underline'
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
