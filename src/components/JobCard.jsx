import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User, Calendar, Eye, MapPin, Clock } from 'lucide-react';

const JobCard = ({ job, index = 0 }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/allJobs/${job._id}`);
  };

  const getCategoryColor = category => {
    const colors = {
      'Web Development': 'from-blue-500 to-cyan-500',
      'Digital Marketing': 'from-purple-500 to-pink-500',
      'Graphics Designing': 'from-orange-500 to-red-500',
      'Content Writing': 'from-green-500 to-emerald-500',
      'Video Editing': 'from-yellow-500 to-amber-500',
      default: 'from-gray-500 to-slate-500',
    };
    return colors[category] || colors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md bg-gradient-to-r ${getCategoryColor(
              job.category
            )} shadow-lg`}
          >
            {job.category}
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 min-h-[56px]">
          {job.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed min-h-[60px]">
          {job.summary}
        </p>

        {/* Meta Information */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span className="font-medium truncate">{job.postedBy}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>
              {new Date(job.postedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleViewDetails}
          className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-md hover:shadow-xl group/button"
        >
          <Eye className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
          <span>View Details</span>
        </motion.button>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default JobCard;
