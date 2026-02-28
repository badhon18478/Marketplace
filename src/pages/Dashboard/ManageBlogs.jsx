import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Modal = ({ title, onClose, children }) => (
  <div style={{
    position: 'fixed', inset: 0, background: '#000000aa', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
  }}>
    <div style={{ background: '#141728', borderRadius: 16, border: '1px solid #1e2235', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #1e2235' }}>
        <h2 style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#7c82a0', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const inputStyle = {
  width: '100%', background: '#0d0f1a', border: '1px solid #1e2235', borderRadius: 10,
  color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};

const emptyForm = { title: '', content: '', category: 'General', coverImage: '', excerpt: '' };
const categories = ['General','Technology','Design','Marketing','Career','Tutorial'];

export default function ManageBlogs() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [modal, setModal]           = useState(null); // null | 'create' | 'edit'
  const [form, setForm]             = useState(emptyForm);
  const [editId, setEditId]         = useState(null);
  const [saving, setSaving]         = useState(false);
  const [deleting, setDeleting]     = useState(null);

  const fetchBlogs = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/blog?page=${p}&limit=8`);
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(1); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModal('create'); };
  const openEdit = (b) => {
    setForm({ title: b.title, content: b.content, category: b.category, coverImage: b.coverImage, excerpt: b.excerpt || '' });
    setEditId(b._id);
    setModal('edit');
  };

  const handleSave = async () => {
    if (!form.title || !form.content) return alert('Title and content are required');
    setSaving(true);
    try {
      const token = await user.getIdToken();
      const url = modal === 'edit' ? `${API}/api/blog/${editId}` : `${API}/api/blog`;
      const method = modal === 'edit' ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setModal(null);
      fetchBlogs(page);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    setDeleting(id);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/blog/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchBlogs(page);
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Manage Blogs</h1>
          <p style={{ color: '#7c82a0', margin: '4px 0 0', fontSize: 13 }}>{total} total posts</p>
        </div>
        <button onClick={openCreate} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          + New Blog
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {loading ? (
          <p style={{ color: '#7c82a0', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>Loading…</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: '#7c82a0', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No blogs yet</p>
        ) : blogs.map(b => (
          <div key={b._id} style={{ background: '#141728', borderRadius: 14, border: '1px solid #1e2235', overflow: 'hidden' }}>
            {b.coverImage && <img src={b.coverImage} alt="" style={{ width: '100%', height: 140, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />}
            <div style={{ padding: 16 }}>
              <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, textTransform: 'uppercase' }}>{b.category}</span>
              <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '6px 0 8px', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{b.title}</h3>
              <p style={{ color: '#7c82a0', fontSize: 12, margin: '0 0 12px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{b.excerpt}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(b)} style={{ flex: 1, background: '#6366f122', color: '#818cf8', border: '1px solid #6366f144', borderRadius: 8, padding: '6px 0', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button onClick={() => handleDelete(b._id)} disabled={deleting === b._id} style={{ flex: 1, background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 8, padding: '6px 0', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => fetchBlogs(p)} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: page === p ? '#6366f1' : '#1e2235', color: page === p ? '#fff' : '#7c82a0' }}>{p}</button>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'edit' ? 'Edit Blog Post' : 'Create Blog Post'} onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#7c82a0', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Blog title" />
            </div>
            <div>
              <label style={{ color: '#7c82a0', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Category</label>
              <select style={{ ...inputStyle, color: '#7c82a0' }} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#7c82a0', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Cover Image URL</label>
              <input style={inputStyle} value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))} placeholder="https://…" />
            </div>
            <div>
              <label style={{ color: '#7c82a0', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Excerpt</label>
              <input style={inputStyle} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short description…" />
            </div>
            <div>
              <label style={{ color: '#7c82a0', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Content *</label>
              <textarea style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Blog content…" />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ background: '#1e2235', color: '#7c82a0', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
