import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  BookOpen,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Users',
    value: '3,482',
    change: '+12.5%',
    up: true,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Active Jobs',
    value: '1,259',
    change: '+8.2%',
    up: true,
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Total Blogs',
    value: '342',
    change: '+3.1%',
    up: true,
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'Messages',
    value: '87',
    change: '-2.4%',
    up: false,
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
  },
];

const recentUsers = [
  { name: 'Sarah Johnson',  email: 'sarah@example.com', role: 'Freelancer', status: 'active',  joined: '2 hrs ago',   avatar: 'SJ' },
  { name: 'Mark Williams',  email: 'mark@example.com',  role: 'Client',     status: 'active',  joined: '5 hrs ago',   avatar: 'MW' },
  { name: 'Priya Sharma',   email: 'priya@example.com', role: 'Freelancer', status: 'pending', joined: '1 day ago',   avatar: 'PS' },
  { name: 'James Carter',   email: 'james@example.com', role: 'Client',     status: 'active',  joined: '2 days ago',  avatar: 'JC' },
  { name: 'Emma Wilson',    email: 'emma@example.com',  role: 'Freelancer', status: 'banned',  joined: '3 days ago',  avatar: 'EW' },
];

const recentJobs = [
  { title: 'React Developer Needed',    budget: '$500',  category: 'Web Dev',    status: 'open',   bids: 12 },
  { title: 'Logo Design for Startup',   budget: '$150',  category: 'Design',     status: 'open',   bids: 7  },
  { title: 'SEO Content Writer',        budget: '$80',   category: 'Writing',    status: 'closed', bids: 23 },
  { title: 'Mobile App UI/UX',          budget: '$800',  category: 'Design',     status: 'open',   bids: 5  },
  { title: 'Python Data Analyst',       budget: '$600',  category: 'Data',       status: 'open',   bids: 9  },
];

const statusColors = {
  active:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  banned:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  open:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  closed:  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Admin Overview
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening on FreelanceHub.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.text}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Platform Activity</h2>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map(d => (
                <button key={d} className="px-3 py-1 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 transition-colors">
                  {d}
                </button>
              ))}
            </div>
          </div>
          {/* Simple bar chart visual */}
          <div className="flex items-end gap-2 h-32">
            {[65, 80, 45, 90, 72, 88, 55, 95, 70, 85, 60, 75, 92, 68].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-red-400 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Mar 1</span><span>Mar 7</span><span>Mar 14</span>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Job Completion Rate', value: 78, color: 'bg-green-500' },
              { label: 'User Retention',      value: 64, color: 'bg-blue-500'  },
              { label: 'Response Rate',       value: 91, color: 'bg-purple-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {[
                { icon: CheckCircle, label: 'Jobs Completed Today', value: '24',  color: 'text-green-500' },
                { icon: Clock,       label: 'Pending Approvals',    value: '7',   color: 'text-yellow-500' },
                { icon: AlertCircle, label: 'Reports Flagged',       value: '3',   color: 'text-red-500'   },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Users</h2>
            <a href="/admin/manage-users" className="text-xs font-semibold text-orange-500 hover:text-orange-600">View All →</a>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentUsers.map(u => (
              <div key={u.email} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[u.status]}`}>
                    {u.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">{u.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Jobs</h2>
            <a href="/admin/manage-jobs" className="text-xs font-semibold text-orange-500 hover:text-orange-600">View All →</a>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentJobs.map(job => (
              <div key={job.title} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{job.category} · {job.bids} bids</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{job.budget}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;
