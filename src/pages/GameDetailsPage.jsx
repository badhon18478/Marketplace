import { AuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import React, { use } from 'react';
import { useParams } from 'react-router';

import { Star, Download } from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const GameDetailsPage = () => {
  const { user } = use(AuthContext);

  const { id } = useParams();
  const [game, setGame] = useState(null);
  if (!user) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-3xl font-bold mb-4">
          Please login to view game details
        </h2>
      </div>
    );
  }

  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then(data => {
        const selectedGame = data.find(g => g.id === id);
        setGame(selectedGame);
      });
  }, [id]);

  if (!game) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div>
      <title>{game.title}</title>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-10">
        <img
          src={game.coverPhoto}
          alt={game.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {game.title}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              {game.category}
            </span>
            <div className="flex items-center gap-2">
              <Star size={24} className="text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold text-gray-800">
                {game.ratings}
              </span>
            </div>
          </div>
          <p className="text-gray-700 text-lg mb-6">{game.description}</p>
          <p className="text-gray-600 mb-6">
            <strong>Developer:</strong> {game.developer}
          </p>
          <a
            href={game.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform"
          >
            <Download size={24} /> Download Game
          </a>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default GameDetailsPage;
