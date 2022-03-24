import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import './movie-view.scss'
import { CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Favorites: []
    }

    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const Username = localStorage.getItem('user');

    axios.get(`https://flexnitdb.herokuapp.com/users/${Username}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        Favorites: response.data.Favorites
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onAddFavorite() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    axios.post(`https://flexnitdb.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert(`'` + this.props.movie.Title + `'` + " was added to your favorites! :)");
      window.open(`/movies/${this.props.movie._id}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onRemoveFavorite() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    axios.delete(`https://flexnitdb.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert(`'` + this.props.movie.Title + `'` + " was removed from your favorites!");
      window.open(`/movies/${this.props.movie._id}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    const Favorites = this.state.Favorites;
    let isFavorite = false
    if (Favorites.includes(this.props.movie._id)) {
      isFavorite = true;
    } else {
      isFavorite = false;
    };

    return (
      <Container>
        <CardGroup>
          <Card>
            <Row>
              <Col>
                <Card.Img variant="top" src={movie.ImagePath} />
              </Col>
            </Row>
          </Card>

          <Card>
            <Row>
              <Col>
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

                <Button variant="primary" onClick={() => { onBackClick(); }}>
                    Back
                </Button>
                {' '}
                
                {
                  isFavorite ? (
                    <Button variant="danger" onClick={this.onRemoveFavorite}>Remove favorite</Button>
                  ) : (
                    <Button variant="warning" onClick={this.onAddFavorite}>Add favorite</Button>
                  )
                }

              </Card.Body>
              </Col>
            </Row>
          </Card>
        </CardGroup>
      </Container>
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