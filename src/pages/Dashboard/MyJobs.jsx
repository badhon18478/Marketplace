import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusBadge = (status) => ({
  display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
  background: status === 'open' ? '#10b98122' : '#f59e0b22',
  color: status === 'open' ? '#34d399' : '#fbbf24',
  border: `1px solid ${status === 'open' ? '#10b98144' : '#f59e0b44'}`,
});

const Modal = ({ onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: '#000a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
    <div style={{ background: '#161b27', borderRadius: 16, border: '1px solid #21262d', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#e6edf3', margin: 0, fontSize: 16, fontWeight: 700 }}>Edit Job</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8b949e', fontSize: 22, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const inp = { width: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, color: '#e6edf3', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box' };
const categories = ['Web Development', 'Mobile App', 'Design', 'Writing', 'Marketing', 'Data Science', 'Other'];

export default function MyJobs() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({});
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API}/api/jobs/user/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, []);

  const openEdit = (job) => {
    setEditing(job._id);
    setForm({ title: job.title, category: job.category, summary: job.summary, budget: job.budget, deadline: job.deadline?.slice(0, 10), skills: job.skills, status: job.status });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/jobs/${editing}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditing(null);
      fetchJobs();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    setDeleting(id);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/jobs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchJobs();
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#e6edf3', fontSize: 22, fontWeight: 700, margin: 0 }}>My Jobs</h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 13 }}>{jobs.length} jobs posted</p>
        </div>
        <Link to="/add-job" style={{ background: '#3b82f6', color: '#fff', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          + Post New Job
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div style={{ width: 40, height: 40, border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#161b27', borderRadius: 14, border: '1px solid #21262d' }}>
          <p style={{ fontSize: 40, margin: '0 0 12px' }}>💼</p>
          <p style={{ color: '#e6edf3', fontWeight: 600, fontSize: 16, margin: '0 0 6px' }}>No jobs posted yet</p>
          <p style={{ color: '#8b949e', fontSize: 13, margin: '0 0 20px' }}>Start posting jobs to find freelancers</p>
          <Link to="/add-job" style={{ background: '#3b82f6', color: '#fff', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Post a Job</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobs.map(job => (
            <div key={job._id} style={{ background: '#161b27', borderRadius: 14, border: '1px solid #21262d', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#e6edf3', fontSize: 15, fontWeight: 600, margin: 0 }}>{job.title}</h3>
                  <span style={statusBadge(job.status)}>{job.status}</span>
                </div>
                <p style={{ color: '#8b949e', fontSize: 12, margin: '0 0 8px' }}>{job.category} • Budget: <span style={{ color: '#34d399', fontWeight: 600 }}>${job.budget}</span> • Deadline: {job.deadline?.slice(0, 10)}</p>
                <p style={{ color: '#6e7681', fontSize: 12, margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 500 }}>{job.summary}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => openEdit(job)} style={{ background: '#3b82f622', color: '#60a5fa', border: '1px solid #3b82f644', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button onClick={() => handleDelete(job._id)} disabled={deleting === job._id} style={{ background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Title', key: 'title', type: 'text' },
              { label: 'Budget ($)', key: 'budget', type: 'number' },
              { label: 'Deadline', key: 'deadline', type: 'date' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} style={inp} value={form[f.key] || ''} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Category</label>
              <select style={{ ...inp, color: '#e6edf3' }} value={form.category || ''} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Status</label>
              <select style={{ ...inp, color: '#e6edf3' }} value={form.status || 'open'} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Summary</label>
              <textarea style={{ ...inp, minHeight: 90, resize: 'vertical' }} value={form.summary || ''} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setEditing(null)} style={{ background: '#21262d', color: '#8b949e', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
