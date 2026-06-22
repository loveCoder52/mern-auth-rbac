import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, logout, userRole } = useContext(AppContext);

  // Close the mobile menu and avatar dropdown whenever the route changes.
  // Adjusted during render (not in an effect) per React's guidance for
  // resetting state in response to a changing value — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setOpen(false);
    setDropdownOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the avatar dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message || 'OTP sent to your email. Please verify.');
      } else {
        toast.error(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (userRole === 'admin') navigate('/admin/dashboard');
    else if (userRole === 'manager') navigate('/manager/dashboard');
    else navigate('/dashboard');
  };

  const roleBadge = {
    admin: { label: '⚙️ Admin Panel', bg: 'bg-rose-500 hover:bg-rose-600' },
    manager: { label: '👔 Manager Panel', bg: 'bg-violet-500 hover:bg-violet-600' },
    user: { label: '📊 Dashboard', bg: 'bg-blue-500 hover:bg-blue-600' },
  }[userRole] || { label: '📊 Dashboard', bg: 'bg-blue-500 hover:bg-blue-600' };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/service', label: 'Service' },
    { to: '/project', label: 'Project' },
    { to: '/contact', label: 'Contact' },
  ];

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-200
     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
     after:transition-transform after:duration-300 after:origin-left
     ${isActive
      ? 'text-amber-400 after:bg-amber-400 after:scale-x-100'
      : 'text-gray-300 hover:text-white after:bg-white after:scale-x-0 hover:after:scale-x-100'
    }`;

  const displayName = userData?.name || 'Account';
  const initial = userData?.name?.[0]?.toUpperCase() ?? '?';

  return (
    <nav className={`w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur shadow-lg shadow-black/30' : 'bg-gray-950'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline group"
          >
            <div className="w-12 h-12 rounded-xl border border-amber-400 flex items-center justify-center group-hover:bg-amber-400 transition-all duration-300">
              <span className="text-amber-400 group-hover:text-black font-black text-xl">
                M
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Majestic<span className="text-amber-400">India</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/quote"
              className="px-4 py-2 rounded-lg bg-amber-400 text-gray-950 text-sm font-semibold hover:bg-amber-300 transition-colors duration-200"
            >
              Get A Quote
            </NavLink>

            {userData ?
              (
                <>
                  {/* Dashboard Button */}
                  <button
                    onClick={handleDashboardClick}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors duration-200 ${roleBadge.bg}`}
                  >
                    {roleBadge.label}
                  </button>

                  {/* Avatar Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                      aria-label={`Account menu for ${displayName}`}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-gray-950 font-bold text-sm flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md"
                    >
                      {initial}
                    </button>

                    {/* Dropdown */}
                    <div
                      role="menu"
                      className={`absolute right-0 top-full mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-xl shadow-black/40 transition-all duration-200 origin-top-right ${
                        dropdownOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible translate-y-1'
                      }`}
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-white text-sm font-semibold truncate">{displayName}</p>
                        <p className="text-gray-400 text-xs mt-0.5 capitalize">{userRole}</p>
                      </div>

                      <div className="py-1">
                        <button
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          👤 Profile
                        </button>

                        {!userData.isAccountVerified && (
                          <button
                            role="menuitem"
                            onClick={() => { sendVerificationOtp(); setDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-amber-400 hover:bg-gray-800 transition-colors"
                          >
                            ✉️ Verify Email
                          </button>
                        )}
                      </div>

                      <div className="border-t border-gray-700 py-1">
                        <button
                          role="menuitem"
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) :
              (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:border-amber-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Login
                  <img src={assets.arrow_icon} alt="" className="w-4 h-4 opacity-70" />
                </button>
              )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        inert={open ? undefined : ''}
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="px-6 pb-6 pt-2 bg-gray-950 border-t border-gray-800 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-amber-400/10 text-amber-400'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-gray-800 space-y-2">
            <NavLink
              to="/quote"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-lg bg-amber-400 text-gray-950 text-sm font-semibold"
            >
              Get A Quote
            </NavLink>


            {userData ? (
              <>
                <button
                  onClick={() => { handleDashboardClick(); setOpen(false); }}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-white ${roleBadge.bg}`}
                >
                  {roleBadge.label}
                </button>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate('/login'); setOpen(false); }}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-600 text-gray-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;