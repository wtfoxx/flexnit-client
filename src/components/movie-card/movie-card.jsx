import React from "react";
import PropTypes from "prop-types";

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div className="movie-card" onClick={() => {onMovieClick(movie); }}>{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      Bio: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};