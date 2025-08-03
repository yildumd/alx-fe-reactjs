import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (searchType === 'basic') {
        const user = await fetchUserData(query);
        setUsers([user]); // Convert to array for consistent display
      } else {
        const results = await searchUsers(query, location, minRepos);
        setUsers(results);
      }
    } catch (err) {
      setError('Looks like we cant find any matching users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => setSearchType('basic')}
          className={`px-4 py-2 rounded-lg ${searchType === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`px-4 py-2 rounded-lg ${searchType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Advanced Search
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {searchType === 'advanced' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Filter by location"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Repos
              </label>
              <input
                type="number"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                placeholder="Minimum repositories"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Results display remains the same */}
      {users.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div key={user.id} className="border p-4 rounded-lg">
                {/* User display content */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}