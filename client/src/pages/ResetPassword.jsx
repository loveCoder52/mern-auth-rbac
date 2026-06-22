import React, { useRef, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ResetPassword() {

  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resetting, setResetting] = useState(false);

  const inputrefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
    if (e.target.value.length === 0 && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    pasteData.forEach((value, index) => {
      if (index < inputrefs.current.length) {
        inputrefs.current[index].value = value;
      }
    });
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (sendingOtp) return;
    setSendingOtp(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message || 'OTP sent to your email.');
        setIsOtpSent(true);
      } else {
        toast.error(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    if (resetting) return;
    setResetting(true);
    const otpValue = inputrefs.current.map(ref => ref?.value || '').join('');
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp: otpValue, newPassword });
      if (data.success) {
        toast.success(data.message || 'Password reset successfully!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center relative px-4'>
      <Link
        to="/"
        className='absolute left-5 sm:left-10 top-5 flex items-center gap-2 no-underline'
      >
        <div className='w-10 h-10 rounded-xl border border-amber-400 flex items-center justify-center'>
          <span className='text-amber-400 font-black text-lg'>M</span>
        </div>
        <span className='text-gray-400 font-bold text-lg hidden sm:inline'>
          Majestic<span className='text-amber-400'>India</span>
        </span>
      </Link>

      {/* email input form */}
      {!isOtpSent && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmitEmail}
          className='bg-gray-950/90 border border-gray-800 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-black/40 text-sm w-full sm:w-96 text-center text-white'
        >
          <h1 className='text-white text-2xl font-semibold text-center mb-3'>Reset Password</h1>
          <p className='text-gray-400 mb-6'>Enter your registered email address and we&apos;ll send you a code.</p>

          <div className='flex items-center gap-3 w-full border border-gray-700 bg-gray-900/60 rounded-full px-6 py-2.5 mb-6 focus-within:border-amber-400 transition-colors'>
            <img src={assets.mail_icon} alt="" />
            <input
              aria-label="Email address"
              placeholder="Enter your email"
              className="outline-none bg-transparent w-full text-white placeholder:text-gray-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={sendingOtp}
            whileHover={{ scale: sendingOtp ? 1 : 1.02 }}
            whileTap={{ scale: sendingOtp ? 1 : 0.98 }}
            className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 py-2.5 rounded-full font-semibold transition-colors duration-200"
          >
            {sendingOtp ? 'Sending...' : 'Send Reset Code'}
          </motion.button>
        </motion.form>
      )}

      {/* otp reset form */}
      {isOtpSent && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmitOtp}
          className='bg-gray-950/90 border border-gray-800 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-black/40 text-sm w-full sm:w-96 text-center text-white'
          onPaste={handlePaste}
        >
          <h1 className='text-white text-2xl font-semibold text-center mb-3'>Enter Reset Code</h1>
          <p className='text-gray-400 mb-6'>
            We sent a 6-digit code to <span className='text-amber-400'>{email}</span>. Enter it below with your new password.
          </p>

          <div className='flex justify-between gap-2 mb-6'>
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                required
                aria-label={`Digit ${index + 1} of 6`}
                className='w-12 h-12 text-center border border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg transition-colors'
                ref={e => inputrefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <input
            type="password"
            placeholder="Enter new password"
            className='w-full px-5 py-2.5 mb-6 bg-gray-900/60 border border-gray-700 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />

          <motion.button
            type="submit"
            disabled={resetting}
            whileHover={{ scale: resetting ? 1 : 1.02 }}
            whileTap={{ scale: resetting ? 1 : 0.98 }}
            className='w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 font-semibold py-2.5 rounded-full transition-colors duration-200'
          >
            {resetting ? 'Resetting...' : 'Reset Password'}
          </motion.button>

          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className='mt-4 text-gray-400 hover:text-amber-400 text-sm transition-colors'
          >
            ← Use a different email
          </button>
        </motion.form>
      )}

    </div>
  );
}

export default ResetPassword;