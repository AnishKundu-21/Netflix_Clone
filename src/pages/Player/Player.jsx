// src/pages/Player/Player.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); // Get the ID from the URL

  // You can fetch and display movie or TV show details using the ID

  return (
    <div>
      <h1>Player Page</h1>
      <p>Showing details for item with ID: {id}</p>
    </div>
  );
};

export default Player;
