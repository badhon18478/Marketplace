import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Briefcase,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Code,
  Megaphone,
  Palette,
  PenTool,
  Video,
} from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import useAxiosSecure from '../hooks/useAxiosSecure';
import axios from 'axios';
import { Card } from '../components/Ui/Card';
import { Button } from '../components/Ui/Button';
const Home = () => {
  const navigate = useNavigate();
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchLatestJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/api/jobs/latest', {
          cancelToken: source.token,
        });
        setLatestJobs(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching jobs:', error);
          toast.error('Failed to load latest jobs');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();

    return () => {
      source.cancel('Component unmounted, request cancelled');
    };
  }, [axiosSecure]);

  const categories = [
    {
      name: 'Web Development',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      count: '250+ Jobs',
    },
    {
      name: 'Digital Marketing',
      icon: <Megaphone className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      count: '180+ Jobs',
    },
    {
      name: 'Graphics Designing',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      count: '320+ Jobs',
    },
    {
      name: 'Content Writing',
      icon: <PenTool className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      count: '150+ Jobs',
    },
    {
      name: 'Video Editing',
      icon: <Video className="w-8 h-8" />,
      color: 'from-yellow-500 to-amber-500',
      count: '200+ Jobs',
    },
  ];

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

  const features = [
    {
      title: 'Reliable Platform',
      description: 'Trusted by thousands of freelancers and clients worldwide',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Secure Payments',
      description:
        'Your payments are protected with industry-standard security',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Quick Matching',
      description: 'Find the perfect freelancer for your project in minutes',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <div>
      <title>Home</title>
      <Navbar />
      <div className=" mt-4 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

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
                  <span className="px-4 py-2 bg-card rounded-full text-sm font-semibold text-primary shadow-md border border-border">
                    🎉 Trusted by 5000+ Freelancers
                  </span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">Find Your Perfect </span>
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Freelance Job
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
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
                      <div className="text-sm text-muted-foreground">
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
        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-primary to-blue-600 p-3 rounded-xl text-primary-foreground flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Jobs Section */}
        <section className="py-20 py-20 bg-muted/30 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Latest{' '}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover the newest freelance jobs posted on our platform
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                />
              </div>
            ) : latestJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <Briefcase className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No jobs available yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Be the first to post a job!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/add-job')}
                  className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-lg"
                >
                  Post Your First Job
                </motion.button>
              </motion.div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {latestJobs.map((job, index) => (
                    <JobCard key={job._id} job={job} index={index} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Link
                    to="/allJobs"
                    className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    View All Jobs
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </section>
        {/* Categories Section */}
        <section className="py-20 bg-muted/30 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Top{' '}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Explore jobs by your favorite categories
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-muted/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-600"
                >
                  <div
                    className={`bg-gradient-to-r ${category.color} p-4 rounded-xl text-white w-fit mb-4`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-muted/30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                About FreelanceHub
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground mb-6">
                  FreelanceHub is your trusted platform for connecting talented
                  freelancers with amazing opportunities. We bridge the gap
                  between skilled professionals and businesses seeking quality
                  services.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're a freelancer looking for your next project or a
                  client seeking top talent, FreelanceHub makes the process
                  simple, secure, and efficient.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-blue-600 dark:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Verified Freelancers
                    </h3>
                    <p className="text-muted-foreground">
                      All our freelancers are verified and reviewed to ensure
                      quality
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Secure Payments
                    </h3>
                    <p className="text-muted-foreground">
                      Safe and secure payment system for peace of mind
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-purple-600 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      24/7 Support
                    </h3>
                    <p className="text-muted-foreground">
                      Round-the-clock customer support for all your needs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
