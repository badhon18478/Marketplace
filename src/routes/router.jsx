import { createBrowserRouter } from 'react-router';
// import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

import Login from '../pages/Login';
import Register from '../pages/Register/Register';
import MyProfile from '../pages/MyProfile';
import UpdateProfile from '../pages/UpdateProfile';
// import UpdateProfile from '../pages/UpdateProfile';
import NotFound from '../pages/Error';
import PrivateRoute from '../contexts/PrivateRoute';

import ForgetPassword from '../pages/ForgetPassword';
import AddJob from '../pages/AddJob';
import AllJobs from '../pages/AllJobs';
import JobDetails from '../pages/JobDetails';
import MyAcceptedTasks from '../pages/MyAcceptedTasks';
import MyAddedJobs from '../pages/MyAddedJobs';
import UpdateJob from '../pages/UpdateJob';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },

  {
    path: '/allJobs',
    element: (
      <PrivateRoute>
        <AllJobs />,
      </PrivateRoute>
    ),
  },
  {
    path: '/allJobs/:id',
    element: (
      <PrivateRoute>
        <JobDetails></JobDetails>
      </PrivateRoute>
    ),
  },
  {
    path: '/my-accepted-tasks',
    element: (
      <PrivateRoute>
        <MyAcceptedTasks></MyAcceptedTasks>
      </PrivateRoute>
    ),
  },
  {
    path: '/my-accepted-tasks',
    element: (
      <PrivateRoute>
        <MyAcceptedTasks></MyAcceptedTasks>
      </PrivateRoute>
    ),
  },
  {
    path: '/UpdateJob/:id',
    element: (
      <PrivateRoute>
        <UpdateJob></UpdateJob>
      </PrivateRoute>
    ),
  },
  {
    path: '/MyAddedJobs',
    element: (
      <PrivateRoute>
        <MyAddedJobs></MyAddedJobs>
      </PrivateRoute>
    ),
  },
  {
    path: '/update-profile',
    element: (
      <PrivateRoute>
        <UpdateProfile></UpdateProfile>,
      </PrivateRoute>
    ),
  },
  {
    path: '/MyProfile',
    element: (
      <PrivateRoute>
        <MyProfile></MyProfile>,
      </PrivateRoute>
    ),
  },
  {
    path: '/add-job',
    element: (
      <PrivateRoute>
        <AddJob></AddJob>
      </PrivateRoute>
    ),
  },
  {
    path: '/forget-password',
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: '/Register',
    element: <Register></Register>,
  },
  {
    path: '/Login',
    element: <Login></Login>,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
