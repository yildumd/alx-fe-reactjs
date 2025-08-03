import axios from 'axios';

export const searchUsers = async (username, location, minRepos) => {
  try {
    // Build the query string with all parameters
    let query = `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;
    
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};