export default function UserProfile({ userData }) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={userData.avatar_url}
          alt={userData.login}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
          {userData.bio && <p className="text-gray-600">{userData.bio}</p>}
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-500 hover:underline"
          >
            View Profile
          </a>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* ... keep the same stats display ... */}
      </div>
    </div>
  );
}