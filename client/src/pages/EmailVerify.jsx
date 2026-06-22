import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';
import { motion } from 'framer-motion';

function EmailVerify() {

  const { backendUrl, isLoggedIn, getUserData, userData, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const otpArray = inputrefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success('Email verified successfully!');
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        toast.success(data.message || 'A new code has been sent to your email.');
      } else {
        toast.error(data.message || 'Failed to resend code. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  }

  useEffect(() => {
    if (!loading && isLoggedIn && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [loading, isLoggedIn, userData, navigate]);

  // Auth state still resolving — avoid flashing the OTP form for an
  // already-verified user before the redirect above can fire.
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-amber-400' />
      </div>
    );
  }

  // Already verified — the effect above is about to redirect away.
  // Render nothing instead of letting the form flash on screen first.
  if (isLoggedIn && userData?.isAccountVerified) {
    return null;
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

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmitHandler}
        className='bg-gray-950/90 border border-gray-800 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-black/40 text-sm w-full sm:w-96 text-center text-white'
        onPaste={handlePaste}
      >

        <h1 className='text-white text-2xl font-semibold text-center mb-3'>Verify Your Email</h1>
        <p className='text-gray-400 mb-6'>Enter the 6-digit code sent to your email address to verify your account.</p>

        <div className='flex justify-between gap-2 mb-8'>
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

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className='w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 font-semibold py-2.5 rounded-full transition-colors duration-200'
        >
          {submitting ? 'Verifying...' : 'Verify Email'}
        </motion.button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className='mt-4 text-gray-400 hover:text-amber-400 text-sm transition-colors disabled:opacity-60'
        >
          {resending ? 'Resending...' : "Didn't get a code? Resend"}
        </button>
      </motion.form>
    </div>
  );
}

export default EmailVerify;