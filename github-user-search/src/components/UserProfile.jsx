export default function UserProfile({ userData }) {
  return (
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
  );
}