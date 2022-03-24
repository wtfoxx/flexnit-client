import React, { useState } from 'react';
import axios from 'axios';
import PropTypes, { func } from 'prop-types';
import './favorites-view.scss';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, CardGroup, FloatingLabel } from 'react-bootstrap';

 
export class FavoritesView extends React.Component {

  constructor() {
    super();

      this.state = {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        Favorites: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  //Performs a GET request on the API to get information on the specified user: ${Username}
  getUser = (token) => {
    const Username = localStorage.getItem('user');

    axios.get(`https://flexnitdb.herokuapp.com/users/${Username}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        Favorites: response.data.Favorites,
      });
    })
    .catch(function (error) {
      console.log(error);
      });
    };

  //Performs a DELETE request on the API to remove a movie from the Favorites array for the specified user
  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://flexnitdb.herokuapp.com/users/${Username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      console.log(response);
      alert(`'` + movie.Title + `'` + " removed from Favorites");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    const { movies, onBackClick } = this.props;
    const { Favorites, Username, Email, Birthday } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <Container> 
        <div className="backButton">
          <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        <br />
          
          <Col>
            <Row className='justify-content-center'>
              <h4>Your favorites</h4>
            </Row>

            
              <Card.Body>
                {Favorites.length === 0 && (
                  <div className="text-center">No favorites yet :(</div>
                )}
                <Row className='justify-content-center'>
                  {Favorites.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id === Favorites.find((fav) => fav === movie._id)
                      ) {
                      return (
                        <Col lg={3} md={4} sm={6} key={movie._id}>
                          <CardGroup>
                            <Card>
                              <Card.Img className="img" variant="top" src={movie.ImagePath} />
                              <Card.Body>
                                <Card.Subtitle className="mb-2">
                                    {movie.Title}
                                </Card.Subtitle>
                    
                                <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
                              </Card.Body>
                            </Card>
                          </CardGroup>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </Card.Body>    
   

            </Col>

      </Container>
    );
  }
}

