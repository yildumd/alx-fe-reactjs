import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;