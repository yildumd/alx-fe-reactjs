import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  searchTerm: '',

  addRecipe: (newRecipe) => 
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  deleteRecipe: (recipeId) =>
    set((state) => ({ 
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  addFavorite: (recipeId) =>
    set((state) => ({ 
      favorites: [...state.favorites, recipeId] 
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({ 
      favorites: state.favorites.filter((id) => id !== recipeId) 
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  getFilteredRecipes: () => {
    return useRecipeStore.getState().recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(useRecipeStore.getState().searchTerm.toLowerCase())
    );
  },
}));

export default useRecipeStore;