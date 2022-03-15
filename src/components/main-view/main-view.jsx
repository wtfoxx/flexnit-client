import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom';

import './main-view.scss'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Button } from 'react-bootstrap';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token){
    axios.get('https://flexnitdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assing the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const MovieWrapper = () => {
      const { movieId } = useParams();

      return (
        <Col md={8}>
          <MovieView movie={movies.find(m => m._id === movieId)} />
        </Col>
      );
    };

    const GenreWrapper = () => {
      const { name } = useParams();

      return (
        <Col md={8}>
          <GenreView genre={movies.find(m => m.Genre.Name === name).Genre} />
        </Col>
      );
    };

    const DirectorWrapper = () => {
      const { name } = useParams();

      return (
        <Col md={8}>
          <DirectorView director={movies.find(m => m.Director.Name === name).Director} />
        </Col>
      );
    };

    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Button variant="outline-primary" size="sm" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route exact path="/" element={
               movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
               ))
               } />
            <Route path="/movies/:movieId" element={<MovieWrapper />} />
            <Route path="/genres/:name" element={<GenreWrapper />} />
            <Route path="/directors/:name" element={<DirectorWrapper />} />
          </Routes>

        </Row>
      </Router>
    );
  }
}