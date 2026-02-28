import { useState, useContext } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LayoutDashboard, Briefcase, CheckSquare, User, Settings, LogOut, Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';

const sidebarLinks = [
  { path: '/dashboard/overview',       label: 'Overview',       icon: LayoutDashboard },
  { path: '/dashboard/my-jobs',        label: 'My Jobs',        icon: Briefcase },
  { path: '/dashboard/accepted-tasks', label: 'Accepted Tasks', icon: CheckSquare },
  { path: '/dashboard/profile',        label: 'Profile',        icon: User },
  { path: '/dashboard/settings',       label: 'Settings',       icon: Settings },
];

const UserDashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success('Logged out successfully'))
      .catch(err => toast.error(err.message));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-purple-500/20">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
            <Briefcase className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            FreelanceHub
          </span>
        </Link>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <img
            src={user?.photoURL || ('https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=7c3aed&color=fff')}
            alt={user?.displayName || 'User'}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.displayName || 'User'}</p>
            <p className="text-xs text-purple-300 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ' +
              (isActive
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-300 hover:bg-white/10 hover:text-white')
            }>
            {({ isActive }) => (
              <>
                <Icon className={'w-5 h-5 flex-shrink-0 ' + (isActive ? 'text-white' : 'text-gray-400 group-hover:text-white')} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 space-y-1">
        <button onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all">
          {theme === 'light' ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <aside className="hidden lg:flex w-64 flex-col bg-gray-900 dark:bg-gray-950 border-r border-white/10 flex-shrink-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-64 z-50 bg-gray-900 lg:hidden flex flex-col">
              <button onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-blue-600 p-1.5 rounded-lg">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800 dark:text-white">Dashboard</span>
          </div>
          <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 transition-colors">
            {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
