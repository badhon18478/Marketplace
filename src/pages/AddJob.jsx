import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Briefcase,
  User,
  Mail,
  FileText,
  Image as ImageIcon,
  Tag,
  ArrowLeft,
} from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../AuthContext';
import { use } from 'react';

const AddJob = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    summary: '',
    coverImage: '',
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphics Designing',
    'Digital Marketing',
    'Content Writing',
    'Data Science',
    'Other',
  ];

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to post a job');
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);

      const jobData = {
        title: formData.title,
        postedBy: user.displayName || 'Anonymous',
        category: formData.category,
        summary: formData.summary,
        coverImage: formData.coverImage,
        userEmail: user.email,
        postedDate: new Date().toISOString(),
      };

      await axios.post('http://localhost:5000/api/jobs', jobData);

      toast.success('Job posted successfully! 🎉');

      // Reset form
      setFormData({
        title: '',
        category: 'Web Development',
        summary: '',
        coverImage: '',
      });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/allJobs');
      }, 1500);
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back</span>
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
            <h1 className="text-4xl font-bold mb-2">Post a New Job</h1>
            <p className="text-gray-600 text-lg">
              Share your project details and find the perfect freelancer
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

              {/* Posted By (Read-only) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Posted By
                </label>
                <input
                  type="text"
                  value={user?.displayName || 'Anonymous'}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
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
                  placeholder="Describe your project in detail. Include requirements, expected deliverables, and any other important information..."
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
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Upload your image to{' '}
                  <a
                    href="https://imgbb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    ImgBB
                  </a>{' '}
                  and paste the URL here
                </p>
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

              {/* User Email (Read-only) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Contact Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl ${
                  submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Posting Job...
                  </span>
                ) : (
                  'Post Job'
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                By posting a job, you agree to our terms and conditions
              </p>
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
              💡 Tips for a Great Job Post
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Write a clear and descriptive job title</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Provide detailed requirements and expectations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Choose an eye-catching cover image</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Be specific about deliverables and timeline</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddJob;
