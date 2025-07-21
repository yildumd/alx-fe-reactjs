import ProfilePage from './components/ProfilePage';
import UserContext from './components/UserContext'

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com", bio: "One simple man for one simple task." };

  return (
    <UserContext.Provider value={{userData}} >
      <ProfilePage />
    </UserContext.Provider>
  )
}

export default App;