import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  PenSquare,
  Plus,
} from 'lucide-react';

const allBlogs = [
  { id: 1,  title: '10 Tips for Freelance Success',         author: 'Sarah Johnson',  category: 'Career',     status: 'published', date: 'Mar 1, 2025',  views: 1240 },
  { id: 2,  title: 'How to Build a Winning Portfolio',      author: 'Anika Rahman',   category: 'Career',     status: 'published', date: 'Feb 25, 2025', views: 982  },
  { id: 3,  title: 'Top 5 Design Tools in 2025',           author: 'Emma Wilson',    category: 'Design',     status: 'draft',     date: 'Mar 3, 2025',  views: 0    },
  { id: 4,  title: 'Remote Work & Mental Health',          author: 'Priya Sharma',   category: 'Wellness',   status: 'published', date: 'Feb 18, 2025', views: 2150 },
  { id: 5,  title: 'Getting Started with Web3 Freelancing', author: 'David Lee',      category: 'Tech',       status: 'pending',   date: 'Mar 2, 2025',  views: 0    },
  { id: 6,  title: 'Writing Proposals That Win',           author: 'Mark Williams',  category: 'Business',   status: 'published', date: 'Feb 10, 2025', views: 3400 },
  { id: 7,  title: 'Client Communication Best Practices', author: 'James Carter',   category: 'Business',   status: 'draft',     date: 'Mar 4, 2025',  views: 0    },
];

const statusColors = {
  published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  draft:     'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const categoryColors = {
  Career:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Design:   'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Wellness: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Tech:     'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Business: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const ManageBlogs = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = allBlogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Manage Blogs
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {allBlogs.length} total blog posts
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Published', value: allBlogs.filter(b => b.status === 'published').length, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Draft',     value: allBlogs.filter(b => b.status === 'draft').length,     color: 'text-gray-500',  bg: 'bg-gray-50 dark:bg-gray-800'       },
          { label: 'Pending',   value: allBlogs.filter(b => b.status === 'pending').length,   color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 ${s.bg}`}
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            <option>All</option>
            <option>published</option>
            <option>draft</option>
            <option>pending</option>
          </select>
        </div>
      </motion.div>

      {/* Blog Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {filtered.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Card Top */}
            <div className="h-2 bg-gradient-to-r from-orange-500 to-red-600" />

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[blog.status]}`}>
                    {blog.status}
                  </span>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[blog.category] || 'bg-gray-100 text-gray-600'}`}>
                    {blog.category}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === blog.id ? null : blog.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  {openMenu === blog.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-20">
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 transition-colors">
                          <Eye className="w-3.5 h-3.5" /> View Post
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 transition-colors">
                          <PenSquare className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-600 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5" /> Publish
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-3 group-hover:text-orange-500 transition-colors">
                {blog.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold" style={{ fontSize: '9px' }}>
                    {blog.author.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <span className="truncate max-w-24">{blog.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  {blog.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {blog.views.toLocaleString()}
                    </span>
                  )}
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ManageBlogs;
