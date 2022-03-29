import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, updateInput } from "../../actions/actions";

import './login-view.scss'
import { RegistrationView } from "../registration-view/registration-view";
import { Card, Container } from "react-bootstrap";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function LoginView({ user, setUser, updateInput, onLoggedIn }) {

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  useEffect(() => {
    setUser({ Username: '', Password: '' });
  });

  const validate = () => {
    let isReq = true;
    if(!user.Username){
      setUsernameErr('Username is required');
      isReq = false;
    }else if (user.Username.length < 5){
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if(!user.Password){
      setPasswordErr('Password is required');
      isReq = false;
    }else if (user.Password.length < 6){
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
        Username: user.Username,
        Password: user.Password
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
              <Form.Control required type="text" placeholder="Enter username" onChange={(e) => updateInput (e.target.value, 'Username')} />
              <Form.Text className="text-muted">
              {usernameErr && <p>{usernameErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" onChange={(e) => updateInput (e.target.value, 'Password')} />
              <Form.Text className="text-muted">
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            {' '}
            <Link to={`/register`}>
              <Button variant="secondary">
                Register
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
};

export default connect(mapStateToProps, { setUser, updateInput })(LoginView);

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};