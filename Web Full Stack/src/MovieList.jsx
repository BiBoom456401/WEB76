import React from 'react';

const MovieList = ({ movies, onClick }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div className="movie-item" key={movie._id} onClick={() => onClick(movie)}>
          <img src={movie.image} alt={movie.name} />
          <p>{movie.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
