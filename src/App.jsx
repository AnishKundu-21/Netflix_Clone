import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import NewPopular from './pages/New & Popular/NewPopular';
import MyList from './pages/My List/MyList';
import BrowseByLanguages from './pages/Browse by Languages/BrowseByLanguages';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import SearchResults from './pages/SearchResults/SearchResults';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated and trying to access login page, redirect to home
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        // If user is not authenticated and trying to access protected routes, redirect to login
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
      setLoading(false); // Set loading to false once authentication check is complete
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a more appropriate loading indicator
  }

  return (
    <>
      <ToastContainer theme="dark" />
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-popular" element={<NewPopular />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/browse-by-languages" element={<BrowseByLanguages />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
