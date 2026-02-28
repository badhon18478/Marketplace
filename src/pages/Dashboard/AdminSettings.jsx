import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Mail,
  Database,
  Palette,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Toggle,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  AlertTriangle,
  Check,
} from 'lucide-react';

const sections = [
  { id: 'general',      label: 'General',       icon: Settings },
  { id: 'security',     label: 'Security',       icon: Shield   },
  { id: 'notifications',label: 'Notifications',  icon: Bell     },
  { id: 'email',        label: 'Email',          icon: Mail     },
  { id: 'appearance',   label: 'Appearance',     icon: Palette  },
  { id: 'maintenance',  label: 'Maintenance',    icon: Database },
];

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-200 dark:bg-gray-700'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const AdminSettings = () => {
  const [active, setActive] = useState('general');
  const [saved, setSaved] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const [general, setGeneral] = useState({
    siteName:    'FreelanceHub',
    siteUrl:     'https://freelancehub.com',
    supportEmail:'support@freelancehub.com',
    timezone:    'UTC+6',
    maintenanceMode: false,
    registrationOpen: true,
  });

  const [security, setSecurity] = useState({
    twoFactor:       true,
    emailVerification: true,
    maxLoginAttempts: '5',
    sessionTimeout:   '24',
    apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
  });

  const [notifications, setNotifications] = useState({
    newUser:     true,
    newJob:      true,
    newMessage:  true,
    jobComplete: false,
    weeklyReport: true,
    flaggedContent: true,
  });

  const [email, setEmail] = useState({
    smtpHost:   'smtp.example.com',
    smtpPort:   '587',
    smtpUser:   'noreply@freelancehub.com',
    smtpPass:   '••••••••••••',
    fromName:   'FreelanceHub',
    fromEmail:  'noreply@freelancehub.com',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Admin Settings
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure your platform settings
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-md ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar Nav */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-3 h-fit"
        >
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group mb-1 ${
                active === s.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-500'
              }`}
            >
              <s.icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`} />
              <span className="flex-1 text-left">{s.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${active === s.id ? 'text-white' : 'text-gray-300 dark:text-gray-600'}`} />
            </button>
          ))}
        </motion.div>

        {/* Settings Content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-6"
        >
          {/* General */}
          {active === 'general' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">General Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Site Name</label>
                  <input type="text" className={inputClass} value={general.siteName} onChange={e => setGeneral(p => ({...p, siteName: e.target.value}))} />
                </div>
                <div>
                  <label className={labelClass}>Site URL</label>
                  <input type="url" className={inputClass} value={general.siteUrl} onChange={e => setGeneral(p => ({...p, siteUrl: e.target.value}))} />
                </div>
                <div>
                  <label className={labelClass}>Support Email</label>
                  <input type="email" className={inputClass} value={general.supportEmail} onChange={e => setGeneral(p => ({...p, supportEmail: e.target.value}))} />
                </div>
                <div>
                  <label className={labelClass}>Timezone</label>
                  <select className={inputClass} value={general.timezone} onChange={e => setGeneral(p => ({...p, timezone: e.target.value}))}>
                    {['UTC', 'UTC+5:30', 'UTC+6', 'UTC-5', 'UTC-8'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                {[
                  { key: 'maintenanceMode',  label: 'Maintenance Mode',    desc: 'Show maintenance page to non-admin users' },
                  { key: 'registrationOpen', label: 'Open Registration',   desc: 'Allow new users to register' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={general[item.key]} onChange={v => setGeneral(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Security */}
          {active === 'security' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { key: 'twoFactor',          label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts' },
                  { key: 'emailVerification',  label: 'Email Verification',        desc: 'Require email verification on signup' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={security[item.key]} onChange={v => setSecurity(p => ({...p, [item.key]: v}))} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Max Login Attempts</label>
                  <input type="number" className={inputClass} value={security.maxLoginAttempts} onChange={e => setSecurity(p => ({...p, maxLoginAttempts: e.target.value}))} />
                </div>
                <div>
                  <label className={labelClass}>Session Timeout (hours)</label>
                  <input type="number" className={inputClass} value={security.sessionTimeout} onChange={e => setSecurity(p => ({...p, sessionTimeout: e.target.value}))} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>API Key</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showSecret ? 'text' : 'password'}
                        className={inputClass}
                        value={security.apiKey}
                        readOnly
                      />
                      <button onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button className="px-4 py-2.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-colors flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notifications */}
          {active === 'notifications' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { key: 'newUser',      label: 'New User Registration',  desc: 'Alert when a new user joins' },
                  { key: 'newJob',       label: 'New Job Posted',         desc: 'Alert when a new job is created' },
                  { key: 'newMessage',   label: 'New Contact Message',    desc: 'Alert on new support messages' },
                  { key: 'jobComplete',  label: 'Job Completed',          desc: 'Alert when a job is marked complete' },
                  { key: 'weeklyReport', label: 'Weekly Report',          desc: 'Receive weekly platform analytics' },
                  { key: 'flaggedContent', label: 'Flagged Content',      desc: 'Alert when content is reported' },
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

          {/* Email */}
          {active === 'email' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">Email Configuration (SMTP)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'smtpHost',  label: 'SMTP Host',  type: 'text'     },
                  { key: 'smtpPort',  label: 'SMTP Port',  type: 'number'   },
                  { key: 'smtpUser',  label: 'SMTP User',  type: 'email'    },
                  { key: 'smtpPass',  label: 'SMTP Password', type: 'password' },
                  { key: 'fromName',  label: 'From Name',  type: 'text'     },
                  { key: 'fromEmail', label: 'From Email', type: 'email'    },
                ].map(field => (
                  <div key={field.key}>
                    <label className={labelClass}>{field.label}</label>
                    <input type={field.type} className={inputClass} value={email[field.key]} onChange={e => setEmail(p => ({...p, [field.key]: e.target.value}))} />
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-colors">
                <Mail className="w-4 h-4" /> Send Test Email
              </button>
            </>
          )}

          {/* Appearance */}
          {active === 'appearance' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">Appearance</h2>
              <div>
                <label className={labelClass}>Primary Color</label>
                <div className="flex gap-3 flex-wrap mt-2">
                  {['#f97316', '#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#ec4899'].map(color => (
                    <button key={color} className="w-10 h-10 rounded-xl border-2 border-white dark:border-gray-700 shadow-md hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Logo URL</label>
                <input type="url" className={inputClass} placeholder="https://example.com/logo.png" />
              </div>
              <div>
                <label className={labelClass}>Favicon URL</label>
                <input type="url" className={inputClass} placeholder="https://example.com/favicon.ico" />
              </div>
            </>
          )}

          {/* Maintenance */}
          {active === 'maintenance' && (
            <>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg pb-2 border-b border-gray-100 dark:border-gray-800">Maintenance & Data</h2>
              <div className="space-y-3">
                {[
                  { label: 'Clear Cache',       desc: 'Remove cached data to improve performance', action: 'Clear Cache',   color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'   },
                  { label: 'Backup Database',   desc: 'Create a full backup of all data',           action: 'Backup Now',   color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' },
                  { label: 'Export All Data',   desc: 'Export all platform data as JSON/CSV',       action: 'Export',       color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${item.color} hover:opacity-80`}>
                      {item.action}
                    </button>
                  </div>
                ))}

                <div className="p-4 rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-700 dark:text-red-400">Danger Zone</p>
                      <p className="text-xs text-red-600 dark:text-red-500 mt-0.5 mb-3">Irreversible actions — proceed with extreme caution.</p>
                      <button className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                        Reset Platform Data
                      </button>
                    </div>
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

export default AdminSettings;
