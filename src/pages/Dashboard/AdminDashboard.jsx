import { useState, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const navItems = [
  { to: '/admin/overview',     icon: '⬛', label: 'Overview'         },
  { to: '/admin/manage-users', icon: '👥', label: 'Manage Users'     },
  { to: '/admin/manage-jobs',  icon: '💼', label: 'Manage Jobs'      },
  { to: '/admin/manage-blogs', icon: '📝', label: 'Manage Blogs'     },
  { to: '/admin/contacts',     icon: '✉️',  label: 'Contact Messages' },
  { to: '/admin/reports',      icon: '📊', label: 'Reports'          },
];

export default function AdminDashboard() {
  const { user, logOut } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d0f1a', fontFamily: "'Sora', 'Segoe UI', sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? 64 : 240,
        background: 'linear-gradient(180deg,#141728 0%,#0d0f1a 100%)',
        borderRight: '1px solid #1e2235',
        display: 'flex', flexDirection: 'column',
        transition: 'width .25s ease',
        overflow: 'hidden', flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo row */}
        <div style={{
          padding: '18px 14px', borderBottom: '1px solid #1e2235',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer',
          }} onClick={() => setCollapsed(p => !p)}>⚡</div>
          {!collapsed && <span style={{ color: '#fff', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>Admin Panel</span>}
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 12px', borderRadius: 10, marginBottom: 3,
              textDecoration: 'none', whiteSpace: 'nowrap',
              color: isActive ? '#fff' : '#7c82a0',
              background: isActive ? 'linear-gradient(135deg,#6366f1,#7c3aed)' : 'transparent',
              fontWeight: isActive ? 600 : 400, fontSize: 13,
              transition: 'all .18s',
              overflow: 'hidden',
            })}>
              <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: 'center' }}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '10px 8px', borderTop: '1px solid #1e2235' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 6 }}>
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'Admin'}&background=6366f1&color=fff`}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.displayName || 'Admin'}</p>
                <p style={{ color: '#6366f1', fontSize: 11, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Administrator</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            width: '100%', padding: collapsed ? '9px 0' : '9px 12px',
            borderRadius: 10, border: 'none', cursor: 'pointer',
            background: '#1e2235', color: '#ef4444', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8, transition: 'background .18s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#2a1a1a'}
            onMouseLeave={e => e.currentTarget.style.background = '#1e2235'}
          >
            <span>🚪</span>{!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, overflow: 'auto', padding: '28px 32px', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
