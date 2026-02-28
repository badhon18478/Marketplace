import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
// import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── Demo auto-fill ──────────────────────────────────────────
  const fillDemo = type => {
    if (type === 'user')
      setFormData({ email: 'user@demo.com', password: 'Demo123' });
    if (type === 'admin')
      setFormData({ email: 'admin@demo.com', password: 'Admin123' });
  };

  // ── Save to DB helper ───────────────────────────────────────
  const saveUserToDB = async (name, email, photoURL) => {
    try {
      await axios.post(`${BASE_URL}/api/users`, {
        name,
        email,
        photoURL: photoURL || '',
      });
    } catch {
      /* ignore duplicate */
    }
  };

  // ── Email/Password Login ────────────────────────────────────
  const handleLogin = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      toast.success('Login successful! Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === 'auth/invalid-credential')
        toast.error('Invalid email or password');
      else if (error.code === 'auth/too-many-requests')
        toast.error('Too many attempts. Try again later.');
      else if (error.code === 'auth/user-not-found')
        toast.error('No account found with this email');
      else toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Google Login ────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setGLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result?.user;
      if (user) await saveUserToDB(user.displayName, user.email, user.photoURL);
      toast.success('Login successful! Welcome! 🎉');
      navigate(from, { replace: true });
    } catch {
      toast.error('Google login failed. Please try again.');
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 px-8 py-10 text-center">
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-purple-100">
                Sign in to your FreelanceHub account
              </p>
            </div>

            <div className="p-8">
              {/* Demo Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => fillDemo('user')}
                  className="flex-1 py-2.5 text-sm font-bold text-purple-600 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-all"
                >
                  🧑 Demo User
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('admin')}
                  className="flex-1 py-2.5 text-sm font-bold text-orange-600 bg-orange-50 border-2 border-orange-200 rounded-lg hover:bg-orange-100 transition-all"
                >
                  🛡️ Demo Admin
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium">
                    or sign in with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
                      Signing In...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-semibold">
                    OR
                  </span>
                </div>
              </div>

              {/* Google */}
              <button
                onClick={handleGoogleLogin}
                disabled={gLoading}
                className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {gLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-400" />
                ) : (
                  <FcGoogle className="w-6 h-6" />
                )}
                {gLoading ? 'Connecting...' : 'Continue with Google'}
              </button>

              {/* Register Link */}
              <p className="text-center mt-6 text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 font-bold"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
