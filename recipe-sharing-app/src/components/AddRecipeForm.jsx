import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

export default function AddRecipeForm() {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '20px'
    },
    titleInput: {
      width: '100%',
      height: '56px',
      fontSize: '1.5rem',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    descInput: {
      width: '100%',
      height: '200px',
      fontSize: '1rem',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      resize: 'vertical'
    },
    tagsInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem'
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    
    addRecipe({ 
      id: Date.now(), 
      title: title.trim(),
      description: description.trim(),
      tags: tags.trim()
    });
    
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.titleInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
        />
        
        <textarea
          style={styles.descInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
        />
        
        <input
          style={styles.tagsInput}
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated, e.g., vegetarian, quick, dinner)"
        />
        
        <button 
          style={styles.submitButton}
          type="submit"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};