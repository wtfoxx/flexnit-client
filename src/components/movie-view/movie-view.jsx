import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './movie-view.scss'
import { CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

let mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

class MovieView extends React.Component {

  state = {
    movies: this.props.movies,
    Favorites: this.props.user.Favorites || []
    
  }


  onAddFavorite(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');  
    const { movies } = this.props;
    
    axios.post(`https://flexnitdb.herokuapp.com/users/${Username}/movies/${movies._id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert(`'` + movies.Title + `'` + " was added to your favorites! :)");
      window.open(`/movies/${movies._id}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onRemoveFavorite(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    const { movies } = this.props;

    axios.delete(`https://flexnitdb.herokuapp.com/users/${Username}/movies/${movies._id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert(`'` + movies.Title + `'` + " was removed from your favorites!");
      window.open(`/movies/${movies._id}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { onBackClick, movies, user } = this.props;

    let isFavorite = false
    if (user.Favorites.includes(movies._id)) {
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
                <Card.Img variant="top" src={movies.ImagePath} />
              </Col>
            </Row>
          </Card>

          <Card>
            <Row>
              <Col>
              <Card.Body>
                <Card.Title>{movies.Title}</Card.Title>

                <Card.Subtitle className="text-muted">{movies.Year} 
                
                {' '} • {' '}

                <Link to ={`/genres/${movies.Genre.Name}`}>
                  <Button size='sm' variant='link'>{movies.Genre.Name}</Button>
                </Link> 
                
                {' '} • {' '}

                <Link to ={`/directors/${movies.Director.Name}`}>
                  <Button size='sm' variant='link'>{movies.Director.Name}</Button>
                </Link>

                </Card.Subtitle>

                <Card.Text>{movies.Description}</Card.Text>

                <Button variant="primary" onClick={() => { onBackClick(); }}>
                    Back
                </Button>
                {' '}
                
                {
                  isFavorite ? (
                    <Button variant="danger" value={movies._id} onClick={(e) => this.onRemoveFavorite(e)}>Remove favorite</Button>
                  ) : (
                    <Button variant="warning" value={movies._id} onClick={(e) => this.onAddFavorite(e)}>Add favorite</Button>
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
  movies: PropTypes.shape({
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

export default connect (mapStateToProps)(MovieView);