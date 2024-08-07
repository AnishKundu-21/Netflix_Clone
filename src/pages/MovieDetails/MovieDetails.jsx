import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieTrailer } from '../../tmdb';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setDetails(data);

          const trailers = await getMovieTrailer(id);
          if (trailers.length > 0) {
            setTrailer(trailers[0]); 
          }
        }
      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToList = () => {
    // Functionality to add to My List
    console.log('Added to My List');
  };

  return (
    <div className="movie-details">
      <button className="back-button" onClick={handleBack}>Back</button>
      {details && (
        <>
          <h1>{details.title}</h1>
          {trailer && (
            <div className="trailer">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="details-content">
            <p>{details.overview}</p>
          </div>
          <div className="button-container">
            <button onClick={handleAddToList}>Add to My List</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
