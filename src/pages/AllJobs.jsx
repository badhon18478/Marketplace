import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

// ── Skeleton ──────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="bg-card rounded-2xl border border-border p-5 animate-pulse">
    <div className="w-full h-44 bg-muted rounded-xl mb-4" />
    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
    <div className="h-3 bg-muted rounded w-full mb-2" />
    <div className="h-3 bg-muted rounded w-5/6 mb-4" />
    <div className="flex justify-between mt-4">
      <div className="h-6 bg-muted rounded-full w-20" />
      <div className="h-9 bg-muted rounded-xl w-28" />
    </div>
  </div>
);

const CATEGORIES = [
  'All',
  'Web Development',
  'Digital Marketing',
  'Graphics Designing',
  'Content Writing',
  'Video Editing',
  'Data Entry',
  'Translation',
  'Other',
];
const SORT_OPTIONS = [
  { label: 'Newest First', value: 'desc' },
  { label: 'Oldest First', value: 'asc' },
];

const AllJobs = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state (read from URL on mount)
  const [search, setSearch] = useState(params.get('search') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [sort, setSort] = useState(params.get('sort') || 'desc');
  const [minBudget, setMinBudget] = useState(params.get('minBudget') || '');
  const [maxBudget, setMaxBudget] = useState(params.get('maxBudget') || '');
  const [page, setPage] = useState(Number(params.get('page')) || 1);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // ── Fetch Jobs ──────────────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        category,
        sort,
        page,
        limit: 8,
      });
      if (minBudget) query.set('minBudget', minBudget);
      if (maxBudget) query.set('maxBudget', maxBudget);

      const res = await axios.get(`${BASE_URL}/api/jobs?${query}`);
      setJobs(res.data.jobs || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, page, minBudget, maxBudget, BASE_URL]);

  useEffect(() => {
    fetchJobs();
    // Sync URL params
    const q = {};
    if (search) q.search = search;
    if (category) q.category = category;
    if (sort !== 'desc') q.sort = sort;
    if (minBudget) q.minBudget = minBudget;
    if (maxBudget) q.maxBudget = maxBudget;
    if (page > 1) q.page = page;
    setParams(q);
  }, [fetchJobs]);

  // ── Handlers ───────────────────────────────────────────────────
  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
  };
  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('desc');
    setMinBudget('');
    setMaxBudget('');
    setPage(1);
  };
  const hasFilters =
    search || category || minBudget || maxBudget || sort !== 'desc';

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Explore All Jobs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80"
            >
              {total} freelance opportunities waiting for you
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Search + Filter Bar */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <label htmlFor="job-search" className="sr-only">
                  Search jobs
                </label>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="job-search"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search jobs by title..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md"
                >
                  Search
                </button>
              </form>

              {/* Category Filter */}
              <div className="flex gap-3 flex-wrap lg:flex-nowrap">
                <div>
                  <label htmlFor="category-filter" className="sr-only">
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={category}
                    onChange={e => {
                      setCategory(e.target.value);
                      setPage(1);
                    }}
                    className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c === 'All' ? '' : c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label htmlFor="sort-filter" className="sr-only">
                    Sort
                  </label>
                  <select
                    id="sort-filter"
                    value={sort}
                    onChange={e => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    {SORT_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-background text-foreground hover:bg-muted/40 transition-all"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="hidden sm:inline">More Filters</span>
                </button>

                {/* Clear */}
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Budget Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-border flex flex-wrap gap-4 items-end">
                    <div>
                      <label
                        htmlFor="min-budget"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Min Budget ($)
                      </label>
                      <input
                        id="min-budget"
                        type="number"
                        value={minBudget}
                        onChange={e => {
                          setMinBudget(e.target.value);
                          setPage(1);
                        }}
                        placeholder="e.g. 100"
                        min="0"
                        className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-36"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="max-budget"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Max Budget ($)
                      </label>
                      <input
                        id="max-budget"
                        type="number"
                        value={maxBudget}
                        onChange={e => {
                          setMaxBudget(e.target.value);
                          setPage(1);
                        }}
                        placeholder="e.g. 5000"
                        min="0"
                        className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-36"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Showing results for:{' '}
                      {hasFilters ? 'Filtered view' : 'All jobs'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-card rounded-2xl border border-border"
            >
              <Briefcase className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No Jobs Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing{' '}
                  <span className="font-semibold text-foreground">
                    {jobs.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-foreground">{total}</span>{' '}
                  jobs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {jobs.map((job, index) => (
                  <JobCard key={job._id} job={job} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      p =>
                        p === 1 || p === totalPages || Math.abs(p - page) <= 2,
                    )
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '...' ? (
                        <span
                          key={`dots-${i}`}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      ) : (
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
                      ),
                    )}

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllJobs;
