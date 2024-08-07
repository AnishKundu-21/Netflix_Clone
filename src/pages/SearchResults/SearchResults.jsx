import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';
import Navbar from '../../components/Navbar/Navbar';
import { searchMovies } from '../../tmdb'; // Import your search function

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        setSearchTerm(query || '');
        const fetchData = async () => {
            try {
                if (query) {
                    const results = await searchMovies(query);
                    setSearchResults(results.results);
                }
            } catch (error) {
                console.error("Failed to fetch search results: ", error);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <div className='search-results-page'>
            <div className="search-header">
                <h1>Results for "{searchTerm}"</h1>
            </div>
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                        <Link key={item.id} to={`/movie/${item.id}`} className="search-result-item">
                            <img 
                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                                alt={item.title || item.name} 
                            />
                            <p>{item.title || item.name}</p>
                        </Link>
                    ))
                ) : (
                    <p>No results found for "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
