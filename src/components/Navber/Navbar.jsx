import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
// import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Briefcase,
  LogOut,
  CheckSquare,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { AuthContext } from '../../AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
        setProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/allJobs', label: 'All Jobs' },
    ...(user
      ? [
          { path: '/add-job', label: 'Add a Job' },
          { path: '/my-accepted-tasks', label: 'My Accepted Tasks' },
        ]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hidden sm:block"
            >
              FreelanceHub
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-primary to-blue-600 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Menu / Auth Buttons */}
            {user ? (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700"
                >
                  <img
                    src={
                      user.photoURL ||
                      'https://ui-avatars.com/api/?name=' +
                        (user.displayName || 'User')
                    }
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-md"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {user.displayName || 'User'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                      profileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {user.displayName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/myAddedJobs"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                      >
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="font-medium">My Posted Jobs</span>
                      </Link>

                      <Link
                        to="/my-accepted-tasks"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                      >
                        <CheckSquare className="w-5 h-5 text-primary" />
                        <span className="font-medium">My Accepted Tasks</span>
                      </Link>

                      <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 w-full transition-colors duration-200"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-200"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-4 space-y-2">
                {/* User Info Mobile */}
                {user && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center space-x-3 px-4 py-3 mb-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700"
                  >
                    <img
                      src={
                        user.photoURL ||
                        'https://ui-avatars.com/api/?name=' +
                          (user.displayName || 'User')
                      }
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Nav Links Mobile */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-primary to-blue-600 shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* My Posted Jobs Link for Mobile */}
                {user && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <NavLink
                      to="/myAddedJobs"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-primary to-blue-600 shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      My Posted Jobs
                    </NavLink>
                  </motion.div>
                )}

                {/* Auth Buttons Mobile */}
                {user ? (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                ) : (
                  <div className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-semibold text-center text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary dark:hover:border-primary transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md"
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
