import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, Star, Edit2, Camera, Save, X, Globe, Github, Linkedin } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    displayName: user?.displayName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+880 1234 567890',
    location: 'Dhaka, Bangladesh',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and great user experiences.',
    title: 'Full Stack Developer',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'johndoe',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Firebase'],
    hourlyRate: '$45',
  });

  const stats = [
    { label: 'Jobs Posted',    value: '12' },
    { label: 'Tasks Done',     value: '8'  },
    { label: 'Avg Rating',     value: '4.8'},
    { label: 'Member Since',   value: '2024'},
  ];

  const reviews = [
    { name: 'Mark Williams',  rating: 5, comment: 'Excellent work! Delivered on time and exceeded expectations.', date: 'Feb 2025' },
    { name: 'Sarah Johnson',  rating: 5, comment: 'Very professional and communicative throughout the project.', date: 'Jan 2025' },
    { name: 'James Carter',   rating: 4, comment: 'Good work quality, minor revisions needed but overall great.', date: 'Dec 2024' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</motion.h1>
        <button onClick={() => setEditing(!editing)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            editing
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              : 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md hover:shadow-lg'
          }`}>
          {editing ? <><X className="w-4 h-4" /> Cancel</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
        </button>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-blue-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
            <div className="relative w-fit">
              <img
                src={user?.photoURL || ('https://ui-avatars.com/api/?name=' + profile.displayName + '&background=7c3aed&color=fff&size=96')}
                alt={profile.displayName}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-gray-900 shadow-lg"
              />
              {editing && (
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              {[
                { icon: Globe,    href: profile.website },
                { icon: Github,   href: 'https://github.com/' + profile.github },
                { icon: Linkedin, href: 'https://linkedin.com/in/' + profile.linkedin },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name',    key: 'displayName', type: 'text'  },
                { label: 'Job Title',    key: 'title',       type: 'text'  },
                { label: 'Email',        key: 'email',       type: 'email' },
                { label: 'Phone',        key: 'phone',       type: 'tel'   },
                { label: 'Location',     key: 'location',    type: 'text'  },
                { label: 'Hourly Rate',  key: 'hourlyRate',  type: 'text'  },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{field.label}</label>
                  <input type={field.type} value={profile[field.key]}
                    onChange={e => setProfile(p => ({...p, [field.key]: e.target.value}))}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Bio</label>
                <textarea rows={3} value={profile.bio}
                  onChange={e => setProfile(p => ({...p, bio: e.target.value}))}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setEditing(false)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.displayName}</h2>
              <p className="text-primary font-semibold text-sm mt-0.5">{profile.title}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">{profile.bio}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-primary" /> {profile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" /> {profile.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {profile.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> {profile.hourlyRate}/hr</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map(skill => (
            <span key={skill} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-primary text-xs font-semibold rounded-xl border border-purple-100 dark:border-purple-900/30">
              {skill}
            </span>
          ))}
          {editing && (
            <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-xs font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors">
              + Add Skill
            </button>
          )}
        </div>
      </motion.div>

      {/* Reviews */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Reviews</h2>
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.name} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{r.comment}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
