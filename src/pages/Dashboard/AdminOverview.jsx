import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = ['#6366f1','#a855f7','#ec4899','#f59e0b','#10b981','#3b82f6'];

const Card = ({ label, value, icon, color }) => (
  <div style={{
    background: '#141728', borderRadius: 14, padding: '20px 24px',
    border: '1px solid #1e2235', display: 'flex', alignItems: 'center', gap: 16,
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
      background: color + '22', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 24,
    }}>{icon}</div>
    <div>
      <p style={{ color: '#7c82a0', fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
      <p style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 }}>{value ?? '—'}</p>
    </div>
  </div>
);

export default function AdminOverview() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API}/api/dashboard/admin-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <div style={{ width: 48, height: 48, border: '4px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const monthlyData = stats?.monthlyStats?.map(m => ({ month: m._id, jobs: m.count })) || [];
  const categoryData = stats?.categoryStats?.map(c => ({ name: c._id, value: c.count })) || [];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Dashboard Overview</h1>
        <p style={{ color: '#7c82a0', margin: '4px 0 0' }}>Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
        <Card label="Total Jobs"       value={stats?.totalJobs}     icon="💼" color="#6366f1" />
        <Card label="Total Users"      value={stats?.totalUsers}     icon="👥" color="#a855f7" />
        <Card label="Open Jobs"        value={stats?.openJobs}       icon="🟢" color="#10b981" />
        <Card label="Accepted Tasks"   value={stats?.totalAccepted}  icon="✅" color="#f59e0b" />
        <Card label="Unread Messages"  value={stats?.totalContacts}  icon="✉️"  color="#ec4899" />
        <Card label="Blog Posts"       value={stats?.totalBlogs}     icon="📝" color="#3b82f6" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Monthly bar chart */}
        <div style={{ background: '#141728', borderRadius: 14, padding: 24, border: '1px solid #1e2235' }}>
          <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: 15 }}>Jobs Posted per Month</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="jobs" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data yet</p>}
        </div>

        {/* Category pie chart */}
        <div style={{ background: '#141728', borderRadius: 14, padding: 24, border: '1px solid #1e2235' }}>
          <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: 15 }}>Jobs by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#7c82a0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data yet</p>}
        </div>
      </div>
    </div>
  );
}
