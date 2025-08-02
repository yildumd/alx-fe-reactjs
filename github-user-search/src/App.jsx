import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [rateLimit, setRateLimit] = useState({ remaining: 60, reset: 0 });

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('githubSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      // Update rate limit info
      const remaining = parseInt(response.headers['x-ratelimit-remaining']);
      const reset = parseInt(response.headers['x-ratelimit-reset']) * 1000;
      setRateLimit({ remaining, reset });

      setUserData(response.data);

      // Update search history
      setSearchHistory(prev => {
        const newHistory = [
          username,
          ...prev.filter(item => item.toLowerCase() !== username.toLowerCase()).slice(0, 4)
        ];
        localStorage.setItem('githubSearchHistory', JSON.stringify(newHistory));
        return newHistory;
      });

    } catch (err) {
      if (err.response?.status === 404) {
        setError('User not found');
      } else if (err.response?.status === 403) {
        const resetTime = new Date(rateLimit.reset).toLocaleTimeString();
        setError(`API limit exceeded. Try again after ${resetTime}`);
      } else {
        setError('An error occurred. Please try again.');
      }
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">GitHub User Search</h1>
          <p className="text-gray-600">Search for any GitHub user profile</p>
        </header>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {searchHistory.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUsername(item);
                    handleSearch({ preventDefault: () => {} });
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 mb-6">
          API calls remaining: {rateLimit.remaining} | 
          Reset at: {new Date(rateLimit.reset).toLocaleTimeString()}
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {userData && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-32 h-32 rounded-full border-4 border-blue-100"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {userData.name || userData.login}
                  {userData.name && (
                    <span className="text-gray-500 text-lg ml-2">({userData.login})</span>
                  )}
                </h2>
                {userData.bio && <p className="text-gray-600 my-2">{userData.bio}</p>}
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-500">Followers</p>
                <p className="text-2xl font-bold">{userData.followers}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-500">Following</p>
                <p className="text-2xl font-bold">{userData.following}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-500">Repositories</p>
                <p className="text-2xl font-bold">{userData.public_repos}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-500">Location</p>
                <p className="text-xl">{userData.location || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;