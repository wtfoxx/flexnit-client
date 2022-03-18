import React from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";

export function Navigation({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="main-nav" sticky="top" expand="lg">
        <Navbar.Brand className="navbar-logo" href="/">Flexnit</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            
            {isAuth() && (
              <Nav.Link variant="link" onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )

}