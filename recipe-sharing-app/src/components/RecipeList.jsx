import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const { getFilteredRecipes, deleteRecipe, addFavorite } = useRecipeStore();
  const recipes = getFilteredRecipes();

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          <button onClick={() => addFavorite(recipe.id)}>❤️ Favorite</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;