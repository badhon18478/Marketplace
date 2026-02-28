import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-muted" />
    <div className="p-6">
      <div className="h-4 bg-muted rounded w-24 mb-3" />
      <div className="h-5 bg-muted rounded w-full mb-2" />
      <div className="h-3 bg-muted rounded w-full mb-1" />
      <div className="h-3 bg-muted rounded w-4/5 mb-4" />
      <div className="flex justify-between">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-4 bg-muted rounded w-16" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/blog?page=${page}&limit=6`,
        );
        setBlogs(res.data.blogs || []);
        setTotalPages(res.data.totalPages || 1);
        setTotal(res.data.total || 0);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page]);

  const filteredBlogs = search
    ? blogs.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.category?.toLowerCase().includes(search.toLowerCase()),
      )
    : blogs;

  const CATEGORIES = [
    'All',
    'Career Tips',
    'Best Practices',
    'Success Stories',
    'News',
    'Tutorial',
  ];

  return (
    <div>
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            FreelanceHub Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Tips, insights, and success stories to grow your freelance career
          </motion.p>
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Stats */}
          <div className="text-center mb-10">
            <p className="text-muted-foreground">
              {total} articles across {CATEGORIES.length - 1} categories
            </p>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-card rounded-2xl border border-border"
            >
              <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No Articles Found
              </h3>
              <p className="text-muted-foreground">
                Try a different search term
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post, index) => (
                <motion.div
                  key={post._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate(`/blog/${post._id}`)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={
                        post.coverImage ||
                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80'
                      }
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {post.category || 'General'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            post.authorPhoto ||
                            `https://ui-avatars.com/api/?name=${post.authorName}&background=6366f1&color=fff`
                          }
                          alt={post.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span className="text-xs text-muted-foreground">
                          {post.authorName}
                        </span>
                      </div>
                      <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!search && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                    p === page
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md'
                      : 'border border-border bg-card text-foreground hover:bg-muted/40'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
