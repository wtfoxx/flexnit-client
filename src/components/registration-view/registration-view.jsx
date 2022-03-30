import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Container, Row, Col, Card, CardGroup, FloatingLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

function RegistrationView() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if(!username){
      setUsernameErr('Username required');
        isReq = false;
    }else if(username.length < 2){
      setUsernameErr('Username must be at least 2 characters long');
        isReq = false;
    }
    if(!password){
      setPasswordErr('Password required');
        isReq = false;
    }else if(password.length < 6){
      setPassword('Password must be at least 6 characters long');
        isReq = false;
    }
    if(!email){
      setEmailErr('Email required');
        isReq = false;
    }else if(email.indexOf('@') === -1){
      setEmail('Email must be valid');
        isReq = false;
    }
    return isReq;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://flexnitdb.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      alert('Registration successful, please login!');
      window.open('/', '_self');
    })
    .catch(response => {
      console.error(response);
      alert('Unable to register');
    });
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
              <Form.Text className="text-muted">      
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Text>
            </Form.Group>
                  

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="6" placeholder="Must be at least 6 characters long" />
              <Form.Text className="text-muted">  
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
              <Form.Text className="text-muted">    
                {emailErr && <p>{emailErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter birthday" />
            </Form.Group>

                  <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
    </Container>
    );
}

export default connect (mapStateToProps)(RegistrationView);

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func,
};