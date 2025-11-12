import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Calendar,
  User,
  Mail,
  Briefcase,
  ArrowLeft,
  Check,
  Clock,
  MapPin,
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching job details for ID:', id);
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      console.log('Job details response:', response.data);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError(error.response?.data?.message || 'Failed to load job details');
      toast.error(
        error.response?.data?.message || 'Failed to load job details'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async () => {
    if (!user) {
      toast.error('Please login to accept this job');
      navigate('/login');
      return;
    }

    if (user.email === job.userEmail) {
      toast.error('You cannot accept your own job');
      return;
    }

    try {
      setAccepting(true);
      await axios.put(`http://localhost:5000/api/jobs/${id}/accept`, {
        acceptedBy: user.email,
      });
      toast.success('Job accepted successfully');
      navigate('/my-accepted-tasks');
    } catch (error) {
      console.error('Error accepting job:', error);
      toast.error(error.response?.data?.message || 'Failed to accept job');
    } finally {
      setAccepting(false);
    }
  };

  // Check if user can accept this job
  const canAcceptJob =
    user &&
    user.email !== job?.userEmail &&
    (job?.status === 'open' || !job?.status);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Job not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Jobs
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={
                job.coverImage || 'https://picsum.photos/seed/job/800/400.jpg'
              }
              alt={job.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                {job.title}
              </h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {job.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <User size={20} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Posted By</p>
                  <p className="font-medium">{job.postedBy}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Mail size={20} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{job.userEmail}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar size={20} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="font-medium">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Briefcase size={20} className="mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">
                    {job.status || 'Open'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Job Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{job.summary}</p>
            </div>

            {/* Accept button section */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                >
                  Login to Accept This Job
                </button>
              ) : user.email === job.userEmail ? (
                <div className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md">
                  You cannot accept your own job
                </div>
              ) : job.status !== 'open' && job.status ? (
                <div className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md">
                  This job is no longer available
                </div>
              ) : (
                <button
                  onClick={handleAcceptJob}
                  disabled={accepting}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {accepting ? (
                    'Processing...'
                  ) : (
                    <>
                      <Check size={20} className="mr-2" />
                      Accept This Job
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
