import useRecipeStore from '../store/recipeStore';

const FavoritesList = () => {
  const { recipes, favorites, removeFavorite } = useRecipeStore();
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <button onClick={() => removeFavorite(recipe.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;