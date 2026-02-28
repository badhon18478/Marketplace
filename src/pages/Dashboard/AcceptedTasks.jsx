import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusColors = {
  'in-progress': { bg: '#3b82f622', color: '#60a5fa', border: '#3b82f644' },
  'completed':   { bg: '#10b98122', color: '#34d399', border: '#10b98144' },
  'cancelled':   { bg: '#ef444422', color: '#f87171', border: '#ef444444' },
};

export default function AcceptedTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API}/api/accepted-tasks/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove this task from your list?')) return;
    setDeleting(id);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/accepted-tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  const statusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#e6edf3', fontSize: 22, fontWeight: 700, margin: 0 }}>Accepted Tasks</h1>
        <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 13 }}>{tasks.length} tasks total</p>
      </div>

      {/* Status summary */}
      {tasks.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {Object.entries(statusCounts).map(([status, count]) => {
            const c = statusColors[status] || statusColors['in-progress'];
            return (
              <div key={status} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: c.color, fontSize: 18, fontWeight: 700 }}>{count}</span>
                <span style={{ color: c.color, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{status}</span>
              </div>
            );
          })}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div style={{ width: 40, height: 40, border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#161b27', borderRadius: 14, border: '1px solid #21262d' }}>
          <p style={{ fontSize: 40, margin: '0 0 12px' }}>📋</p>
          <p style={{ color: '#e6edf3', fontWeight: 600, fontSize: 16, margin: '0 0 6px' }}>No accepted tasks yet</p>
          <p style={{ color: '#8b949e', fontSize: 13, margin: 0 }}>Browse jobs and accept tasks to see them here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tasks.map(task => {
            const c = statusColors[task.status] || statusColors['in-progress'];
            return (
              <div key={task._id} style={{ background: '#161b27', borderRadius: 14, border: '1px solid #21262d', padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ color: '#e6edf3', fontSize: 15, fontWeight: 600, margin: 0 }}>{task.title || task.jobTitle || 'Task'}</h3>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: c.bg, color: c.color, border: `1px solid ${c.border}`,
                        textTransform: 'capitalize',
                      }}>{task.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      {task.budget && <p style={{ color: '#8b949e', fontSize: 12, margin: 0 }}>Budget: <span style={{ color: '#34d399', fontWeight: 600 }}>${task.budget}</span></p>}
                      {task.category && <p style={{ color: '#8b949e', fontSize: 12, margin: 0 }}>Category: <span style={{ color: '#e6edf3' }}>{task.category}</span></p>}
                      <p style={{ color: '#8b949e', fontSize: 12, margin: 0 }}>Accepted: <span style={{ color: '#e6edf3' }}>{task.acceptedDate?.slice(0, 10)}</span></p>
                      {task.deadline && <p style={{ color: '#8b949e', fontSize: 12, margin: 0 }}>Deadline: <span style={{ color: '#e6edf3' }}>{task.deadline?.slice(0, 10)}</span></p>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(task._id)} disabled={deleting === task._id}
                    style={{ background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
