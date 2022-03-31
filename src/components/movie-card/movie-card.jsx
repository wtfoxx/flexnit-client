import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import './movie-card.scss'
import { CardGroup, Col, Container } from "react-bootstrap";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      <Link to={`/movies/${movie._id}`} className="mv-override">
        <Card className="mb-5">
         
          <Card.Img variant="top" className="card-img" src={movie.ImagePath} />  
           
          <Card.ImgOverlay>
            <Card.Title className="card-text mb-4">{movie.Title} ({movie.Year})</Card.Title>
            <Card.Text style={{fontSize: 14}} className="card-text text-muted">{movie.Genre.Name}</Card.Text>    
          </Card.ImgOverlay>
        </Card>
      </Link>
 



      //<div className="movie-card" onClick={() => {onMovieClick(movie); }}>{movie.Title}</div>
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
};