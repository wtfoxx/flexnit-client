import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss'
import { Container, Button, Card, Col, Row, CardGroup } from 'react-bootstrap';
import axios from 'axios';

export class DirectorView extends React.Component {

  constructor(){
    super();
      this.state = {
        movies: [],
      };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    let { director } = this.props;
    if (accessToken !== null) {
      this.getDirector(accessToken, director);
    }
  }


  getDirector = (token, director) => {

    axios.get(`https://flexnitdb.herokuapp.com/movies/directors/${director.Name}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
      console.log(response.data);
      console.log(director.Name);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { director, onBackClick } = this.props;
    const { movies } = this.state;


    return (
      <Container>

          <Col>
            <Row className='justify-content-center'>
              <Col lg={8} md={12}>
                <Card>
                  <Card.Body md={1}>
                    <Card.Title className='mb-4'>{director.Name}</Card.Title>
                    <Card.Subtitle className='mb-3'>{director.Birth}</Card.Subtitle>
                    <Card.Text className='mb-3'>{director.Bio}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <p></p>

            <Col>
              <Row className='mt-5 justify-content-center'>
                <h4>Movies by {director.Name}</h4>
              </Row>

              
                <Card.Body>
                  {movies.length === 0 && (
                    <div className="text-center">No movies :(</div>
                  )}

                  <Row className="justify-content-center">
                    {movies.length > 0 &&
                      movies.map((movie) => {

                      
    
                        return (
                          <Col lg={3} md={4} sm={12} key={movie._id}>
                            <CardGroup>
                              <Link to={`/movies/${movie._id}`}>
                                <Card>
                                  <Card.Img variant="top" src={movie.ImagePath} />
                                  <Card.Body>
                                    <Card.Subtitle>
                                        {movie.Title}
                                    </Card.Subtitle>
                                  </Card.Body>
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