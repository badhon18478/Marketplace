import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Search, Clock, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Build E-commerce Website',   client: 'Mark Williams',  budget: '$800',  deadline: 'Mar 10, 2025', status: 'in-progress', progress: 65, category: 'Web Dev'  },
  { id: 2, title: 'Create Brand Identity Kit',  client: 'Sarah Johnson',  budget: '$350',  deadline: 'Mar 15, 2025', status: 'pending',     progress: 0,  category: 'Design'   },
  { id: 3, title: 'SEO Audit & Report',         client: 'James Carter',   budget: '$200',  deadline: 'Feb 28, 2025', status: 'completed',   progress: 100,category: 'Marketing'},
  { id: 4, title: 'Mobile App Development',     client: 'Emma Wilson',    budget: '$1200', deadline: 'Mar 25, 2025', status: 'in-progress', progress: 30, category: 'Mobile'   },
  { id: 5, title: 'Write 10 Blog Articles',     client: 'Tom Bradley',    budget: '$150',  deadline: 'Mar 5, 2025',  status: 'completed',   progress: 100,category: 'Writing'  },
  { id: 6, title: 'Data Analysis Dashboard',    client: 'Anika Rahman',   budget: '$500',  deadline: 'Mar 20, 2025', status: 'pending',     progress: 0,  category: 'Data'     },
];

const statusConfig = {
  'in-progress': { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',    icon: Clock,          label: 'In Progress' },
  pending:       { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: AlertCircle,    label: 'Pending' },
  completed:     { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2,   label: 'Completed' },
};

const AcceptedTasks = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.status === filter.toLowerCase().replace(' ', '-');
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white">Accepted Tasks</motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track all your accepted work</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Pending',     value: tasks.filter(t => t.status === 'pending').length,     color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Completed',   value: tasks.filter(t => t.status === 'completed').length,   color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/20' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 ${s.bg}`}>
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
            <input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'In Progress', 'Pending', 'Completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((task, i) => {
          const { color, icon: Icon, label } = statusConfig[task.status];
          return (
            <motion.div key={task.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1 bg-gradient-to-r from-primary to-blue-600" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{task.title}</h3>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${color}`}>
                    <Icon className="w-3 h-3" /> {label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold" style={{fontSize:'8px'}}>
                      {task.client[0]}
                    </div>
                    {task.client}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.deadline}</span>
                  <span>·</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{task.budget}</span>
                </div>

                {task.status !== 'pending' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: task.progress + '%' }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${task.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-primary to-blue-600'}`}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:shadow-md transition-shadow">
                    <MessageCircle className="w-3.5 h-3.5" /> Message Client
                  </button>
                  {task.status === 'in-progress' && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-200 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Done
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-400">
          <CheckSquare className="w-10 h-10 mb-3 opacity-40" />
          <p className="font-medium text-sm">No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default AcceptedTasks;
