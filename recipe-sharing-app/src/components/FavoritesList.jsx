import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import DeleteRecipeButton from './DeleteRecipeButton';


export default function FavoritesList() {

  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  const recipeContainer = {
    border: '1px solid hsla(0, 0%, 100%, 0.45)',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1rem',
    width: '650px',
    fontSize: '1rem'
  }

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map(recipe => (
        <div style={recipeContainer}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <DeleteRecipeButton recipeId={recipe.id} />&nbsp;&nbsp;
          <Link to={`/edit/${recipe.id}`}>
            <button>Edit recipe</button>
          </Link>&nbsp;&nbsp;
          <Link to={`/recipe/${recipe.id}`}>
            <button>View details</button>
          </Link>
        </div>
      ))
      }
  </div>
  )
}