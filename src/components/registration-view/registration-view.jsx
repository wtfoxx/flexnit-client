import React, { useState } from "react";
import PropTypes from "prop-types";

import './registration-view.scss'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
      
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  //Username and password validation
  const [ values, setValues ] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  //Validation for username and password
  const validate = () => {
    let isReq = true;
    if(!username) {
      setValues({...values, usernameErr: 'Username is required'});
      isReq = false;
    }else if(username.length < 5){
      setValues({...values, usernameErr: 'Username must be at least 5 characters long'});
      isReq = false;
    }
    if(!password) {
      setValues({...values, passwordErr: 'Password is required.'});
      isReq = false;
    }else if(password.length < 6){
      setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
      isReq = false;
    }
    if(!email) {
      setValues({...values, emailErr: 'Email is required.'});
      isReq = false;
    }else if(email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Email is invalid.'});
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
        Birthday: birthday
      })
      .then(response => {
        const data = response.date;
        console.log(data);
        alert('Registration successful, please login!');
        window.open('/', '_self'); //The second argument '_self' opnes in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('Unable to register');
      });

    return (
      <Row className="mt-5">
        <Col md={12}>
          <Form>
            <h3>Sign Up</h3>
            <p></p>
            <Form.Group className="reg-form-inputs" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername (e.target.value)} />
              <Form.Text className="text-muted">
                {values.usernameErr && <p>{values.usernameErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="reg-form-inputs" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create password" value={password} onChange={e => setPassword (e.target.value)} />
              <Form.Text className="text-muted">
                {values.passwordErr && <p>{values.passwordErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="reg-form-inputs" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail (e.target.value)} />
              <Form.Text className="text-muted">
                {values.emailErr && <p>{values.emailErr}</p>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="reg-form-inputs" controlId="updateBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="Enter birthday" value={birthday} onChange={e => setBirthday (e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            <p></p>
            <p>Already registered <Link to={'/'}>sign in</Link> here</p>

          </Form>

        </Col>
      </Row>

    );
  }
};

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
  }
}
