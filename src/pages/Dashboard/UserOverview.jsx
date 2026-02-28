import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#a855f7', '#ec4899'];

const Card = ({ label, value, icon, color }) => (
  <div style={{
    background: '#161b27', borderRadius: 14, padding: '20px 24px',
    border: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 16,
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
      background: color + '22',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
    }}>{icon}</div>
    <div>
      <p style={{ color: '#8b949e', fontSize: 12, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
      <p style={{ color: '#e6edf3', fontSize: 28, fontWeight: 700, margin: 0 }}>{value ?? '—'}</p>
    </div>
  </div>
);

export default function UserOverview() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API}/api/dashboard/user-stats/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(await res.json());
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <div style={{ width: 48, height: 48, border: '4px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const taskStatus = stats?.taskStatusStats?.map(s => ({ name: s._id, value: s.count })) || [];
  const jobsByCategory = stats?.myJobsByCategory?.map(c => ({ name: c._id, value: c.count })) || [];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#e6edf3', fontSize: 24, fontWeight: 700, margin: 0 }}>
          Welcome back, {user?.displayName?.split(' ')[0] || 'there'} 👋
        </h1>
        <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 13 }}>Here's your activity summary.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <Card label="My Jobs"        value={stats?.myJobs}     icon="💼" color="#3b82f6" />
        <Card label="Accepted Tasks" value={stats?.myAccepted} icon="✅" color="#10b981" />
        <Card label="My Reviews"     value={stats?.myReviews}  icon="⭐" color="#f59e0b" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#161b27', borderRadius: 14, padding: 24, border: '1px solid #21262d' }}>
          <h3 style={{ color: '#e6edf3', margin: '0 0 20px', fontSize: 14, fontWeight: 600 }}>Task Status Breakdown</h3>
          {taskStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={taskStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {taskStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#21262d', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#8b949e', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#8b949e', textAlign: 'center', marginTop: 60 }}>No accepted tasks yet</p>}
        </div>

        <div style={{ background: '#161b27', borderRadius: 14, padding: 24, border: '1px solid #21262d' }}>
          <h3 style={{ color: '#e6edf3', margin: '0 0 20px', fontSize: 14, fontWeight: 600 }}>My Jobs by Category</h3>
          {jobsByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={jobsByCategory}>
                <XAxis dataKey="name" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#21262d', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Jobs" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#8b949e', textAlign: 'center', marginTop: 60 }}>No jobs posted yet</p>}
        </div>
      </div>
    </div>
  );
}
