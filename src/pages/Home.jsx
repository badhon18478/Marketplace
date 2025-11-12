import React, { use } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
// import axios from 'axios';
import { AuthContext } from '../AuthContext';

// Categories data
const categories = [
  {
    name: 'Web Development',
    icon: '\ud83d\udcbb',
    color: 'bg-blue-100 text-blue-600',
    count: 156,
  },
  {
    name: 'Digital Marketing',
    icon: '\ud83d\udcf1',
    color: 'bg-green-100 text-green-600',
    count: 89,
  },
  {
    name: 'Graphics Design',
    icon: '\ud83c\udfa8',
    color: 'bg-purple-100 text-purple-600',
    count: 124,
  },
  {
    name: 'Content Writing',
    icon: '\u270d\ufe0f',
    color: 'bg-yellow-100 text-yellow-600',
    count: 67,
  },
  {
    name: 'Mobile Development',
    icon: '\ud83d\udcf2',
    color: 'bg-red-100 text-red-600',
    count: 93,
  },
  {
    name: 'Data Science',
    icon: '\ud83d\udcca',
    color: 'bg-indigo-100 text-indigo-600',
    count: 78,
  },
];

const Home = () => {
  const { user } = use(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Theme Toggle Button
      <button className="theme-toggle bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button> */}
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Find Your Perfect
              <span className="block text-yellow-300">Freelance Gig</span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Connect with talented freelancers and discover amazing
              opportunities that match your skills and passion
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/allJobs"
                className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
              >
                Browse Jobs
              </Link>
              {user && (
                <Link
                  to="/addJob"
                  className="btn bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
                >
                  Post a Job
                </Link>
              )}
              {!user && (
                <Link
                  to="/register"
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              )}
            </motion.div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce-soft"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 opacity-10 rounded-full animate-bounce-soft"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full animate-bounce-soft"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </motion.section>
      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                1000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Jobs
              </div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Verified Freelancers
              </div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                95%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Jobs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Job Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the newest projects posted by clients looking for
              talented freelancers like you
            </p>
          </motion.div>

          {/* <div className="job-grid">
              {latestJobs?.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <img
                    src={
                      job.coverImage ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                    }
                    alt={job.title}
                    className="card-image"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {job.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {job.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=&background=random&size=24`}
                          alt={job.postedBy}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{job.postedBy}</span>
                      </div>
                      <span></span>
                    </div>
                  </div>
                  <Link
                    to={`/allJobs/${job._id}`}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </div> */}

          <div className="text-center mt-12">
            <Link to="/allJobs" className="btn btn-outline px-8 py-3">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore jobs across different categories and find what matches
              your expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="card cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count} jobs available
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              About FreelanceHub
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                FreelanceHub is your trusted platform for connecting talented
                freelancers with amazing opportunities. We bridge the gap
                between skilled professionals and businesses seeking quality
                services.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Whether you're a freelancer looking for your next project or a
                client seeking top talent, FreelanceHub makes the process
                simple, secure, and efficient.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Verified Freelancers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All our freelancers are verified and reviewed to ensure
                    quality
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Secure Payments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Safe and secure payment system for peace of mind
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600 dark:text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Round-the-clock customer support for all your needs
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
