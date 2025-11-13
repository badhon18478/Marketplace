import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, X, Briefcase, User, Calendar } from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      fetchAcceptedTasks();
    }
  }, [user, axiosSecure]);

  const fetchAcceptedTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/api/accepted-tasks/${user.email}`
      );
      console.log('Fetched tasks:', response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load accepted tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDone = async taskId => {
    try {
      setDeletingId(taskId);
      await axiosSecure.delete(`/api/accepted-tasks/${taskId}`);

      // Remove from UI immediately
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

      toast.success('Task marked as done! 🎉');
    } catch (error) {
      console.error('Error marking task as done:', error);
      toast.error('Failed to mark task as done');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancel = async taskId => {
    try {
      setDeletingId(taskId);
      await axiosSecure.delete(`/api/accepted-tasks/${taskId}`);

      // Remove from UI immediately
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

      toast.success('Task cancelled successfully');
    } catch (error) {
      console.error('Error cancelling task:', error);
      toast.error('Failed to cancel task');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <title>My Accepted Tasks</title>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">
            My Accepted{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Tasks
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Manage the jobs you've accepted to complete
          </p>
        </motion.div>

        {/* Tasks Display */}
        <AnimatePresence mode="wait">
          {tasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 bg-white rounded-2xl shadow-lg"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Briefcase className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No accepted tasks yet
              </h3>
              <p className="text-gray-500 mb-6">
                Browse available jobs and accept the ones you'd like to work on
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/allJobs"
                className="inline-block px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-lg"
              >
                Browse All Jobs
              </motion.a>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary to-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        Job Details
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Posted By
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Accepted Date
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tasks.map((task, index) => (
                      <motion.tr
                        key={task._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-purple-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={task.coverImage}
                              alt={task.jobTitle}
                              className="w-20 h-20 object-cover rounded-lg shadow-md"
                            />
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">
                                {task.jobTitle}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {task.jobSummary}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <div>
                              <p className="font-semibold text-gray-800">
                                {task.jobPosterName}
                              </p>
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                {task.jobPoster}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-purple-100 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                            {task.jobCategory}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">
                              {new Date(task.acceptedDate).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDone(task._id)}
                              disabled={deletingId === task._id}
                              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                                deletingId === task._id
                                  ? 'bg-gray-300 cursor-not-allowed'
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Done
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCancel(task._id)}
                              disabled={deletingId === task._id}
                              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                                deletingId === task._id
                                  ? 'bg-gray-300 cursor-not-allowed'
                                  : 'bg-red-500 hover:bg-red-600 text-white'
                              }`}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <img
                      src={task.coverImage}
                      alt={task.jobTitle}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <div className="mb-4">
                        <span className="inline-block bg-purple-100 text-primary px-3 py-1.5 rounded-full text-xs font-semibold mb-2">
                          {task.jobCategory}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {task.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {task.jobSummary}
                        </p>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            {task.jobPosterName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>
                            {new Date(task.acceptedDate).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDone(task._id)}
                          disabled={deletingId === task._id}
                          className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-lg font-semibold transition-all ${
                            deletingId === task._id
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCancel(task._id)}
                          disabled={deletingId === task._id}
                          className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-lg font-semibold transition-all ${
                            deletingId === task._id
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default MyAcceptedTasks;
