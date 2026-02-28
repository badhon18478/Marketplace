import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Briefcase, CheckSquare, Clock, Star, TrendingUp, Plus, ArrowRight } from 'lucide-react';

const UserOverview = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { label: 'Jobs Posted',     value: '12',  icon: Briefcase,   color: 'from-primary to-blue-600',    bg: 'bg-purple-50 dark:bg-purple-900/20',  text: 'text-primary' },
    { label: 'Tasks Accepted',  value: '8',   icon: CheckSquare, color: 'from-green-500 to-green-600',  bg: 'bg-green-50 dark:bg-green-900/20',    text: 'text-green-600' },
    { label: 'In Progress',     value: '3',   icon: Clock,       color: 'from-yellow-500 to-orange-500',bg: 'bg-yellow-50 dark:bg-yellow-900/20',  text: 'text-yellow-600' },
    { label: 'Avg Rating',      value: '4.8', icon: Star,        color: 'from-pink-500 to-rose-500',    bg: 'bg-pink-50 dark:bg-pink-900/20',      text: 'text-pink-600' },
  ];

  const recentJobs = [
    { title: 'React Developer Needed',   budget: '$500',  bids: 12, status: 'open',   date: 'Mar 1' },
    { title: 'Logo Design for Startup',  budget: '$150',  bids: 7,  status: 'open',   date: 'Feb 28' },
    { title: 'SEO Content Writer',       budget: '$80',   bids: 23, status: 'closed', date: 'Feb 20' },
    { title: 'Mobile App UI/UX',         budget: '$800',  bids: 5,  status: 'open',   date: 'Mar 2' },
  ];

  const recentTasks = [
    { title: 'Build E-commerce Site',  client: 'Mark W.',   deadline: 'Mar 10', status: 'in-progress' },
    { title: 'Create Brand Identity',  client: 'Sarah J.',  deadline: 'Mar 15', status: 'pending' },
    { title: 'SEO Audit Report',       client: 'James C.',  deadline: 'Feb 28', status: 'completed' },
  ];

  const statusColors = {
    open:         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    closed:       'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    'in-progress':'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pending:      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    completed:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.displayName?.split(' ')[0] || 'User'} 👋
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here is what is happening with your account today.</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.text}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">My Recent Jobs</h2>
            <Link to="/dashboard/my-jobs" className="text-xs font-semibold text-primary hover:text-blue-600 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentJobs.map(job => (
              <div key={job.title} className="flex items-center gap-3 px-5 py-3.5 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.bids} bids · {job.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{job.budget}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[job.status]}`}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Accepted Tasks</h2>
            <Link to="/dashboard/accepted-tasks" className="text-xs font-semibold text-primary hover:text-blue-600 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentTasks.map(task => (
              <div key={task.title} className="flex items-center gap-3 px-5 py-3.5 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{task.title}</p>
                  <p className="text-xs text-gray-400">{task.client} · Due {task.deadline}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[task.status]}`}>{task.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Ready to find new work?</h3>
            <p className="text-purple-100 text-sm mt-1">Browse 1,200+ active job listings</p>
          </div>
          <Link to="/allJobs"
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-xl hover:bg-purple-50 transition-colors shadow-md">
            Browse Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOverview;
