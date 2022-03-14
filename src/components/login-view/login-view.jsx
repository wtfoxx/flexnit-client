import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { RegistrationView } from "../registration-view/registration-view";

import './login-view.scss'

export function LoginView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

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

  const handleRegister = () => {
    RegistrationView();
  }
  
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
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('User does not exist.')
      });
    }
  };

  

  return (
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername (e.target.value)} />
          <Form.Text className="text-muted">
          {usernameErr && <p>{usernameErr}</p>}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Form.Text className="text-muted">
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        {' '}
        <Button variant="secondary" onClick={handleRegister}>
          Register
        </Button>
      </Form>

  )
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};