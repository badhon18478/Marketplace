import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { User, Lock, Bell, Palette, Shield, ChevronRight, Save, Eye, EyeOff, Check, Moon, Sun } from 'lucide-react';

const sections = [
  { id: 'account',        label: 'Account',        icon: User    },
  { id: 'password',       label: 'Password',        icon: Lock    },
  { id: 'notifications',  label: 'Notifications',   icon: Bell    },
  { id: 'appearance',     label: 'Appearance',      icon: Palette },
  { id: 'privacy',        label: 'Privacy',         icon: Shield  },
];

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-gradient-to-r from-primary to-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const DashboardSettings = () => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState('account');
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const [account, setAccount] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '+880 1234 567890',
    location: 'Dhaka, Bangladesh',
    bio: 'Full-stack developer with 5+ years experience.',
  });

  const [notifications, setNotifications] = useState({
    emailNewBid:     true,
    emailMessages:   true,
    emailUpdates:    false,
    pushNewBid:      true,
    pushMessages:    true,
    weeklyDigest:    true,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic:   true,
    showEmail:       false,
    showPhone:       false,
    showOnline:      true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white">Settings</motion.h1>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-md ${
            saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg'
          }`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-3 h-fit">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-1 group ${
                active === s.id
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-primary'
              }`}>
              <s.icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
              <span className="flex-1 text-left">{s.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${active === s.id ? 'text-white' : 'text-gray-300 dark:text-gray-600'}`} />
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-5">

          {active === 'account' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-3 border-b border-gray-100 dark:border-gray-800">Account Information</h2>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <img src={user?.photoURL || ('https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=7c3aed&color=fff&size=64')}
                  alt="avatar" className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary shadow" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  <button className="mt-1.5 text-xs font-semibold text-primary hover:underline">Change Photo</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Display Name', key: 'displayName', type: 'text'  },
                  { label: 'Email',        key: 'email',       type: 'email' },
                  { label: 'Phone',        key: 'phone',       type: 'tel'   },
                  { label: 'Location',     key: 'location',    type: 'text'  },
                ].map(f => (
                  <div key={f.key}>
                    <label className={labelClass}>{f.label}</label>
                    <input type={f.type} className={inputClass} value={account[f.key]}
                      onChange={e => setAccount(p => ({...p, [f.key]: e.target.value}))} />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className={labelClass}>Bio</label>
                  <textarea rows={3} className={inputClass + ' resize-none'} value={account.bio}
                    onChange={e => setAccount(p => ({...p, bio: e.target.value}))} />
                </div>
              </div>
            </>
          )}

          {active === 'password' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-3 border-b border-gray-100 dark:border-gray-800">Change Password</h2>
              <div className="space-y-4">
                {[
                  { label: 'Current Password', key: 'current' },
                  { label: 'New Password',      key: 'new'     },
                  { label: 'Confirm Password',  key: 'confirm' },
                ].map(f => (
                  <div key={f.key}>
                    <label className={labelClass}>{f.label}</label>
                    <div className="relative">
                      <input type={showPass[f.key] ? 'text' : 'password'} className={inputClass + ' pr-10'} placeholder="••••••••" />
                      <button onClick={() => setShowPass(p => ({...p, [f.key]: !p[f.key]}))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPass[f.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.</p>
                </div>
              </div>
            </>
          )}

          {active === 'notifications' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-3 border-b border-gray-100 dark:border-gray-800">Notification Preferences</h2>
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Notifications</p>
                {[
                  { key: 'emailNewBid',   label: 'New bid on your job',         desc: 'Get notified when someone bids' },
                  { key: 'emailMessages', label: 'New messages',                desc: 'Get notified on new messages' },
                  { key: 'emailUpdates',  label: 'Platform updates',            desc: 'News and feature announcements' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={notifications[item.key]} onChange={v => setNotifications(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pt-2">Push Notifications</p>
                {[
                  { key: 'pushNewBid',    label: 'New bids',       desc: 'Browser push for new bids' },
                  { key: 'pushMessages',  label: 'Messages',       desc: 'Browser push for messages' },
                  { key: 'weeklyDigest',  label: 'Weekly digest',  desc: 'Weekly activity summary' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={notifications[item.key]} onChange={v => setNotifications(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
            </>
          )}

          {active === 'appearance' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-3 border-b border-gray-100 dark:border-gray-800">Appearance</h2>
              <div>
                <p className={labelClass}>Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Light Mode', value: 'light', icon: Sun  },
                    { label: 'Dark Mode',  value: 'dark',  icon: Moon },
                  ].map(t => (
                    <button key={t.value} onClick={() => theme !== t.value && toggleTheme()}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        theme === t.value
                          ? 'border-primary bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300'
                      }`}>
                      <t.icon className={`w-5 h-5 ${theme === t.value ? 'text-primary' : 'text-gray-400'}`} />
                      <span className={`text-sm font-semibold ${theme === t.value ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>{t.label}</span>
                      {theme === t.value && <Check className="w-4 h-4 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className={labelClass}>Accent Color</p>
                <div className="flex gap-3 mt-1">
                  {['#7c3aed', '#2563eb', '#059669', '#dc2626', '#d97706', '#db2777'].map(color => (
                    <button key={color} className="w-9 h-9 rounded-xl shadow-sm border-2 border-white dark:border-gray-700 hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </>
          )}

          {active === 'privacy' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-3 border-b border-gray-100 dark:border-gray-800">Privacy Settings</h2>
              <div className="space-y-3">
                {[
                  { key: 'profilePublic', label: 'Public Profile',       desc: 'Allow others to view your profile' },
                  { key: 'showEmail',     label: 'Show Email Address',   desc: 'Display email on your public profile' },
                  { key: 'showPhone',     label: 'Show Phone Number',    desc: 'Display phone on your public profile' },
                  { key: 'showOnline',    label: 'Show Online Status',   desc: 'Let others see when you are active' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={privacy[item.key]} onChange={v => setPrivacy(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="p-4 rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
                    <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">Delete Account</p>
                    <p className="text-xs text-red-500 mb-3">This action is permanent and cannot be undone. All your data will be removed.</p>
                    <button className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardSettings;
