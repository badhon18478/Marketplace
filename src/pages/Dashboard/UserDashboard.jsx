import { useState, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const navItems = [
  { to: '/dashboard/overview',       icon: '⊞', label: 'Overview'        },
  { to: '/dashboard/my-jobs',        icon: '💼', label: 'My Jobs'         },
  { to: '/dashboard/accepted-tasks', icon: '✅', label: 'Accepted Tasks'  },
  { to: '/dashboard/profile',        icon: '👤', label: 'Profile'         },
  { to: '/dashboard/settings',       icon: '⚙️',  label: 'Settings'        },
];

export default function UserDashboard() {
  const { user, logOut } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240,
        background: 'linear-gradient(180deg, #161b27 0%, #0d1117 100%)',
        borderRight: '1px solid #21262d',
        display: 'flex', flexDirection: 'column',
        transition: 'width .25s ease',
        overflow: 'hidden', flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{
          padding: '18px 14px', borderBottom: '1px solid #21262d',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer',
          }} onClick={() => setCollapsed(p => !p)}>🚀</div>
          {!collapsed && <span style={{ color: '#e6edf3', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>Dashboard</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', whiteSpace: 'nowrap',
              color: isActive ? '#fff' : '#8b949e',
              background: isActive ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'transparent',
              fontWeight: isActive ? 600 : 400, fontSize: 13,
              transition: 'all .18s',
            })}>
              <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: 'center' }}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '10px 8px', borderTop: '1px solid #21262d' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 6 }}>
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=3b82f6&color=fff`}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: '#e6edf3', fontSize: 13, fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.displayName || 'User'}
                </p>
                <p style={{ color: '#8b949e', fontSize: 11, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            width: '100%', padding: collapsed ? '9px 0' : '9px 12px',
            borderRadius: 8, border: 'none', cursor: 'pointer',
            background: '#21262d', color: '#f85149', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8, transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#2d1515'}
            onMouseLeave={e => e.currentTarget.style.background = '#21262d'}
          >
            <span>🚪</span>{!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', padding: '28px 32px', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
