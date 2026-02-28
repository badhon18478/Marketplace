import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Loader2,
  AlertCircle,
  Sparkles,
  MessageSquare,
  Smartphone,
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const WHATSAPP_NUMBER = '8801738670618';
const EMAILJS_SERVICE_ID = 'service_d200kul';
const EMAILJS_TEMPLATE_ID = 'template_10pzmf7';
const EMAILJS_PUBLIC_KEY = 'y-L_7djOy6nE2E1vK';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // 1️⃣ Save to MongoDB
      await axios.post(`${BASE_URL}/api/contact`, formData);

      // 2️⃣ Send via EmailJS
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            subject,
            message,
            to_email: 'badhonsarker1844@gmail.com',
            reply_to: email,
          },
        }),
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20FreelanceHub,%20I%20want%20to%20connect%20with%20you`;

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-600/15 border-2 border-cyan-500/40 text-cyan-300 px-6 py-3 rounded-full mb-6 shadow-xl shadow-cyan-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Get In Touch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
            >
              Let&apos;s Start a{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Conversation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
            >
              Have a question or need support? Our team is always here for
              freelancers and clients alike.
            </motion.p>
          </div>

          {/* ── WhatsApp Button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-2xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-700 hover:via-green-600 hover:to-emerald-700 rounded-2xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all border-2 border-green-400/40"
              >
                <div className="flex items-center justify-center gap-4">
                  <Smartphone className="w-8 h-8 text-white" />
                  <div className="text-center">
                    <p className="text-xl font-black text-white">
                      Message on WhatsApp
                    </p>
                    <p className="text-sm text-green-100/90">
                      Quick response — Chat directly with our team
                    </p>
                  </div>
                </div>
              </motion.div>
            </a>
          </motion.div>

          {/* ── Grid: Info + Form ── */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4 space-y-4"
            >
              <ContactCard
                icon={<Mail className="text-cyan-400" size={24} />}
                title="Email"
                detail="support@freelancehub.com"
                link="mailto:support@freelancehub.com"
              />
              <ContactCard
                icon={<Phone className="text-blue-400" size={24} />}
                title="Phone"
                detail="+880 1738-670618"
                link="tel:+8801738670618"
              />
              <ContactCard
                icon={<MapPin className="text-purple-400" size={24} />}
                title="Location"
                detail="Dhaka, Bangladesh"
              />

              {/* Support Hours */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-6 bg-slate-950/80 backdrop-blur-3xl border-2 border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl transition-all shadow-xl shadow-cyan-500/10"
              >
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Support Hours
                </p>
                {[
                  { day: 'Mon – Fri', time: '9am – 6pm BST' },
                  { day: 'Saturday', time: '10am – 4pm BST' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm py-1.5 border-b border-slate-800/50 last:border-0"
                  >
                    <span className="text-slate-400">{s.day}</span>
                    <span className="text-white font-semibold">{s.time}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-8"
            >
              <div className="bg-slate-950/80 backdrop-blur-3xl border-2 border-cyan-500/20 rounded-3xl p-8 md:p-10 shadow-2xl shadow-cyan-500/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-600/15 border border-cyan-500/40 rounded-2xl shadow-lg shadow-cyan-500/20">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Send Message via Email
                    </h3>
                    <p className="text-slate-400">
                      We&apos;ll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="c-name"
                        className="text-sm font-bold text-slate-300 ml-1 block"
                      >
                        Full Name *
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-slate-900/50 border-2 border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="c-email"
                        className="text-sm font-bold text-slate-300 ml-1 block"
                      >
                        Email Address *
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-slate-900/50 border-2 border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label
                      htmlFor="c-subject"
                      className="text-sm font-bold text-slate-300 ml-1 block"
                    >
                      Subject *
                    </label>
                    <input
                      id="c-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full bg-slate-900/50 border-2 border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all backdrop-blur-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="c-message"
                      className="text-sm font-bold text-slate-300 ml-1 block"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="w-full bg-slate-900/50 border-2 border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all resize-none backdrop-blur-sm"
                    />
                  </div>

                  {/* Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 ring-2 ring-cyan-500/40 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 text-green-300 rounded-2xl flex items-center gap-3 shadow-lg shadow-green-500/20"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">
                            Message Sent Successfully!
                          </p>
                          <p className="text-sm text-green-400/80">
                            Our team will get back to you within 24 hours.
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/40 text-red-300 rounded-2xl flex items-center gap-3 shadow-lg shadow-red-500/20"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">Failed to Send</p>
                          <p className="text-sm text-red-400/80">
                            Please fill all fields or try WhatsApp instead.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const ContactCard = ({ icon, title, detail, link }) => (
  <motion.a
    href={link}
    target={link ? '_blank' : undefined}
    rel={link ? 'noopener noreferrer' : undefined}
    whileHover={{ scale: 1.02, y: -2 }}
    className="block p-6 bg-slate-950/80 backdrop-blur-3xl border-2 border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl transition-all shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 group"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-600/15 border border-cyan-500/30 rounded-xl group-hover:border-cyan-500/50 transition-all shadow-lg shadow-cyan-500/10">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
          {title}
        </p>
        <p className="text-base font-bold text-white">{detail}</p>
      </div>
    </div>
  </motion.a>
);

export default Contact;
