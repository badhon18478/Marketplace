import { createBrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

// ── Pages ──────────────────────────────────────────────────────
import Home from '../pages/Home';
// import Login from '../pages/Auth/Login';
// import Register from '../pages/Auth/Register';
import AllJobs from '../pages/AllJobs';
import JobDetails from '../pages/JobDetails';
import AddJob from '../pages/AddJob';
// import EditJob from '../pages/EditJob';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
// import BlogDetails from '../pages/BlogDetails';
import About from '../pages/About';
import NotFound from '../pages/Error';

// ── User Dashboard ─────────────────────────────────────────────
import UserDashboard from '../pages/Dashboard/UserDashboard';
import UserOverview from '../pages/Dashboard/UserOverview';
import MyJobs from '../pages/Dashboard/MyJobs';
import AcceptedTasks from '../pages/Dashboard/AcceptedTasks';
import ProfilePage from '../pages/Dashboard/ProfilePage';
import DashboardSettings from '../pages/Dashboard/DashboardSettings';

// ── Admin Dashboard ────────────────────────────────────────────
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminOverview from '../pages/Dashboard/AdminOverview';
import ManageUsers from '../pages/Dashboard/ManageUsers';
import ManageJobs from '../pages/Dashboard/ManageJobs';
import ManageBlogs from '../pages/Dashboard/ManageBlogs';
import ContactMessages from '../pages/Dashboard/ContactMessages';
import AdminReports from '../pages/Dashboard/AdminReports';
// import AdminSettings from '../pages/Dashboard/AdminSettings';
import Login from '../pages/Login';
import Register from '../pages/Register/Register';

// ============================================================
// ── Protected Route (auth required) ─────────────────────────
// ============================================================
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// ============================================================
// ── Admin Route (admin role required) ───────────────────────
// ============================================================
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/dashboard/overview" replace />;

  return children;
};

// ============================================================
// ── Router ───────────────────────────────────────────────────
// ============================================================
const router = createBrowserRouter([
  // ── Public Routes ─────────────────────────────────────────
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/allJobs',
    element: <AllJobs />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetails />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  // {
  //   path: '/blog/:id',
  //   element: <BlogDetails />,
  // },
  {
    path: '/about',
    element: <About />,
  },

  // ── Protected: Add/Edit Job ────────────────────────────────
  {
    path: '/add-job',
    element: (
      <PrivateRoute>
        <AddJob />
      </PrivateRoute>
    ),
  },
  // {
  //   path: '/edit-job/:id',
  //   element: (
  //     <PrivateRoute>
  //       <EditJob />
  //     </PrivateRoute>
  //   ),
  // },

  // ── User Dashboard ─────────────────────────────────────────
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <UserOverview /> },
      { path: 'my-jobs', element: <MyJobs /> },
      { path: 'accepted-tasks', element: <AcceptedTasks /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <DashboardSettings /> },
    ],
  },

  // ── Admin Dashboard ────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <AdminOverview /> },
      { path: 'manage-users', element: <ManageUsers /> },
      { path: 'manage-jobs', element: <ManageJobs /> },
      { path: 'manage-blogs', element: <ManageBlogs /> },
      { path: 'contacts', element: <ContactMessages /> },
      { path: 'reports', element: <AdminReports /> },
      // { path: 'settings', element: <AdminSettings /> },
    ],
  },

  // ── 404 ────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFound />,
  },
]);

export { PrivateRoute, AdminRoute };
export default router;
