import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const { 
    getFilteredRecipes, 
    deleteRecipe, 
    addFavorite,
    updateRecipe
  } = useRecipeStore();
  
  const recipes = getFilteredRecipes();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleEdit = (recipe) => {
    setEditingId(recipe.id);
    setEditTitle(recipe.title);
    setEditDesc(recipe.description);
  };

  const handleUpdate = (id) => {
    updateRecipe({
      id,
      title: editTitle.trim(),
      description: editDesc.trim()
    });
    setEditingId(null);
  };

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found. Add one above!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            {editingId === recipe.id ? (
              <div className="edit-form">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button onClick={() => handleUpdate(recipe.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-actions">
                  <button onClick={() => addFavorite(recipe.id)}>❤️ Favorite</button>
                  <button onClick={() => handleEdit(recipe)}>✏️ Edit</button>
                  <button onClick={() => deleteRecipe(recipe.id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;