import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navber/Navbar';
import { Outlet, useLocation } from 'react-router';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
// import PopularGames from '../components/PopularGames';

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <div>
      <title>Home</title>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div>
          <Banner></Banner>
          {/* About Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                About FreelanceHub
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                FreelanceHub is a digital marketplace connecting talented
                freelancers with clients seeking their expertise. Whether you're
                a developer, designer, writer, or marketer, our platform offers
                opportunities to showcase your skills and grow your freelance
                career.
              </p>
              <p className="text-lg text-gray-600">
                We believe in creating a community where quality work is
                recognized and rewarded. Join thousands of freelancers who have
                found their next project through FreelanceHub.
              </p>
            </div>
          </section>
          {/* <PopularGames></PopularGames> */}
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[80vh]">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
