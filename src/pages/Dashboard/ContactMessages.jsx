import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Mail,
  Clock,
  ChevronDown,
  Reply,
} from 'lucide-react';

const messages = [
  { id: 1,  name: 'Sarah Johnson',  email: 'sarah@example.com',  subject: 'Issue with job posting',      message: "I'm having trouble posting a new job. The form keeps giving an error saying my budget is invalid, but I've checked it multiple times and everything looks correct. Could you please help me resolve this issue as soon as possible?", date: 'Mar 1, 2025', time: '10:30 AM', read: false, category: 'Support'  },
  { id: 2,  name: 'Mark Williams',  email: 'mark@example.com',   subject: 'Payment not received',        message: 'I completed a project two weeks ago and the client confirmed the work but I still haven\'t received payment. The system shows "pending" status. Please investigate.', date: 'Feb 28, 2025', time: '3:15 PM', read: false, category: 'Billing'  },
  { id: 3,  name: 'Priya Sharma',   email: 'priya@example.com',  subject: 'Account verification delay',  message: 'My account has been pending verification for 5 days now. I submitted all required documents. When can I expect this to be resolved?', date: 'Feb 27, 2025', time: '9:00 AM', read: true,  category: 'Account'  },
  { id: 4,  name: 'James Carter',   email: 'james@example.com',  subject: 'Feature request: Dark mode',  message: 'I would love to see a dark mode option for the dashboard. It would be much easier on the eyes especially for night-time use. Many users have been requesting this.', date: 'Feb 25, 2025', time: '6:45 PM', read: true,  category: 'Feedback' },
  { id: 5,  name: 'Emma Wilson',    email: 'emma@example.com',   subject: 'Reporting fraudulent client',  message: 'I need to report a client who asked me to complete work and then disappeared without payment. This is the second time this has happened with this account.', date: 'Feb 24, 2025', time: '11:20 AM', read: false, category: 'Report'   },
  { id: 6,  name: 'David Lee',      email: 'david@example.com',  subject: 'Partnership inquiry',         message: 'We are a recruitment agency interested in partnering with FreelanceHub to offer our clients access to your talent pool. Could we schedule a call to discuss?', date: 'Feb 20, 2025', time: '2:30 PM', read: true,  category: 'Business' },
];

const categoryColors = {
  Support:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Billing:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Account:  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Feedback: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Report:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Business: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const ContactMessages = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [msgs, setMsgs] = useState(messages);

  const filtered = msgs.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.subject.toLowerCase().includes(search.toLowerCase()) ||
                        m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All'
      ? true
      : filter === 'Unread'
        ? !m.read
        : m.category === filter;
    return matchSearch && matchFilter;
  });

  const markRead = (id) => setMsgs(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  const deleteMsg = (id) => { setMsgs(prev => prev.filter(m => m.id !== id)); if (selected?.id === id) setSelected(null); };

  const openMessage = (msg) => {
    setSelected(msg);
    markRead(msg.id);
  };

  const unreadCount = msgs.filter(m => !m.read).length;

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
            Contact Messages
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount > 0 && <span className="text-orange-500 font-semibold">{unreadCount} unread · </span>}
            {msgs.length} total messages
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',    value: msgs.length,                                                  color: 'from-blue-500 to-blue-600'    },
          { label: 'Unread',   value: msgs.filter(m => !m.read).length,                             color: 'from-orange-500 to-red-600'   },
          { label: 'Support',  value: msgs.filter(m => m.category === 'Support').length,            color: 'from-purple-500 to-purple-600' },
          { label: 'Reports',  value: msgs.filter(m => m.category === 'Report').length,             color: 'from-red-500 to-red-600'      },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
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
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Unread', 'Support', 'Billing', 'Report', 'Feedback', 'Business'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Messages + Detail Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Message List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${selected ? 'xl:col-span-2' : 'xl:col-span-5'} bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden`}
        >
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Mail className="w-10 h-10 mb-3 opacity-50" />
                <p className="text-sm font-medium">No messages found</p>
              </div>
            )}
            {filtered.map(msg => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`px-5 py-4 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors ${
                  selected?.id === msg.id ? 'bg-orange-50 dark:bg-orange-900/10 border-r-2 border-orange-500' : ''
                } ${!msg.read ? 'bg-blue-50/50 dark:bg-blue-900/5' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${!msg.read ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    {msg.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${!msg.read ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                        {msg.name}
                        {!msg.read && <span className="ml-2 w-2 h-2 rounded-full bg-orange-500 inline-block" />}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{msg.time}</span>
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${!msg.read ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                      {msg.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[msg.category]}`}>
                        {msg.category}
                      </span>
                      <span className="text-xs text-gray-400">{msg.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="xl:col-span-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
            >
              {/* Detail Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{selected.subject}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selected.date} at {selected.time}</p>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Sender Info */}
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {selected.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{selected.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selected.email}</p>
                  </div>
                  <span className={`ml-auto inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[selected.category]}`}>
                    {selected.category}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 px-5 py-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.message}</p>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:shadow-md transition-shadow">
                  <Reply className="w-4 h-4" /> Reply
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold rounded-xl hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
                <button
                  onClick={() => deleteMsg(selected.id)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-200 transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactMessages;
