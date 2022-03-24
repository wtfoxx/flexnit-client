import React, { useState } from 'react';
import axios from 'axios';
import PropTypes, { func } from 'prop-types';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, CardGroup, FloatingLabel } from 'react-bootstrap';

 
export class ProfileView extends React.Component {

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

  //Performs a PUT request on the API to edit the specified user's information
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://flexnitdb.herokuapp.com/users/${Username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
      });

      localStorage.setItem('user', this.state.Username);
        alert("Profile updated successfully!");
        window.open(`/`, '_self');
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

  //Performs a DELETE request on the API to remove the specified user from the database
  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://flexnitdb.herokuapp.com/users/${Username}`, 
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted, goodbye!");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Favorites, Username, Email, Birthday } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <Container> 
        <div className="backButton">
          <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>Hello, {Username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">To update your information, just rewrite the ones you wish to change and hit Update</Card.Subtitle>
            <Form
              className="update-form"
              onSubmit={(e) =>
                this.editUser(
                  e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthday
                )
              }
            >

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  placeholder="New Username"
                  value={Username}
                  onChange={(e) => this.setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={""}
                  onChange={(e) => this.setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={Email}
                  onChange={(e) => this.setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={Birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              <div className="mt-3">
                <Button variant="success" type="submit" onClick={this.editUser}>Update</Button>
                <Button className="ml-3" variant="danger" onClick={() => this.onDeleteUser()}>Delete User</Button>
              </div>
            </Form>
              </Card.Body>
            </Card>
      </Container>
    );
  }
}

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Name: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    onBackClick: PropTypes.func.isRequired
};