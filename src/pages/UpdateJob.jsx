import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Briefcase,
  FileText,
  Image as ImageIcon,
  Tag,
  ArrowLeft,
  Save,
} from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateJob = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    summary: '',
    coverImage: '',
  });

  const categories = [
    'Web Development',
    'Digital Marketing',
    'Graphics Designing',
    'Content Writing',
    'Video Editing',
  ];

  useEffect(() => {
    fetchJobDetails();
  }, [id, axiosSecure]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/api/jobs/${id}`);
      const job = response.data;

      // Check if user is the owner
      if (job.userEmail !== user?.email) {
        toast.error('You can only edit your own jobs');
        navigate('/myAddedJobs');
        return;
      }

      setFormData({
        title: job.title,
        category: job.category,
        summary: job.summary,
        coverImage: job.coverImage,
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
      navigate('/myAddedJobs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await axiosSecure.put(`/api/jobs/${id}`, formData);

      toast.success('Job updated successfully! 🎉');

      setTimeout(() => {
        navigate('/myAddedJobs');
      }, 1500);
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job. Please try again.');
    } finally {
      setSubmitting(false);
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
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/myAddedJobs')}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to My Jobs</span>
        </motion.button>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-full w-fit mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Update Job Details</h1>
            <p className="text-gray-600 text-lg">
              Make changes to your job posting
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Build a Modern E-commerce Website"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe your project in detail..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.summary.length} characters
                </p>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Image Preview */}
              {formData.coverImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border-2 border-gray-200 rounded-xl p-4"
                >
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={e => {
                      e.target.src =
                        'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                    }}
                  />
                </motion.div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You cannot change the posted by name or
                  email address. Only the job details can be updated.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
                  }`}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Job
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate('/myAddedJobs')}
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 rounded-xl font-bold text-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all border-2 border-gray-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              💡 Tips for Updating
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Keep your job description clear and up-to-date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  Update requirements if your project scope has changed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  Make sure the cover image accurately represents your project
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Changes will be visible to all users immediately</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpdateJob;
