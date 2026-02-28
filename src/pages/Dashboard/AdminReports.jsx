import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  Activity,
  Download,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

const monthlyData = [
  { month: 'Oct', users: 180, jobs: 95,  revenue: 4200 },
  { month: 'Nov', users: 210, jobs: 120, revenue: 5100 },
  { month: 'Dec', users: 195, jobs: 105, revenue: 4800 },
  { month: 'Jan', users: 260, jobs: 145, revenue: 6300 },
  { month: 'Feb', users: 290, jobs: 168, revenue: 7100 },
  { month: 'Mar', users: 345, jobs: 195, revenue: 8400 },
];

const maxUsers   = Math.max(...monthlyData.map(d => d.users));
const maxJobs    = Math.max(...monthlyData.map(d => d.jobs));
const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

const topCategories = [
  { name: 'Web Development', count: 420, pct: 34, color: 'from-blue-500 to-blue-600'    },
  { name: 'Design',          count: 310, pct: 25, color: 'from-purple-500 to-purple-600' },
  { name: 'Writing',         count: 215, pct: 17, color: 'from-green-500 to-green-600'  },
  { name: 'Data & Analytics',count: 148, pct: 12, color: 'from-orange-500 to-red-500'   },
  { name: 'Marketing',       count: 97,  pct: 8,  color: 'from-pink-500 to-rose-500'    },
  { name: 'Other',           count: 49,  pct: 4,  color: 'from-gray-400 to-gray-500'    },
];

const recentReports = [
  { title: 'Monthly User Growth',   date: 'Mar 1, 2025',  type: 'Users',   status: 'ready'   },
  { title: 'Job Posting Analytics', date: 'Mar 1, 2025',  type: 'Jobs',    status: 'ready'   },
  { title: 'Revenue Summary Q1',    date: 'Mar 1, 2025',  type: 'Revenue', status: 'ready'   },
  { title: 'Fraud Detection Report', date: 'Mar 1, 2025', type: 'Security',status: 'pending' },
];

const AdminReports = () => {
  const [activeChart, setActiveChart] = useState('users');
  const [period, setPeriod] = useState('6m');

  const chartData = monthlyData.map(d => ({
    ...d,
    value: activeChart === 'users' ? d.users : activeChart === 'jobs' ? d.jobs : d.revenue,
  }));
  const maxVal = activeChart === 'users' ? maxUsers : activeChart === 'jobs' ? maxJobs : maxRevenue;

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
            Reports & Analytics
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Platform performance overview
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue',   value: '$35,900', change: '+18.4%', up: true,  icon: DollarSign, color: 'from-green-500 to-green-600',  bg: 'bg-green-50 dark:bg-green-900/20',  text: 'text-green-600 dark:text-green-400' },
          { label: 'New Users (Mo)',  value: '345',     change: '+19.0%', up: true,  icon: Users,      color: 'from-blue-500 to-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-400'   },
          { label: 'Jobs Posted (Mo)', value: '195',    change: '+16.1%', up: true,  icon: Briefcase,  color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20',text: 'text-purple-600 dark:text-purple-400'},
          { label: 'Avg Session',     value: '4m 22s',  change: '-3.2%',  up: false, icon: Activity,   color: 'from-orange-500 to-red-500',    bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400'},
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.text}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white">Growth Trends</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'users',   label: 'Users'   },
              { key: 'jobs',    label: 'Jobs'    },
              { key: 'revenue', label: 'Revenue' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveChart(tab.key)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeChart === tab.key
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-3 h-40">
          {chartData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {activeChart === 'revenue' ? `$${(d.value/1000).toFixed(1)}k` : d.value}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.value / maxVal) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-red-400 hover:from-orange-400 hover:to-red-300 cursor-pointer transition-colors"
                style={{ minHeight: '4px' }}
              />
              <span className="text-xs text-gray-400">{d.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Top Job Categories</h2>
          <div className="space-y-3">
            {topCategories.map((cat, i) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{cat.count} jobs ({cat.pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.pct}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Available Reports</h2>
          <div className="space-y-3">
            {recentReports.map(report => (
              <div key={report.title} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{report.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{report.type} · {report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    report.status === 'ready'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'ready' && (
                    <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-orange-100 dark:bg-orange-900/20 text-orange-600 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReports;
