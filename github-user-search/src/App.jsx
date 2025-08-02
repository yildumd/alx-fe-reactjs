import { useState, useEffect } from 'react';
import { fetchUserData } from './services/githubService';
import SearchForm from './components/SearchForm';
import UserProfile from './components/UserProfile';
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
      const { data, headers } = await fetchUserData(username);
      
      // Update rate limit info
      const remaining = parseInt(headers['x-ratelimit-remaining']);
      const reset = parseInt(headers['x-ratelimit-reset']) * 1000;
      setRateLimit({ remaining, reset });

      setUserData(data);

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

        <SearchForm 
          username={username}
          setUsername={setUsername}
          loading={loading}
          handleSearch={handleSearch}
          searchHistory={searchHistory}
        />

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

        {userData && <UserProfile userData={userData} />}
      </div>
    </div>
  );
}

export default App;