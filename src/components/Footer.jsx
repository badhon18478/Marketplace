import React from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Home', path: '/' },
      { name: 'All Jobs', path: '/allJobs' },
      { name: 'Add Job', path: '/add-job' },
      { name: 'My Tasks', path: '/my-accepted-tasks' },
    ],
    categories: [
      { name: 'Web Development', path: '/allJobs' },
      { name: 'Digital Marketing', path: '/allJobs' },
      { name: 'Graphics Designing', path: '/allJobs' },
      { name: 'Content Writing', path: '/allJobs' },
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Contact Us', path: '#' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ],
  };

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      url: '#',
      color: 'hover:text-blue-600',
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: '#',
      color: 'hover:text-sky-500',
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      url: '#',
      color: 'hover:text-pink-600',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: '#',
      color: 'hover:text-blue-700',
    },
    {
      icon: <Github className="w-5 h-5" />,
      url: '#',
      color: 'hover:text-gray-900',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </Link>

            <p className="text-gray-600 mb-4 leading-relaxed">
              The most reliable freelance marketplace connecting talented
              professionals with amazing opportunities worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@freelancehub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Business Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-6 mb-8">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Stay Updated!
              </h3>
              <p className="text-gray-600">
                Subscribe to get the latest jobs and updates
              </p>
            </div>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} FreelanceHub. Made with{' '}
              <Heart className="inline w-4 h-4 text-red-500 fill-current" /> by
              the FreelanceHub Team.
              <br className="md:hidden" />
              <span className="text-gray-500"> All rights reserved.</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 bg-white rounded-lg border border-gray-200 text-gray-600 ${social.color} transition-all shadow-sm hover:shadow-md`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
