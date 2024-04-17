import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{movie.name}</h2>
        <p>{movie.introduce}</p>
        <p>Time: {movie.time} minutes</p>
        <p>Year: {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieModal;
