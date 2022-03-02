import React, { useState } from "react";
import PropTypes from "prop-types";

import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    //<div>
      //<div className="register-button">
       // <button type="button" onClick={LoginView}>Register</button>
      //</div>
      <form>
        <label>
          Usernamssse:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Passsssword:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submefeit</button>
      </form>
    //</div>
  )
}