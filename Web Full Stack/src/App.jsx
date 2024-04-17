import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="movieList">
        {movies.map(movie => (
          <div className="movie" key={movie._id}>
            <img src={movie.image} alt={movie.name} />
            <div className="movieInfo">
              <h2>{movie.name}</h2>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Time:</strong> {movie.time} minutes</p>
              <p><strong>Introduce:</strong> {movie.introduce}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
