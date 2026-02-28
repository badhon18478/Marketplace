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
  Plus,
  Briefcase,
} from 'lucide-react';

const allJobs = [
  { id: 1,  title: 'React Developer Needed',        category: 'Web Dev',   budget: '$500',  bids: 12, status: 'open',    posted: 'Mar 1, 2025',  postedBy: 'Mark Williams'  },
  { id: 2,  title: 'Logo Design for Startup',        category: 'Design',    budget: '$150',  bids: 7,  status: 'open',    posted: 'Feb 28, 2025', postedBy: 'James Carter'   },
  { id: 3,  title: 'SEO Content Writer',             category: 'Writing',   budget: '$80',   bids: 23, status: 'closed',  posted: 'Feb 20, 2025', postedBy: 'Tom Bradley'    },
  { id: 4,  title: 'Mobile App UI/UX Design',        category: 'Design',    budget: '$800',  bids: 5,  status: 'open',    posted: 'Mar 2, 2025',  postedBy: 'Mark Williams'  },
  { id: 5,  title: 'Python Data Analyst',            category: 'Data',      budget: '$600',  bids: 9,  status: 'open',    posted: 'Feb 25, 2025', postedBy: 'James Carter'   },
  { id: 6,  title: 'WordPress Blog Setup',           category: 'Web Dev',   budget: '$200',  bids: 18, status: 'closed',  posted: 'Feb 15, 2025', postedBy: 'Tom Bradley'    },
  { id: 7,  title: 'Video Editing – Promo Reel',     category: 'Video',     budget: '$350',  bids: 4,  status: 'pending', posted: 'Mar 3, 2025',  postedBy: 'Sarah Johnson'  },
  { id: 8,  title: 'Social Media Management',        category: 'Marketing', budget: '$250',  bids: 11, status: 'open',    posted: 'Mar 1, 2025',  postedBy: 'Anika Rahman'   },
];

const statusColors = {
  open:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  closed:  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const categoryColors = {
  'Web Dev':   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Design':    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Writing':   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Data':      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Video':     'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Marketing': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const ManageJobs = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const categories = ['All', ...new Set(allJobs.map(j => j.category))];

  const filtered = allJobs.filter(j => {
    const matchSearch   = j.title.toLowerCase().includes(search.toLowerCase()) ||
                          j.postedBy.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus === 'All' || j.status === filterStatus;
    const matchCategory = filterCategory === 'All' || j.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
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
            Manage Jobs
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {allJobs.length} total job listings
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',   value: allJobs.length,                                         color: 'text-blue-600'   },
          { label: 'Open',    value: allJobs.filter(j => j.status === 'open').length,         color: 'text-green-600'  },
          { label: 'Closed',  value: allJobs.filter(j => j.status === 'closed').length,       color: 'text-gray-500'   },
          { label: 'Pending', value: allJobs.filter(j => j.status === 'pending').length,      color: 'text-yellow-600' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label} Jobs</p>
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
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            <option>All</option>
            <option>open</option>
            <option>closed</option>
            <option>pending</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Budget</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Bids</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Posted By</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{job.title}</p>
                        <p className="text-xs text-gray-400">{job.posted}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[job.category] || 'bg-gray-100 text-gray-600'}`}>
                      {job.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-sm font-semibold text-gray-900 dark:text-white">{job.budget}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-sm text-gray-600 dark:text-gray-400">{job.bids}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-gray-600 dark:text-gray-400">{job.postedBy}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {openMenu === job.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                          <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-20">
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 transition-colors">
                              <Eye className="w-3.5 h-3.5" /> View Details
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-600 transition-colors">
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 hover:text-yellow-600 transition-colors">
                              <XCircle className="w-3.5 h-3.5" /> Close Job
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{allJobs.length}</span> jobs
          </p>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold hover:bg-orange-50 hover:text-orange-500 transition-colors">2</button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageJobs;
