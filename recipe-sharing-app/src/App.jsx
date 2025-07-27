import { useState } from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';

function App() {
  const [activeTab, setActiveTab] = useState('recipes');

  return (
    <div className="app">
      <nav className="tabs">
        <button
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          All Recipes
        </button>
        <button
          className={activeTab === 'favorites' ? 'active' : ''}
          onClick={() => setActiveTab('favorites')}
        >
          My Favorites
        </button>
      </nav>

      <SearchBar />

      <main>
        {activeTab === 'recipes' ? (
          <>
            <AddRecipeForm />
            <RecipeList />
          </>
        ) : (
          <FavoritesList />
        )}
      </main>
    </div>
  );
}

export default App;