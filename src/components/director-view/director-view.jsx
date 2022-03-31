import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss'
import { Container, Button, Card, Col, Row, CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movies } = this.props;
    const directorsMovies = movies.filter(m => m.Director.Name === director.Name);

    console.log(directorsMovies);

    return (
      <Container>
        
          <Col>
          
            <Row className='justify-content-center'>
              <Col lg={8} md={12}>
                <div>
                  <Button variant='outline-primary' onClick={() => { onBackClick(); }}>Back</Button>
                </div>
                <br />
                <Card>
                  <Card.Body md={1}>
                    <Card.Title as="h3" className='mb-4'>{director.Name}</Card.Title>
                    <Card.Subtitle className='mb-3'>{director.Birth}</Card.Subtitle>
                    <Card.Text className='mb-3'>{director.Bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <p></p>

            <Col>
              <Row className='mt-5 justify-content-center'>
                <h4>Movies by {director.Name}</h4>
              </Row>

              
                <Card.Body className='director-override'>
                  {movies.length === 0 && (
                    <div className="text-center">No movies :(</div>
                  )}

                  <Row className="justify-content-center">
                    {movies.length > 0 &&
                      directorsMovies.map((movie) => {

                      
    
                        return (
                          <Col lg={3} md={4} sm={12} key={movie._id}>
                            <CardGroup>
                              <Link to={`/movies/${movie._id}`}>
                                <Card>
                                  <Card.Img variant="top" src={movie.ImagePath} />
                                  <Card.ImgOverlay>
                                    <Card.Body>
                                      <Card.Subtitle className='card-text'>
                                          {movie.Title} ({movie.Year})
                                      </Card.Subtitle>
                                    </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                              </Link>
                            </CardGroup>
                          </Col>
                        );
                      
                    })}
                  </Row>
                </Card.Body>    
    
            </Col>
          </Col>
           
      </Container>
    );
  }
}

export default connect (mapStateToProps)(DirectorView);