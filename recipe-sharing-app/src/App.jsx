import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
      </nav>
      <SearchBar />
      <Routes>
        <Route path="/" element={<><AddRecipeForm /><RecipeList /></>} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </Router>
  );
}

export default App;