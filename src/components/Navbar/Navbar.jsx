import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile from '../../assets/profile_img.png';
import dropdown_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear the search term after submission
      setShowSearchBar(false); // Hide the search bar after submission
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new-popular">New & Popular</Link></li>
          <li><Link to="/my-list">My List</Link></li>
          <li><Link to="/browse-by-languages">Browse by Languages</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className={`search-bar-container ${showSearchBar ? 'visible' : ''}`}>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className='search-icon'>
              <img src={search_icon} alt="Search Icon" />
            </button>
          </form>
        </div>
        <img 
          src={search_icon} 
          alt="Search Icon" 
          className='icon search-toggle' 
          onClick={toggleSearchBar} 
        />
        <p>Children</p>
        <img src={bell_icon} alt="Bell Icon" className='icon' />
        <div className="navbar-profile">
          <img src={profile} alt="Profile Icon" className='profile' />
          <img src={dropdown_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
