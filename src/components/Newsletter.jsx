import { use } from 'react';
import { AuthContext } from '../AuthContext';

// Game Details Page
const GameDetailsPage = ({ game }) => {
  const { user } = use(AuthContext);

  if (!user) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-3xl font-bold mb-4">
          Please login to view game details
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <img
        src={game.coverPhoto}
        alt={game.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{game.title}</h1>
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
  );
};
