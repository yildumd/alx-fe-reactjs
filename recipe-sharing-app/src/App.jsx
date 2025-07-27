import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import EditRecipeForm from './components/EditRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import SearchBar from './components/SearchBar';

const AppLayout = () => {
  return (
    <div className="app-container">
      <SearchBar />
      <Outlet /> {/* This renders the matched child route */}
      <RecommendationsList /> {/* Shows on all pages */}
    </div>
  );
};

export const Routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <Layout />, // Wraps individual pages
        children: [
          { 
            index: true, 
            element: (
              <>
                <AddRecipeForm />
                <RecipeList />
              </>
            ) 
          },
          { path: 'edit/:id', element: <EditRecipeForm /> },
          { path: 'recipe/:id', element: <RecipeDetails /> },
          { path: 'favorites', element: <FavoritesList /> },
          { path: '*', element: <NotFound /> },
        ]
      }
    ]
  }
];

const router = createBrowserRouter(Routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;