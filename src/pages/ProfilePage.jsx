import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../firebase/firebase.config';
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
// import { AuthContext } from '../AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
// import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm();

  useEffect(() => {
    if (!user?.email) return;
    const fetch = async () => {
      try {
        const res = await axiosSecure.get(`/api/users/${user.email}`);
        setProfileData(res.data);
        reset({
          name: res.data.name || user.displayName || '',
          photoURL: res.data.photoURL || user.photoURL || '',
          phone: res.data.phone || '',
          location: res.data.location || '',
          bio: res.data.bio || '',
        });
      } catch {
        reset({
          name: user.displayName || '',
          photoURL: user.photoURL || '',
        });
      }
    };
    fetch();
  }, [user, axiosSecure, reset]);

  // ── Update Profile ────────────────────────────────────────────
  const onProfileSubmit = async data => {
    setLoading(true);
    try {
      // Update Firebase profile
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photoURL,
      });
      // Update MongoDB
      await axiosSecure.put(`/api/users/${user.email}`, data);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // ── Update Password ───────────────────────────────────────────
  const onPasswordSubmit = async data => {
    setPassLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      toast.success('Password updated successfully!');
      resetPass();
    } catch (err) {
      const msg =
        err.code === 'auth/wrong-password'
          ? 'Current password is incorrect'
          : 'Failed to update password';
      toast.error(msg);
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 lg:p-8 max-w-3xl space-y-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-1">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Update your personal information and account settings
          </p>
        </motion.div>

        {/* Avatar Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 shadow-sm"
        >
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${user?.displayName}&background=6366f1&color=fff&size=128`
            }
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover border-4 border-primary/20 shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {user?.displayName}
            </h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {profileData?.role || 'user'}
            </span>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">
            Personal Information
          </h2>
          <form
            onSubmit={handleSubmit(onProfileSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="p-name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="p-name"
                    type="text"
                    placeholder="Your full name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Min 2 characters' },
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email (readonly) */}
              <div>
                <label
                  htmlFor="p-email"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="p-email"
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="p-phone"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="p-phone"
                    type="tel"
                    placeholder="+1 555 000 1234"
                    {...register('phone', {
                      pattern: {
                        value: /^[+\d\s\-()]*$/,
                        message: 'Invalid phone number',
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="p-location"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="p-location"
                    type="text"
                    placeholder="City, Country"
                    {...register('location')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="p-photo"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Profile Photo URL
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="p-photo"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...register('photoURL', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL',
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              {errors.photoURL && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="p-bio"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Bio
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <textarea
                  id="p-bio"
                  rows={3}
                  placeholder="Tell us a bit about yourself..."
                  {...register('bio', {
                    maxLength: { value: 300, message: 'Max 300 characters' },
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>
        </motion.div>

        {/* Password Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-foreground mb-2">
            Change Password
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Make sure your new password is at least 6 characters
          </p>

          <form
            onSubmit={handlePassSubmit(onPasswordSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Current Password */}
            <div>
              <label
                htmlFor="curr-pass"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Current Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="curr-pass"
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Your current password"
                  {...regPass('currentPassword', {
                    required: 'Current password is required',
                  })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrent ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passErrors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="new-pass"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                New Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="new-pass"
                  type={showNew ? 'text' : 'password'}
                  placeholder="New password"
                  {...regPass('newPassword', {
                    required: 'New password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNew ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passErrors.newPassword.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={passLoading}
              className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {passLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              {passLoading ? 'Updating...' : 'Update Password'}
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
