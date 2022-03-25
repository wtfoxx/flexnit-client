import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom';

import './main-view.scss'

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Button, Row, Col, Container } from 'react-bootstrap';

import { Navigation } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavoritesView } from '../favorites-view/favorites-view';


class MainView extends React.Component {

  constructor(){
    super();
      this.state = {
 
        user: null
      };
  }

  getMovies(token){
    axios.get('https://flexnitdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
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
    let { movies } = this.props;
    let { user } = this.state;

    const MainWrapper = () => {
      if (!user) return (
        <Col md={3}>
          <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
      );

      if (movies.length === 0) return <div className="main-view" />;
      
      return (
        <Col lg={3}>
          <MoviesList movie={movies} />
        </Col>

      );
      
    };

    const RegisterWrapper = () => {
      if (user) return <div className="main-view" />;
      return (
          <Col lg={3}>
            <RegistrationView />
          </Col>
      );
    }

    const MovieWrapper = () => {
      const { movieId } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <MovieView movie={movies.find(m => m._id === movieId)} onBackClick={() => history.back()} />
          </Col>
      );
    };

    const DirectorWrapper = () => {
      const { name } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <DirectorView director={movies.find(m => m.Director.Name === name).Director} movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };

    const GenreWrapper = () => {
      const { Id } = useParams();

      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Col md="auto">
            <GenreView genre={movies.find(m => m.Genre.Name === Id).Genre} movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };

    const ProfileWrapper = () => {
      if (!user) return <div className="main-view" />;
      return (
          <Col md={6} lg={4}>
            <ProfileView movies={movies} onBackClick={() => history.back()} />
          </Col>
      );
    };


    const FavoritesWrapper = () => {
      if (!user) return <div className="main-view" />;
      return (
        <Col>
          <FavoritesView movies={movies} onBackClick={() => history.back()} />
        </Col>
      )
    }

    return (
      <Router>
        <Navigation user={user} />
        <p></p>
          <Row className="main-view justify-content-md-center">
            <Routes>

              <Route exact path="/" element={<MainWrapper />} />

              <Route path="/register" element={<RegisterWrapper />} />

              <Route path="/movies/:movieId" element={<MovieWrapper />} />

              <Route path="/genres/:Id" element={<GenreWrapper />} />

              <Route path="/director/:name" element={<DirectorWrapper />} />

              <Route path="/users/:user" element={<ProfileWrapper />} />
            
              <Route path="/users/:user/movies" element={<FavoritesWrapper />} />
            </Routes>

          </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);