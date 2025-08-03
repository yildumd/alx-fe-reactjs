import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('basic');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (searchType === 'basic') {
        const user = await fetchUserData(query);
        setUsers([{
          ...user,
          html_url: user.html_url || `https://github.com/${user.login}`
        }]);
      } else {
        const results = await searchUsers(query, location, minRepos);
        setUsers(results.map(user => ({
          ...user,
          html_url: `https://github.com/${user.login}` // Ensure html_url exists
        })));
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
        {/* Search form inputs remain the same */}
      </form>

      {users.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div key={user.id} className="border p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{user.login}</h3>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}