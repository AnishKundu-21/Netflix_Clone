const apiKey = '5a1e4b90d10e4bb9aa364f9e2454d618';
const baseUrl = 'https://api.themoviedb.org/3';

export const getMovieBanner = async (movieId) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

export const getTopMovies = async () => {
  const response = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);
  const data = await response.json();
  return data.results.slice(0, 50); 
};

export const getMoviesByGenre = async (genreId) => {
  const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`);
  const data = await response.json();
  return data.results.slice(0, 50);
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`);
  const data = await response.json();
  return data;
};

export const getTrendingMovies = async () => {
  const response = await fetch(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return response.json();
};

export const getRecommendedMovies = async (movieId) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recommended movies');
  }
  const data = await response.json();
  return data.results.slice(0, 50);
};

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    return data.results.filter((video) => video.type === 'Trailer');
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return [];
  }
};

export const getMoviesBySearch = async (query) => {
  const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
};

export const searchMovies = async (query) => {
  try {
      const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
  }
};