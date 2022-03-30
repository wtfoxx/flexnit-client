import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import './main-view.scss'

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import ProfileView from '../profile-view/profile-view';
import LoginView from '../login-view/login-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {MovieView} from '../movie-view/movie-view';

import { Button, Row, Col, Container } from 'react-bootstrap';

import { Navigation } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';


import { FavoritesView } from '../favorites-view/favorites-view';

let mapStateToProps = (state) => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

class MainView extends React.Component {

  constructor(){
    super();
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token){
    axios.get('https://flexnitdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    let userData = {
      ...authData.user,
    };
    console.log(authData);
    this.props.setUser(userData);
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
    let { movies, user } = this.props;
    let localUser = localStorage.getItem('user');

    let MainWrapper = () => {
      if (!localUser) return (
        <Col md={3}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
      );

      if (movies.length === 0) return <div className="main-view" />;
      
      return (
        <Container>
          <MoviesList movies={movies} />
        </Container>

      );
      
    };

    let RegisterWrapper = () => {
      if (!user) return <div className="main-view" />;
      return (
          <Col lg={3}>
            <RegistrationView />
          </Col>
      );
    }

    let MovieWrapper = () => {
      const { movieId } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <MovieView movies={movies.find(m => m._id === movieId)} onBackClick={() => history.back()} />
          </Col>
      );
    };

    let DirectorWrapper = () => {
      const { name } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <DirectorView director={movies.find(m => m.Director.Name === name).Director} movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };


    let GenreWrapper = () => {
      const { Id } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <GenreView genre={movies.find(m => m.Genre.Name === Id).Genre} movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };

    let ProfileWrapper = () => {
      if (!localUser) return <div className="main-view" />;
      return (
          <Col md={6} lg={4}>
            <ProfileView movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };


    let FavoritesWrapper = () => {
      if (!localUser) return <div className="main-view" />;
      return (
        <Col>
          <FavoritesView movies={movies} onBackClick={() => history.back()} />
        </Col>
      )
    }

    return (
      <Router>
        <Navigation user={localUser} />
        <p></p>
          <Row className="main-view justify-content-md-center">
            <Routes>

              <Route exact path="/" element={<MainWrapper />} />

              <Route path="/register" element={<RegisterWrapper />} />

              <Route path="/movies/:movieId" element={<MovieWrapper />} />

              <Route path="/genres/:Id" element={<GenreWrapper />} />

              <Route path="/directors/:name" element={<DirectorWrapper />} />

              <Route path="/users/:user" element={<ProfileWrapper />} />
            
              <Route path="/users/:user/movies" element={<FavoritesWrapper />} />
            </Routes>

          </Row>
      </Router>
    );
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);