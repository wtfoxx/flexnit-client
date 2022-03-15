import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import './movie-view.scss'

export class MovieView extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">{movie.Year} 
          
          {' '} • {' '}

          <Link to ={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link> 
          
         {' '} • {' '}

          <Link to ={`/director/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>

          </Card.Subtitle>

          <Card.Text>{movie.Description}</Card.Text>

          <Link to={`/`}>
            <Button variant="primary" type="button">
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
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