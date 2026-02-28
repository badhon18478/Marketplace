import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = ['#6366f1','#a855f7','#ec4899','#f59e0b','#10b981','#3b82f6','#f97316'];

const ChartBox = ({ title, children }) => (
  <div style={{ background: '#141728', borderRadius: 14, padding: 24, border: '1px solid #1e2235' }}>
    <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: 14, fontWeight: 600 }}>{title}</h3>
    {children}
  </div>
);

export default function AdminReports() {
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
        setStats(await res.json());
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <div style={{ width: 48, height: 48, border: '4px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const monthly = stats?.monthlyStats?.map(m => ({ month: m._id, count: m.count })) || [];
  const categories = stats?.categoryStats?.map(c => ({ name: c._id, value: c.count })) || [];

  const summary = [
    { label: 'Total Jobs',       value: stats?.totalJobs     },
    { label: 'Total Users',      value: stats?.totalUsers    },
    { label: 'Open Jobs',        value: stats?.openJobs      },
    { label: 'Accepted Tasks',   value: stats?.totalAccepted },
    { label: 'Unread Contacts',  value: stats?.totalContacts },
    { label: 'Blog Posts',       value: stats?.totalBlogs    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Reports & Analytics</h1>
        <p style={{ color: '#7c82a0', margin: '4px 0 0', fontSize: 13 }}>Platform-wide metrics and trends</p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {summary.map((s, i) => (
          <div key={s.label} style={{
            background: '#141728', borderRadius: 12, padding: '16px 20px',
            border: '1px solid #1e2235', borderLeft: `3px solid ${COLORS[i % COLORS.length]}`,
          }}>
            <p style={{ color: '#7c82a0', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: 0.8 }}>{s.label}</p>
            <p style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: '4px 0 0' }}>{s.value ?? '—'}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <ChartBox title="Monthly Job Postings (Bar)">
          {monthly.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
                <XAxis dataKey="month" tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Jobs" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data</p>}
        </ChartBox>

        <ChartBox title="Monthly Job Postings (Line)">
          {monthly.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
                <XAxis dataKey="month" tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} name="Jobs" />
              </LineChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data</p>}
        </ChartBox>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <ChartBox title="Jobs by Category (Pie)">
          {categories.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data</p>}
        </ChartBox>

        <ChartBox title="Category Distribution (Bar)">
          {categories.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categories} layout="vertical">
                <XAxis type="number" tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#7c82a0', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ background: '#1e2235', border: 'none', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Jobs">
                  {categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={{ color: '#7c82a0', textAlign: 'center', marginTop: 60 }}>No data</p>}
        </ChartBox>
      </div>
    </div>
  );
}
