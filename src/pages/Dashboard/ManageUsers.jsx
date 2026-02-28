import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Trash2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Users,
  UserPlus,
} from 'lucide-react';

const allUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Freelancer',
    status: 'active',
    joined: 'Jan 12, 2025',
    jobs: 8,
  },
  {
    id: 2,
    name: 'Mark Williams',
    email: 'mark@example.com',
    role: 'Client',
    status: 'active',
    joined: 'Feb 3, 2025',
    jobs: 15,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Freelancer',
    status: 'pending',
    joined: 'Feb 18, 2025',
    jobs: 2,
  },
  {
    id: 4,
    name: 'James Carter',
    email: 'james@example.com',
    role: 'Client',
    status: 'active',
    joined: 'Mar 1, 2025',
    jobs: 6,
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'Freelancer',
    status: 'banned',
    joined: 'Dec 5, 2024',
    jobs: 0,
  },
  {
    id: 6,
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Admin',
    status: 'active',
    joined: 'Nov 1, 2024',
    jobs: 0,
  },
  {
    id: 7,
    name: 'Anika Rahman',
    email: 'anika@example.com',
    role: 'Freelancer',
    status: 'active',
    joined: 'Mar 5, 2025',
    jobs: 11,
  },
  {
    id: 8,
    name: 'Tom Bradley',
    email: 'tom@example.com',
    role: 'Client',
    status: 'pending',
    joined: 'Feb 28, 2025',
    jobs: 1,
  },
];

const statusColors = {
  active:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  banned: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const roleColors = {
  Freelancer:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Client:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Admin:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const ManageUsers = () => {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = allUsers.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'All' || u.role === filterRole;
    const matchStatus = filterStatus === 'All' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
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
            Manage Users
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {allUsers.length} total users registered
          </p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'Total',
            value: allUsers.length,
            color: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Active',
            value: allUsers.filter(u => u.status === 'active').length,
            color: 'from-green-500 to-green-600',
          },
          {
            label: 'Pending',
            value: allUsers.filter(u => u.status === 'pending').length,
            color: 'from-yellow-500 to-orange-500',
          },
          {
            label: 'Banned',
            value: allUsers.filter(u => u.status === 'banned').length,
            color: 'from-red-500 to-red-600',
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {s.value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {s.label} Users
            </p>
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
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            <option>All</option>
            <option>Freelancer</option>
            <option>Client</option>
            <option>Admin</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            <option>All</option>
            <option>active</option>
            <option>pending</option>
            <option>banned</option>
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
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Joined
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Jobs
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(u => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[u.status]}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-sm text-gray-600 dark:text-gray-400">
                    {u.joined}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-gray-600 dark:text-gray-400">
                    {u.jobs}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === u.id ? null : u.id)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {openMenu === u.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />
                          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-20">
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 transition-colors">
                              <Shield className="w-3.5 h-3.5" /> Make Admin
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-600 transition-colors">
                              <UserCheck className="w-3.5 h-3.5" /> Activate
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 hover:text-yellow-600 transition-colors">
                              <UserX className="w-3.5 h-3.5" /> Ban User
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
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filtered.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {allUsers.length}
            </span>{' '}
            users
          </p>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold hover:bg-orange-50 hover:text-orange-500 transition-colors">
              2
            </button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
