import { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, X, Briefcase, User, Calendar } from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const MyAcceptedTasks = () => {
  const { user } = use(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchAcceptedTasks();
    }
  }, [user]);

  const fetchAcceptedTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/accepted-tasks/${user.email}`
      );
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
      await axios.delete(`http://localhost:5000/api/accepted-tasks/${taskId}`);

      // Remove from UI immediately
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

      toast.success('Task marked as done! 🎉');
    } catch (error) {
      console.error('Error marking task as done:', error);
      toast.error('Failed to mark task as done');
    }
  };

  const handleCancel = async taskId => {
    try {
      await axios.delete(`http://localhost:5000/api/accepted-tasks/${taskId}`);

      // Remove from UI immediately
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

      toast.success('Task cancelled successfully');
    } catch (error) {
      console.error('Error cancelling task:', error);
      toast.error('Failed to cancel task');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Accepted Tasks
          </h1>
          <p className="text-gray-600">
            Manage the jobs you've accepted to complete
          </p>
        </div>

        {/* Tasks Display */}
        {tasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No accepted tasks yet
            </h3>
            <p className="text-gray-500 mb-6">
              Browse available jobs and accept the ones you'd like to work on
            </p>
            <a
              href="/allJobs"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Browse All Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Job Details</th>
                    <th className="px-6 py-4 text-left">Posted By</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Accepted Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tasks.map(task => (
                    <tr
                      key={task._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={task.coverImage}
                            alt={task.jobTitle}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">
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
                          <User className="w-4 h-4 text-purple-500" />
                          <div>
                            <p className="font-medium text-gray-800">
                              {task.jobPosterName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {task.jobPoster}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {task.jobCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
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
                          <button
                            onClick={() => handleDone(task._id)}
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                            title="Mark as Done"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Done
                          </button>
                          <button
                            onClick={() => handleCancel(task._id)}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                            title="Cancel Task"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {tasks.map(task => (
                <div
                  key={task._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={task.coverImage}
                    alt={task.jobTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
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
                        <User className="w-4 h-4 text-purple-500" />
                        <span>{task.jobPosterName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-purple-500" />
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
                      <button
                        onClick={() => handleDone(task._id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Done
                      </button>
                      <button
                        onClick={() => handleCancel(task._id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyAcceptedTasks;
