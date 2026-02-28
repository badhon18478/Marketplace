import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ContactMessages() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API}/api/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Contact Messages</h1>
        <p style={{ color: '#7c82a0', margin: '4px 0 0', fontSize: 13 }}>{messages.length} messages received</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
        {/* List */}
        <div style={{ background: '#141728', borderRadius: 14, border: '1px solid #1e2235', overflow: 'hidden' }}>
          {loading ? (
            <p style={{ color: '#7c82a0', textAlign: 'center', padding: 40 }}>Loading…</p>
          ) : messages.length === 0 ? (
            <p style={{ color: '#7c82a0', textAlign: 'center', padding: 40 }}>No messages yet</p>
          ) : messages.map((m, i) => (
            <div key={m._id}
              onClick={() => setSelected(selected?._id === m._id ? null : m)}
              style={{
                padding: '14px 18px', borderBottom: '1px solid #1e2235', cursor: 'pointer',
                background: selected?._id === m._id ? '#1a1d2e' : 'transparent',
                transition: 'background .15s',
              }}
              onMouseEnter={e => { if (selected?._id !== m._id) e.currentTarget.style.background = '#0d0f1a'; }}
              onMouseLeave={e => { if (selected?._id !== m._id) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#6366f122',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#818cf8', fontWeight: 700, fontSize: 14, flexShrink: 0,
                  }}>{(m.name || 'U')[0].toUpperCase()}</div>
                  <div>
                    <p style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600, margin: 0 }}>{m.name}</p>
                    <p style={{ color: '#7c82a0', fontSize: 11, margin: 0 }}>{m.email}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                    background: m.status === 'unread' ? '#6366f122' : '#10b98122',
                    color: m.status === 'unread' ? '#818cf8' : '#34d399',
                    border: `1px solid ${m.status === 'unread' ? '#6366f144' : '#10b98144'}`,
                  }}>{m.status}</span>
                  <p style={{ color: '#4a5068', fontSize: 10, margin: '3px 0 0' }}>{m.createdAt?.slice(0, 10)}</p>
                </div>
              </div>
              <p style={{ color: '#818cf8', fontSize: 12, fontWeight: 600, margin: '4px 0 2px' }}>{m.subject}</p>
              <p style={{
                color: '#7c82a0', fontSize: 12, margin: 0,
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}>{m.message}</p>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: '#141728', borderRadius: 14, border: '1px solid #1e2235', padding: 24, alignSelf: 'start', position: 'sticky', top: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{selected.subject}</h3>
                <p style={{ color: '#7c82a0', fontSize: 12, margin: 0 }}>{selected.createdAt?.replace('T', ' ').slice(0, 16)}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#1e2235', border: 'none', color: '#7c82a0', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 13 }}>✕</button>
            </div>
            <div style={{ background: '#0d0f1a', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: '0 0 2px' }}>{selected.name}</p>
              <a href={`mailto:${selected.email}`} style={{ color: '#6366f1', fontSize: 13 }}>{selected.email}</a>
            </div>
            <div style={{ background: '#0d0f1a', borderRadius: 10, padding: 14 }}>
              <p style={{ color: '#b0b8d8', fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
            </div>
            <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
              style={{
                display: 'block', marginTop: 16, background: '#6366f1', color: '#fff',
                borderRadius: 10, padding: '10px 0', textAlign: 'center', fontSize: 13,
                fontWeight: 600, textDecoration: 'none',
              }}>Reply via Email</a>
          </div>
        )}
      </div>
    </div>
  );
}
