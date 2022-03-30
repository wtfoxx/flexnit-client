import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes, { func } from 'prop-types';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, CardGroup, FloatingLabel } from 'react-bootstrap';
import { setUser, updateUser } from '../../actions/actions';

let mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Username: this.props.Username,
      Password: this.props.Password,
      Email: this.props.Email,
      Birthday: this.props.Birthday,
      Favorites: this.props.Favorites,
    };
  }

  //Performs a PUT request on the API to edit the specified user's information
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://flexnitdb.herokuapp.com/users/${Username}`,
      this.state,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(response => {
      let formattedDate = null;
      let anyBirthday = response.data.Birthday;
      if(anyBirthday){
        formattedDate = anyBirthday.slice(0,10)
      }
      this.props.updateUser({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: formattedDate,
      });

      localStorage.setItem('user', this.state.Username);
        alert("Profile updated successfully!");
        window.open(`/`, '_self');
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
    const { onBackClick, user } = this.props;
    const localUser = localStorage.getItem('user');

    if (!localUser) {
      console.log('boo');
      return null;
    } else {
      console.log(this.state);
    }

    return (
      <Container> 
        <div className="backButton">
          <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>Hello, {localUser}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">To update your information, just rewrite the ones you wish to change and hit Update</Card.Subtitle>
            <Form
              className="update-form"
              onSubmit={(e) =>
                this.updateUser(
                  e,
                  this.props.user.Username,
                  this.props.user.Password,
                  this.props.user.Email,
                  this.props.user.Birthday
                )
              }
            >

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  placeholder="New Username"
                  value={this.state.Username}
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
                  value={this.state.Email}
                  onChange={(e) => this.setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.Birthday}
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

let mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProfileView);

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

