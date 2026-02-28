import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const badge = (role) => ({
  display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
  background: role === 'admin' ? '#6366f122' : '#10b98122',
  color: role === 'admin' ? '#818cf8' : '#34d399',
  border: `1px solid ${role === 'admin' ? '#6366f144' : '#10b98144'}`,
});

export default function ManageUsers() {
  const { user } = useContext(AuthContext);
  const [users, setUsers]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [actionId, setActionId] = useState(null);

  const fetchUsers = async (p = 1, q = search) => {
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API}/api/users?page=${p}&limit=10&search=${q}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(1, ''); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handleRoleChange = async (email, newRole) => {
    setActionId(email);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/users/${email}/role`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers(page, search);
    } catch (e) { console.error(e); }
    finally { setActionId(null); }
  };

  const handleDelete = async (email) => {
    if (!confirm(`Delete user ${email}?`)) return;
    setActionId(email);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/users/${email}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(page, search);
    } catch (e) { console.error(e); }
    finally { setActionId(null); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Manage Users</h1>
          <p style={{ color: '#7c82a0', margin: '4px 0 0', fontSize: 13 }}>{total} total users</p>
        </div>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email…"
            style={{
              background: '#141728', border: '1px solid #1e2235', borderRadius: 10,
              color: '#fff', padding: '8px 14px', fontSize: 13, outline: 'none', width: 220,
            }}
          />
          <button type="submit" style={{
            background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10,
            padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}>Search</button>
        </form>
      </div>

      {/* Table */}
      <div style={{ background: '#141728', borderRadius: 14, border: '1px solid #1e2235', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2235' }}>
              {['#', 'Avatar', 'Name', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#7c82a0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#7c82a0' }}>Loading…</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#7c82a0' }}>No users found</td></tr>
            ) : users.map((u, i) => (
              <tr key={u._id} style={{ borderBottom: '1px solid #1e2235' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a1d2e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 13 }}>{(page - 1) * 10 + i + 1}</td>
                <td style={{ padding: '12px 16px' }}>
                  <img
                    src={u.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'U')}&background=6366f1&color=fff`}
                    alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ padding: '12px 16px', color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>{u.name || '—'}</td>
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 13 }}>{u.email}</td>
                <td style={{ padding: '12px 16px' }}><span style={badge(u.role)}>{u.role}</span></td>
                <td style={{ padding: '12px 16px', color: '#7c82a0', fontSize: 12 }}>{u.createdAt?.slice(0, 10)}</td>
                <td style={{ padding: '12px 16px', display: 'flex', gap: 6 }}>
                  {u.role === 'user' ? (
                    <button onClick={() => handleRoleChange(u.email, 'admin')}
                      disabled={actionId === u.email}
                      style={{ background: '#6366f122', color: '#818cf8', border: '1px solid #6366f144', borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                      Make Admin
                    </button>
                  ) : (
                    <button onClick={() => handleRoleChange(u.email, 'user')}
                      disabled={actionId === u.email}
                      style={{ background: '#10b98122', color: '#34d399', border: '1px solid #10b98144', borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                      Make User
                    </button>
                  )}
                  <button onClick={() => handleDelete(u.email)}
                    disabled={actionId === u.email}
                    style={{ background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => fetchUsers(p, search)}
              style={{
                width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: page === p ? '#6366f1' : '#1e2235', color: page === p ? '#fff' : '#7c82a0',
              }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
