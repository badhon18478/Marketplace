import { Link, NavLink } from 'react-router-dom';
import { use, useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Briefcase,
  LogOut,
  Settings,
  ChevronDown,
  CheckSquare,
} from 'lucide-react';
const Navbar = () => {
  // useContext ব্যবহার করুন use এর পরিবর্তে
  const { user, logOut } = use(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // মোবাইল মেনু টগলের জন্য স্টেট যোগ করুন
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive
                ? 'text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-8 after:bg-primary after:content-[""]'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)} // মোবাইল মেনু বন্ধ করুন লিংকে ক্লিক করলে
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allJobs"
          className={({ isActive }) =>
            `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive
                ? 'text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-8 after:bg-primary after:content-[""]'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-job"
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                  isActive
                    ? 'text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-8 after:bg-primary after:content-[""]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add a Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-accepted-tasks"
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                  isActive
                    ? 'text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-8 after:bg-primary after:content-[""]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)} // মোবাইল মেনু বন্ধ করুন লিংকে ক্লিক করলে
            >
              My Accepted Tasks
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            >
              FreelanceHub
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">{navLinks}</ul>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.span>
            </button>

            {/* User Menu / Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all duration-300 border-2 border-transparent hover:border-purple-200"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/150'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-md"
                  />
                  <span className="font-semibold text-gray-700">
                    {user.displayName || 'User'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      profileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                      <p className="font-semibold text-gray-800">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/myAddedJobs"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-gray-700 transition-colors duration-200"
                    >
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">My Posted Jobs</span>
                    </Link>

                    <Link
                      to="/my-accepted-tasks"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-gray-700 transition-colors duration-200"
                    >
                      <CheckSquare className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">My Accepted Tasks</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-gray-700 transition-colors duration-200"
                    >
                      <Settings className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Profile Settings</span>
                    </Link>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2 font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle - এখানে onClick হ্যান্ডলার যোগ করা হয়েছে */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - AnimatePresence দিয়ে অ্যানিমেশন যোগ করা হয়েছে */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4">
                <ul className="flex flex-col space-y-1">{navLinks}</ul>
                {!user && (
                  <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/login"
                      className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)} // মোবাইল মেনু বন্ধ করুন লিংকে ক্লিক করলে
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)} // মোবাইল মেনু বন্ধ করুন লিংকে ক্লিক করলে
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
