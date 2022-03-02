import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss'

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img className="movie-poster" src={movie.ImagePath} />
        </div>

        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-director-name">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-director-bio">
          <span className="label">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <div className="movie-director-birth">
          <span className="label">Birth: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>

        <div className="movie-year">
          <span className="label">Year: </span>
          <span className="value">{movie.Year}</span>
        </div>


        <button onClick={() => { onBackClick(null); }}>Back</button>
        
      </div>
    );
  }
}