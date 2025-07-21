import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Home from './components/Home.jsx';
import Contact from './components/Contact.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import NotFound from './components/NotFound.jsx';
import Navbar from './components/Navbar.jsx';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

const Routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(Routes);

export default function App() {
  return <RouterProvider router={router} />;
}