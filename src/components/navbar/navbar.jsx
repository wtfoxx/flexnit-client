import React from "react";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies
  }
}

function Navigation({visibilityFilter}) {

  let user = localStorage.getItem('user');

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
      <Container>
        <Navbar.Brand className="navbar-logo" href="/"><b>FLEXNIT</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>

            {isAuth() && (
              <NavDropdown title="Profile" className="mr-3">
                <NavDropdown.Item href={`/users/${user}`}>{user}</NavDropdown.Item>
                <NavDropdown.Item href={`/users/${user}/movies`}>Favorites</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item variant="link" onClick={() => onLoggedOut()}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}

          <Nav.Item>

            <VisibilityFilterInput visibilityFilter={visibilityFilter} />

          </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   
  )

}

export default connect(mapStateToProps)(Navigation);