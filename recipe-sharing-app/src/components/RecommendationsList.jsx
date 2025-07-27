import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const { recipes, favorites } = useRecipeStore();

  // Generate recommendations based on favorites
  const getRecommendations = () => {
    if (favorites.length === 0) return [];
    
    // Get tags from favorite recipes
    const favoriteTags = recipes
      .filter(recipe => favorites.includes(recipe.id))
      .flatMap(recipe => recipe.tags || []);
    
    // Find recipes with matching tags (excluding already favorited ones)
    return recipes
      .filter(recipe => 
        !favorites.includes(recipe.id) && 
        (recipe.tags || []).some(tag => favoriteTags.includes(tag))
      )
      .slice(0, 5); // Limit to 5 recommendations
  };

  const recommendations = getRecommendations();

  return (
    <div className="recommendations">
      <h2>Recommended For You</h2>
      
      {recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recommendation-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="tags">
                {recipe.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations yet. Add some favorites first!</p>
      )}
    </div>
  );
};

export default RecommendationsList;