import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { createJob } from '../../services/api';
// import { useAuth } from '../../context/AuthContext';
// import { showToast } from '../../utils/toast';
import { AuthContext } from '../AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [submittedGames, setSubmittedGames] = useState([]);
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to post a job');
      navigate('/login');
      return;
    }

    setLoading(true);

    const jobData = {
      id: submittedGames.length + 21,
      title,
      postedBy: user.displayName,
      category,
      summary,
      coverImage,
      userEmail: user.email,
    };

    setSubmittedGames(prev => [...prev, jobData]);
    axios.post('http://localhost:5000/api/jobs', jobData).then(res => {
      console.log(res.data);
      Swal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
      });
    });
    // e.target.reset();

    alert('Game added successfully!');
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              rows="5"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posted By
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddJob;
