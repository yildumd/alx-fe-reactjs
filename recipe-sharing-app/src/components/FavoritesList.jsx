import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const { recipes, favorites, removeFavorite } = useRecipeStore();
  const favoriteRecipes = recipes.filter((recipe) => 
    favorites.includes(recipe.id)
  );

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet. Add some from the recipes list!</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button 
              onClick={() => removeFavorite(recipe.id)}
              className="remove-fav"
            >
              Remove Favorite
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;