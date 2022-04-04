import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './favorites-view.scss';
import { Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user
  }
}

 
class FavoritesView extends React.Component {

  state = {
    Favorites: '' || []
  };
  

  componentDidMount() {
    if(this.props.user) {
      const {user} = this.props;
      this.setState({
        Favorites: user.Favorites || []
      })
    }
  }

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
      window.open(`/users/${Username}/movies`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    let localUser = localStorage.getItem('user')
    const { movies, onBackClick } = this.props;
    const { Favorites } = this.state;

    if (!localUser) {
      console.log('no local user');
      return null;
    }

    return (
      <Container> 
        <div className="backButton">
          <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        <br />
          
          <Col>
            <Row className='justify-content-center'>
              <h4>Your favorites</h4>
            </Row>

            
              <Card.Body className='favs-override'>
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
                        <Col lg={3} md={6} className="mb-2" key={movie._id}>
                          <CardGroup>
                            <Card>
                              
                              <Card.Img className="img" variant="top" src={movie.ImagePath} />
                              <Card.ImgOverlay>
                              <Card.Body>

                                <Button size="sm" className="card-text btn-fav" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
                    
                                
                              </Card.Body>
                              </Card.ImgOverlay>
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


export default connect (mapStateToProps)(FavoritesView);
