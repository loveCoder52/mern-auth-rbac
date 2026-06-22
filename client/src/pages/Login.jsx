import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import { motion } from 'framer-motion';

const Login = () => {

  const navigate = useNavigate();
  const { backendUrl, getAuthState } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/');
    } else if (role === 'manager') {
      navigate('/');
    } else {
      navigate('/');
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (data.success) {
          toast.success('Account created successfully!');
          await getAuthState();
          setTimeout(() => handleRedirect(data.role || 'user'), 500);
        } else {
          toast.error(data.message || 'Signup failed. Please try again.');
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          toast.success('Login successful!');
          await getAuthState();
          setTimeout(() => handleRedirect(data.role || 'user'), 500);
        } else {
          toast.error(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const switchState = () => {
    setState(state === 'Sign Up' ? 'Login' : 'Sign Up');
    setPassword('');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative'>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full sm:w-96 bg-gray-950/90 border border-gray-800 backdrop-blur-sm text-white rounded-2xl p-8 flex flex-col items-center gap-3 shadow-2xl shadow-black/40 mt-10'
      >
        <div className='w-12 h-12 rounded-xl border border-amber-400 flex items-center justify-center mb-2'>
          <span className='text-amber-400 font-black text-xl'>M</span>
        </div>

        <h2 className='text-3xl font-semibold text-center text-white mb-1'>
          {state === 'Sign Up' ? 'Create account' : 'Welcome back'}
        </h2>
        <p className='text-gray-400 text-center text-sm mb-6'>
          {state === 'Sign Up' ? 'Sign up to get started' : 'Login to access your account'}
        </p>

        <form onSubmit={onSubmitHandler} className='w-full'>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full border border-gray-700 bg-gray-900/60 rounded-full px-6 py-2.5 focus-within:border-amber-400 transition-colors'>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e => setName(e.target.value)} value={name}
                className='outline-none bg-transparent w-full text-white placeholder:text-gray-500'
                type="text"
                placeholder='Enter your name'
                required
              />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full border border-gray-700 bg-gray-900/60 rounded-full px-6 py-2.5 focus-within:border-amber-400 transition-colors'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={e => setEmail(e.target.value)} value={email}
              className='outline-none bg-transparent w-full text-white placeholder:text-gray-500'
              type="email"
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full border border-gray-700 bg-gray-900/60 rounded-full px-6 py-2.5 focus-within:border-amber-400 transition-colors'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={e => setPassword(e.target.value)} value={password}
              className='outline-none bg-transparent w-full text-white placeholder:text-gray-500'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>

          <p className='text-gray-400 text-sm mb-6'>
            Forgot your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              className='text-amber-400 hover:text-amber-300 hover:underline transition-colors'
            >
              Reset it
            </button>
          </p>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            className='w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 py-2.5 rounded-full transition-colors duration-200 font-semibold'
          >
            {submitting ? 'Please wait...' : state}
          </motion.button>
        </form>

        <p className='text-gray-400 text-sm'>
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className='text-amber-400 hover:text-amber-300 hover:underline transition-colors'
            onClick={switchState}
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;