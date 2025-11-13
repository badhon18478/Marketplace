import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';
import heroImage from '../assets/banner.jpg';
import { Link, useNavigate } from 'react-router';

const categories = [
  { name: 'Web Development', icon: '💻', count: '250+ Jobs' },
  { name: 'Digital Marketing', icon: '📱', count: '180+ Jobs' },
  { name: 'Graphics Design', icon: '🎨', count: '320+ Jobs' },
  { name: 'Content Writing', icon: '✍️', count: '150+ Jobs' },
];
const Banner = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: '1000+',
      label: 'Active Jobs',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '5000+',
      label: 'Freelancers',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      value: '3500+',
      label: 'Completed Projects',
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: '4.8/5',
      label: 'Average Rating',
    },
  ];
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-semibold text-primary shadow-md border border-gray-200 dark:border-gray-700">
                  🎉 Trusted by 5000+ Freelancers
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-white">
                  Find Your Perfect{' '}
                </span>
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Freelance Job
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Connect with top clients, work on exciting projects, and grow
                your freelance career with FreelanceHub - the most reliable
                marketplace platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/allJobs')}
                  className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-xl hover:shadow-2xl"
                >
                  Browse Jobs
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/add-job')}
                  className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary dark:text-primary bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-lg border-2 border-primary/20 dark:border-primary/30"
                >
                  Post a Job
                  <Briefcase className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="Freelancers working"
                  className="rounded-2xl shadow-2xl"
                />

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-primary to-blue-600 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        98%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        24/7
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Support
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Find Your Perfect
                <span className="gradient-text"> Freelance </span>
                Opportunity
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with talented professionals and discover exciting
                projects. Join thousands of freelancers building their careers
                on JobHub.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/a"
                    className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Browse Jobs
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    Post a Job
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Freelancers collaborating"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, label: 'Active Jobs', value: '900+' },
              { icon: Users, label: 'Freelancers', value: '5,000+' },
              { icon: TrendingUp, label: 'Success Rate', value: '95%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Top Categories
            </h2>
            <p className="text-muted-foreground">
              Explore opportunities in trending fields
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border card-hover text-center"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
