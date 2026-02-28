import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const inp = { width: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, color: '#e6edf3', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box' };

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({});
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API}/api/users/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data);
        setForm({ name: data.name || '', photoURL: data.photoURL || '', phone: data.phone || '', location: data.location || '', bio: data.bio || '' });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await user.getIdToken();
      await fetch(`${API}/api/users/${user.email}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setProfile(p => ({ ...p, ...form }));
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
      <div style={{ width: 40, height: 40, border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#e6edf3', fontSize: 22, fontWeight: 700, margin: 0 }}>My Profile</h1>
        <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 13 }}>Manage your personal information</p>
      </div>

      {saved && (
        <div style={{ background: '#10b98122', border: '1px solid #10b98144', borderRadius: 10, padding: '10px 16px', color: '#34d399', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          ✅ Profile updated successfully!
        </div>
      )}

      {/* Profile Card */}
      <div style={{ background: '#161b27', borderRadius: 16, border: '1px solid #21262d', overflow: 'hidden', marginBottom: 20 }}>
        {/* Cover */}
        <div style={{ height: 100, background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', position: 'relative' }} />
        {/* Avatar */}
        <div style={{ padding: '0 24px 24px', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginTop: -40 }}>
            <img
              src={profile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'U')}&background=3b82f6&color=fff&size=80`}
              alt="avatar"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '4px solid #161b27' }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <h2 style={{ color: '#e6edf3', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{profile?.name || 'Unknown'}</h2>
            <p style={{ color: '#8b949e', fontSize: 13, margin: '0 0 8px' }}>{profile?.email}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {profile?.phone && <span style={{ color: '#8b949e', fontSize: 12 }}>📞 {profile.phone}</span>}
              {profile?.location && <span style={{ color: '#8b949e', fontSize: 12 }}>📍 {profile.location}</span>}
              <span style={{ color: '#8b949e', fontSize: 12 }}>🗓️ Joined {profile?.createdAt?.slice(0, 10)}</span>
            </div>
            {profile?.bio && <p style={{ color: '#8b949e', fontSize: 13, margin: '12px 0 0', lineHeight: 1.6 }}>{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* Edit form */}
      {!editing ? (
        <button onClick={() => setEditing(true)} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Edit Profile
        </button>
      ) : (
        <div style={{ background: '#161b27', borderRadius: 16, border: '1px solid #21262d', padding: 24 }}>
          <h3 style={{ color: '#e6edf3', fontSize: 15, fontWeight: 700, margin: '0 0 20px' }}>Edit Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Phone', key: 'phone' },
              { label: 'Location', key: 'location' },
              { label: 'Photo URL', key: 'photoURL' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input style={inp} value={form[f.key] || ''} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Bio</label>
            <textarea style={{ ...inp, minHeight: 90, resize: 'vertical' }} value={form.bio || ''} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself…" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setEditing(false)} style={{ background: '#21262d', color: '#8b949e', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
