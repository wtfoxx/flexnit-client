import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './login-view.scss'
import { Card, Container } from "react-bootstrap";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function LoginView({ onLoggedIn }) {

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username is required');
      isReq = false;
    }else if (username.length < 5){
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password is required');
      isReq = false;
    }else if (password.length < 6){
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://flexnitdb.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        onLoggedIn(response.data);
      })
      .catch(e => {
        alert('User does not exist.');
        console.log('User does not exist.');
      });
    }
  };

  

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required value={username} type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
              <Form.Text className="text-muted">
              {usernameErr && <p>{usernameErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <Form.Text className="text-muted">
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Text>
            </Form.Group>
            
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            {' '}
          </Form>
        </Card.Body>
      <Card.Footer className="text-center">
        <Card.Text>Don't have an account?</Card.Text>
            <Link to={`/register`}>
              <Button variant="secondary">
                Register
              </Button>
            </Link>
            <p></p>
            </Card.Footer>
      </Card>
    </Container>
  )
};

export default connect(mapStateToProps)(LoginView);

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};