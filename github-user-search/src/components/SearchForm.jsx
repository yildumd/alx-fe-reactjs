export default function SearchForm({ username, setUsername, loading, handleSearch, searchHistory }) {
  return (
    <>
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
    </>
  );
}