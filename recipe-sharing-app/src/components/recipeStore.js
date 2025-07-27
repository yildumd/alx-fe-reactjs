import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: '',
      favorites: [],
      tags: [], // For storing all available tags

      // Search functionality
      setSearchTerm: (term) => set({ searchTerm: term }),
      filteredRecipes: () => {
        const { recipes, searchTerm } = get();
        return recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      },

      // Favorites
      addFavorite: (recipeId) => set(state => ({ 
        favorites: [...state.favorites, recipeId] 
      })),
      removeFavorite: (recipeId) => set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
      })),

      // Recipe CRUD operations
      addRecipe: (newRecipe) => set(state => ({
        recipes: [...state.recipes, {
          ...newRecipe,
          tags: newRecipe.tags?.split(',').map(tag => tag.trim()) || []
        }],
        tags: [...new Set([...state.tags, ...(newRecipe.tags?.split(',').map(tag => tag.trim()) || [])])]
      })),
      
      deleteRecipe: (id) => set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id),
        favorites: state.favorites.filter(favId => favId !== id)
      })),
      
      updateRecipe: (id, updatedData) => set(state => ({
        recipes: state.recipes.map(recipe =>
          recipe.id === id ? { 
            ...recipe, 
            ...updatedData,
            tags: updatedData.tags?.split(',').map(tag => tag.trim()) || recipe.tags
          } : recipe
        )
      })),

      // Recommendations
      getRecommendations: () => {
        const { recipes, favorites } = get();
        if (favorites.length === 0) return [];
        
        const favoriteTags = recipes
          .filter(recipe => favorites.includes(recipe.id))
          .flatMap(recipe => recipe.tags || []);
        
        return recipes
          .filter(recipe => 
            !favorites.includes(recipe.id) && 
            (recipe.tags || []).some(tag => favoriteTags.includes(tag))
          )
          .slice(0, 5);
      }
    }),
    {
      name: 'recipe-storage',
      partialize: (state) => ({ 
        recipes: state.recipes,
        favorites: state.favorites,
        tags: state.tags
      })
    }
  )
);