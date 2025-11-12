import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';
import heroImage from '../assets/banner.jpg';
import { Link } from 'react-router';

const categories = [
  { name: 'Web Development', icon: '💻', count: '250+ Jobs' },
  { name: 'Digital Marketing', icon: '📱', count: '180+ Jobs' },
  { name: 'Graphics Design', icon: '🎨', count: '320+ Jobs' },
  { name: 'Content Writing', icon: '✍️', count: '150+ Jobs' },
];
const Banner = () => {
  return (
    <div>
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

      {/* Latest Jobs */}
      {/* <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Latest Opportunities
            </h2>
            <p className="text-muted-foreground">
              Fresh jobs posted by our community
            </p>
          </motion.div>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs?.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard
                    id={job.id}
                    title={job.title}
                    category={job.category}
                    summary={job.summary}
                    postedBy={job.posted_by}
                    postedAt={job.posted_at}
                    coverImage={job.cover_image}
                  />
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/all-jobs">
              <Button size="lg" variant="outline">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Banner;
