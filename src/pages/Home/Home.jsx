import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import { getTrendingMovies, getTopMovies, getMoviesByGenre } from '../../tmdb';

const genreIds = {
  action: 28,
  thriller: 53,
  anime: 16,
  drama: 18,
  crime: 80,
  horror: 27
};

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  const rowRefs = {
    topMovies: useRef(null),
    action: useRef(null),
    thriller: useRef(null),
    anime: useRef(null),
    drama: useRef(null),
    crime: useRef(null),
    horror: useRef(null),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await getTrendingMovies();
        setBannerMovie(trending.results[Math.floor(Math.random() * trending.results.length)]);

        setTopMovies(await getTopMovies());
        
        const genreData = {};
        for (const [genre, id] of Object.entries(genreIds)) {
          genreData[genre] = await getMoviesByGenre(id);
        }
        setGenreMovies(genreData);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  const renderSection = (title, data, refKey) => (
    <div className="movies-section">
      <h2>{title}</h2>
      <div className="movies-row-container">
        <ScrollButton direction="left" targetRef={rowRefs[refKey]} />
        <div className="movies-row" ref={rowRefs[refKey]}>
          {data.map((item) => (
            <Link key={item.id} to={`/movie/${item.id}`} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                alt={item.title || item.name} 
              />
              <h3>{item.title || item.name}</h3>
            </Link>
          ))}
        </div>
        <ScrollButton direction="right" targetRef={rowRefs[refKey]} />
      </div>
    </div>
  );

  return (
    <div className='home'>
      <Navbar />
      {bannerMovie && (
        <div className="hero">
          <img 
            src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`} 
            alt={bannerMovie.title || bannerMovie.name} 
            className='banner-img' 
          />
          <div className="hero-caption">
            <h1>{bannerMovie.title || bannerMovie.name}</h1>
            <p>{bannerMovie.overview}</p>
            <div className="hero-btns">
              <Link to={`/movie/${bannerMovie.id}`} className='btn'>Play</Link>
              <button className='btn'>My List</button>
            </div>
          </div>
        </div>
      )}
      {renderSection('Top Movies of the Week', topMovies, 'topMovies')}
      {renderSection('Action Movies', genreMovies.action || [], 'action')}
      {renderSection('Thriller Movies', genreMovies.thriller || [], 'thriller')}
      {renderSection('Anime Movies', genreMovies.anime || [], 'anime')}
      {renderSection('Drama Movies', genreMovies.drama || [], 'drama')}
      {renderSection('Crime Movies', genreMovies.crime || [], 'crime')}
      {renderSection('Horror Movies', genreMovies.horror || [], 'horror')}
    </div>
  );
};

export default Home;
