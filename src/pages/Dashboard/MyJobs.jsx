import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Briefcase, Plus, Search, MoreVertical, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const myJobs = [
  { id: 1, title: 'React Developer Needed',     category: 'Web Dev',   budget: '$500',  bids: 12, status: 'open',   date: 'Mar 1, 2025'  },
  { id: 2, title: 'Logo Design for Startup',    category: 'Design',    budget: '$150',  bids: 7,  status: 'open',   date: 'Feb 28, 2025' },
  { id: 3, title: 'SEO Content Writer',         category: 'Writing',   budget: '$80',   bids: 23, status: 'closed', date: 'Feb 20, 2025' },
  { id: 4, title: 'Mobile App UI/UX Design',    category: 'Design',    budget: '$800',  bids: 5,  status: 'open',   date: 'Mar 2, 2025'  },
  { id: 5, title: 'Python Data Analyst',        category: 'Data',      budget: '$600',  bids: 9,  status: 'open',   date: 'Feb 25, 2025' },
  { id: 6, title: 'WordPress Blog Setup',       category: 'Web Dev',   budget: '$200',  bids: 18, status: 'closed', date: 'Feb 15, 2025' },
];

const statusColors = {
  open:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  closed: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

const MyJobs = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = myJobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || j.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white">My Posted Jobs</motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{myJobs.length} jobs posted by you</p>
        </div>
        <Link to="/add-job"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Plus className="w-4 h-4" /> Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total',  value: myJobs.length,                                  color: 'text-primary' },
          { label: 'Open',   value: myJobs.filter(j => j.status === 'open').length,  color: 'text-green-600' },
          { label: 'Closed', value: myJobs.filter(j => j.status === 'closed').length,color: 'text-gray-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search your jobs..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div className="flex gap-2">
            {['All', 'Open', 'Closed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:text-primary'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Briefcase className="w-10 h-10 mb-3 opacity-40" />
            <p className="font-medium text-sm">No jobs found</p>
            <Link to="/add-job" className="mt-3 text-sm text-primary font-semibold hover:underline">Post your first job</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map(job => (
              <div key={job.id} className="flex items-center gap-3 px-5 py-4 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{job.category} · {job.bids} bids · {job.date}</p>
                </div>
                <div className="hidden sm:block text-right mr-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{job.budget}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[job.status]}`}>{job.status}</span>
                </div>
                <div className="relative">
                  <button onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  {openMenu === job.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-20">
                        <Link to={`/jobs/${job.id}`} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:text-primary transition-colors">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link to={`/edit-job/${job.id}`} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:text-primary transition-colors">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{myJobs.length}</span> jobs
          </p>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-purple-50 hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-semibold">1</button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-purple-50 hover:text-primary transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyJobs;
