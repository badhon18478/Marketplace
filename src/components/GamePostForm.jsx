import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function GamePostForm() {
  // const [formData, setFormData] = useState({
  //   title: '',
  //   coverPhoto: '',
  //   category: '',
  //   downloadLink: '',
  //   description: '',
  //   ratings: '',
  //   developer: '',
  // });

  const [submittedGames, setSubmittedGames] = useState([]);

  const categories = [
    'FPS',
    'Battle Royale',
    'RPG',
    'MOBA',
    'Strategy',
    'Sandbox',
    'Puzzle',
    'Racing',
    'Action',
    'Platform',
    'AR Adventure',
    'Social Deduction',
    'Endless Runner',
  ];

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = e => {
    e.preventDefault();

    const title = e.target.title.value;
    const coverPhoto = e.target.coverPhoto.value;
    const category = e.target.category.value;
    const downloadLink = e.target.downloadLink.value;
    const description = e.target.description.value;
    const ratings = e.target.ratings.value;
    const developer = e.target.developer.value;

    const newGame = {
      id: submittedGames.length + 21,
      title,
      coverPhoto,
      category,
      downloadLink,
      description,
      ratings: ratings || '0.0',
      developer,
    };

    setSubmittedGames(prev => [...prev, newGame]);
    axios.post('http://localhost:5000/products', newGame).then(res => {
      console.log(res.data);
      Swal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
      });
    });
    // e.target.reset();

    alert('Game added successfully!');
  };

  // const handleCopyJSON = () => {
  //   navigator.clipboard.writeText(JSON.stringify(submittedGames, null, 2));
  //   alert('JSON copied to clipboard!');
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            🎮 Add New Game
          </h1>
          <p className="text-blue-200 text-center mb-8">
            Fill in the details to add a game to your collection
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Game Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Player Unknowns Battle Ground: PUBG"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Cover Photo URL *
              </label>
              <input
                type="url"
                name="coverPhoto"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Category *
              </label>
              <select
                name="category"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" className="bg-gray-800">
                  Select a category
                </option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Download Link *
              </label>
              <input
                type="url"
                name="downloadLink"
                placeholder="https://example.com/download"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe the game..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Ratings (0-5)
                </label>
                <input
                  type="number"
                  name="ratings"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Developer *
                </label>
                <input
                  type="text"
                  name="developer"
                  placeholder="e.g., Krafton"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ✨ Add Game
            </button>
          </form>
          {/* 
          {submittedGames.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Added Games ({submittedGames.length})
                </h2>
                <button
                  onClick={handleCopyJSON}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  📋 Copy JSON
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submittedGames.map(game => (
                  <div
                    key={game.id}
                    className="bg-white/10 rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={game.coverPhoto}
                        alt={game.title}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={e =>
                          (e.target.src =
                            'https://via.placeholder.com/96?text=No+Image')
                        }
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">
                          {game.title}
                        </h3>
                        <p className="text-blue-300 text-sm">
                          {game.developer} • {game.category}
                        </p>
                        <p className="text-white/70 text-sm mt-1 line-clamp-2">
                          {game.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-400">
                            ⭐ {game.ratings}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
