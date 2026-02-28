import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusBadge = (status) => ({
  display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
  background: status === 'open' ? '#10b98122' : '#f59e0b22',
  color: status === 'open' ? '#34d399' : '#fbbf24',
  border: `1px solid ${status === 'open' ? '#10b98144' : '#f59e0b44'}`,
});

export default function ManageJobs() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs]             = useState([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('');
  const [loading, setLoading]       = useState(true);
  const [deleting, setDeleting]     = useState(null);

  const categories = ['Web Development','Mobile App','Design','Writing','Marketing','Data Science','Other'];

  const fetchJobs = async (p = 1) => {
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const params = new URLSearchParams({ page: p, limit: 10, search, category });
      const res = await fetch(`${API}/api/jobs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(1); }, [category]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    setDeleting(id);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs(page);
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Manage Jobs</h1>
          <p style={{ color: '#7c82a0', margin: '4px 0 0', fontSize: 13 }}>{total} total jobs</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchJobs(1)}
            placeholder="Search title…"
            style={{ background: '#141728', border: '1px solid #1e2235', borderRadius: 10, color: '#fff', padding: '8px 14px', fontSize: 13, outline: 'none', width: 180 }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ background: '#141728', border: '1px solid #1e2235', borderRadius: 10, color: '#7c82a0', padding: '8px 12px', fontSize: 13, outline: 'none' }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => fetchJobs(1)}
            style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Search
          </button>
        </div>
      </div>

      <div style={{ background: '#141728', borderRadius: 14, border: '1px solid #1e2235', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2235' }}>
              {['#', 'Title', 'Category', 'Budget', 'Deadline', 'Status', 'Posted By', 'Action'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#7c82a0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#7c82a0' }}>Loading…</td></tr>
            ) : jobs.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#7c82a0' }}>No jobs found</td></tr>
            ) : jobs.map((j, i) => (
              <tr key={j._id} style={{ borderBottom: '1px solid #1e2235' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a1d2e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 13 }}>{(page - 1) * 10 + i + 1}</td>
                <td style={{ padding: '12px 16px', color: '#e2e8f0', fontSize: 13, fontWeight: 500, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</td>
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 13 }}>{j.category}</td>
                <td style={{ padding: '12px 16px', color: '#34d399', fontSize: 13, fontWeight: 600 }}>${j.budget}</td>
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 12 }}>{j.deadline?.slice(0, 10)}</td>
                <td style={{ padding: '12px 16px' }}><span style={statusBadge(j.status)}>{j.status}</span></td>
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 12, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.userEmail}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleDelete(j._id)} disabled={deleting === j._id}
                    style={{ background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => fetchJobs(p)}
              style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: page === p ? '#6366f1' : '#1e2235', color: page === p ? '#fff' : '#7c82a0' }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
