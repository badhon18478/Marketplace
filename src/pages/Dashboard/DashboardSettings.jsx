import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const inp = { width: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, color: '#e6edf3', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box' };

const Section = ({ title, desc, children }) => (
  <div style={{ background: '#161b27', borderRadius: 16, border: '1px solid #21262d', padding: 24, marginBottom: 16 }}>
    <h3 style={{ color: '#e6edf3', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>{title}</h3>
    {desc && <p style={{ color: '#8b949e', fontSize: 13, margin: '0 0 20px' }}>{desc}</p>}
    {children}
  </div>
);

const Toggle = ({ label, desc, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #21262d' }}>
    <div>
      <p style={{ color: '#e6edf3', fontSize: 13, fontWeight: 500, margin: 0 }}>{label}</p>
      {desc && <p style={{ color: '#8b949e', fontSize: 12, margin: '2px 0 0' }}>{desc}</p>}
    </div>
    <div onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
      background: checked ? '#3b82f6' : '#21262d',
      position: 'relative', transition: 'background .2s', flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        transition: 'left .2s',
      }} />
    </div>
  </div>
);

export default function DashboardSettings() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState({
    email: true, jobAlerts: true, taskUpdates: false, newsletter: false,
  });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [saved, setSaved] = useState('');

  const handleSaveNotifications = () => {
    setSaved('notifications');
    setTimeout(() => setSaved(''), 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) return alert('New passwords do not match');
    if (passwords.newPass.length < 6) return alert('Password must be at least 6 characters');
    setSaved('password');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSaved(''), 2500);
  };

  const Toast = ({ msg }) => (
    <div style={{ background: '#10b98122', border: '1px solid #10b98144', borderRadius: 10, padding: '10px 16px', color: '#34d399', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
      ✅ {msg}
    </div>
  );

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#e6edf3', fontSize: 22, fontWeight: 700, margin: 0 }}>Settings</h1>
        <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 13 }}>Manage your account preferences</p>
      </div>

      {saved === 'notifications' && <Toast msg="Notification preferences saved!" />}
      {saved === 'password' && <Toast msg="Password changed successfully!" />}

      {/* Account Info */}
      <Section title="Account Information" desc="Your basic account details">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0' }}>
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=3b82f6&color=fff`}
            alt="avatar"
            style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <p style={{ color: '#e6edf3', fontWeight: 600, margin: 0 }}>{user?.displayName || 'User'}</p>
            <p style={{ color: '#8b949e', fontSize: 13, margin: '2px 0 0' }}>{user?.email}</p>
            <p style={{ color: '#3b82f6', fontSize: 11, margin: '4px 0 0', fontWeight: 600 }}>
              {user?.providerData?.[0]?.providerId === 'google.com' ? '🔗 Google Account' : '🔐 Email & Password'}
            </p>
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" desc="Choose what updates you want to receive">
        <Toggle
          label="Email Notifications" desc="Receive updates via email"
          checked={notifications.email}
          onChange={() => setNotifications(p => ({ ...p, email: !p.email }))}
        />
        <Toggle
          label="Job Alerts" desc="Get notified about new job postings"
          checked={notifications.jobAlerts}
          onChange={() => setNotifications(p => ({ ...p, jobAlerts: !p.jobAlerts }))}
        />
        <Toggle
          label="Task Updates" desc="Notifications when task status changes"
          checked={notifications.taskUpdates}
          onChange={() => setNotifications(p => ({ ...p, taskUpdates: !p.taskUpdates }))}
        />
        <Toggle
          label="Newsletter" desc="Receive our weekly newsletter"
          checked={notifications.newsletter}
          onChange={() => setNotifications(p => ({ ...p, newsletter: !p.newsletter }))}
        />
        <button onClick={handleSaveNotifications} style={{ marginTop: 16, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Save Preferences
        </button>
      </Section>

      {/* Change Password */}
      {user?.providerData?.[0]?.providerId !== 'google.com' && (
        <Section title="Change Password" desc="Update your account password">
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Current Password', key: 'current', placeholder: '••••••••' },
              { label: 'New Password',     key: 'newPass', placeholder: 'Min. 6 characters' },
              { label: 'Confirm Password', key: 'confirm', placeholder: 'Repeat new password' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ color: '#8b949e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input
                  type="password" style={inp} placeholder={f.placeholder}
                  value={passwords[f.key]}
                  onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600, alignSelf: 'flex-start' }}>
              Change Password
            </button>
          </form>
        </Section>
      )}

      {/* Danger Zone */}
      <div style={{ background: '#161b27', borderRadius: 16, border: '1px solid #ef444444', padding: 24 }}>
        <h3 style={{ color: '#f87171', fontSize: 15, fontWeight: 700, margin: '0 0 8px' }}>Danger Zone</h3>
        <p style={{ color: '#8b949e', fontSize: 13, margin: '0 0 16px' }}>These actions are irreversible. Please be careful.</p>
        <button
          onClick={() => confirm('Are you sure you want to delete your account? This cannot be undone.')}
          style={{ background: '#ef444422', color: '#f87171', border: '1px solid #ef444444', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
